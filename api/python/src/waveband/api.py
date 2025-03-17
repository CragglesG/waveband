import socket

class MalformedResponse(Exception):
    pass

class API:
    def __init__(self, url: str, port: int = 80, token: str = ""):
        self.url = url
        self.port = port
        self.token = token

    def get(self, data_type: int) -> bytes:
        token = self.token.encode()
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((self.url, self.port))

        receiving = True
        data = b""
        while receiving:
            received = s.recv(1)
            if b"\r\n" in data:
                receiving = False
            else:
                data += received
        if not data.decode().strip() == "Hello":
            s.close()
            raise MalformedResponse("Invalid response: " + data.decode())

        s.send(b"Hi\r\n")
        s.send(data_type.to_bytes(1, 'big'))
        s.send(len(token).to_bytes(2, 'big') + token)

        receiving = True
        data = b""
        while receiving:
            received = s.recv(1)
            if b"\r\n" in data:
                receiving = False
            else:
                data += received

        s.close()
        return data
