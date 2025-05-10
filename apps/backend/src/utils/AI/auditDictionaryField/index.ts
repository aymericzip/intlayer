import type { Tag } from '@/types/tag.types';
import { getLocaleName, type KeyPath } from '@intlayer/core';
import { logger } from '@logger';
import { generateText } from 'ai';
import { readFileSync } from 'fs';
import type { Locales } from 'intlayer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { AIOptions, getAIConfig } from '../aiSdk';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Get the content of a file at the specified path
const getFileContent = (filePath: string) => {
  return readFileSync(join(__dirname, filePath), { encoding: 'utf-8' });
};

export type AuditDictionaryFieldOptions = {
  fileContent: string;
  locales: Locales[];
  keyPath: KeyPath[];
  tags: Tag[];
  aiOptions?: AIOptions;
};

export type AuditDictionaryFieldResultData = {
  fileContent: string;
  tokenUsed: number;
};

// The prompt template to send to the AI model
const CHAT_GPT_PROMPT = getFileContent('./PROMPT.md');

/**
 * Format a locale with its name.
 *
 * @param locale - The locale to format.
 * @returns A string in the format "locale: name", e.g. "en: English".
 */
const formatLocaleWithName = (locale: Locales): string => {
  return `${locale}: ${getLocaleName(locale)}`;
};

/**
 * Formats tag instructions for the AI prompt.
 *
 * @param tags - Array of tags to format
 * @returns A formatted string with tag instructions
 */
const formatTagInstructions = (tags: Tag[]): string => {
  if (!tags || tags.length === 0) {
    return '';
  }

  return `Based on the dictionary content, identify specific tags from the list below that would be relevant:
  
${tags.map(({ key, description }) => `- ${key}: ${description}`).join('\n\n')}`;
};

/**
 * Audits a content declaration file by constructing a prompt for AI models.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies.
 */
export const auditDictionaryField = async ({
  fileContent,
  aiOptions,
  locales,
  keyPath,
  tags,
}: AuditDictionaryFieldOptions): Promise<
  AuditDictionaryFieldResultData | undefined
> => {
  try {
    // Prepare the prompt for AI by replacing placeholders with actual values.
    const prompt = CHAT_GPT_PROMPT.replace(
      '{{otherLocales}}',
      `{${locales.map(formatLocaleWithName).join(', ')}}`
    )
      .replace('{{keyPath}}', JSON.stringify(keyPath))
      .replace('{{fileContent}}', fileContent)
      .replace('{{tagsInstructions}}', formatTagInstructions(tags));

    // Get the appropriate AI model configuration
    const aiConfig = await getAIConfig(aiOptions);

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
