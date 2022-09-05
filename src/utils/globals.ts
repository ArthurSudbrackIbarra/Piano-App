/*
  Global variables.
*/
let globalInstrument = "acoustic_grand_piano";
let globalSongName = "";
let globalSongNotes = "";
let globalSampleName = "";

let isPaused = false;
let lastPlayedLine = 0;
let lastSongSpeed = 250;

let isRecording = false;
let recordedNotes: string[] = ["START", "(>> -1)"];
let lastRecordedNoteTime = 0;

export function getGlobalInstrument() {
  return globalInstrument;
}
export function setGlobalInstrument(instrument: string) {
  globalInstrument = instrument;
}

export function getGlobalSongName() {
  return globalSongName;
}
export function setGlobalSongName(songName: string) {
  globalSongName = songName;
}

export function getGlobalSongNotes() {
  return globalSongNotes;
}
export function setGlobalSongNotes(songNotes: string) {
  globalSongNotes = songNotes;
}

export function getGlobalSampleName() {
  return globalSampleName;
}
export function setGlobalSampleName(sampleName: string) {
  globalSampleName = sampleName;
}

export function isSongPausedGlobal() {
  return isPaused;
}
export function setSongPausedGlobal(value: boolean) {
  isPaused = value;
}

export function getLastPlayedLineGlobal() {
  return lastPlayedLine;
}
export function setLastPlayedLineGlobal(line: number) {
  lastPlayedLine = line;
}

export function getLastSongSpeedGlobal() {
  return lastSongSpeed;
}
export function setLastSongSpeedGlobal(speed: number) {
  lastSongSpeed = speed;
}

export function isRecordingSongGlobal() {
  return isRecording;
}
export function setRecordingSongGlobal(value: boolean) {
  isRecording = value;
}
export function addRecordedNoteGlobal(note: string, duration: number = 100) {
  const currentTime = performance.now();
  const timeDifference = currentTime - lastRecordedNoteTime;
  if (timeDifference > 50) {
    if (recordedNotes.length < 3) {
      recordedNotes.push(`(${note} ${duration})`);
    } else {
      recordedNotes.push(
        `(@ ${Math.round(timeDifference) - 10}) (${note} ${duration})`
      );
    }
  } else {
    recordedNotes[recordedNotes.length - 1] += ` (${note} ${duration})`;
  }
  lastRecordedNoteTime = currentTime;
}
export function getRecordedNotesGlobal() {
  return [...recordedNotes];
}
export function clearRecordedNotesGlobal() {
  recordedNotes = ["START", "(>> -1)"];
}
