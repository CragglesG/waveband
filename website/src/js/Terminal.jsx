import { useState, useEffect } from "react";
import "../css/terminal.css";

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
              "_blank"
            );
          } else if (CommandArea.value === "guide") {
            window.open(
              "https://docs.google.com/document/d/11AMFcU8Zo07w1dffhjWyhSuk_MtKOdyNGZ2WN_FvTH8/",
              "_blank"
            );
          } else if (CommandArea.value === "rsvp") {
            window.open(
              "https://airtable.com/appgaxO7wo2xGGIir/pag6C6wGzrVLAUJdL/form",
              "_blank"
            );
          }
          // else if (CommandArea.value === "submit") {
          //   window.open("smth here", '_blank');
          // }
          CommandArea.value = "";
        }
      }
    });
  }, []);

  return (
    <div className="terminal">
      <div className="console">
        <pre style={{ color: "#c9c9c9" }}>
          {String.raw`
 __      __                   ___.                      .___
/  \    /  \_____ ___  __ ____\_ |__ _____    ____    __| _/
\   \/\/   /\__  \\  \/ // __ \| __ \\__  \  /    \  / __ |
 \        /  / __ \\   /\  ___/| \_\ \/ __ \|   |  \/ /_/ |
  \__/\  /  (____  /\_/  \___  >___  (____  /___|  /\____ |
       \/        \/          \/    \/     \/     \/      \/
`}
        </pre>
        <span>Welcome!</span>
        <h2 style={{ color: "darkorange" }}>RSVP now by running "rsvp"!</h2>
        <br />
        <span>
          <span style={{ color: "skyblue" }}>Available Commands:</span>
        </span>
        <span>
          <span style={{ color: "#c9c9c9" }}>General: </span> about, neofetch,
          clear, instructions
        </span>
        <span>
          <span style={{ color: "#c9c9c9" }}>Links:</span> rsvp, github, source,
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
                    https://docs.google.com/document/d/11AMFcU8Zo07w1dffhjWyhSuk_MtKOdyNGZ2WN_FvTH8/
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
                    hmmm. it looks like there's nothing here yet. you could
                    possibly change that by "rsvp"ing
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
                    waveband is a potential hack club ysws created by hack
                    clubbers. if you're a teen, you can get a free
                    rtl2832/rt820t2-based dongle by making a desktop app that
                    uses an rtl-sdr dongle. type 'instructions' for more.{" "}
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
                    desktop app that uses an rtl-sdr dongle in a unique way. you
                    can use pre-built software/tools such as dump1090, but a
                    large portion of code should be written by you. once you've
                    made an app, type 'submit' to apply for a free dongle. for
                    info on rules and what counts, type 'guide'. Good luck and
                    have fun! <br></br>
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
                        21,373,712 mins
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
                        <span style={{ color: "#FFFF00" }}>Fun fact!</span> Most
                        climbing mishaps happen from exhaustion.
                        <br />
                        Remember to take regular breaks!
                        <br />
                        <br />
                      </div>
                    </div>
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
          ></input>
        </span>
      </div>
    </div>
  );
}
