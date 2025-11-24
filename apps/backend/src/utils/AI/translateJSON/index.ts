import {
  type AIConfig,
  type AIOptions,
  AIProvider,
  type TranslateJSONResultData,
  translateJSON as translateJSONAI,
} from '@intlayer/ai';
import type { Locale } from '@intlayer/types';
import { logger } from '@logger';
import type { Tag } from '@/types/tag.types';

export type TranslateJSONOptions = {
  entryFileContent: JSON;
  presetOutputContent: JSON;
  dictionaryDescription?: string;
  entryLocale: Locale;
  outputLocale: Locale;
  tags: Tag[];
  aiConfig: AIConfig;
  mode: 'complete' | 'review';
  applicationContext?: string;
};

export { type TranslateJSONResultData, AIProvider };

export const aiDefaultOptions: AIOptions = {
  provider: AIProvider.OPENAI,
  model: 'gpt-5-mini',
};

/**
 * TranslateJSONs a content declaration file by constructing a prompt for AI models.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies.
 */
export const translateJSON = async (
  options: TranslateJSONOptions
): Promise<TranslateJSONResultData | undefined> => {
  const result = await translateJSONAI(options);

  if (result) {
    logger.info(`${result.tokenUsed} tokens used in the request`);
  }

  return result;
};
