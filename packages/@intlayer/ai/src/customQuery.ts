import { generateText, type SystemModelMessage } from 'ai';
import type { AIConfig, AIOptions, Messages } from './aiSdk';

export type CustomQueryOptions = {
  messages: Messages;
  system?: string | SystemModelMessage | SystemModelMessage[];
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
 * CustomQuery a content declaration file by constructing a prompt for AI models.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies.
 */
export const customQuery = async ({
  messages,
  system,
  aiConfig,
}: CustomQueryOptions): Promise<CustomQueryResultData | undefined> => {
  // Use the AI SDK to generate the completion
  const { text: newContent, usage } = await generateText({
    ...aiConfig,
    system,
    messages,
  });

  return {
    fileContent: newContent,
    tokenUsed: usage?.totalTokens ?? 0,
  };
};
