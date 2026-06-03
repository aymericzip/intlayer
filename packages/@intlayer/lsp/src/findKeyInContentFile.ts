// Group 2: quoted value   — key: "foo" | key: 'foo' | key: `foo`
// Group 3: unquoted value — key: foo-bar  (YAML / markdown frontmatter)
const KEY_DECLARATION_REGEX =
  /\bkey\s*:\s*(?:(['"`])([^'"`\r\n]+)\1|([^\s'"`{},\r\n]+))/g;

/**
 * If `offset` falls within a `key:` declaration in a content file,
 * return the declared key string; otherwise return null.
 * Handles quoted values (TS/JS/JSON) and bare values (YAML/Markdown frontmatter).
 */
export const findKeyInContentFile = (
  text: string,
  offset: number
): string | null => {
  for (const match of text.matchAll(KEY_DECLARATION_REGEX)) {
    const start = match.index!;
    const end = start + match[0].length;

    if (offset >= start && offset <= end) {
      return match[2] ?? match[3] ?? null;
    }
  }

  return null;
};

/**
 * If `offset` falls on a content field property key (e.g. `greet` in
 * `greet: t({...})`), return the dictionary key and the field name.
 * Returns null when the cursor is on the `key:` declaration itself
 * (that case is handled separately by `findKeyInContentFile`), or on
 * any position that is not an object property key.
 */
export const findContentFieldAtOffset = (
  text: string,
  offset: number
): { dictionaryKey: string; fieldName: string } | null => {
  // Extract the dictionary key from the file's `key:` declaration
  const keyMatch =
    /\bkey\s*:\s*(?:(['"`])([^'"`\r\n]+)\1|([^\s'"`{},\r\n]+))/.exec(text);

  if (!keyMatch) return null;

  const dictionaryKey = keyMatch[2] ?? keyMatch[3];

  if (!dictionaryKey) return null;

  // Expand identifier boundaries around offset
  let wordStart = offset;

  while (wordStart > 0 && /\w/.test(text[wordStart - 1]!)) {
    wordStart--;
  }

  let wordEnd = offset;

  while (wordEnd < text.length && /\w/.test(text[wordEnd]!)) {
    wordEnd++;
  }

  if (wordStart === wordEnd) return null;

  const word = text.slice(wordStart, wordEnd);

  if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(word)) return null;

  // Must be a property key: immediately followed (ignoring whitespace) by ':'
  // but NOT '::' (TypeScript namespace / ternary chain edge-cases)
  const after = text.slice(wordEnd);

  if (!/^\s*:(?!:)/.test(after)) return null;

  return { dictionaryKey, fieldName: word };
};
