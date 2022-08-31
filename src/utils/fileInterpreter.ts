import { playNote } from "./audioHandler";

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export class PianoInterpreter {
  private content: string;
  private bpm: number;

  constructor(content: string, bpm: number = 120) {
    this.content = content.replace(/\n/g, "\r\n");;
    if (bpm > 0) {
      this.bpm = bpm;
    } else {
      this.bpm = 120;
    }
  }

  public async play(): Promise<void> {
    console.log(this.content)
    try {
      const lines = this.content.split("\n");
      let hasStarted = false;
      for (const line of lines) {
        if (line.length === 0) {
          continue;
        }
        const splitted = line
          .replace(/\s+/g, " ")
          .trim()
          .split(/\(*\)( |\n)/);
        if (splitted[0].toUpperCase() === "START") {
          hasStarted = true;
        } else {
          if (hasStarted) {
            for (const item of splitted) {
              if (item === " " || item.length === 0) {
                continue;
              }
              const parts = item
                .replace("(", "")
                .replace(")", "")
                .toUpperCase()
                .split(" ");

              console.log(parts);
              
              if (parts[0] === "BPM") {
                if (parts[1]) {
                  this.bpm = parseInt(parts[1]);
                  console.log("Entrou no BPM, BPM atual agora é: " + this.bpm);  
                }
              } else if (parts[0] === "PAUSE") {
                if (parts[1]) {
                  await delay(parseInt(parts[1]));
                }
              } else {
                const note = parts[0];
                let duration = 1;
                if (parts[1]) {
                  duration = parseInt(parts[1]);
                }
                // Plays the note sound.
                playNote(note, duration);
                // Animates the keys.
                document.getElementById(note)?.classList.add("active");
                // Timeout to remove the animation.
                setTimeout(() => {
                  document.getElementById(note)?.classList.remove("active");
                }, 20000 / this.bpm);
              }
            }
          }
        }
        if (hasStarted) {
          console.log(60000 / this.bpm);
          await delay(60000 / this.bpm);
          console.log("Entrou na espera.");
        }
      }
    } catch (error) {
      throw new Error("Error: Invalid '.piano' file.");
    }
  }
}
