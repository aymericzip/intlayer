import type { Locales, LocalesValues } from '@intlayer/config';
import type { Dictionary, Plugins } from '@intlayer/core';

/**
 * Function to get the content of a dictionary for Angular applications
 */
export const getIntlayer = <
  T extends Dictionary,
  L extends LocalesValues = Locales,
>(
  dictionary: T,
  locale: L,
  additionalPlugins?: Plugins[]
): any => {
  // Simplified implementation to avoid type complexity
  return dictionary.content || dictionary;
};
