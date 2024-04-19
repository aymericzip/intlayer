import { intlayerConfiguration } from '@intlayer/config/client';
import { NodeType } from '../../../types/index';
import { getStackTraceInfo } from '../../../utils/getStackTraceInfo';
import type { CustomizableLanguageContent, TranslationContent } from './types';

const { defaultLocale } = intlayerConfiguration.internationalization;

/**
 * Transpile multilingual dictionary content
 *
 * Usage
 *
 *  translation<string>({
 *    "en": "test",
 *    "fr": "test",
 *    // ... any other available locale
 *  })
 *
 * translation<number, Locales.ENGLISH>({
 *  "en": 1
 * })
 *
 * translation<string, Locales.ENGLISH | Locales.FRENCH>({
 *  "fr": "test",
 *  "en": "test"
 * })
 *
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
