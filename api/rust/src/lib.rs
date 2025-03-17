use std::{
    error::Error,
    fmt::{Debug, Display, Formatter},
    io::{BufRead, BufReader, BufWriter, Read, Write},
    net::{Shutdown, TcpStream},
};

pub struct API<'a> {
    url: &'a str,
    port: u16,
    token: String,
}

enum APIError {
    ConnectionError,
}

impl Display for APIError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            APIError::ConnectionError => write!(f, "Connection error"),
        }
    }
}

impl Debug for APIError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            APIError::ConnectionError => write!(f, "Connection error"),
        }
    }
}

impl Error for APIError {}

impl<'a> API<'a> {
    pub fn new(url: &'a str, port: u16, token: String) -> Self {
        Self { url, port, token }
    }

    pub fn get(&self, data_type: u8) -> Result<Vec<u8>, Box<dyn Error>> {
        let stream = TcpStream::connect((self.url, self.port))?;
        let mut data: String = String::new();

        let mut reader = BufReader::new(&stream);
        let mut writer = BufWriter::new(&stream);

        reader.read_line(&mut data)?;

        if data.trim() != "Hello" {
            stream.shutdown(Shutdown::Both)?;
            return Err(Box::new(APIError::ConnectionError));
        }

        let mut token_bytes = Vec::from(self.token.len().to_be_bytes());
        token_bytes.extend(self.token.as_bytes().to_owned());
        writer.write(b"Hi\r\n")?;
        writer.write(&data_type.to_be_bytes())?;
        writer.write(&token_bytes)?;
        writer.flush()?;

        let mut radio_data: Vec<u8> = Vec::new();

        reader.read_to_end(&mut radio_data)?;

        Ok(radio_data)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    use std::any::{Any, TypeId};

    #[test]
    fn test_api() -> Result<(), Box<dyn Error>> {
        let test_api = API::new("thijmens.nl", 12346, "test_token".to_string());

        assert_eq!(test_api.get(0)?.type_id(), TypeId::of::<Vec<u8>>());
        Ok(())
    }
}
