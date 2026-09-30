/** 0-based line / character pair, as VS Code positions use. */
export type LineCharacter = { line: number; character: number };

/**
 * Build an offset → {line, character} converter for `text`.
 *
 * Line starts are indexed once, so each conversion is a binary search instead
 * of a scan of the text preceding the offset — files with many usages would
 * otherwise convert in quadratic time.
 */
export const createOffsetToPosition = (
  text: string
): ((offset: number) => LineCharacter) => {
  const lineStartOffsets = [0];

  for (let index = 0; index < text.length; index++) {
    if (text.charCodeAt(index) === 10 /* \n */) {
      lineStartOffsets.push(index + 1);
    }
  }

  return (offset) => {
    let low = 0;
    let high = lineStartOffsets.length - 1;

    // Last line whose start is <= offset
    while (low < high) {
      const middle = (low + high + 1) >> 1;

      if (lineStartOffsets[middle]! <= offset) {
        low = middle;
      } else {
        high = middle - 1;
      }
    }

    return { line: low, character: offset - lineStartOffsets[low]! };
  };
};
