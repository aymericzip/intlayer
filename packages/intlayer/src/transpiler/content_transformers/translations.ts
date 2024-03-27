import { defaultLocale, type Locales } from '../../settings';
import {
  getStackTraceInfo,
  type NoteStackTraceInfo,
} from '../../utils/getStackTraceInfo';

export type LanguageContent<Content> = Record<Locales, Content>;

type Content = Partial<LanguageContent<string>> & NoteStackTraceInfo;

/**
 * Create a JSON string with the content and the stack trace information
 * @param {string | Partial<LanguageContent<string>>} content - The content to be translated
 * @returns {string} A JSON string containing the content and stack trace information
 */
export const translations = (
  content?: Partial<LanguageContent<string>> | string
) => {
  const stackTraceInfo = getStackTraceInfo();

  if (typeof content === 'string') {
    const result: Content = {
      ...stackTraceInfo,
      [defaultLocale]: content,
    };

    return result;
  }

  const result: Content = {
    ...stackTraceInfo,
    ...content,
  };

  return result;
};
