use std::convert::TryInto;
use std::io::prelude::*;
use std::io::BufWriter;
use std::net::{Shutdown, TcpListener, IpAddr};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::mpsc::sync_channel;
use std::sync::{Arc, Mutex};

use clap::Parser;
#[cfg(feature = "systemd")]
use listenfd::ListenFd;
use redis::Commands;
use serde::Deserialize;
use serde_json::json;
use tracing::{debug, info};

use redis;
use redis::{JsonCommands, Value as RV};

#[derive(Parser, Debug)]
#[clap(
    author,
    version,
    about = "an I/Q spectrum server for RTL2832 based DVB-T receivers",
    long_about = None
)]
struct Args {
    /// listen address
    #[clap(short, long, default_value = "[::]")]
    address: String,

    /// listen port
    #[clap(short, long, default_value_t = 1234)]
    port: u16,

    /// device index
    #[clap(short, long, default_value_t = 0)]
    device_index: u32,

    /// number of decoding buffers
    #[clap(short, long, default_value_t = 15)]
    buffers: u32,

    /// tcp sending buffer size (in bytes)
    #[clap(short, long, default_value_t = 512000)]
    tcp_buffers: usize,
}

#[derive(Deserialize, Debug)]
struct CacheEntry {
    params: Vec<i32>,
    bytes: Vec<u8>,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt::init();

    let args = Args::parse();

    let listener;
    #[cfg(feature = "systemd")]
    {
        let mut listenfd = ListenFd::from_env();
        listener = if let Some(listener) = listenfd
            .take_tcp_listener(0)
            .map_err(|_| "Could not get file descriptor from input")?
        {
            listener
        } else {
            TcpListener::bind(format!("{}:{}", args.address, args.port))?
        };
        systemd::daemon::notify(false, [(systemd::daemon::STATE_READY, "1")].iter())?;
    }
    #[cfg(not(feature = "systemd"))]
    {
        listener = TcpListener::bind(format!("{}:{}", args.address, args.port))?;
    }

    let (sender, receiver) = sync_channel(0);
    let sender_ctrlc = sender.clone();
    let should_exit = Arc::new(AtomicBool::new(false));
    ctrlc::set_handler(move || {
        match sender_ctrlc.try_send(()) {
            Ok(_) => {}
            Err(_) => {
                // cancel thread not waiting yet, we can exit immediately
                std::process::exit(0);
            }
        }
    })?;

    let redis_client = redis::Client::open("redis://127.0.0.1:6379/")?;
    let mut r = redis_client.get_connection()?;

    info!("waiting for connection…");
    let (stream, addr) = listener.accept()?;

    let ip = addr.ip().to_string();
    info!("connection from {}", ip);

    let ip_only = match addr.ip() {
        IpAddr::V4(ipv4) => ipv4.to_string(),
        IpAddr::V6(v6) => {
            if let Some(mapped) = v6.to_ipv4() {
                mapped.to_string()
            } else {
                v6.to_string()
            }
        }
    };
    
    if !r.sismember("waveband-api-ip-whitelist", ip_only)? {
        info!("ip not whitelisted; closing connection…");
        stream.shutdown(Shutdown::Both)?;
        return Ok(());
    }

    let (ctl, mut reader) =
        rtlsdr_mt::open(args.device_index).map_err(|_| "Could not open RTL SDR device")?;
    let ctl = Arc::new(Mutex::new(ctl));

