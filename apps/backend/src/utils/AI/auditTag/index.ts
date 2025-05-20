import type { Dictionary } from '@/types/dictionary.types';
import type { Tag } from '@/types/tag.types';
import { logger } from '@logger';
import { generateText } from 'ai';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { AIOptions, AIProvider, getAIConfig } from '../aiSdk';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Get the content of a file at the specified path
const getFileContent = (filePath: string) => {
  return readFileSync(join(__dirname, filePath), { encoding: 'utf-8' });
};

export type AuditOptions = {
  dictionaries: Dictionary[];
  tag: Tag;
  aiOptions?: AIOptions;
};

export type TranslateJSONResultData = {
  fileContent: string;
  tokenUsed: number;
};

// The prompt template to send to AI models
const CHAT_GPT_PROMPT = getFileContent('./PROMPT.md');

/**
 * Audits a tag by constructing a prompt for AI models.
 * The prompt includes details about the tag and related dictionaries.
 */
export const auditTag = async ({
  aiOptions,
  dictionaries,
  tag,
}: AuditOptions): Promise<TranslateJSONResultData | undefined> => {
  try {
    // Prepare the prompt for AI by replacing placeholders with actual values.
    const prompt = CHAT_GPT_PROMPT.replace(
      '{{tag.description}}',
      tag.description ?? ''
    )
      .replace('{{tag.key}}', tag.key)
      .replace('{{dictionaries}}', JSON.stringify(dictionaries, null, 2))
      .replace('{{applicationContext}}', aiOptions?.applicationContext ?? '');

    // Get the appropriate AI model configuration
    const aiConfig = await getAIConfig({
      provider: AIProvider.OPENAI,
      model: 'gpt-4o-mini',
      apiKey: process.env.OPENAI_API_KEY,
      ...aiOptions,
    });

    if (!aiConfig) {
      logger.error('Failed to configure AI model');
      return undefined;
    }

    // Use the AI SDK to generate the completion
    const { text: newContent, usage } = await generateText({
      model: aiConfig.model,
      temperature: aiConfig.temperature,
      messages: [{ role: 'system', content: prompt }],
    });

    logger.info(`${usage?.totalTokens ?? 0} tokens used in the request`);

    return {
      fileContent: newContent,
      tokenUsed: usage?.totalTokens ?? 0,
    };
  } catch (error) {
    console.error(error);
  }
};
