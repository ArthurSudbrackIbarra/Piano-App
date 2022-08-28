let globalInstrument = "acoustic_grand_piano";
let globalFileName = "";
let globalFileContent = "";

export function getGlobalInstrument() {
  return globalInstrument;
}
export function setGlobalInstrument(instrument: string) {
  globalInstrument = instrument;
}

export function getGlobalFileName() {
  return globalFileName;
}
export function setGlobalFileName(fileName: string) {
  globalFileName = fileName;
}

export function getGlobalFileContent() {
  return globalFileContent;
}
export function setGlobalFileContent(fileContent: string) {
  globalFileContent = fileContent;
}
