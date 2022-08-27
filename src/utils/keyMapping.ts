const keysMap = new Map<string, string>([
  ["a", "C4"],
  ["w", "C#4"],
]);

export function getNoteByKey(key: string): string | undefined {
  return keysMap.get(key);
}
