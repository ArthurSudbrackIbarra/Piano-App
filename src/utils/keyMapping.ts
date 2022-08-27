const keysMap = new Map<string, string>([
  ["a", "C4"],
  ["w", "C#4"],
]);

export function getNote(note: string): string | undefined {
  return keysMap.get(note);
}
