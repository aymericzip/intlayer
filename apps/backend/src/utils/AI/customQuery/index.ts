import {
  type AIConfig,
  type AIOptions,
  type CustomQueryResultData,
  customQuery as customQueryAI,
  type Messages,
} from '@intlayer/ai';
import { logger } from '@logger';

export type CustomQueryOptions = {
  messages: Messages;
  aiConfig: AIConfig;
};

export type { CustomQueryResultData };

export const aiDefaultOptions: AIOptions = {
  model: 'gpt-4o-mini',
  // Keep default options
};

/**
 * CustomQuerys a content declaration file by constructing a prompt for AI models.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies.
 */
export const customQuery = async (
  options: CustomQueryOptions
): Promise<CustomQueryResultData | undefined> => {
  const result = await customQueryAI(options);

  if (result) {
    logger.info(`${result.tokenUsed} tokens used in the request`);
  }

  return result;
};
