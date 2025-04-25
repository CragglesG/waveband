export default class API {
  constructor(host, port, token) {
    this.host = host;
    this.port = port;
    this.token = token;
    this.sdrData = null;
    this.success = null;
  }

  get(dataType) {
    const s = new WebSocket(`ws://${this.host}:${this.port}`);
    let tokenSent = false;

    s.addEventListener("message", (event) => {
      const data = event.data;
      if (data.payload == "Hello\r\n") {
        s.send("Hi\r\n");
        s.send(dataType.toString());
        s.send(this.token.length.toString() + this.token);
        tokenSent = true;
      } else if (tokenSent) {
        this.sdrData = data;
        this.success = true;
      } else {
        console.error(
          "[Waveband API] Unexpected message received before token sent"
        );
        this.success = false;
      }
    });
  }
}
