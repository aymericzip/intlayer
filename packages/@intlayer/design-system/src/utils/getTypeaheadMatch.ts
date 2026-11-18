/**
 * Finds the option a typeahead search points to, WAI-ARIA listbox style.
 *
 * Typing the same character repeatedly cycles through the options starting
 * with it; otherwise the search starts after the current option.
 *
 * @param options - Option labels in display order.
 * @param search - Characters typed so far.
 * @param currentIndex - Index of the active option, or -1.
 * @returns The index of the matching option, or -1.
 *
 * @example
 * getTypeaheadMatch(['Apple', 'Banana', 'Blueberry'], 'b', 1); // 2
 */
export const getTypeaheadMatch = (
  options: readonly string[],
  search: string,
  currentIndex: number
): number => {
  if (!search || options.length === 0) return -1;

  const firstCharacter = search.charAt(0);
  const isRepeatedCharacter = [...search].every(
    (character) => character === firstCharacter
  );
  const normalizedSearch = (
    isRepeatedCharacter ? firstCharacter : search
  ).toLowerCase();

  // A multi-character search may still match the current option.
  const startOffset = isRepeatedCharacter || currentIndex < 0 ? 1 : 0;

  for (let step = 0; step < options.length; step++) {
    const index =
      (Math.max(currentIndex, -1) + startOffset + step + options.length) %
      options.length;

    if (options[index]?.toLowerCase().startsWith(normalizedSearch))
      return index;
  }

  return -1;
};
