/**
 * Fast hashing using cyrb53 algorithm for small unique strings with low collisions risk
 */
export const getPathHash = (filePath: string) => {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;

  for (let i = 0; i < filePath.length; i++) {
    const ch = filePath.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  const hash53 = 4294967296 * (2097151 & h2) + (h1 >>> 0);

  // Returns a string ~11 characters long, e.g., "_1x9z5k2m8p3"
  return hash53.toString(36);
};
