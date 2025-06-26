import { useState, useEffect } from "react";
import "../css/terminal.css";
import IdeaGen from "./IdeaGen";

const artStyle = {
  color: "#33FF57",
  whiteSpace: "pre",
  fontFamily: "monospace",
};
const terminalStyle = {
  color: "#FFFFFF",
  backgroundColor: "#2E2E2E",
  padding: "20px",
  borderRadius: "5px",
  whiteSpace: "pre",
  fontFamily: "monospace",
};

const funFacts = [
  <div className="fun-fact">
    <span style={{ color: "#FFFF00" }}>Fun fact!</span>
    <br />
    RTL-SDR dongles can be used to receive signals from weather satellites,
    allowing
    <br />
    you to get real-time weather images directly to your computer!
  </div>,
  <div className="fun-fact">
    <span style={{ color: "#FFFF00" }}>Did you know?</span>
    <br />
    With an SDR, you can tune into a wide range of frequencies, from listening
    to FM
    <br />
    radio to decoding signals from aircraft and even tracking ships using AIS!
  </div>,
  <div className="fun-fact">
    <span style={{ color: "#FFFF00" }}>Fun fact!</span>
    <br />
    RTL-SDR dongles were originally designed for DVB-T television reception but
    were
    <br />
    repurposed into cheap software-defined radios!
  </div>,
];

function getFunFact() {
  return funFacts[Math.floor(Math.random() * funFacts.length)];
}

