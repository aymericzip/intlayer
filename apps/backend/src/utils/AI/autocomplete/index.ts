import { logger } from '@logger';
import { generateText } from 'ai';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { AIOptions, getAIConfig } from '../aiSdk';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Get the content of a file at the specified path
const getFileContent = (filePath: string) => {
  return readFileSync(join(__dirname, filePath), { encoding: 'utf-8' });
};

export type AutocompleteOptions = {
  text: string;
  aiOptions?: AIOptions;
};

export type AutocompleteFileResultData = {
  autocompletion: string;
  tokenUsed: number;
};

// The prompt template to send to the AI model
const CHAT_GPT_PROMPT = getFileContent('./PROMPT.md');

/**
 * Autocompletes a content declaration file by constructing a prompt for AI models.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies.
 */
export const autocomplete = async ({
  text,
  aiOptions,
}: AutocompleteOptions): Promise<AutocompleteFileResultData | undefined> => {
  try {
    // Prepare the prompt for AI by replacing placeholders with actual values.
    const prompt = CHAT_GPT_PROMPT.replace(
      '{{applicationContext}}',
      aiOptions?.applicationContext ?? ''
    );

    // Get the appropriate AI model configuration
    const aiConfig = await getAIConfig(aiOptions);

    if (!aiConfig) {
      logger.error('Failed to configure AI model');
      return undefined;
    }

    // Use the AI SDK to generate the completion
    const { text: newContent, usage } = await generateText({
      model: aiConfig.model,
      temperature: aiConfig.temperature,
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: text },
      ],
    });

    logger.info(`${usage?.totalTokens ?? 0} tokens used in the request`);

    return {
      autocompletion: newContent,
      tokenUsed: usage?.totalTokens ?? 0,
    };
  } catch (error) {
    console.error(error);
  }
};
