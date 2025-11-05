// Character shingle Jaccard similarity (language agnostic)
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
