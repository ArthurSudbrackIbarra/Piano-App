import React from "react";
import { PianoInterpreter } from "../../utils/fileInterpreter";
import {
  clearRecordedNotesGlobal,
  getGlobalSongNotes,
  getLastPlayedLineGlobal,
  getLastSongSpeedGlobal,
  getRecordedNotesGlobal,
  isRecordingSongGlobal,
  isSongPausedGlobal,
  setRecordingSongGlobal,
  setSongPausedGlobal,
} from "../../utils/globals";
import styles from "./Controls.module.css";

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
const recordingRef = React.createRef<HTMLDivElement>();
export function updateRecordingButton() {
  if (recordingRef.current) {
    if (isRecordingSongGlobal()) {
      recordingRef.current.classList.add(styles.recording);
    } else {
      recordingRef.current.classList.remove(styles.recording);
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

function writeNotesToFile() {
  const notes = getRecordedNotesGlobal();
  const fileName = `recording-${new Date().toLocaleDateString()}.piano`;
  if (notes.length > 0) {
    const file = new File([notes.join("\n")], fileName, { type: "text/plain" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    clearRecordedNotesGlobal();
  }
}

function Controls() {
  let paused = false;
  let recording = false;
  return (
    <div className={styles.box}>
      <span className={styles.text}>Controls</span>
      <div className={styles.actions}>
        <div
          className={styles.playPause}
          ref={playPauseRef}
          onClick={async () => {
            setSongPausedGlobal(!paused);
            paused = !paused;
            updatePlayPauseButton();
            if (!paused) {
              await continueSong();
            }
          }}
        ></div>
        <div
          className={styles.record}
          ref={recordingRef}
          onClick={() => {
            setRecordingSongGlobal(!recording);
            recording = !recording;
            updateRecordingButton();
            if (!recording) {
              writeNotesToFile();
            }
          }}
        ></div>
      </div>
    </div>
  );
}

export default Controls;
