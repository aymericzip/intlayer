import { dirname, join, relative } from 'path';
import dotenv from 'dotenv';
import { Locales, logger } from '@intlayer/config';
import { getLocaleName } from '@intlayer/core';
import fg from 'fast-glob';
import { OpenAI } from 'openai';
import pLimit from 'p-limit';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'fs';

dotenv.config();

const OPEN_AI_MODEL: OpenAI.Chat.ChatModel = 'gpt-4o-2024-11-20';
const OPEN_AI_TEMPERATURE: number = 0.2;

// Add your custom prompt here for specific use cases
const CHAT_GPT_CUSTOM_PROMPT: string = '';

// Fill the list of files to audit if you want to audit only a subset of the files
// If empty list is provided, the audit will run on all markdown files present in the /en folder
const DOC_LIST: string[] = [
  '/Users/aymericpineau/Documents/intlayer/docs/en/vs_code_extension.md',
];

export const LOCALE_LIST: Locales[] = [
  // Locales.ENGLISH,
  Locales.FRENCH,
  Locales.SPANISH,
  Locales.ENGLISH_UNITED_KINGDOM,
  Locales.GERMAN,
  Locales.JAPANESE,
  Locales.KOREAN,
  Locales.CHINESE,
  Locales.ITALIAN,
  Locales.PORTUGUESE,
  Locales.HINDI,
  Locales.ARABIC,
  Locales.RUSSIAN,
];

const NB_SIMULTANEOUS_REQUESTS: number = 3;

const SKIP_RANGE_OF_LAST_UPDATE_TIME: number = 2 * 60 * 60 * 1000; // 2 hours

const ERROR_MAX_RETRY_COUNT: number = 3;
const ERROR_WAIT_TIME: number = 30 * 1000; // 30 seconds

const CHECK_STRUCTURE_INCONSISTENCY: boolean = false;

/**
 * You can tweak this to a smaller or larger size depending on how close you get to token limits.
 * If the content is significantly larger, you may need to reduce this chunk size.
 */
const CHUNK_SIZE_IN_CHARS = 8000;

/**
 * Utility to read file content as a string
 */
const getFileContent = (filePath: string): string => {
  return readFileSync(filePath, 'utf-8');
};

/**
 * Utility to write file content, creating directories if needed
 */
