/**
 * Letters and digits (any script), joined by single `.`, `_` or `-`
 * separators. A key names its built file (`{key}.json`), so slashes,
 * backslashes, null bytes and dot-segments are rejected.
 */
const DICTIONARY_KEY_PATTERN = /^[\p{L}\p{N}]+([._-][\p{L}\p{N}]+)*$/u;

/** Whether `dictionaryKey` is safe to build (see {@link DICTIONARY_KEY_PATTERN}). */
export const isValidDictionaryKey = (dictionaryKey: string): boolean =>
  DICTIONARY_KEY_PATTERN.test(dictionaryKey);
