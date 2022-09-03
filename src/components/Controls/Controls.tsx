import React from 'react';
import { PianoInterpreter } from '../../utils/fileInterpreter';
import { getGlobalSongNotes, getLastPlayedLineGlobal, getLastSongSpeedGlobal, isSongPausedGlobal, setRecordingSongGlobal, setSongPausedGlobal } from '../../utils/globals';
import styles from './Controls.module.css';

const playPauseRef = React.createRef<HTMLDivElement>();
export function updatePlayPauseButton() {
    if (playPauseRef.current) {
        if (isSongPausedGlobal()) {
            playPauseRef.current.classList.remove(styles.playing);
            playPauseRef.current.classList.add(styles.paused);
        } else {
            playPauseRef.current.classList.remove(styles.paused);
            playPauseRef.current.classList.add(styles.playing);
        }
    }
}

async function continueSong() {
    const songNotes = getGlobalSongNotes();
    const lastPlayedLine = getLastPlayedLineGlobal();
    const lastSongSpeed = getLastSongSpeedGlobal();
    if (songNotes.length > 0 && lastPlayedLine < songNotes.length) {
        const interpreter = new PianoInterpreter(songNotes, lastSongSpeed);
        await interpreter.play(lastPlayedLine, true);
    }
}

function Controls() {
    let paused = false;
    let recording = false;
    return (
        <div className={styles.box}>
            <span className={styles.text}>Controls</span>
            <div className={styles.actions}>
                <div className={styles.playPause} ref={playPauseRef} onClick={async () => {
                    setSongPausedGlobal(!paused);
                    paused = !paused;
                    updatePlayPauseButton();
                    if (!paused) {
                        await continueSong();
                    }
                }}></div>
                <div className={styles.record} onClick={() => {
                    setRecordingSongGlobal(!recording);
                    recording = !recording;
                }}></div>
            </div>
        </div>
    );
}

export default Controls;
