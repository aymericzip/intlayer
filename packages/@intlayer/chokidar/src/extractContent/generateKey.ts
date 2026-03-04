export const generateKey = (
  text: string,
  existingKeys: Set<string>
): string => {
  const maxWords = 5;
  let key = text
    .normalize('NFD') // Normalize to decomposes combined characters (e.g., é -> e + ´)
    .replace(/[\u0300-\u036f]/g, '') // Remove the accent characters
    .replace(/[\s_-]+/g, ' ')
    .replace(/[^\p{L}\p{N} ]/gu, '')
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, maxWords)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');

  if (!key) key = 'content';
  if (existingKeys.has(key)) {
    let i = 1;
    while (existingKeys.has(`${key}${i}`)) i++;
    key = `${key}${i}`;
  }
  return key;
};
