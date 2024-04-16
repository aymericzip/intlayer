import { type Locales, intlayerConfiguration } from '@intlayer/config/client';
import type { ReactNode } from 'react';
import { NodeType } from '../../types/index';
import {
  getStackTraceInfo,
  type NoteStackTraceInfo,
} from '../../utils/getStackTraceInfo';

export type LanguageContent<Content> = Record<Locales, Content>;

export type TranslationContent = Partial<LanguageContent<ReactNode>> &
  NoteStackTraceInfo & {
    type: NodeType;
  };

/**
 * Create a JSON string with the content and the stack trace information
 */
const translations = (content?: Partial<LanguageContent<string>> | string) => {
  const stackTraceInfo = getStackTraceInfo();

  if (typeof content === 'string') {
    const result: TranslationContent = {
      type: NodeType.Translation,
      ...stackTraceInfo,
      [intlayerConfiguration.internationalization.defaultLocale]: content,
    };

    return result;
  }

  const result: TranslationContent = {
    type: NodeType.Translation,
    ...stackTraceInfo,
    ...content,
  };

  return result;
};

export { translations as t };
