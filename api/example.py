import SoapySDR
from SoapySDR import *
import numpy as np

server_ip = "check canvas in #waveband for ip"
server_port = "check canvas in #waveband for port"

# Create the SDR device
sdr = SoapySDR.Device(f"rtltcp={server_ip}:{server_port}")

# Set sample rate of 2.1MHz
sdr.setSampleRate(SOAPY_SDR_RX, 0, 2.1e6)

# Set center frequency of 1090MHz
sdr.setFrequency(SOAPY_SDR_RX, 0, 109e7)

# Set up a stream
rxStream = sdr.setupStream(SOAPY_SDR_RX, SOAPY_SDR_CF32)
sdr.activateStream(rxStream)

# Receive samples
buff = np.array([0]*1024, np.complex64)
for i in range(10):
    sr = sdr.readStream(rxStream, [buff], len(buff))
    if sr.ret > 0:
        print(f"Received {sr.ret} samples; {sr.ret*i} total")

# Clean up
sdr.deactivateStream(rxStream)
sdr.closeStream(rxStream)
