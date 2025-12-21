import { readAsset } from 'utils:asset';
import { generateObject } from 'ai';
import { z } from 'zod';
import type { AIConfig, AIOptions } from '../aiSdk';

type Tag = {
  key: string;
  description?: string;
};

export type AuditDictionaryMetadataOptions = {
  fileContent: string;
  tags?: Tag[];
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

export const aiDefaultOptions: AIOptions = {
  // Keep default options
};

/**
 * Audits a content declaration file by constructing a prompt for AI models.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies.
 */
export const auditDictionaryMetadata = async ({
  fileContent,
  tags,
  aiConfig,
  applicationContext,
}: AuditDictionaryMetadataOptions): Promise<
  AuditFileResultData | undefined
> => {
  const CHAT_GPT_PROMPT = readAsset('./PROMPT.md');
  const EXAMPLE_REQUEST = readAsset('./EXAMPLE_REQUEST.md');
  const EXAMPLE_RESPONSE = readAsset('./EXAMPLE_RESPONSE.md');

  // Prepare the prompt for AI by replacing placeholders with actual values.
  const prompt = CHAT_GPT_PROMPT.replace(
    '{{applicationContext}}',
    applicationContext ?? ''
  ).replace(
    '{{tags}}',
    tags
      ? JSON.stringify(
          tags
            .map(({ key, description }) => `- ${key}: ${description}`)
            .join('\n\n'),
          null,
          2
        )
      : ''
  );

  // Use the AI SDK to generate the completion
  const { object, usage } = await generateObject({
    ...aiConfig,
    schema: z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
    }),
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: EXAMPLE_REQUEST },
      { role: 'assistant', content: EXAMPLE_RESPONSE },
      {
        role: 'user',
        content: fileContent,
      },
    ],
  });

  return {
    fileContent: object,
    tokenUsed: usage?.totalTokens ?? 0,
  };
};
