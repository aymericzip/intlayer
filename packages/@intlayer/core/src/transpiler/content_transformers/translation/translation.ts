import { getConfiguration } from '@intlayer/config/client';
import { NodeType } from '../../../types/index';
import type { CustomizableLanguageContent, TranslationContent } from './types';

/**
 *
 * Function intended to be used to build intlayer dictionaries.
 *
 * Get the content of a translation based on the locale.
 *
 * Usage:
 *
 * ```ts
 * translation<string>({
 *   "en": "Hello",
 *   "fr": "Bonjour",
 *   // ... any other available locale
 * })
 * ```
 *
 * Using TypeScript:
 * - this function require each locale to be defined if defined in the project configuration.
 * - If a locale is missing, it will make each existing locale optional and raise an error if the locale is not found.
 */
const translation = <Content = string>(
  content?: CustomizableLanguageContent<Content>
) => {
  const {
    internationalization: { defaultLocale },
  } = getConfiguration();

  if (typeof content === 'string') {
    const result: TranslationContent<Content> = {
      nodeType: NodeType.Translation,
      [NodeType.Translation]: { [defaultLocale]: content },
    } as TranslationContent<Content>;

    return result;
  }

  const result: TranslationContent<Content> = {
    nodeType: NodeType.Translation,
    [NodeType.Translation]: content,
  } as TranslationContent<Content>;

  return result;
};

export { translation as t };
