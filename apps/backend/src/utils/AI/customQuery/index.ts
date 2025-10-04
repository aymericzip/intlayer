import { logger } from '@logger';
import { generateText } from 'ai';
import type { AIConfig, AIOptions, Messages } from '../aiSdk';

export type CustomQueryOptions = {
  messages: Messages;
  aiConfig: AIConfig;
};

export type CustomQueryResultData = {
  fileContent: string;
  tokenUsed: number;
};

export const aiDefaultOptions: AIOptions = {
  model: 'gpt-4o-mini',
  // Keep default options
};

/**
 * CustomQuerys a content declaration file by constructing a prompt for AI models.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies.
 */
export const customQuery = async ({
  messages,
  aiConfig,
}: CustomQueryOptions): Promise<CustomQueryResultData | undefined> => {
  // Use the AI SDK to generate the completion
  const { text: newContent, usage } = await generateText({
    ...aiConfig,
    messages,
  });

  logger.info(`${usage?.totalTokens ?? 0} tokens used in the request`);

  return {
    fileContent: newContent,
    tokenUsed: usage?.totalTokens ?? 0,
  };
};
