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
          {/* {String.raw`
 __      __                   ___.                      .___
/  \    /  \_____ ___  __ ____\_ |__ _____    ____    __| _/
\   \/\/   /\__  \\  \/ // __ \| __ \\__  \  /    \  / __ |
 \        /  / __ \\   /\  ___/| \_\ \/ __ \|   |  \/ /_/ |
  \__/\  /  (____  /\_/  \___  >___  (____  /___|  /\____ |
       \/        \/          \/    \/     \/     \/      \/
`} */}
          <svg width="645" height="211" viewBox="0 0 645 211" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 15L25 39L2 62L25 79L2 104L42 162L66 79L91 162L130 104L106.5 79L130 62L106.5 39L130 15M213 79L240 162L265.5 79M213 153L240 180L265.5 153M213 189L240 209L265.5 189M519 86V162H514M519 86H498V162H503M519 86C519 86 529.428 79.0241 538 79.5C545.279 79.9042 547.28 82.1973 553.5 86L561.46 97V128.966V162M503 162V169H514V162M503 162H514M628 31V79M628 79V162C628 162 605.998 162.444 597 153.5C589.026 145.574 586.967 128.774 586.5 120C585.956 109.782 588.63 96.2543 597 89C605.37 81.7457 628 79 628 79ZM609.5 39C610.7 39 622.333 23 628 15L643.5 39M609.5 20L628 2L643.5 20M375.407 20V79M375.407 79V162C375.407 162 397.409 162.444 406.407 153.5C414.381 145.574 418.44 128.774 418.907 120C419.451 109.782 414.777 96.2543 406.407 89C398.038 81.7457 375.407 79 375.407 79ZM285 122H333C338.523 122 343 117.523 343 112V98L332.5 84C330.611 81.4819 327.648 80 324.5 80H313.107C310.776 80 308.518 80.8144 306.724 82.3024L291.499 94.9275C289.875 96.2745 288.716 98.0979 288.244 100.155C287.085 105.208 285 115.234 285 122ZM285 122C285 130.53 288.59 141.972 290.628 147.78C291.472 150.185 293.286 152.1 295.595 153.178L312.49 161.062C313.814 161.68 315.257 162 316.718 162H341.5M151 162L172 79L189 162L172 131L151 162ZM436 162L457 79L474 162L457 131L436 162Z" stroke="#007D06" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </pre>
        <span>Welcome!</span>
        <h2 style={{ color: "darkorange" }}>RSVP now by running "rsvp"!</h2>
        <br />
        <span>
          <span style={{ color: "skyblue" }}>Available Commands:</span>
        </span>
        <span>
          <span style={{ color: "#c9c9c9" }}>General: </span> about, neofetch,
          clear, instructions, gallery
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
            } else if (item.match(new RegExp(`\\b${"rsvp"}\\b`, "g"))) {
              return (
                <li key={index}>
                  {item}
                  <br></br>
                  <br></br>
                  <span style={{ color: "#c9c9c9" }}>
                    Opened the RSVP form in a new tab:
                    https://airtable.com/appgaxO7wo2xGGIir/pag6C6wGzrVLAUJdL/form
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
                    hmmm. it looks like there's nothing here yet. maybe you could
                    help change that by rsvping.
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
                    waveband is a future hack club ysws created by hack
                    clubbers. if you're a teen, you can get a free
                    rtl-sdr dongle by making a program that
                    uses one. type 'instructions' for more.{" "}
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
                    to qualify for a free dongle, you need to have made a program
                    that uses one in a unique way. you can use pre-built
                    software/tools such as dump1090, but a large portion of code
                    should be written by you. once you've made something,
                    type 'submit' to apply for a free dongle. for info on rules
                    and what counts, type 'guide'. Good luck and have fun! <br></br>
                    <br></br>
                  </div>
                </div>
              );
            } else if (item.match(new RegExp(`\\b${"gallery"}\\b`, "g"))) {
              return (<div>
                <li key={index}>{item}</li>
                <div className="gallery">
                  <br></br>
                  <h3><b>Project Gallery (WIP)</b></h3>
                  <ul className="gallery">
                    <li style={artStyle}>{`
|---------------------|
|                     |
|                     |
|                     |
|                     |
|---------------------|
|Project Name Here    |
|Project Link Here    |
|---------------------|
|Short but also long  |
|description of this  |
|project.             |
|---------------------|`}
                    </li>
                  </ul>
                  <br></br>
                </div>
              </div>)
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
            autoCapitalize="off"
          ></input>
        </span>
      </div>
    </div>
  );
}
