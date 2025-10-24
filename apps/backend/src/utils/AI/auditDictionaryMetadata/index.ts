import { readAsset } from 'utils:asset';
import { logger } from '@logger';
import { extractJson } from '@utils/extractJSON';
import { generateText } from 'ai';
import type { Tag } from '@/types/tag.types';
import type { AIConfig, AIOptions } from '../aiSdk';

export type AuditOptions = {
  fileContent: string;
  tags: Tag[];
  aiConfig: AIConfig;
  applicationContext?: string;
};

export type AuditFileResultData = {
  fileContent: {
    title: string;
    description: string;
    tags: string[];
  };
  tokenUsed: number;
};

// The prompt template to send to AI models
const CHAT_GPT_PROMPT = readAsset('./PROMPT.md');

export const aiDefaultOptions: AIOptions = {
  // Keep default options
};

/**
 * Audits a content declaration file by constructing a prompt for AI models.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies.
 */
export const auditDictionaryMetadata = async ({
  tags,
  fileContent,
  applicationContext,
  aiConfig,
}: AuditOptions): Promise<AuditFileResultData | undefined> => {
  // Prepare the prompt for AI by replacing placeholders with actual values.
  const prompt = CHAT_GPT_PROMPT.replace(
    '{{tags}}',
    `${JSON.stringify(
      tags
        .map(({ key, description }) => `- ${key}: ${description}`)
        .join('\n\n'),
      null,
      2
    )}`
  )
    .replace('{{contentDeclaration}}', fileContent)
    .replace('{{applicationContext}}', applicationContext ?? '');

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
    fileContent: extractJson(newContent),
    tokenUsed: usage?.totalTokens ?? 0,
  };
};
