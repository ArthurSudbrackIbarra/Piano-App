import React from "react";
import styles from "./Piano.module.css"
import BlackKey from "../BlackKey/BlackKey";
import WhiteKey from "../WhiteKey/WhiteKey";

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
    dragInfo.scrollLeft = event.target.scrollLeft
    dragInfo.mouseX = event.clientX
    window.addEventListener("mousemove", mouseMoveHandler)
    window.addEventListener("mouseup", mouseUpHandler)
    if (pianoRef.current) {
        pianoRef.current.style.cursor = "grabbing"
    }
}
function mouseMoveHandler(event: any) {
    const distanceX = event.clientX - dragInfo.mouseX
    if (pianoRef.current) {
        pianoRef.current.scrollLeft = dragInfo.scrollLeft - distanceX
    }
}
function mouseUpHandler() {
    window.removeEventListener("mousemove", mouseMoveHandler)
    window.removeEventListener("mouseup", mouseUpHandler)
    if (pianoRef.current) {
        pianoRef.current.style.cursor = "grab"
    }
}
/* 
    Draggable Piano Logic - End
*/

const intervals = [0, 1, 2, 3, 4, 5, 6, 7, 8]

function Piano() {
    return (
        <div className={styles.piano} ref={pianoRef} onMouseDown={mouseDownHandler}>
            {intervals.map(interval => {
                return (
                    <>
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
                    </>
                )
            })}
        </div >
    );
}

export default Piano;
