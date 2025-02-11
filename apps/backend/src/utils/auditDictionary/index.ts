import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { getLocaleName } from '@intlayer/core';
import { logger } from '@logger';
import type { Locales } from 'intlayer';
import { OpenAI } from 'openai';
import type { Tag } from '@/types/tag.types';

const __dirname = dirname(fileURLToPath(import.meta.url));

export type AuditOptions = {
  locales: Locales[];
  defaultLocale: Locales;
  fileContent: string;
  filePath?: string;
  model?: string;
  openAiApiKey: string;
  customPrompt?: string;
  tags?: Tag[];
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

const FILE_TEMPLATE: Record<string, string> = {
  ts: getFileContent('./TS_FORMAT.md'),
  tsx: getFileContent('./TSX_FORMAT.md'),
  js: getFileContent('./MJS_FORMAT.md'),
  mjs: getFileContent('./MJS_FORMAT.md'),
  cjs: getFileContent('./CJS_FORMAT.md'),
  jsx: getFileContent('./JSX_FORMAT.md'),
  json: getFileContent('./JSON_FORMAT.md'),
};

// The prompt template to send to ChatGPT, requesting an audit of content declaration files.
const CHAT_GPT_PROMPT = getFileContent('./PROMPT.md');

/**
 * Formats a locale with its full name and returns a string representation.
 *
 * @function
 * @param locale - A locale from the project's configuration (e.g., 'en-US', 'fr-FR').
 * @returns A formatted string combining the locale's name and code. Example: "English (US): en-US".
 */
const formatLocaleWithName = (locale: Locales): string => {
  // getLocaleName returns a human-readable name for the locale.
  const localeName = getLocaleName(locale);

  // Concatenate both the readable name and the locale code.
  return `${locale}: ${localeName}`;
};

/**
 * Formats an array of tags with their keys and instructions.
 *
 * @function
 * @param tags - An array of tags from the project's configuration.
 * @returns A string representation of the tags, with their keys and instructions.
 */
const formatTagInstructions = (tags: Tag[] = []) =>
  tags.map((tag) => `- ${tag.key}: ${tag.instructions}`).join('\n\n');

/**
 * Audits a content declaration file by constructing a prompt for ChatGPT.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies. It prints the prompt for each file,
 * and could be adapted to send requests to the ChatGPT model.
 */
export const auditDictionary = async ({
  fileContent,
  filePath,
  model,
  openAiApiKey,
  customPrompt,
  locales,
  defaultLocale,
  tags,
}: AuditOptions): Promise<AuditFileResultData | undefined> => {
  try {
    // Optionally, you could initialize and configure the OpenAI client here, if you intend to make API calls.
    // Uncomment and configure the following lines if you have `openai` installed and want to call the API:

    const openai = new OpenAI({
      apiKey: openAiApiKey,
    });

    // Read the file's content.
    const splitted = (filePath ?? '.json').split('.');
    const fileExtension = splitted[splitted.length - 1];

    // Prepare the prompt for ChatGPT by replacing placeholders with actual values.
    const prompt =
      customPrompt ??
      CHAT_GPT_PROMPT.replace('{{filePath}}', filePath ?? 'Not provided')
        .replace(
          '{{defaultLocale}}',
          `{${formatLocaleWithName(defaultLocale)}}`
        )
        .replace(
          '{{otherLocales}}',
          `{${locales.map(formatLocaleWithName).join(', ')}}`
        )
        .replace(
          '{{declarationsContentTemplate}}',
          FILE_TEMPLATE[fileExtension]
        )
        .replace('{{fileContent}}', fileContent)
        .replace('{{tagsInstructions}}', formatTagInstructions(tags));

    // Example of how you might request a completion from ChatGPT:
    const chatCompletion = await openai.chat.completions.create({
      model: model ?? 'gpt-4o-mini',
      messages: [{ role: 'system', content: prompt }],
    });

    const newContent = chatCompletion.choices[0].message?.content;

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
