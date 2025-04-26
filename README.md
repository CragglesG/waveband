# Waveband

This is the repo for Waveband, a Hack Club YSWS where you ship a program that uses an RTL-SDR dongle, and we ship one out to you!

## Table of Contents

- [What's a YSWS?](#whats-a-ysws)
- [What's an RTL-SDR dongle?](#whats-an-rtl-sdr-dongle)
- [How can I get started?](#how-can-i-get-started)
- [Example Projects](#example-projects)
  - [Rust1090](#rust1090)
  - [RTL-SDR Radio](#rtl-sdr-radio)
  - [SDR-Weather](#sdr-weather)
- [What are the rules for submissions?](#what-are-the-rules-for-submissions)
- [Website](#website)

## What's a YSWS?

A "You Ship, We Ship" is a type of program for teenagers run by [Hack Club](https://hackclub.com). During a YSWS, teenagers can create their own program in return for a free prize. To participate in this YSWS, you'll need to create a program that uses an RTL-SDR dongle in a unique way, and in return, we'll ship one out to you!

## What's an RTL-SDR dongle?

An RTL-SDR dongle is a small USB device that can receive radio waves anywhere from 24MHz-1.7GHz in frequency. This means it can pick up on FM radio, aircraft signals, weather balloon data, phone signals, amateur radio, and more! It can even recieve TV broadcasts in Europe! The name RTL-SDR comes from the name of the chip used in these models – the RTL2823U – and the type of radio which it is: a _Software-Defined Radio_. Software-defined radios can be controlled entirely using code, and that's what makes them so powerful!

## How can I get started?

Getting started with Waveband and RTL-SDR is easy! For the purpose of this YSWS, you won't need to install any drivers or additional software, as you can test your program using the Waveband API. Firstly, you need to come up with an idea. This can be anything that uses an RTL-SDR dongle, as long as you can spend at least 10hrs working on it. Next, you need to implement your idea! You might need to do a bit of research if you've chosen an ambitious idea or you're new to SDR. You can use any language and tools you want, as long as a large portion of code is written by you. Feel free to ask in #waveband in the [Hack Club Slack](https://hackclub.com/slack) for help if you need it. Finally, you can submit your project! You'll need to have created some sort of demo for this; if your project contains a web interface, then you should host it online. If it doesn't, a video and installation instructions should suffice.

## What's the Waveband API?

The Waveband API is an easy way to test your project using data from a remote dongle. It uses [rtl_tcp](https://github.com/librtlsdr/librtlsdr) and [rtlmux](https://github.com/slepp/rtlmux) under the hood, so it's widely supported and easy to use! We recommend using [SoapySDR](https://github.com/pothosware/SoapySDR) to connect to the API, along with the [SoapyRTLTCP](https://github.com/pothosware/SoapyRTLTCP) module. There's an example of how to use the API in Python [here](api/example.py).


## Example Projects

We've compiled a list of example projects that show you what kind of projects you can build for Waveband, which we've listed here.

### Rust1090

Rust1090 is a program that complements [dump1090](https://github.com/antirez/dump1090) with additional features such as statistics tracking, a dashboard, and dark mode. it was built by @TuinboonDev, and you can check it out [here](https://github.com/TuinboonDev/rust1090).

### RTL-SDR Radio

RTL-SDR Radio is a cross-platform, minimalistic desktop app for listening to FM and AM radio and decoding ADS-B signals from aircraft. It was built by @njfdev and you can view its GitHub repository [here](https://github.com/njfdev/rtlsdr-radio).

### SDR-Weather

SDR-Weather is a program that uses an RTL-SDR dongle to receive weather data from nearby aircraft. It then presents this data using TTS (Text To Speech) and an auto-generated Leaflet.js map. It was built by @CragglesG and you can see it [here](examples/sdr-weather).

## What are the rules for submissions?

* You can build your submission on top of dump1090 or similar software, but most code must be written by you.
* Your submission must have a unique idea; projects will be checked for plagiarism and fraud.
* You may use AI tools such as GitHub Copilot to assist with debugging and autocompletion, but you may not use AI to generate large amounts of code or provide ideas.
* Your project must be open source
* You may not work extensively with others on your project, but you can get help if you’re stuck.
* You must spend at least 10 hours on your project, tracked using Hackatime

## Website

The Waveband website is located in the [`website` directory](website/), and you can view it [here](https://waveband-ysws.vercel.app). It's based on the [Vine](https://github.com/N1k0s1/Vine) website.

<br>

[🔼 Back to top](#waveband)
