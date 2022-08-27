import BlackKey from "../BlackKey/BlackKey";
import WhiteKey from "../WhiteKey/WhiteKey";

const intervals: number[] = [0, 1, 2]

function Piano() {
    return (
        <div className="piano" >
            {intervals.map(interval => {
                return (
                    <>
                        <WhiteKey noteName={`C${interval}`}>
                            <BlackKey noteName={`C#${interval}`} />
                        </WhiteKey >
                        <WhiteKey noteName={`D${interval}`}>
                            <BlackKey noteName={`D#${interval}`} />
                        </WhiteKey>
                        <WhiteKey noteName={`E${interval}`} />
                        <WhiteKey noteName={`F${interval}`}>
                            <BlackKey noteName={`F#${interval}`} />
                        </WhiteKey>
                        <WhiteKey noteName={`G${interval}`}>
                            <BlackKey noteName={`G#${interval}`} />
                        </WhiteKey>
                        <WhiteKey noteName={`A${interval}`}>
                            <BlackKey noteName={`A#${interval}`} />
                        </WhiteKey>
                        <WhiteKey noteName={`B${interval}`} />
                    </>
                )
            })}
        </div >
    );
}

export default Piano;