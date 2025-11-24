import { readAsset } from 'utils:asset';
import { generateText } from 'ai';
import type { AIConfig, AIOptions } from '../aiSdk';
import { extractJson } from '../utils/extractJSON';

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
  const { text: newContent, usage } = await generateText({
    ...aiConfig,
    messages: [
      { role: 'system', content: prompt },
      {
        role: 'user',
        content: [
          '**Content declaration to describe:**',
          'This is the content declaration that you should consider to describe:',
          fileContent,
        ].join('\n'),
      },
    ],
  });

  return {
    fileContent: extractJson(newContent),
    tokenUsed: usage?.totalTokens ?? 0,
  };
};
