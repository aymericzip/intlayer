/**
 * Field names the runtime gives a meaning to: `nodeType` marks content nodes,
 * `constructor`/`prototype` are skipped on merge, `then` makes the content a
 * thenable, and `toString`/`valueOf`/`value` are intercepted by loading proxies.
 */
const RESERVED_CONTENT_KEYS: ReadonlySet<string> = new Set([
  'nodeType',
  'constructor',
  'prototype',
  'then',
  'toString',
  'valueOf',
  'value',
]);

/**
 * Generates a camelCase field key from a text, suffixing it with a number when
 * it is already used or reserved (`nodeType` → `nodeType1`).
 */
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

  const isTaken = (candidate: string): boolean =>
    existingKeys.has(candidate) || RESERVED_CONTENT_KEYS.has(candidate);

  if (isTaken(key)) {
    let suffix = 1;
    while (isTaken(`${key}${suffix}`)) suffix++;
    key = `${key}${suffix}`;
  }
  return key;
};
