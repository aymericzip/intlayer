import {
  type Locales,
  intlayerIntlConfiguration,
} from '@intlayer/config/client';
import { NodeType, type LanguageContent } from '@intlayer/core';
import { getTranslation } from '../getTranslation';
import type {
  Content,
  ContentValue,
  TranslatedContent,
  TranslatedContentValue,
} from './contentDictionary';

const defaultLocale = intlayerIntlConfiguration.defaultLocale;

/**
 * Function to replace the multi lingual content with content in the current locale
 */
export const processDictionary = (
  content: Content,
  locale: Locales = defaultLocale
): TranslatedContent => {
  if (content && typeof content === 'object') {
    const result: TranslatedContent = {};

    for (const key of Object.keys(content)) {
      const field = content?.[key];

      if (typeof field === 'object' && field.type === NodeType.Translation) {
        const languageContent: LanguageContent<ContentValue> = {
          [locale as string]: field[locale as keyof typeof field],
        } as LanguageContent<ContentValue>;

        const translation = getTranslation<ContentValue>(
          languageContent,
          locale
        );

        result[key] = translation;
      } else if (typeof field === 'object') {
        result[key] = processDictionary(
          field as Content,
          locale
        ) as TranslatedContentValue;
      } else {
        result[key] = field;
      }
    }

    return result;
  }

  return content;
};
