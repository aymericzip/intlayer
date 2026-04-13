export const generateKey = (
  text: string,
  existingKeys: Set<string>
): string => {
  const maxWords = 5;
  const maxWordLength = 20;
  const maxKeyLength = 40;

  let key = text
    .normalize('NFD') // Normalize to decomposes combined characters (e.g., é -> e + ´)
    .replace(/[\u0300-\u036f]/g, '') // Remove the accent characters
    .replace(/[\s_-]+/g, ' ')
    .replace(/[^\p{L}\p{N} ]/gu, '')
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, maxWords)
    .map((word) =>
      word.length > maxWordLength ? word.substring(0, maxWordLength) : word
    )
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');

  if (key.length > maxKeyLength) {
    key = key.substring(0, maxKeyLength);
  }

  if (!key) key = 'content';

  // If the key starts with a number, prepend 'x' to make it a valid JS identifier
  if (/^[0-9]/.test(key)) {
    key = `x${key}`;
  }

  if (existingKeys.has(key)) {
    let i = 1;
    while (existingKeys.has(`${key}${i}`)) i++;
    key = `${key}${i}`;
  }
  return key;
};
