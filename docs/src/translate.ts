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

const OPEN_AI_MODEL = 'gpt-4o-2024-11-20';
const OPEN_AI_TEMPERATURE = 0.2;

// Add your custom prompt here for specific use cases
const CHAT_GPT_CUSTOM_PROMPT = '';

// Fill the list of files to audit if you want to audit only a subset of the files
// If empty list is provided, the audit will run on all markdown files present in the /en folder
const DOC_LIST: string[] = [
  // '/Users/aymericpineau/Documents/intlayer/docs/en/intlayer_with_nextjs_14.md',
  // '/Users/aymericpineau/Documents/intlayer/docs/en/intlayer_with_nextjs_15.md',
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

const NB_SIMULTANEOUS_REQUESTS: number = 1;

const SKIP_RANGE_OF_LAST_UPDATE_TIME: number = 2 * 60 * 60 * 1000; // 2 hours

const ERROR_MAX_RETRY_COUNT: number = 3;
const ERROR_WAIT_TIME: number = 30 * 1000; // 30 seconds

const CHECK_STRUCTURE_INCONSISTENCY: boolean = true;

const getFileContent = (filePath: string): string => {
  // Read the file content using Node.js fs module.
  const fileContent = readFileSync(filePath, 'utf-8');
  return fileContent;
};

const getAbsolutePath = (filePath: string): string => join(__dirname, filePath);

const writeFileContent = (filePath: string, content: string) => {
  // Create the directory if it doesn't exist
  const dir = dirname(filePath);
  mkdirSync(dir, { recursive: true });

  writeFileSync(filePath, content);
};

const getIsSimilarStructure = (
  baseFileContent: string,
  translatedFileContent: string
): boolean => {
  const translatedFileHashtagCount =
    translatedFileContent.split('#').length - 1;
  const baseFileHashtagCount = baseFileContent.split('#').length - 1;

  logger(`   -> Number of hashtags in base file: ${baseFileHashtagCount}`);
  logger(
    `   -> Number of hashtags in translated file: ${translatedFileHashtagCount}`
  );

  return translatedFileHashtagCount === baseFileHashtagCount;
};

const getIsFileUpdatedRecently = (localeFilePath: string): boolean => {
  const stats = statSync(localeFilePath);
  const lastModified = new Date(stats.mtime);
  const oneHourAgo = new Date(Date.now() - SKIP_RANGE_OF_LAST_UPDATE_TIME);

  return lastModified > oneHourAgo;
};

export const auditFile = async (filePath: string, locale: Locales) => {
  try {
    const projectPath = process.cwd();
    const relativePath = relative(projectPath, filePath);
    logger(`${locale}: Translating file: ${relativePath}`);

    // Determine the target locale file path
    const localeFilePath = filePath.replace('en/', `${locale}/`);

    const fileContent = getFileContent(filePath);

    // Check if the file was already generated/updated in the time defined
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
        const isFileUpdatedRecently = getIsFileUpdatedRecently(localeFilePath);

        if (isFileUpdatedRecently) {
          logger(
            `   -> Skipping file ${localeFilePath} as it was updated within the last range of time.`
          );
          return;
        }
      }
    }

    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    // Prepare the prompt for ChatGPT by replacing placeholders with actual values.
    const prompt =
      CHAT_GPT_CUSTOM_PROMPT !== ''
        ? CHAT_GPT_CUSTOM_PROMPT
        : getFileContent(getAbsolutePath('./PROMPT.md'))
            .replaceAll('{{locale}}', locale)
            .replaceAll('{{localeName}}', getLocaleName(locale))
            .replaceAll('{{fileContent}}', fileContent);

    // Retry mechanism: wait 30 seconds and retry if the ChatGPT request fails
    let chatCompletion;
    let retryCount = 0;
    const maxRetries = ERROR_MAX_RETRY_COUNT; // You can adjust the maximum number of retries as needed
    let newContent;

    while (retryCount < maxRetries) {
      try {
        try {
          chatCompletion = await openai.chat.completions.create({
            model: OPEN_AI_MODEL,
            temperature: OPEN_AI_TEMPERATURE,
            messages: [{ role: 'system', content: prompt }],
          });
        } catch (error) {
          // If the request failed, wait and throw the error again to retry
          await new Promise((resolve) => setTimeout(resolve, ERROR_WAIT_TIME));

          logger(
            `    -> ChatGPT request failed. Waiting 30 seconds before retrying... Error: ${error}`
          );
          throw new Error((error as Error).message as string);
        }

        // If the request failed after maximum retries, throw an error
        if (!chatCompletion.choices[0].message?.content) {
          throw new Error('ChatGPT request failed after maximum retries.');
        }
        newContent = chatCompletion.choices[0].message?.content;

        const isSimilarStructure = getIsSimilarStructure(
          fileContent,
          newContent
        );

        if (!isSimilarStructure) {
          throw new Error(
            'Translation file failed to be updated as its structure is not the same as the base file.'
          );
        }

        break; // If the request succeeds, exit the loop
      } catch (error) {
        retryCount++;
        logger(
          `    -> ChatGPT request failed (attempt ${retryCount}). Retrying...`
        );
      }
    }

    if (newContent?.startsWith('```')) {
      // Remove first and last lines of the code block
      const codeBlock = newContent.split('\n').slice(1, -1).join('\n');
      newContent = codeBlock;
    }

    if (newContent) {
      const localeFilePath = filePath.replace('en/', `${locale}/`);
      writeFileContent(localeFilePath, newContent);
      logger(`    -> File ${localeFilePath} created/updated`);
    }

    logger(
      `    -> ${chatCompletion?.usage?.total_tokens} tokens used in the request`
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 * Audits the content declaration files by constructing a prompt for ChatGPT.
 * The prompt includes details about the project's locales, file paths of content declarations,
 * and requests for identifying issues or inconsistencies. It prints the prompt for each file,
 * and could be adapted to send requests to the ChatGPT model.
 *
 * @async
 * @function
 * @param options - Optional configuration for the audit process.
 * @returns This function returns a Promise that resolves once the audit is complete.
 */
export const audit = async () => {
  const limit = pLimit(NB_SIMULTANEOUS_REQUESTS); // Limit the number of concurrent requests

  const docList: string[] =
    DOC_LIST.length > 0 ? DOC_LIST : fg.sync('en/**/*.md');

  if (!process.env.OPEN_AI_API_KEY) {
    throw Error(
      'No OpenAI API key provided. Please set the OPEN_AI_API_KEY variable.'
    );
  }

  const pushPromises = LOCALE_LIST.map((locale) =>
    docList.map((docPath) => limit(() => auditFile(docPath, locale as Locales)))
  );

  await Promise.all(pushPromises.flat());
};

audit();
