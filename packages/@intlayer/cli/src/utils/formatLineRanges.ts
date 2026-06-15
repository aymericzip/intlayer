/**
 * Formats a list of line numbers into a compact, human-readable string where
 * runs of consecutive lines are collapsed into ranges.
 *
 * The input is sorted and de-duplicated first, so callers don't need to
 * pre-process it. A run of a single line is printed as the bare number; a run
 * of two or more consecutive lines is printed as `start-end`.
 *
 * @example
 * formatLineRanges([2, 3, 4, 5, 333, 412, 413, 414]);
 * // → '2-5, 333, 412-414'
 *
 * @param lineNumbers - The (possibly unsorted, possibly duplicated) line numbers.
 * @param separator - String inserted between groups. Defaults to `', '`.
 * @returns The grouped string, or an empty string when no lines are provided.
 */
export const formatLineRanges = (
  lineNumbers: number[],
  separator = ', '
): string => {
  const sortedUniqueLines = [...new Set(lineNumbers)].sort((a, b) => a - b);

  if (sortedUniqueLines.length === 0) return '';

  const groups: string[] = [];
  let rangeStart = sortedUniqueLines[0]!;
  let rangeEnd = rangeStart;

  const pushGroup = (): void => {
    groups.push(
      rangeStart === rangeEnd ? `${rangeStart}` : `${rangeStart}-${rangeEnd}`
    );
  };

  for (const lineNumber of sortedUniqueLines.slice(1)) {
    if (lineNumber === rangeEnd + 1) {
      // Still inside the current consecutive run.
      rangeEnd = lineNumber;
      continue;
    }

    // Gap detected: close the current run and start a new one.
    pushGroup();
    rangeStart = lineNumber;
    rangeEnd = lineNumber;
  }

  pushGroup();

  return groups.join(separator);
};
