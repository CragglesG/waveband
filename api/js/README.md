# Waveband API JavaScript Library

This library makes it easy to interact with the Waveband API in JavaScript.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

To install the JavaScript library for the Waveband API, run the following command:

```bash
npm install waveband
```

## Usage

You can use the API by importing the `waveband` library:

```javascript
import API from "waveband";

// Initialize the API client with a URL, port, and API key
const api = new API("thijmens.nl", 12346, "your-api-key");

// Make a request to the API with the data type - 0 for FM Radio, 1 for ADS-B and 2 for HAM Radio
api.get(0);

// Check if the API request was successful
if (api.success == true) {
  // Print the received data
  console.log(api.sdrData);
  // Check if the API request was unsuccessful
} else if (api.success == false) {
  console.log("API request failed");
  // Check if the API request hasn't completed yet
} else if (api.success == null) {
  console.log("The API request hasn't completed yet!");
}
```

The `dataType` parameter provided when using `API.get` specifies the type of data to retrieve from the API. It can be one of the following values:

- `0` for FM Radio
- `1` for ADS-B
- `2` for HAM Radio

Data is returned in raw bytes from the API.
