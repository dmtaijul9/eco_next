export function removeLeadingDigits(input) {
  const prefix = "8800";

  if (input.startsWith(prefix)) {
    return `880${input.slice(prefix.length)}`;
  }

  return input;
}
