const formats = [
  "a web app",
  "a terminal app",
  "a desktop app",
  "a Python program",
  "a Slack bot",
];

const functions = [
  "for viewing pictures from weather satellites! (hint: check out Automatic Picture Transmission)",
  "for tracking ships in real-time! (hint: you might want to use Automatic Identification System for this)",
  "for tracking planes in real-time! (hint: take a look at ADS-B)",
  "for listening to local radio stations!",
  "for viewing images from the ISS! (hint: these are transmitted using SSTV)",
  "for receiving data from HAM radio stations! (hint: APRS might be helpful here)",
  "for viewing changes in amplitude and frequency!",
];

function generateIdea() {
  const r1 = Math.floor(Math.random() * formats.length);
  const r2 = Math.floor(Math.random() * functions.length);

  return formats[r1] + " " + functions[r2];
}

export default function IdeaGen() {
  return <div>You could build {generateIdea()}</div>;
}
