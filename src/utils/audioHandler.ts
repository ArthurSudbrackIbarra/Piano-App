import Soundfont, { InstrumentName } from "soundfont-player";

let instrument: Soundfont.Player | null = null;
const GRAND_PIANO: InstrumentName = "acoustic_grand_piano";

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

export function playNote(note: string, duration?: number): boolean {
  if (instrument) {
    instrument.play(note, undefined, {
      duration: duration,
    });
    return true;
  }
  console.warn("The instrument is not ready yet.");
  return false;
}
