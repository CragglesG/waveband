# Waveband API Rust Crate

This crate makes it easy to interact with the Waveband API in Rust.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

To install the Rust crate for the Waveband API, run the following command:

```bash
cargo add waveband
```

## Usage

You can use the API by importing the `waveband` crate:

```rust
use waveband::API;

fn main() {
    // Initialize the API client with a URL, port, and API key
    let api = API::new("thijmens.nl", 12346, "your-api-key")?;

    // Make a request to the API with the data type - 0 for FM Radio, 1 for ADS-B and 2 for HAM Radio - and print the response
    match api.get(0) {
        Ok(data) => println!("{:?}", data),
        Err(err) => println!("Error: {}", err),
    }
}
```

The `data_type` parameter provided when using `API.get` specifies the type of data to retrieve from the API. It can be one of the following values:

- `0` for FM Radio
- `1` for ADS-B
- `2` for HAM Radio

Data is returned in raw bytes from the API.
