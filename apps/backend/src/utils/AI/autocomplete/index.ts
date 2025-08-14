import { logger } from '@logger';
import { generateText } from 'ai';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { AIConfig, AIOptions, AIProvider } from '../aiSdk';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Get the content of a file at the specified path
const getFileContent = (filePath: string) =>
  readFileSync(join(__dirname, filePath), { encoding: 'utf-8' });

export type AutocompleteOptions = {
  text: string;
  aiConfig: AIConfig;
  applicationContext?: string;
  contextBefore?: string;
  currentLine?: string;
  contextAfter?: string;
};

export type AutocompleteFileResultData = {
  autocompletion: string;
  tokenUsed: number;
};

// The prompt template to send to the AI model
const CHAT_GPT_PROMPT = getFileContent('./PROMPT.md');

export const aiDefaultOptions: AIOptions = {
  provider: AIProvider.OPENAI,
  model: 'gpt-4o-mini',
  temperature: 0.7,
};

/**
 * Autocompletes a content declaration file by constructing a prompt for AI models.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies.
 */
export const autocomplete = async ({
  text,
  aiConfig,
  applicationContext,
  contextBefore,
  currentLine,
  contextAfter,
}: AutocompleteOptions): Promise<AutocompleteFileResultData | undefined> => {
  // Prepare the prompt for AI by replacing placeholders with actual values.
  const prompt = CHAT_GPT_PROMPT.replace(
    '{{applicationContext}}',
    applicationContext ?? ''
  )
    .replace('{{contextBefore}}', contextBefore ?? '')
    .replace('{{currentLine}}', currentLine ?? '')
    .replace('{{contextAfter}}', contextAfter ?? '');

  // Use the AI SDK to generate the completion
  const { text: newContent, usage } = await generateText({
    ...aiConfig,
    messages: [
      { role: 'system', content: prompt },
      { role: 'assistant', content: text },
    ],
  });

  logger.info(`${usage?.totalTokens ?? 0} tokens used in the request`);

  return {
    autocompletion: newContent,
    tokenUsed: usage?.totalTokens ?? 0,
  };
};
