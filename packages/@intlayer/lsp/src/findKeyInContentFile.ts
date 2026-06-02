// Group 2: quoted value   — key: "foo" | key: 'foo' | key: `foo`
// Group 3: unquoted value — key: foo-bar  (YAML / markdown frontmatter)
const KEY_DECL_REGEX =
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
  for (const match of text.matchAll(KEY_DECL_REGEX)) {
    const start = match.index!;
    const end = start + match[0].length;

    if (offset >= start && offset <= end) {
      return match[2] ?? match[3] ?? null;
    }
  }

  return null;
};
