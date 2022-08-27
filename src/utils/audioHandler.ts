import Soundfont, { InstrumentName } from "soundfont-player";

let instrument: Soundfont.Player | null = null;
const GRAND_PIANO: InstrumentName = "electric_piano_1";

async function createGlobalInstrument(
  instrumentName: InstrumentName
): Promise<Soundfont.Player> {
  instrument = await Soundfont.instrument(new AudioContext(), instrumentName);
  return instrument;
}

/*
  Calling the 'createGlobalInstrument' function before-hand for faster loading.
*/
createGlobalInstrument(GRAND_PIANO);

export function playNote(note: string): boolean {
  if (instrument) {
    instrument.play(note);
    return true;
  }
  console.warn("The instrument is not ready yet.");
  return false;
}
