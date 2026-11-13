/**
 * Smallest edit turning `previousText` into `nextText`: the span between
 * their common prefix and suffix. Keeps the cursor and undo steps local.
 */
export const getMinimalReplacement = (
  previousText: string,
  nextText: string
): { start: number; end: number; text: string } => {
  const maxPrefixLength = Math.min(previousText.length, nextText.length);
  let prefixLength = 0;

  while (
    prefixLength < maxPrefixLength &&
    previousText[prefixLength] === nextText[prefixLength]
  ) {
    prefixLength++;
  }

  const maxSuffixLength = maxPrefixLength - prefixLength;
  let suffixLength = 0;

  while (
    suffixLength < maxSuffixLength &&
    previousText[previousText.length - 1 - suffixLength] ===
      nextText[nextText.length - 1 - suffixLength]
  ) {
    suffixLength++;
  }

  return {
    start: prefixLength,
    end: previousText.length - suffixLength,
    text: nextText.slice(prefixLength, nextText.length - suffixLength),
  };
};
