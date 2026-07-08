/**
 * FNV-1a 32-bit string hash. Small, fast, dependency-free, and stable across
 * runtimes — good enough for deterministic A/B bucketing and session seeding
 * (not for cryptographic use).
 *
 * @param input - The string to hash.
 * @returns An unsigned 32-bit integer hash.
 *
 * @example
 * hashString('session-1:homepage-hero'); // 3039336720
 */
export const hashString = (input: string): number => {
  let hash = 0x811c9dc5; // FNV offset basis

  for (let index = 0; index < input.length; index++) {
    hash ^= input.charCodeAt(index);
    // 32-bit FNV prime multiplication via shifts to stay within Number safe range
    hash = Math.imul(hash, 0x01000193);
  }

  // Coerce to unsigned 32-bit
  return hash >>> 0;
};
