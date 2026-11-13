/** Comment directive that keeps a whole file out of extraction. */
export const IGNORE_FILE_DIRECTIVE = 'intlayer-ignore-file';

/** Comment directive that keeps the following line out of extraction. */
export const IGNORE_NEXT_LINE_DIRECTIVE = 'intlayer-ignore-next-line';

/** Comment directive that keeps its own line out of extraction. */
export const IGNORE_LINE_DIRECTIVE = 'intlayer-ignore-line';

/**
 * A directive only counts when it opens a comment (`//`, `/*`, `{/*` or
 * `<!--`), so the same words inside a translatable string are not mistaken
 * for one.
 */
const DIRECTIVE_REGEX =
  /(?:\/\/|\/\*|<!--)\s*(intlayer-ignore-(?:file|next-line|line))\b/g;

export type ExtractionIgnoreDirectives = {
  /** The file holds an `intlayer-ignore-file` directive. */
  isFileIgnored: boolean;
  /**
   * Whether the string starting at this character offset of the source sits
   * on an ignored line. An unknown offset is never ignored.
   */
  isOffsetIgnored: (offset: number | null | undefined) => boolean;
};

/** Offsets at which each line of the source starts (index 0 = line 1). */
const getLineStartOffsets = (source: string): number[] => {
  const lineStartOffsets = [0];

  for (let index = 0; index < source.length; index++) {
    if (source[index] === '\n') lineStartOffsets.push(index + 1);
  }

  return lineStartOffsets;
};

/** Zero-based line index of a character offset, by binary search. */
const getLineIndex = (lineStartOffsets: number[], offset: number): number => {
  let low = 0;
  let high = lineStartOffsets.length - 1;

  while (low < high) {
    const middle = Math.ceil((low + high) / 2);

    if ((lineStartOffsets[middle] ?? 0) <= offset) low = middle;
    else high = middle - 1;
  }

  return low;
};

/**
 * Reads the extraction ignore directives of a source file:
 *
 * - `// intlayer-ignore-file` anywhere in the file skips the whole file
 * - `// intlayer-ignore-next-line` skips the strings of the following line
 * - `// intlayer-ignore-line` skips the strings of its own line
 *
 * Works for JS/TS (`//`, `/* *\/`), JSX (`{/* *\/}`) and Vue / Svelte
 * templates (`<!-- -->`).
 */
export const getExtractionIgnoreDirectives = (
  source: string
): ExtractionIgnoreDirectives => {
  const ignoredLineIndexes = new Set<number>();
  let isFileIgnored = false;
  let lineStartOffsets: number[] | undefined;

  for (const match of source.matchAll(DIRECTIVE_REGEX)) {
    const directive = match[1];

    if (directive === IGNORE_FILE_DIRECTIVE) {
      isFileIgnored = true;
      continue;
    }

    lineStartOffsets ??= getLineStartOffsets(source);
    const lineIndex = getLineIndex(lineStartOffsets, match.index);

    ignoredLineIndexes.add(
      directive === IGNORE_NEXT_LINE_DIRECTIVE ? lineIndex + 1 : lineIndex
    );
  }

  const isOffsetIgnored = (offset: number | null | undefined): boolean => {
    if (!lineStartOffsets || typeof offset !== 'number') return false;

    return ignoredLineIndexes.has(getLineIndex(lineStartOffsets, offset));
  };

  return { isFileIgnored, isOffsetIgnored };
};
