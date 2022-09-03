import { playNote } from "./audioHandler";
import {
  isSongPausedGlobal,
  setLastPlayedLineGlobal,
  setLastSongSpeedGlobal,
} from "./globals";

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

  constructor(content: string, speed: number = 250) {
    this.content = content.replace(/\n/g, "\r\n");
    this.speed = speed;
  }

  public async play(
    startLine: number = 0,
    hasSongStarted: boolean = false
  ): Promise<void> {
    try {
      const lines = this.content.split("\n");
      for (let i = startLine; i < lines.length; i++) {
        const line = lines[i];
        if (line.length === 0) {
          continue;
        }
        if (isSongPausedGlobal()) {
          setLastPlayedLineGlobal(i);
          return;
        }
        const splitted = line
          .replace(/\s+/g, " ")
          .trim()
          .split(/\(*\)( |\n)/);
        if (splitted[0].toUpperCase() === Commands.START) {
          hasSongStarted = true;
        } else {
          if (hasSongStarted) {
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
                  setLastSongSpeedGlobal(this.speed);
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
                const timeoutTime = this.speed > 0 ? 20000 / this.speed : 50;
                setTimeout(() => {
                  document.getElementById(note)?.classList.remove("active");
                }, timeoutTime);
              }
            }
          }
        }
        if (hasSongStarted) {
          const delayTime = this.speed > 0 ? 60000 / this.speed : 0;
          await delay(delayTime);
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error: Invalid '.piano' file.");
    }
  }
}
