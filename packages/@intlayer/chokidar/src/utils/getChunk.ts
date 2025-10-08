import { splitTextByLines } from './splitTextByLine';

type TrunkOptions = {
  lineStart?: number;
  lineLength?: number;
  charStart?: number;
  charLength?: number;
};

export const getChunk = (text: string, options: TrunkOptions = {}): string => {
  const { lineStart, lineLength, charStart, charLength } = options;

  // Fast-path: if no filters were provided, return the whole text
  if (
    lineStart === undefined &&
    lineLength === undefined &&
    charStart === undefined &&
    charLength === undefined
  ) {
    return text;
  }

  // ---------------------------------------------------------------------------
  // Utility helpers to convert between line numbers and absolute char indices
  // ---------------------------------------------------------------------------
  const lines = splitTextByLines(text);

  const getCharIndexOfLineStart = (lineNumber: number): number => {
    if (lineNumber <= 0) return 0;
    // Sum the length of every previous line
    let idx = 0;
    for (let i = 0; i < Math.min(lineNumber, lines.length); i++) {
      idx += lines[i].length;
    }
    return idx;
  };

  const getCharIndexOfLineEnd = (lineNumber: number): number => {
    // If the requested line number exceeds the number of lines, clamp to the last character
    if (lineNumber >= lines.length) {
      return text.length;
    }
    const line = lines[lineNumber];
    const lineEnd = getCharIndexOfLineStart(lineNumber) + line.length;

    return lineEnd;
  };

  // ---------------------------------------------------------------------------
  // Compute the effective (inclusive) charStart/charEnd for the requested slice
  // ---------------------------------------------------------------------------
  let effectiveStart = 0; // inclusive
  let effectiveEnd = text.length; // exclusive

  // Apply line boundaries if provided
  if (lineStart !== undefined) {
    effectiveStart = Math.max(
      effectiveStart,
      getCharIndexOfLineStart(lineStart)
    );
  }

  // Apply character boundaries if provided
  if (charStart !== undefined) {
    effectiveStart = Math.max(effectiveStart, charStart);
  }

  // Apply line length boundary from lineStart (or 0)
  if (lineLength !== undefined) {
    const endLine = (lineStart ?? 0) + lineLength - 1;
    effectiveEnd = Math.min(effectiveEnd, getCharIndexOfLineEnd(endLine));
  }

  // Apply character length boundary from effectiveStart
  if (charLength !== undefined) {
    effectiveEnd = Math.min(
      effectiveEnd,
      (charStart ?? effectiveStart) + charLength
    );
  }

  // If bounds do not overlap, return empty string
  if (effectiveStart >= effectiveEnd) {
    return '';
  }

  return text.slice(effectiveStart, effectiveEnd);
};
