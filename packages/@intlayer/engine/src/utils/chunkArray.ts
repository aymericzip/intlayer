/**
 * Splits an array into consecutive chunks of at most `chunkSize` items.
 *
 * The last chunk holds the remainder and may be smaller. An empty input, or a
 * `chunkSize` lower than 1, returns an empty list of chunks.
 *
 * @example
 * ```ts
 * chunkArray(['a', 'b', 'c', 'd', 'e'], 2); // [['a', 'b'], ['c', 'd'], ['e']]
 * ```
 */
export const chunkArray = <T>(items: T[], chunkSize: number): T[][] => {
  if (chunkSize < 1) return [];

  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }

  return chunks;
};