const writeFileContent = (filePath: string, content: string) => {
  const dir = dirname(filePath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(filePath, content);
};

/**
 * Simple structure check comparing the number of '#' characters
 */
const getIsSimilarStructure = (
  baseFileContent: string,
  translatedFileContent: string
): boolean => {
  const translatedFileHashtagCount = (translatedFileContent.match(/#/g) || [])
    .length;
  const baseFileHashtagCount = (baseFileContent.match(/#/g) || []).length;

  logger(`   -> Number of '#' in base file: ${baseFileHashtagCount}`);
  logger(
    `   -> Number of '#' in translated file: ${translatedFileHashtagCount}`
  );

  return translatedFileHashtagCount === baseFileHashtagCount;
};

/**
 * Check if file was updated recently, to skip re-translation
 */
const getIsFileUpdatedRecently = (localeFilePath: string): boolean => {
  const stats = statSync(localeFilePath);
  const lastModified = new Date(stats.mtime);
  const threshold = new Date(Date.now() - SKIP_RANGE_OF_LAST_UPDATE_TIME);

  return lastModified > threshold;
};

/**
 * Split a large string into smaller chunks of a specified maximum length.
 * Each chunk boundary tries not to break lines in the middle.
 *
 * @param text The full text to chunk
 * @param chunkSize The size limit for each chunk in characters
 * @returns An array of chunked strings
 */
const chunkStringByCharacters = (text: string, chunkSize: number): string[] => {
  const chunks: string[] = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    // End index as chunkSize from start
    let endIndex = Math.min(startIndex + chunkSize, text.length);

    // Attempt not to break lines in the middle (optional).
    // If endIndex is not at the end, we try to find a nearby newline.
    if (endIndex < text.length) {
      const nextNewline = text.lastIndexOf('\n', endIndex);
      if (nextNewline > startIndex) {
        endIndex = nextNewline;
      }
    }

    chunks.push(text.slice(startIndex, endIndex).trim());
    startIndex = endIndex;
  }

  return chunks;
};

/**
 * Translates a single chunk via the OpenAI API.
 * Includes retry logic if the call fails.
 */
const translateChunk = async (
  openai: OpenAI,
  prompt: string
): Promise<string> => {
  let retryCount = 0;
  let lastError: unknown;

  while (retryCount < ERROR_MAX_RETRY_COUNT) {
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: OPEN_AI_MODEL,
        temperature: OPEN_AI_TEMPERATURE,
        messages: [{ role: 'system', content: prompt }],
        max_tokens: 8192,
      });

      // If the request succeeded but no content is returned, throw an error
      if (!chatCompletion.choices[0].message?.content) {
        throw new Error('Empty content returned from ChatGPT.');
      }

      // Remove code fence if present
      let newContent = chatCompletion.choices[0].message.content;
      if (newContent.startsWith('```')) {
        const codeBlock = newContent.split('\n').slice(1, -1).join('\n');
        newContent = codeBlock;
      } else if (newContent.startsWith('---')) {
        const codeBlock = newContent.split('\n').slice(2, -1).join('\n');
        newContent = codeBlock;
      }

      logger(
        `    -> ${chatCompletion?.usage?.total_tokens} tokens used in the request`
      );
      return newContent;
    } catch (error) {
      logger(
        `    -> ChatGPT request failed (attempt ${retryCount + 1}). Retrying in ${
          ERROR_WAIT_TIME / 1000
        } seconds... Error: ${error}`
      );
      lastError = error;
      retryCount++;
      await new Promise((resolve) => setTimeout(resolve, ERROR_WAIT_TIME));
    }
  }

  throw lastError;
};

/**
 * Audit (translate) a single file for a given locale
 */
export const auditFile = async (filePath: string, locale: Locales) => {
  try {
    const projectPath = process.cwd();
    const relativePath = relative(projectPath, filePath);
    logger(`${locale}: Translating file: ${relativePath}`);

    // Determine the target locale file path
    const localeFilePath = filePath.replace('en/', `${locale}/`);
    const fileContent = getFileContent(filePath);

    // Skipping conditions
    if (existsSync(localeFilePath)) {
      if (CHECK_STRUCTURE_INCONSISTENCY) {
        const translatedFileContent = getFileContent(localeFilePath);
        const isSimilarStructure = getIsSimilarStructure(
          fileContent,
          translatedFileContent
        );

        if (isSimilarStructure) {
          logger(
            `   -> Skipping file ${localeFilePath} as its structure is the same as the base file.`
          );
          return;
        }
      } else {
        // If not checking structure, we skip if updated recently
        const isFileUpdatedRecently = getIsFileUpdatedRecently(localeFilePath);
        if (isFileUpdatedRecently) {
          logger(
            `   -> Skipping file ${localeFilePath} as it was updated within the last range of time.`
          );
          return;
        }
      }
    }

    // Prepare the base prompt for ChatGPT
    const basePrompt =
      CHAT_GPT_CUSTOM_PROMPT !== ''
        ? CHAT_GPT_CUSTOM_PROMPT
        : getFileContent(join(__dirname, 'PROMPT.md'))
            .replaceAll('{{locale}}', locale)
            .replaceAll('{{localeName}}', getLocaleName(locale));

    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    // 1. Chunk the file if it is too large
    const chunks = chunkStringByCharacters(fileContent, CHUNK_SIZE_IN_CHARS);
    logger(`   -> File will be split into ${chunks.length} chunk(s)`);

    let translatedChunks: string[] = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      // Build the chunk-specific prompt
      const chunkPrompt = `
${basePrompt}

Below is **CHUNK ${i + 1} of ${chunks.length}** of the source text to translate. 
Translate it to {{localeName}} (locale code: {{locale}}) while preserving Markdown structure:

---
${chunk}
---
`;
      // Make the actual translation call
      const chunkTranslation = await translateChunk(openai, chunkPrompt);

      // Collect the partial translation
      translatedChunks.push(chunkTranslation);
    }

    // 2. Re-assemble all translated chunks
    const finalTranslation = translatedChunks.join('\n\n');

    // 4. Write the final translation to the appropriate file path
    writeFileContent(localeFilePath, finalTranslation);
    logger(`    -> File ${localeFilePath} created/updated successfully.`);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Main audit function: scans all .md files in "en/" (unless you specified DOC_LIST),
 * then translates them to each locale in LOCALE_LIST.
 */
export const audit = async () => {
  const limit = pLimit(NB_SIMULTANEOUS_REQUESTS);

  const docList: string[] =
    DOC_LIST.length > 0 ? DOC_LIST : fg.sync('en/**/*.md');

  if (!process.env.OPEN_AI_API_KEY) {
    throw new Error(
      'No OpenAI API key provided. Please set the OPEN_AI_API_KEY variable.'
    );
  }

  const tasks = LOCALE_LIST.flatMap((locale) =>
    docList.map((docPath) => limit(() => auditFile(docPath, locale as Locales)))
  );

  await Promise.all(tasks);
};

audit().catch((err) => console.error('Audit failed:', err));
