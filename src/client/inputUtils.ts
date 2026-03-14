export function cleanInput(input: string): string[] {
  return input
    .trim()
    .split(" ")
    .filter((part) => part.length > 0);
}
