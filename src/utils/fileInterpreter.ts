import { playNote } from "./audioHandler";

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export class PianoInterpreter {
  private content: string;
  private bpm: number;

  constructor(content: string, bpm: number = 120) {
    this.content = content;
    if (bpm > 0) {
      this.bpm = bpm;
    } else {
      this.bpm = 120;
    }
  }

  public async play(): Promise<void> {
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
        switch (true) {
          case splitted[0].toUpperCase().startsWith("START"):
            hasStarted = true;
            break;
          case splitted[0].toUpperCase().startsWith("BPM") && hasStarted:
            {
              const parts = splitted[0].split(" ");
              const bpm = parseInt(parts[1]);
              this.bpm = bpm;
            }
            break;
          case splitted[0].toUpperCase().startsWith("PAUSE") && hasStarted:
            {
              const parts = splitted[0].split(" ");
              const seconds = parseInt(parts[1]) * 1000;
              await delay(seconds);
            }
            break;
          default: {
            if (hasStarted) {
              for (const noteData of splitted) {
                if (noteData === " " || noteData.length === 0) {
                  continue;
                }
                const parts = noteData
                  .replace("(", "")
                  .replace(")", "")
                  .toUpperCase()
                  .split(" ");
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
          await delay(60000 / this.bpm);
        }
      }
    } catch (error) {
      throw new Error("Error: Invalid '.piano' file.");
    }
  }
}
