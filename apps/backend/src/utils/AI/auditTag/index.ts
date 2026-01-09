import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AIConfig, AIOptions } from '@intlayer/ai';
import { generateText } from '@intlayer/ai';
import { logger } from '@logger';
import { extractJson } from '@utils/extractJSON';
import type { Dictionary } from '@/types/dictionary.types';
import type { TagAPI } from '@/types/tag.types';

export type AuditOptions = {
  dictionaries: Dictionary[];
  tag: TagAPI;
  aiConfig: AIConfig;
  applicationContext?: string;
};

export type TranslateJSONResultData = {
  fileContent: string;
  tokenUsed: number;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The prompt template to send to AI models
const CHAT_GPT_PROMPT = readFileSync(join(__dirname, './PROMPT.md'), 'utf-8');

export const aiDefaultOptions: AIOptions = {
  // Keep default options
};

/**
 * Audits a tag by constructing a prompt for AI models.
 * The prompt includes details about the tag and related dictionaries.
 */
export const auditTag = async ({
  dictionaries,
  tag,
  aiConfig,
  applicationContext,
}: AuditOptions): Promise<TranslateJSONResultData | undefined> => {
  // Prepare the prompt for AI by replacing placeholders with actual values.
  const prompt = CHAT_GPT_PROMPT.replace(
    '{{tag.description}}',
    tag.description ?? ''
  )
    .replace('{{tag.key}}', tag.key)
    .replace('{{applicationContext}}', applicationContext ?? '');

  // Use the AI SDK to generate the completion
  const { text: newContent, usage } = await generateText({
    ...aiConfig,
    messages: [
      { role: 'system', content: prompt },
      {
        role: 'user',
        content: [
          '**Tag to audit:**',
          'This is the tag that you should consider to audit:',
          JSON.stringify(tag),
        ].join('\n'),
      },
    ],
  });

  logger.info(`${usage?.totalTokens ?? 0} tokens used in the request`);

  return {
    fileContent: extractJson(newContent),
    tokenUsed: usage?.totalTokens ?? 0,
  };
};
