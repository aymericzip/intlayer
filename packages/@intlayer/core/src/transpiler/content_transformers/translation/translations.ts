import { type Locales, intlayerConfiguration } from '@intlayer/config/client';
import { NodeType } from '../../../types/index';
import {
  getStackTraceInfo,
  type NoteStackTraceInfo,
} from '../../../utils/getStackTraceInfo';

export type LanguageContent<Content> = Record<Locales, Content>;

export type TranslationContent<Content> = Partial<LanguageContent<Content>> &
  NoteStackTraceInfo & {
    nodeType: NodeType.Translation;
  };

/**
 * Create a JSON with the content and the stack trace information
 */
const translations = <Content>(
  content?: Partial<LanguageContent<Content>> | string
) => {
  const stackTraceInfo = getStackTraceInfo();

  if (typeof content === 'string') {
    const result: TranslationContent<Content> = {
      nodeType: NodeType.Translation,
      ...stackTraceInfo,
      [intlayerConfiguration.internationalization.defaultLocale]: content,
    };

    return result;
  }

  const result: TranslationContent<Content> = {
    nodeType: NodeType.Translation,
    ...stackTraceInfo,
    ...content,
  };

  return result;
};

export { translations as t };
