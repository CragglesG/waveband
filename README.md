# Waveband

This is the repo for Waveband, an upcoming Hack Club YSWS where you ship a program that uses an RTL-SDR dongle, and we ship one out to you!

**RSVP [here](https://airtable.com/appgaxO7wo2xGGIir/pag6C6wGzrVLAUJdL/form)**

## Table of Contents

- [What is Waveband?](#what-is-waveband?)
- [Waveband API](#waveband-api)
  - [Waveband API Specification](#waveband-api-specification)
- [Example Projects](#example-projects)
  - [Rust1090](#rust1090)
  - [RTL-SDR Radio](#rtl-sdr-radio)
  - [SDR-Weather](#sdr-weather)
- [Website](#website)

## What is Waveband?

Waveband is an upcoming Hack Club YSWS where you ship a program that uses an RTL-SDR dongle, and we ship one out to you! If you're in the [Hack Club Slack](https://hackclub.com/slack), you can check out the [Waveband FAQ](https://hackclub.slack.com/docs/T0266FRGM/F0823BZ4X1Q) for more info.

If you're interested in participating, please RSVP [here](https://airtable.com/appgaxO7wo2xGGIir/pag6C6wGzrVLAUJdL/form).

## Waveband API

The Waveband API is an easy way to test your project without a physical dongle. It provides access to FM Radio, ADS-B, and HAM Radio data collected in real-time using a remote dongle. If you're using Python, JavaScript, or Rust, you can use one of the pre-built [libraries](api/README.md). If not, you'll need to interact with the API directly.

### Waveband API Specification

Below is the usual exchange between the client and server. If you are interacting with the API directly, you'll need to follow these steps:

1. Client connects to Server using a TCP stream.

2. Server sends "Hello" terminated by CRLF ("\r\n") to the Client.

3. Client sends "Hi" which is also terminated by a CRLF.

4. This is followed by a byte: 0 for FM Radio data, 1 for ADS-B, and 2 for HAM Radio data.

5. Client sends the length of their token followed by their token, without a terminating CRLF.

6. Server assess whether the token is valid, and if it is, it sends the relevant data. If not, it terminates the connection.

## Example Projects

We've compiled a list of example projects that show you what kind of projects you can build for Waveband, which we've listed here.

### Rust1090

Rust1090 is a program that complements [dump1090](https://github.com/antirez/dump1090) with additional features such as statistics tracking, a dashboard, and dark mode. it was built by @TuinboonDev, and you can check it out [here](https://github.com/TuinboonDev/rust1090).

### RTL-SDR Radio

RTL-SDR Radio is a cross-platform, minimalistic desktop app for listening to FM and AM radio and decoding ADS-B signals from aircraft. It was built by @njfdev and you can view its GitHub repository [here](https://github.com/njfdev/rtlsdr-radio).

### SDR-Weather

SDR-Weather is a program that uses an RTL-SDR dongle to receive weather data from nearby aircraft. It then presents this data using TTS (Text To Speech) and an auto-generated Leaflet.js map. It was built by @CragglesG and you can see it [here](examples/sdr-weather).

## Website

The Waveband website is located in the [`website` directory](website/). It's based on the [Vine](https://github.com/N1k0s1/Vine) website. You can view it [here](https://waveband-ysws.vercel.app).
