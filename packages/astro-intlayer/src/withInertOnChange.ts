import type { WithOnChange } from 'vanilla-intlayer';

/**
 * Gives server-rendered content the `.onChange()` of its client counterpart.
 *
 * The locale cannot change during a server render, so the subscription never
 * fires; it only keeps the content shape identical on both sides of the
 * `astro-intlayer` entry.
 */
export const withInertOnChange = <T>(content: T): WithOnChange<T> => {
  // A selector can resolve to null or a primitive; only objects carry `.onChange`.
  if (content !== null && typeof content === 'object') {
    (content as WithOnChange<T>).onChange = () => content as WithOnChange<T>;
  }

  return content as WithOnChange<T>;
};
