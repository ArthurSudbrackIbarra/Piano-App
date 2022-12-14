const keysMap = new Map<string, string>([
  ["q", "C2"],
  ["2", "C#2"],
  ["w", "D2"],
  ["3", "D#2"],
  ["e", "E2"],
  ["r", "F2"],
  ["5", "F#2"],
  ["t", "G2"],
  ["6", "G#2"],
  ["y", "A2"],
  ["7", "A#2"],
  ["u", "B2"],
  ["i", "C3"],
  ["9", "C#3"],
  ["o", "D3"],
  ["0", "D#3"],
  ["p", "E3"],
  ["z", "F3"],
  ["s", "F#3"],
  ["x", "G3"],
  ["d", "G#3"],
  ["c", "A3"],
  ["f", "A#3"],
  ["v", "B3"],
  ["b", "C4"],
  ["h", "C#4"],
  ["n", "D4"],
  ["j", "D#4"],
  ["m", "E4"],
  [",", "F4"],
  ["l", "F#4"],
  [".", "G4"],
  [";", "G#4"],
  ["/", "A4"],
  ["]", "A#4"],
]);

const invertedKeysMap = new Map(Array.from(keysMap).map(([k, v]) => [v, k]));

export function getNoteByKey(key: string): string | undefined {
  return keysMap.get(key);
}

export function getKeyByNote(note: string): string | undefined {
  return invertedKeysMap.get(note)?.toUpperCase();
}
