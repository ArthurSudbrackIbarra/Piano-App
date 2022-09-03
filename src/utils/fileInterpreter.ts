import { playNote } from "./audioHandler";

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

enum Commands {
  WAIT = "@",
  SPEED = ">>",
  START = "START",
}

export class PianoInterpreter {
  private content: string;
  private speed: number;

  constructor(content: string, speed: number = 120) {
    this.content = content.replace(/\n/g, "\r\n");
    if (speed > 0) {
      this.speed = speed;
    } else {
      this.speed = 120;
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
        if (splitted[0].toUpperCase() === Commands.START) {
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
              if (parts[0] === Commands.SPEED) {
                if (parts[1]) {
                  this.speed = parseInt(parts[1]);
                }
              } else if (parts[0] === Commands.WAIT) {
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
                }, 20000 / this.speed);
              }
            }
          }
        }
        if (hasStarted) {
          await delay(60000 / this.speed);
        }
      }
    } catch (error) {
      throw new Error("Error: Invalid '.piano' file.");
    }
  }
}
