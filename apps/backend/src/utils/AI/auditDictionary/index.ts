import { readAsset } from 'utils:asset';
import { getLocaleName } from '@intlayer/core';
import { Locales } from '@intlayer/types';
import { logger } from '@logger';
import { extractJson } from '@utils/extractJSON';
import { generateText } from 'ai';
import type { Tag } from '@/types/tag.types';
import type { AIConfig, AIOptions } from '../aiSdk';

export type AuditOptions = {
  fileContent: string;
  filePath?: string;
  locales: Locales[];
  defaultLocale: Locales;
  tags: Tag[];
  aiConfig: AIConfig;
  applicationContext?: string;
};

export type AuditFileResultData = {
  fileContent: string;
  tokenUsed: number;
};

// The prompt template to send to the AI model
const CHAT_GPT_PROMPT = readAsset('./PROMPT.md');

export const aiDefaultOptions: AIOptions = {
  // Keep default options
};

/**
 * Format a locale with its name.
 *
 * @param locale - The locale to format.
 * @returns A string in the format "locale: name", e.g. "en: English".
 */
const formatLocaleWithName = (locale: Locales): string => {
  return `${locale}: ${getLocaleName(locale, Locales.ENGLISH)}`;
};

/**
 * Formats tag instructions for the AI prompt.
 * Creates a string with all available tags and their descriptions.
 *
 * @param tags - The list of tags to format.
 * @returns A formatted string with tag instructions.
 */
const formatTagInstructions = (tags: Tag[]): string => {
  if (!tags || tags.length === 0) return '';

  // Prepare the tag instructions.
  return [
    `Based on the dictionary content, identify specific tags from the list below that would be relevant:`,
    tags.map(({ key, description }) => `- ${key}: ${description}`).join('\n\n'),
  ].join('\n\n');
};

/**
 * Audits a content declaration file by constructing a prompt for AI models.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies.
 */
export const auditDictionary = async ({
  fileContent,
  filePath,
  locales,
  defaultLocale,
  tags,
  aiConfig,
  applicationContext,
}: AuditOptions): Promise<AuditFileResultData | undefined> => {
  const otherLocales = locales.filter((locale) => locale !== defaultLocale);

  // Prepare the prompt for AI by replacing placeholders with actual values.
  const prompt = CHAT_GPT_PROMPT.replace(
    '{{defaultLocale}}',
    formatLocaleWithName(defaultLocale)
  )
    .replace(
      '{{otherLocales}}',
      `{${otherLocales.map(formatLocaleWithName).join(', ')}}`
    )
    .replace('{{filePath}}', filePath ?? '')
    .replace('{{fileContent}}', fileContent)
    .replace('{{applicationContext}}', applicationContext ?? '')
    .replace('{{tagsInstructions}}', formatTagInstructions(tags));

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
