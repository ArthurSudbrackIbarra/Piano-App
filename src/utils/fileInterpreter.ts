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

  public async interpret(): Promise<boolean> {
    try {
      const lines = this.content.split("\n");
      for (const line of lines) {
        if (line.length === 0) {
          continue;
        }
        const splitted = line.split(/\(*\)( |\n)/);
        switch (true) {
          case splitted[0].toUpperCase().startsWith("BPM"):
            {
              const parts = splitted[0].split(" ");
              const bpm = parseInt(parts[1]);
              this.bpm = bpm;
            }
            break;
          case splitted[0].toUpperCase().startsWith("PAUSE"):
            {
              const parts = splitted[0].split(" ");
              const seconds = parseInt(parts[1]) * 1000;
              await delay(seconds);
            }
            break;
          default: {
            for (const noteData of splitted) {
              if (noteData === " ") {
                continue;
              }
              const parts = noteData
                .replace("(", "")
                .replace(")", "")
                .split(" ");
              const note = parts[0];
              const duration = parseInt(parts[1]);
              // Plays the note sound.
              playNote(note, duration);
              // Animates the keys.
              document.getElementById(note)?.classList.add("active");
              // Timeout to remove the animation.
              setTimeout(() => {
                document.getElementById(note)?.classList.remove("active");
              }, 300);
            }
          }
        }
        await delay(60000 / this.bpm);
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