// Move Terminal outside of Typewriter
export default function Terminal() {
  let previousCommand;
  const [prevusedCommand, setprevusedCommand] = useState([]);

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const CommandArea = document.getElementById("command");
        if (CommandArea) {
          previousCommand = CommandArea.value;
          setprevusedCommand((prevArray) => [
            ...prevArray,
            "guest@wave.band:~$ " + previousCommand,
          ]);
          if (CommandArea.value === "github") {
            window.open("https://github.com/CragglesG/waveband", "_blank");
          } else if (CommandArea.value === "source") {
            window.open(
              "https://github.com/CragglesG/waveband/tree/main/website",
              "_blank",
            );
          } else if (CommandArea.value === "guide") {
            window.open(
              "https://github.com/CragglesG/waveband/blob/main/README.md",
              "_blank",
            );
          } else if (CommandArea.value === "submit") {
            window.open("https://forms.hackclub.com/waveform", "_blank");
          }
          CommandArea.value = "";
        }
      }
    });
  }, []);

  let firstDate = new Date("11/06/2025"),
    secondDate = new Date(),
    timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());

  return (
    <div className="terminal">
      <div className="console">
        <pre style={{ color: "#c9c9c9" }}>
          <svg
            width="645"
            height="202"
            viewBox="0 0 645 202"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 19L25 43L2 66L25 83L2 108L42 166L66 83L91 166L130 108L106.5 83L130 66L106.5 43L130 19M213 83L240 166L265.5 83M213 157L240 184L265.5 157M519 90V166H514M519 90H498V166H503M519 90C519 90 529.428 83.0241 538 83.5C545.279 83.9042 547.28 86.1973 553.5 90L561.46 101V132.966V166M503 166V173H514V166M503 166H514M628 35C628 53.7452 628 83 628 83M628 83V166C628 166 605.998 166.444 597 157.5C589.026 149.574 586.967 132.774 586.5 124C585.956 113.782 588.63 100.254 597 93C605.37 85.7457 628 83 628 83ZM610.5 43C611.7 43 622.333 27 628 19L643.5 43M375.407 24V83M375.407 83V166C375.407 166 397.409 166.444 406.407 157.5C414.381 149.574 418.44 132.774 418.907 124C419.451 113.782 414.777 100.254 406.407 93C398.038 85.7457 375.407 83 375.407 83ZM285 126H333C338.523 126 343 121.523 343 116V102L332.5 88C330.611 85.4819 327.648 84 324.5 84H313.107C310.776 84 308.518 84.8144 306.724 86.3024L291.499 98.9275C289.875 100.275 288.716 102.098 288.244 104.155C287.085 109.208 285 119.234 285 126ZM285 126C285 134.53 288.59 145.972 290.628 151.78C291.472 154.185 293.286 156.1 295.595 157.178L312.49 165.062C313.814 165.68 315.257 166 316.718 166H341.5M610.5 26C611.7 26 622.333 10 628 2L643.5 26M213 173L240 200L265.5 173M140 166L167 83L191 166L179 150.5L166 135L140 166ZM429 166L456 87L480 166L468 150.5L455 135L429 166Z"
              stroke="#007D06"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </pre>
        <span>Welcome!</span>
        <br />
        <span>
          Waveband is a Hack Club YSWS running from June 11th to July 11th. If
          you're a teen, you can get a free RTL-SDR dongle by making a program
          that uses one. Type 'instructions' for more.
        </span>
        <br />
        <span>
          <span style={{ color: "skyblue" }}>Available Commands:</span>
        </span>
        <span>
          <span style={{ color: "#c9c9c9" }}>General: </span> about, neofetch,
          clear, instructions, idea
        </span>
        <span>
          <span style={{ color: "#c9c9c9" }}>Links:</span> github, source,
          submit, guide
        </span>
        <br></br>
        <span>Thank you for visiting! ◝(ᵔᵕᵔ)◜</span>
        <br></br>
        <ul className="previousCommands" id="console23">
          {prevusedCommand.map((item, index) => {
            if (item.match(new RegExp(`\\b${"github"}\\b`, "g"))) {
              return (
                <li key={index}>
                  {item}
                  <br></br>
                  <br></br>
                  <span style={{ color: "#c9c9c9" }}>
                    Opened GitHub https://github.com/CragglesG/waveband
                  </span>
                  <br></br>
                  <br></br>
                </li>
              );
            } else if (item.match(new RegExp(`\\b${"source"}\\b`, "g"))) {
              return (
                <li key={index}>
                  {item}
                  <br></br>
                  <br></br>
                  <span style={{ color: "#c9c9c9" }}>
                    Opened the source code of this site in a new tab:
                    https://github.com/CragglesG/waveband/tree/main/website
                  </span>
                  <br></br>
                  <br></br>
                </li>
              );
            } else if (item.match(new RegExp(`\\b${"guide"}\\b`, "g"))) {
              return (
                <li key={index}>
                  {item}
                  <br></br>
                  <br></br>
                  <span style={{ color: "#c9c9c9" }}>
                    Opened the guide in a new tab:
                    https://github.com/CragglesG/waveband/blob/main/README.md
                  </span>
                  <br></br>
                  <br></br>
                </li>
              );
            } else if (item.match(new RegExp(`\\b${"submit"}\\b`, "g"))) {
              return (
                <li key={index}>
                  {item}
                  <br></br>
                  <br></br>
                  <span style={{ color: "#c9c9c9" }}>
                    Opened submission form in a new tab:
                    https://forms.hackclub.com/waveform
                  </span>
                  <br></br>
                  <br></br>
                </li>
              );
            } else if (item.match(new RegExp(`\\b${"clear"}\\b`, "g"))) {
              return setprevusedCommand([]);
            } else if (item.match(new RegExp(`\\b${"about"}\\b`, "g"))) {
              return (
                <div>
                  <li key={index}>{item}</li>
                  <div className="about">
                    <br></br>
                    waveband is a hack club ysws created by hack clubbers. if
                    you're a teen, you can get a free rtl-sdr dongle by making a
                    program that uses one. type 'instructions' for more.{" "}
                    <br></br>
                    <br></br>
                  </div>
                </div>
              );
            } else if (item.match(new RegExp(`\\b${"instructions"}\\b`, "g"))) {
              return (
                <div>
                  <li key={index}>{item}</li>
                  <div className="instructions">
                    <br></br>
                    to qualify for a free dongle, you need to have made a
                    program that uses one in a unique way. you can use pre-built
                    software/tools such as dump1090, but a large portion of code
                    should be written by you. once you've made something, type
                    'submit' to apply for a free dongle. for info on rules and
                    what counts, type 'guide'. To see projects that others have
                    made, type 'gallery'. Good luck and have fun! <br></br>
                    <br></br>
                  </div>
                </div>
              );
            } else if (item.match(new RegExp(`\\b${"gallery"}\\b`, "g"))) {
              return (
                <div>
                  <li key={index}>{item}</li>
                  <div>
                    <br></br>
                    <h3>
                      <b>Project Gallery</b>
                    </h3>
                    <ul className="gallery">
                      <li style={artStyle}>
                        {`
|--------------------------|
|         Rust1090         |
|`}
                        <i>By @Tuinboon (TuinboonDev)</i>
                        {`|
|       `}
                        <a href="https://github.com/TuinboonDev/rust1090">
                          GitHub Repo
                        </a>
                        {`        |
|           `}
                        <a href="https://plane.thijmens.nl">Demo</a>
                        {`           |
|--------------------------|
|A Rust program that       |
|complements dump1090 by   |
|providing a web interface |
|and statistics tracking.  |
|--------------------------|`}
                      </li>
                      <li style={artStyle}>
                        {`
|---------------------|
|    RTL-SDR Radio    |
| `}
                        <i>By @njfdev (njfdev)</i>
                        {` |
|     `}
                        <a href="https://github.com/njfdev/rtlsdr-radio">
                          GitHub Repo
                        </a>
                        {`     |
|---------------------|
|A desktop app for    |
|listening to FM and  |
|AM radio and viewing |
|nearby aircraft.     |
|---------------------|`}
                      </li>
                      <li style={artStyle}>
                        {`
|---------------------|
|     SDR-Weather     |
|`}
                        <i>By @Craig (CragglesG)</i>
                        {`|
|     `}
                        <a href="https://github.com/CragglesG/waveband/tree/main/examples/sdr-weather">
                          GitHub Repo
                        </a>
                        {`     |
|---------------------|
|A Python program to  |
|find current weather |
|conditions using data|
|from nearby aircraft.|
|---------------------|`}
                      </li>
                    </ul>
                    <br></br>
                  </div>
                </div>
              );
            } else if (item.match(new RegExp(`\\b${"neofetch"}\\b`, "g"))) {
              return (
                <div>
                  <li key={index}>{item}</li>
                  <div className="neofetch">
                    <br></br>
                    <div style={{ display: "flex" }}>
                      <div style={artStyle}>{`
        _,met$$$$$gg.
      ,g$$$$$$$$$$$$$$$P.
    ,g$$P""       """Y$$.".
  ,$$P'              \`$$$.
',$$P       ,ggs.     \`$$b:
\`d$$'     ,$P"'   .    $$$
  $$P      d$'     ,    $$P
  $$:      $$.   -    ,d$$'
  $$;      Y$b._   _,d$P'
  Y$$.    \`.\`"Y$$$$P"'
  \`$$b      "-.__
  \`Y$$b
    \`Y$$.
      \`$$b.
        \`Y$$b.
          \`"Y$b._
              \`""""
             `}</div>
                      <div style={terminalStyle}>
                        <span style={{ color: "#33FF57" }}>
                          guest@wave.band
                        </span>
                        <br />
                        -------------------------
                        <br />
                        <span style={{ color: "#33FF57" }}>OS:</span> Debian
                        GNU/Linux 12 (bookworm) arm32
                        <br />
                        <span style={{ color: "#33FF57" }}>Host:</span> Waveband
                        <br />
                        <span style={{ color: "#33FF57" }}>Kernel:</span>{" "}
                        6.11.0-1004-wave_band
                        <br />
                        <span style={{ color: "#33FF57" }}>Uptime:</span>{" "}
                        {timeDifference}
                        <br />
                        <span style={{ color: "#33FF57" }}>
                          Resolution:
                        </span>{" "}
                        1920x1080
                        <br />
                        <span style={{ color: "#33FF57" }}>DE:</span> GNOME 47.0
                        (wayland)
                        <br />
                        <span style={{ color: "#33FF57" }}>WM:</span> Mutter
                        <br />
                        <span style={{ color: "#33FF57" }}>Theme:</span> Adwaita
                        [GTK2/3]
                        <br />
                        <span style={{ color: "#33FF57" }}>Terminal:</span>{" "}
                        gnome-terminal
                        <br />
                        <span style={{ color: "#33FF57" }}>CPU:</span> (2) @
                        1090MHz
                        <br />
                        <br />
                        {getFunFact()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else if (item.match(new RegExp(`\\b${"idea"}\\b`, "g"))) {
              return (
                <div>
                  <li key={index}>{item}</li>
                  <div className="idea-generator">
                    <br />
                    <IdeaGen />
                    <br />
                  </div>
                </div>
              );
            } else {
              return (
                <div>
                  <li key={index}>{item}</li>
                  bash: {item.replace("guest@wave.band:~$", "")}: command not
                  found
                </div>
              );
            }
          })}
        </ul>
        <span className="commands">
          <span className="userPrefix">guest@wave.band:~$</span>{" "}
          <input
            type="text"
            id="command"
            name="command"
            autoComplete="off"
            autoFocus
            autoCapitalize="off"
          ></input>
        </span>
      </div>
    </div>
  );
}
