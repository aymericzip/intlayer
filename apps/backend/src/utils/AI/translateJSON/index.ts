import type { Tag } from '@/types/tag.types';
import { getLocaleName } from '@intlayer/core';
import { logger } from '@logger';
import { extractJson } from '@utils/extractJSON';
import { generateText } from 'ai';
import { readFileSync } from 'fs';
import { Locales } from 'intlayer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { AIConfig, AIOptions, AIProvider } from '../aiSdk';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Get the content of a file at the specified path
const getFileContent = (filePath: string) =>
  readFileSync(join(__dirname, filePath), { encoding: 'utf-8' });

export type TranslateJSONOptions = {
  entryFileContent: JSON;
  presetOutputContent: JSON;
  dictionaryDescription: string;
  entryLocale: Locales;
  outputLocale: Locales;
  tags: Tag[];
  aiConfig: AIConfig;
  mode: 'complete' | 'review';
  applicationContext?: string;
};

export type TranslateJSONResultData = {
  fileContent: string;
  tokenUsed: number;
};

// The prompt template to send to the AI model
const CHAT_GPT_PROMPT = getFileContent('./PROMPT.md');

export const aiDefaultOptions: AIOptions = {
  provider: AIProvider.OPENAI,
  model: 'gpt-5-mini',
};

/**
 * Format a locale with its name.
 *
 * @param locale - The locale to format.
 * @returns A string in the format "locale: name", e.g. "en: English".
 */
const formatLocaleWithName = (locale: Locales): string =>
  `${locale}: ${getLocaleName(locale, Locales.ENGLISH)}`;

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

const getModeInstructions = (mode: 'complete' | 'review'): string => {
  if (mode === 'complete') {
    return 'Mode: "Complete" - Enrich the preset content with the missing keys and values in the output locale. Do not update existing keys. Everything should be returned in the output.';
  }

  return 'Mode: "Review" - Fill missing content and review existing keys from the preset content. If a key from the entry is missing in the output, it must be translated to the target language and added. If you detect misspelled content, or content that should be reformulated, correct it. If a translation is not coherent with the desired language, translate it.';
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
  aiConfig,
  entryLocale,
  outputLocale,
  tags,
  mode,
  applicationContext,
}: TranslateJSONOptions): Promise<TranslateJSONResultData | undefined> => {
  // Prepare the prompt for AI by replacing placeholders with actual values.
  const prompt = CHAT_GPT_PROMPT.replace(
    '{{entryLocale}}',
    formatLocaleWithName(entryLocale)
  )
    .replace('{{outputLocale}}', formatLocaleWithName(outputLocale))
    .replace('{{entryFileContent}}', JSON.stringify(entryFileContent))
    .replace('{{presetOutputContent}}', JSON.stringify(presetOutputContent))
    .replace('{{dictionaryDescription}}', dictionaryDescription)
    .replace('{{applicationContext}}', applicationContext ?? '')
    .replace('{{tagsInstructions}}', formatTagInstructions(tags))
    .replace('{{modeInstructions}}', getModeInstructions(mode));

  // Use the AI SDK to generate the completion
  const { text: newContent, usage } = await generateText({
    ...aiConfig,
    messages: [{ role: 'system', content: prompt }],
  });

  logger.info(`${usage?.totalTokens ?? 0} tokens used in the request`);

  return {
    fileContent: extractJson(newContent),
    tokenUsed: usage?.totalTokens ?? 0,
  };
};
