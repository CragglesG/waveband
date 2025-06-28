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
];

function generateIdea() {
  const r1 = Math.floor(Math.random() * (4 + 1));
  const r2 = Math.floor(Math.random() * (5 + 1));

  return formats[r1] + " " + functions[r2];
}

export default function IdeaGen() {
  return <div>You could build {generateIdea()}</div>;
}
