import { readAsset } from 'utils:asset';
import { getLocaleName } from '@intlayer/core';
import type { KeyPath } from '@intlayer/types';
import { Locales } from '@intlayer/types';
import { logger } from '@logger';
import { generateText } from 'ai';
import type { Tag } from '@/types/tag.types';
import type { AIConfig, AIOptions } from '../aiSdk';

export type AuditDictionaryFieldOptions = {
  fileContent: string;
  locales: Locales[];
  keyPath: KeyPath[];
  tags: Tag[];
  aiConfig: AIConfig;
  applicationContext?: string;
};

export type AuditDictionaryFieldResultData = {
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
  applicationContext,
  locales,
  keyPath,
  tags,
  aiConfig,
}: AuditDictionaryFieldOptions): Promise<
  AuditDictionaryFieldResultData | undefined
> => {
  // Prepare the prompt for AI by replacing placeholders with actual values.
  const prompt = CHAT_GPT_PROMPT.replace(
    '{{otherLocales}}',
    `{${locales.map(formatLocaleWithName).join(', ')}}`
  )
    .replace('{{keyPath}}', JSON.stringify(keyPath))
    .replace('{{fileContent}}', fileContent)
    .replace('{{applicationContext}}', applicationContext ?? '')
    .replace('{{tagsInstructions}}', formatTagInstructions(tags));

  if (!aiConfig) {
    logger.error('Failed to configure AI model');
    return undefined;
  }

  // Use the AI SDK to generate the completion
  const { text: newContent, usage } = await generateText({
    ...aiConfig,
    messages: [{ role: 'system', content: prompt }],
  });

  logger.info(`${usage?.totalTokens ?? 0} tokens used in the request`);

  return {
    fileContent: newContent,
    tokenUsed: usage?.totalTokens ?? 0,
  };
};
