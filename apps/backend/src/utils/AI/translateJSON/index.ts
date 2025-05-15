import type { Tag } from '@/types/tag.types';
import { getLocaleName } from '@intlayer/core';
import { logger } from '@logger';
import { extractJson } from '@utils/extractJSON';
import { retryManager } from '@utils/retryManager';
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

export type TranslateJSONOptions = {
  entryFileContent: JSON;
  presetOutputContent: JSON;
  dictionaryDescription: string;
  entryLocale: Locales;
  outputLocale: Locales;
  tags: Tag[];
  aiOptions?: AIOptions;
};

export type TranslateJSONResultData = {
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
 * Creates a string with all available tags and their descriptions.
 *
 * @param tags - The list of tags to format.
 * @returns A formatted string with tag instructions.
 */
const formatTagInstructions = (tags: Tag[]): string => {
  if (!tags || tags.length === 0) {
    return '';
  }

  // Prepare the tag instructions.
  return `Based on the dictionary content, identify specific tags from the list below that would be relevant:
  
${tags.map(({ key, description }) => `- ${key}: ${description}`).join('\n\n')}`;
};

/**
 * TranslateJSONs a content declaration file by constructing a prompt for AI models.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies.
 */
export const translateJSON = async ({
  entryFileContent,
  presetOutputContent,
  dictionaryDescription,
  aiOptions,
  entryLocale,
  outputLocale,
  tags,
}: TranslateJSONOptions): Promise<TranslateJSONResultData | undefined> => {
  try {
    // Get the appropriate AI model configuration
    const aiConfig = await getAIConfig({
      model: 'gpt-4o-mini-2024-07-18',
      ...aiOptions,
    });

    // Prepare the prompt for AI by replacing placeholders with actual values.
    const prompt = CHAT_GPT_PROMPT.replace(
      '{{entryLocale}}',
      formatLocaleWithName(entryLocale)
    )
      .replace('{{outputLocale}}', formatLocaleWithName(outputLocale))
      .replace('{{entryFileContent}}', JSON.stringify(entryFileContent))
      .replace('{{presetOutputContent}}', JSON.stringify(presetOutputContent))
      .replace('{{dictionaryDescription}}', dictionaryDescription)
      .replace('{{tagsInstructions}}', formatTagInstructions(tags));

    if (!aiConfig) {
      logger.error('Failed to configure AI model');
      return undefined;
    }

    const result = await retryManager(async () => {
      // Use the AI SDK to generate the completion
      const { text: newContent, usage } = await generateText({
        model: aiConfig.model,
        temperature: aiConfig.temperature,
        messages: [{ role: 'system', content: prompt }],
      });

      logger.info(`${usage?.totalTokens ?? 0} tokens used in the request`);

      return {
        fileContent: extractJson(newContent),
        tokenUsed: usage?.totalTokens ?? 0,
      };
    })();

    return {
      fileContent: result.fileContent,
      tokenUsed: result.tokenUsed,
    };
  } catch (error) {
    logger.error('Error translating JSON:' + error, {
      level: 'error',
    });
  }
};
