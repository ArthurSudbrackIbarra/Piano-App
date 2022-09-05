/*
  Global variables.
*/
let globalInstrument = "acoustic_grand_piano";
let globalSongName = "";
let globalSongNotes = "";
let globalSampleName = "";

let isSustainOn = false;

let isPaused = false;
let lastPlayedLine = 0;
let lastSongSpeed = 250;

let isRecording = false;
let recordedNotes: string[] = [];
let lastRecordedNoteTime = 0;
const MILLISECONDS_ERROR_MARGIN = 7;
const SIMULTANEOUS_NOTES_MAX_TIME_DIFFERENCE = 10;

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

export function isSustainOnGlobal() {
  return isSustainOn;
}
export function toggleSustainGlobal() {
  isSustainOn = !isSustainOn;
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
export function addRecordedNoteGlobal(note: string, duration?: number) {
  const currentTime = performance.now();
  const timeDifference =
    currentTime - lastRecordedNoteTime - MILLISECONDS_ERROR_MARGIN;
  if (!duration) {
    duration = isSustainOn ? 100 : 1;
  }
  if (timeDifference > SIMULTANEOUS_NOTES_MAX_TIME_DIFFERENCE) {
    if (recordedNotes.length === 0) {
      recordedNotes.push("START", "(>> -1)", `(${note} ${duration})`);
    } else {
      recordedNotes.push(
        `(@ ${Math.round(timeDifference)}) (${note} ${duration})`
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
  recordedNotes = [];
}
