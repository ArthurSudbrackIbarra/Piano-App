import React, { useEffect } from "react";
import BlackKey from "../BlackKey/BlackKey";
import WhiteKey from "../WhiteKey/WhiteKey";
import styles from "./Piano.module.css";
import { getKeyByNote, getNoteByKey } from "../../utils/keyMapping";
import { playNote } from "../../utils/audioHandler";

/* 
    Draggable Piano Logic - Start
*/
interface DragInfo {
  scrollLeft: number;
  mouseX: number;
}
const pianoRef = React.createRef<HTMLDivElement>();
const dragInfo: DragInfo = {
  scrollLeft: 0,
  mouseX: 0,
};
function mouseDownHandler(event: any) {
  if (event.shiftKey) {
    if (pianoRef.current) {
      dragInfo.scrollLeft = pianoRef.current.scrollLeft;
      pianoRef.current.style.cursor = "grabbing";
    }
    dragInfo.mouseX = event.clientX;
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);
  }
}
function mouseMoveHandler(event: any) {
  if (event.shiftKey) {
    const distanceX = event.clientX - dragInfo.mouseX;
    if (pianoRef.current) {
      pianoRef.current.scrollLeft = dragInfo.scrollLeft - distanceX;
    }
  }
}
function mouseUpHandler() {
  if (pianoRef.current) {
    pianoRef.current.style.cursor = "grab";
  }
  window.removeEventListener("mousemove", mouseMoveHandler);
  window.removeEventListener("mouseup", mouseUpHandler);
}
/* 
    Draggable Piano Logic - End
*/

/*
    Play Notes on Key Presses Logic - Start
*/
const keyDownMap = new Map<string, boolean>();
const noteElements = new Map<string, HTMLElement>();
const simulateKeyDown = (event: KeyboardEvent) => {
  const note = getNoteByKey(event.key);
  if (note) {
    if (!keyDownMap.get(note)) {
      keyDownMap.set(note, true);
      let noteElement = noteElements.get(note);
      if (!noteElement) {
        noteElement = document.getElementById(note) || undefined;
        if (noteElement) {
          noteElements.set(note, noteElement);
        }
      }
      noteElement?.classList.add("active");
      playNote(note);
    }
  }
};
const simulateKeyUp = (event: KeyboardEvent) => {
  const note = getNoteByKey(event.key);
  if (note) {
    keyDownMap.set(note, false);
    let noteElement = noteElements.get(note);
    if (!noteElement) {
      noteElement = document.getElementById(note) || undefined;
      if (noteElement) {
        noteElements.set(note, noteElement);
      }
    }
    noteElement?.classList.remove("active");
  }
};
window.addEventListener("keydown", simulateKeyDown);
window.addEventListener("keyup", simulateKeyUp);
/*
    Play Notes on Key Presses Logic - End
*/

function Piano() {
  useEffect(() => {
    if (pianoRef.current) {
      if (!pianoRef.current.scrollLeft) {
        pianoRef.current.scrollLeft += 456;
      }
    }
  });
  return (
    <div className={styles.piano} ref={pianoRef} onMouseDown={mouseDownHandler}>
      {[1, 2, 3, 4, 5, 6, 7].map((interval, index) => {
        return (
          <React.Fragment key={index}>
            <WhiteKey note={`C${interval}`} mappedKey={getKeyByNote(`C${interval}`)}>
              <BlackKey note={`C#${interval}`} mappedKey={getKeyByNote(`C#${interval}`)} />
            </WhiteKey>
            <WhiteKey note={`D${interval}`} mappedKey={getKeyByNote(`D${interval}`)}>
              <BlackKey note={`D#${interval}`} mappedKey={getKeyByNote(`D#${interval}`)} />
            </WhiteKey>
            <WhiteKey note={`E${interval}`} mappedKey={getKeyByNote(`E${interval}`)} />
            <WhiteKey note={`F${interval}`} mappedKey={getKeyByNote(`F${interval}`)}>
              <BlackKey note={`F#${interval}`} mappedKey={getKeyByNote(`F#${interval}`)} />
            </WhiteKey>
            <WhiteKey note={`G${interval}`} mappedKey={getKeyByNote(`G${interval}`)}>
              <BlackKey note={`G#${interval}`} mappedKey={getKeyByNote(`G#${interval}`)} />
            </WhiteKey>
            <WhiteKey note={`A${interval}`} mappedKey={getKeyByNote(`A${interval}`)}>
              <BlackKey note={`A#${interval}`} mappedKey={getKeyByNote(`A#${interval}`)} />
            </WhiteKey>
            <WhiteKey note={`B${interval}`} mappedKey={getKeyByNote(`B${interval}`)} />
          </React.Fragment>
        );
      })}
      <WhiteKey note="C8" />
    </div>
  );
}

export default Piano;
