# Waveband API Python Library

[![PyPI - Version](https://img.shields.io/pypi/v/waveband.svg)](https://pypi.org/project/waveband)
[![PyPI - Python Version](https://img.shields.io/pypi/pyversions/waveband.svg)](https://pypi.org/project/waveband)

---

This library makes it easy to interact with the Waveband API in Python.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

To install the Python library for the Waveband API, run the following command:

```bash
pip install waveband
```

## Usage

You can use the API by importing the `waveband` module:

```python
from waveband import API

# Initialize the API client with a URL, port, and API key
api = API("thijmens.nl", 12346, "your_api_key")

# Make a request to the API with the data type - 0 for FM Radio, 1 for ADS-B and 2 for HAM Radio
response = api.get(0)

# Print the response
print(response)
```

The `data_type` parameter provided when using `API.get` specifies the type of data to retrieve from the API. It can be one of the following values:

- `0` for FM Radio
- `1` for ADS-B
- `2` for HAM Radio

Data is returned in raw bytes from the API.

## License

`waveband` is distributed under the terms of the [MIT](https://spdx.org/licenses/MIT.html) license.
