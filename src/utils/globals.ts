let globalInstrument = "acoustic_grand_piano";
let globalSongName = "";
let globalSongNotes = "";
let globalSampleName = "";

export function getGlobalInstrument() {
  return globalInstrument;
}
export function setGlobalInstrument(instrument: string) {
  globalInstrument = instrument;
}

export function getGlobalSongName() {
  return globalSongName;
}
export function setGlobalSongName(fileName: string) {
  globalSongName = fileName;
}

export function getGlobalSongNotes() {
  return globalSongNotes;
}
export function setGlobalSongNotes(fileContent: string) {
  globalSongNotes = fileContent;
}

export function getGlobalSampleName() {
  return globalSampleName;
}
export function setGlobalSampleName(sampleName: string) {
  globalSampleName = sampleName;
}