    let thread_ctl = std::thread::spawn({
        let ctl = ctl.clone();
        let should_exit = should_exit.clone();
        let mut stream = stream.try_clone()?;
        move || {
            let mut buf = [0; 5];
            loop {
                stream.read(&mut buf).unwrap();
                if should_exit.load(Ordering::SeqCst) {
                    break;
                }
                match buf[0] {
                    0x01 => {
                        let freq = u32::from_be_bytes((&buf[1..5]).try_into().unwrap());
                        info!("setting center freq to {}", freq);
                        ctl.lock().unwrap().set_center_freq(freq).unwrap();
                    }
                    0x02 => {
                        let sample_rate = u32::from_be_bytes((&buf[1..5]).try_into().unwrap());
                        info!("setting sample rate to {}", sample_rate);
                        ctl.lock().unwrap().set_sample_rate(sample_rate).unwrap();
                    }
                    0x03 => {
                        let gain_mode = i32::from_be_bytes((&buf[1..5]).try_into().unwrap());
                        if gain_mode > 0 {
                            info!("manual tuner gain requested");
                            info!("setting automatic gain control to on");
                            ctl.lock().unwrap().enable_agc().unwrap();
                        } else {
                            info!("manual tuner gain requested, disabling agc");
                            info!("setting automatic gain control to off");
                            ctl.lock().unwrap().disable_agc().unwrap();
                        }
                    }
                    0x04 => {
                        let gain = i32::from_be_bytes((&buf[1..5]).try_into().unwrap());
                        info!("setting manual gain to {}", gain);
                        ctl.lock().unwrap().set_tuner_gain(gain).unwrap();
                    }
                    0x05 => {
                        let ppm = i32::from_be_bytes((&buf[1..5]).try_into().unwrap());
                        info!("setting ppm to {}", ppm);
                        ctl.lock().unwrap().set_ppm(ppm).unwrap();
                    }
                    0x08 => {
                        let agc = u32::from_be_bytes((&buf[1..5]).try_into().unwrap()) == 1u32;
                        if agc {
                            info!("setting automatic gain control to on");
                            ctl.lock().unwrap().enable_agc().unwrap();
                        } else {
                            info!("setting automatic gain control to off");
                            ctl.lock().unwrap().disable_agc().unwrap();
                        }
                    }
                    _ => {
                        debug!("recv unsupported command {:?}", buf);
                    }
                }
            }
        }
    });

    let params = [
        ctl.lock().unwrap().center_freq() as i32,
        ctl.lock().unwrap().ppm(),
        ctl.lock().unwrap().sample_rate() as i32,
        ctl.lock().unwrap().tuner_gain(),
    ];

    let cache_entries: Vec<String> = r.json_get("cache-entries", "$.waveband-api-cache")?;

    let mut cache_hit: Vec<u8> = Vec::new();
    for entry_json in &cache_entries {
        if let Ok(entry) = serde_json::from_str::<CacheEntry>(entry_json) {
            if entry.params == params {
                cache_hit = entry.bytes;
                break;
            }
        }
    }

    if cache_hit.is_empty() {
        let thread_cancel = std::thread::spawn({
            move || {
                receiver.recv().unwrap();
                info!("stopping read from device");
                ctl.lock().unwrap().cancel_async_read();
                should_exit.store(true, Ordering::SeqCst);
            }
        });

        let mut buf_write_stream = BufWriter::with_capacity(args.tcp_buffers, stream);
        let mut magic_packet = vec![];
        magic_packet.extend_from_slice(b"RTL0");
        magic_packet.extend_from_slice(&5u32.to_be_bytes()); // FIXME
        magic_packet.extend_from_slice(&[0x00, 0x00, 0x00, 0x1d]); // FIXME
        buf_write_stream.write_all(&magic_packet)?;
        reader
            .read_async(args.buffers, 0, |bytes| {
                buf_write_stream.write_all(bytes).unwrap_or_else(|_err| {
                    sender.try_send(()).expect("can't exit normally");
                });
                r.json_arr_append::<&str, &str, serde_json::Value, RV>(
                    "cache-entries",
                    "$.waveband-api-cache",
                    &json!({
                        "params": params,
                        "bytes": bytes
                    }),
                )
                .unwrap_or_else(|_err| {
                    sender.try_send(()).expect("can't exit normally");
                    RV::Nil
                });
            })
            .unwrap();

        thread_cancel.join().unwrap();
        thread_ctl.join().unwrap();
    } else {
        let mut buf_write_stream = BufWriter::with_capacity(args.tcp_buffers, stream);
        let mut magic_packet = vec![];
        magic_packet.extend_from_slice(b"RTL0");
        magic_packet.extend_from_slice(&5u32.to_be_bytes()); // FIXME
        magic_packet.extend_from_slice(&[0x00, 0x00, 0x00, 0x1d]); // FIXME
        buf_write_stream.write_all(&magic_packet)?;
        buf_write_stream
            .write_all(&cache_hit)
            .unwrap_or_else(|_err| {
                sender.try_send(()).expect("can't exit normally");
            });
    }

    Ok(())
}
