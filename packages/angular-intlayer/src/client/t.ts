import type { Locales } from '@intlayer/config';
import { type LanguageContent, getTranslation } from '@intlayer/core';

/**
 * Translation function for Angular applications
 * Returns the translation of the provided multilang content
 */
export const t = <Content = string>(
  multilangContent: LanguageContent<Content>,
  locale: Locales
) => {
  return getTranslation<Content>(multilangContent, locale);
};
