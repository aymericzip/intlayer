import type { Locales } from '@intlayer/config';
import { intlayerConfiguration } from '../../config';
import {
  getStackTraceInfo,
  type NoteStackTraceInfo,
} from '../../utils/getStackTraceInfo';

export type LanguageContent<Content> = Record<Locales, Content>;

export type TranslationContent = Partial<LanguageContent<string>> &
  NoteStackTraceInfo & {
    type: 'translation';
  };

/**
 * Create a JSON string with the content and the stack trace information
 */
const translations = (content?: Partial<LanguageContent<string>> | string) => {
  const stackTraceInfo = getStackTraceInfo();

  if (typeof content === 'string') {
    const result: TranslationContent = {
      type: 'translation',
      ...stackTraceInfo,
      [intlayerConfiguration.defaultLocale]: content,
    };

    return result;
  }

  const result: TranslationContent = {
    type: 'translation',
    ...stackTraceInfo,
    ...content,
  };

  return result;
};

export { translations as t };
