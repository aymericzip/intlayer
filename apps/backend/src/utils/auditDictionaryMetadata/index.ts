import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { logger } from '@logger';
import { OpenAI } from 'openai';
import { Tag } from '@/types/tag.types';

const __dirname = dirname(fileURLToPath(import.meta.url));

export type AuditOptions = {
  tags: Tag[];
  fileContent: string;
  model?: string;
  openAiApiKey: string;
  customPrompt?: string;
};
export type AuditFileResultData = { fileContent: string; tokenUsed: number };

/**
 * Reads the content of a file synchronously.
 *
 * @function
 * @param relativeFilePath - The relative or absolute path to the target file.
 * @returns The entire contents of the specified file as a UTF-8 encoded string.
 */
const getFileContent = (relativeFilePath: string): string => {
  const absolutePath = join(__dirname, relativeFilePath);
  const fileContent = readFileSync(absolutePath, 'utf-8');
  return fileContent;
};

// The prompt template to send to ChatGPT, requesting an audit of content declaration files.
const CHAT_GPT_PROMPT = getFileContent('./PROMPT.md');

/**
 * Audits a content declaration file by constructing a prompt for ChatGPT.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies. It prints the prompt for each file,
 * and could be adapted to send requests to the ChatGPT model.
 *
 */
export const auditDictionaryMetadata = async ({
  model,
  openAiApiKey,
  customPrompt,
  tags,
  fileContent,
}: AuditOptions): Promise<AuditFileResultData | undefined> => {
  try {
    // Optionally, you could initialize and configure the OpenAI client here, if you intend to make API calls.
    // Uncomment and configure the following lines if you have `openai` installed and want to call the API:

    const openai = new OpenAI({
      apiKey: openAiApiKey,
    });

    // Prepare the prompt for ChatGPT by replacing placeholders with actual values.
    const prompt =
      customPrompt ??
      CHAT_GPT_PROMPT.replace(
        '{{tags}}',
        `${JSON.stringify(
          tags
            .map(({ key, description }) => `- ${key}: ${description}`)
            .join('\n\n'),
          null,
          2
        )}`
      ).replace('{{contentDeclaration}}', fileContent);

    console.log('prompt', prompt);

    // Example of how you might request a completion from ChatGPT:
    const chatCompletion = await openai.chat.completions.create({
      model: model ?? 'gpt-4o-mini',
      messages: [{ role: 'system', content: prompt }],
    });

    const newContent = chatCompletion.choices[0].message?.content;

    console.log('newContent', newContent);

    logger.info(
      `${chatCompletion.usage?.total_tokens} tokens used in the request`
    );

    return {
      fileContent: newContent ?? '',
      tokenUsed: chatCompletion.usage?.total_tokens ?? 0,
    };
  } catch (error) {
    console.error(error);
  }
};