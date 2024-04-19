import { intlayerConfiguration } from '@intlayer/config/client';
import { NodeType } from '../../../types/index';
import { getStackTraceInfo } from '../../../utils/getStackTraceInfo';
import type { CustomizableLanguageContent, TranslationContent } from './types';

const { defaultLocale } = intlayerConfiguration.internationalization;

/**
 *
 * Function intended to be used to build intlayer dictionaries.
 *
 * Get the content of a translation based on the locale.
 *
 * Usage:
 *
 * translation<string>({
 *   "en": "Hello",
 *   "fr": "Bonjour",
 *   // ... any other available locale
 * })
 *
 * Using TypeScript:
 * - this function require each locale to be defined if defined in the project configuration.
 * - If a locale is missing, it will make each existing locale optional and raise an error if the locale is not found.
 */
const translation = <Content = string>(
  content?: CustomizableLanguageContent<Content>
) => {
  const stackTraceInfo = getStackTraceInfo();

  if (typeof content === 'string') {
    const result: TranslationContent<Content> = {
      nodeType: NodeType.Translation,
      ...stackTraceInfo,
      [defaultLocale]: content,
    } as TranslationContent<Content>;

    return result;
  }

  const result: TranslationContent<Content> = {
    nodeType: NodeType.Translation,
    ...stackTraceInfo,
    ...(content as unknown as object),
  } as TranslationContent<Content>;

  return result;
};

export { translation as t };
