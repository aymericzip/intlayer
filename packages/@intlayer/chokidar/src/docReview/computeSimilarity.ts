/**
 * Generate the set of character shingles (substrings of a fixed length) for a
 * piece of text. Whitespace is collapsed so the result is language agnostic.
 *
 * @param text - The text to shingle.
 * @param shingleLength - The length of each shingle.
 * @returns The set of unique shingles found in the text.
 */
export const generateCharacterShingles = (
  text: string,
  shingleLength: number
): Set<string> => {
  const normalized = text.replace(/\s+/g, ' ').trim();
  const set = new Set<string>();
  if (normalized.length < shingleLength) {
    if (normalized.length > 0) {
      set.add(normalized);
    }
    return set;
  }
  for (let index = 0; index <= normalized.length - shingleLength; index += 1) {
    set.add(normalized.slice(index, index + shingleLength));
  }
  return set;
};

/**
 * Compute the Jaccard similarity between two strings using character shingles.
 *
 * @param a - First string.
 * @param b - Second string.
 * @param shingleLength - The shingle length (defaults to 3).
 * @returns A score between 0 (disjoint) and 1 (identical).
 */
export const computeJaccardSimilarity = (
  a: string,
  b: string,
  shingleLength: number = 3
): number => {
  const setA = generateCharacterShingles(a, shingleLength);
  const setB = generateCharacterShingles(b, shingleLength);
  if (setA.size === 0 && setB.size === 0) return 1;
  const intersectionSize = Array.from(setA).filter((token) =>
    setB.has(token)
  ).length;
  const unionSize = new Set([...Array.from(setA), ...Array.from(setB)]).size;
  return unionSize === 0 ? 0 : intersectionSize / unionSize;
};
