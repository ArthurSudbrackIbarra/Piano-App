import React, { useEffect } from "react";
import styles from "./Piano.module.css"
import BlackKey from "../BlackKey/BlackKey";
import WhiteKey from "../WhiteKey/WhiteKey";
import { getNote } from "../../utils/keyMapping";
import { playNote } from "../../utils/audioHandler";

/* 
    Draggable Piano Logic - Start
*/
interface DragInfo {
    scrollLeft: number
    mouseX: number
}
const pianoRef = React.createRef<HTMLDivElement>();
const dragInfo: DragInfo = {
    scrollLeft: 0,
    mouseX: 0,
}
function mouseDownHandler(event: any) {
    if (pianoRef.current) {
        dragInfo.scrollLeft = pianoRef.current.scrollLeft
        pianoRef.current.style.cursor = "grabbing"
    }
    dragInfo.mouseX = event.clientX
    window.addEventListener("mousemove", mouseMoveHandler)
    window.addEventListener("mouseup", mouseUpHandler)
}
function mouseMoveHandler(event: any) {
    const distanceX = event.clientX - dragInfo.mouseX
    if (pianoRef.current) {
        pianoRef.current.scrollLeft = dragInfo.scrollLeft - distanceX
    }
}
function mouseUpHandler() {
    if (pianoRef.current) {
        pianoRef.current.style.cursor = "grab"
    }
    window.removeEventListener("mousemove", mouseMoveHandler)
    window.removeEventListener("mouseup", mouseUpHandler)
}
/* 
    Draggable Piano Logic - End
*/

/*
    Notes [C1, C#1, D1...]
*/
const intervals = [1, 2, 3, 4, 5, 6, 7]

/*
    Play Notes on Key Presses Logic - Start
*/
const keyDownMap = new Map<string, boolean>();
function keyDownHandler(event: globalThis.KeyboardEvent) {
    const note = getNote(event.key)
    if (note) {
        if (!keyDownMap.get(event.key)) {
            keyDownMap.set(event.key, true)
            playNote(note); // Change this later...
        }
    }
}
function keyUpHandler(event: globalThis.KeyboardEvent) {
    keyDownMap.set(event.key, false)
}
function setupKeyMapping() {
    window.removeEventListener("keydown", keyDownHandler);
    window.addEventListener("keydown", keyDownHandler);
    window.removeEventListener("keyup", keyUpHandler);
    window.addEventListener("keyup", keyUpHandler);
}
/*
    Play Notes on Key Presses Logic - End
*/

function Piano() {
    useEffect(() => {
        setupKeyMapping();
    }, []);
    return (
        <div className={styles.piano} ref={pianoRef} onMouseDown={mouseDownHandler}>
            {intervals.map((interval, index) => {
                return (
                    <React.Fragment key={index}>
                        <WhiteKey note={`C${interval}`}>
                            <BlackKey note={`C#${interval}`} />
                        </WhiteKey >
                        <WhiteKey note={`D${interval}`}>
                            <BlackKey note={`D#${interval}`} />
                        </WhiteKey>
                        <WhiteKey note={`E${interval}`} />
                        <WhiteKey note={`F${interval}`}>
                            <BlackKey note={`F#${interval}`} />
                        </WhiteKey>
                        <WhiteKey note={`G${interval}`}>
                            <BlackKey note={`G#${interval}`} />
                        </WhiteKey>
                        <WhiteKey note={`A${interval}`}>
                            <BlackKey note={`A#${interval}`} />
                        </WhiteKey>
                        <WhiteKey note={`B${interval}`} />
                    </React.Fragment>
                )
            })}
            <WhiteKey note="C8" />
        </div >
    );
}

export default Piano;
