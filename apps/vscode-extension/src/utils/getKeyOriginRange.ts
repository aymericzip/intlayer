import { type Position, Range, type TextDocument } from 'vscode';

/**
 * The clickable/underlined range for an Intlayer key at `position`.
 *
 * The default word range (and the JS/TS word pattern VS Code falls back to for
 * definition results without an `originSelectionRange`) splits on `-`, so a
 * hyphenated key like `chatbot-modal` is underlined as two separate tokens.
 * This returns the whole key as a single range.
 *
 * Tries a quoted-string pattern first (handles hyphenated keys inside quotes),
 * then falls back to a bare identifier pattern that allows hyphens mid-word
 * (YAML bare values like `key: chatbot-modal`).
 */
export const getKeyOriginRange = (
  document: TextDocument,
  position: Position
): Range => {
  const quotedRange = document.getWordRangeAtPosition(
    position,
    /["'`][^"'`\r\n]+["'`]/
  );
  if (quotedRange) {
    // Strip the surrounding quote characters
    return new Range(
      quotedRange.start.translate(0, 1),
      quotedRange.end.translate(0, -1)
    );
  }

  // Bare values in YAML: `key: chatbot-modal` — allow hyphens mid-word
  return (
    document.getWordRangeAtPosition(position, /\w[\w-]*/) ??
    new Range(position, position)
  );
};
