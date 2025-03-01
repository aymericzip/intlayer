import { relative } from 'path';
import dotenv from 'dotenv';
import { Locales, logger } from '@intlayer/config';
import { getLocaleName } from '@intlayer/core';
import fg from 'fast-glob';
import { OpenAI } from 'openai';
import pLimit from 'p-limit';
import { getFileContent, getAbsolutePath, writeFileContent } from './fs';
import { localeObject } from './localeList';
import { existsSync, statSync } from 'fs';

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

const SKIP_RANGE_OF_LAST_UPDATE_TIME = 2 * 60 * 60 * 1000; // 2 hours

const ERROR_MAX_RETRY_COUNT = 3;
const ERROR_WAIT_TIME = 30 * 1000; // 30 seconds

export const auditFile = async (filePath: string, locale: Locales) => {
  try {
    const projectPath = process.cwd();
    const relativePath = relative(projectPath, filePath);
    logger(`${locale}: Translating file: ${relativePath}`);

    // Determine the target locale file path
    const localeFilePath = filePath.replace('en/', `${locale}/`);

    // Check if the file was already generated/updated in the time defined
    if (existsSync(localeFilePath)) {
      const stats = statSync(localeFilePath);
      const lastModified = new Date(stats.mtime);
      const oneHourAgo = new Date(Date.now() - SKIP_RANGE_OF_LAST_UPDATE_TIME);
      if (lastModified > oneHourAgo) {
        logger(
          `   -> Skipping file ${localeFilePath} as it was updated within the last range of time.`
        );
        return;
      }
    }

    const fileContent = getFileContent(filePath);

    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    // Prepare the prompt for ChatGPT by replacing placeholders with actual values.
    const prompt =
      CHAT_GPT_CUSTOM_PROMPT !== ''
        ? CHAT_GPT_CUSTOM_PROMPT
        : getFileContent(getAbsolutePath('./PROMPT.md'))
            .replace('{{locale}}', locale)
            .replace('{{localeName}}', getLocaleName(locale))
            .replace('{{fileContent}}', fileContent);

    // Retry mechanism: wait 30 seconds and retry if the ChatGPT request fails
    let chatCompletion;
    let retryCount = 0;
    const maxRetries = ERROR_MAX_RETRY_COUNT; // You can adjust the maximum number of retries as needed

    while (retryCount < maxRetries) {
      try {
        chatCompletion = await openai.chat.completions.create({
          model: OPEN_AI_MODEL,
          temperature: OPEN_AI_TEMPERATURE,
          messages: [{ role: 'system', content: prompt }],
        });
        break; // If the request succeeds, exit the loop
      } catch (error) {
        retryCount++;
        logger(
          `    -> ChatGPT request failed (attempt ${retryCount}). Waiting 30 seconds before retrying... ${error}`
        );
        await new Promise((resolve) => setTimeout(resolve, ERROR_WAIT_TIME));
      }
    }

    // If the request failed after maximum retries, throw an error
    if (!chatCompletion) {
      throw new Error('    -> ChatGPT request failed after maximum retries.');
    }

    let newContent = chatCompletion.choices[0].message?.content;

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
      `    -> ${chatCompletion.usage?.total_tokens} tokens used in the request`
    );
  } catch (error) {
    console.error(error);
  }
};

const excludedLocales = [Locales.ENGLISH];

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
  const limit = pLimit(3); // Limit the number of concurrent requests

  const docList: string[] =
    DOC_LIST.length > 0 ? DOC_LIST : fg.sync('en/**/*.md');

  if (!process.env.OPEN_AI_API_KEY) {
    throw Error(
      'No OpenAI API key provided. Please set the OPEN_AI_API_KEY variable.'
    );
  }

  const pushPromises = Object.keys(localeObject)
    .filter((locale) => !excludedLocales.includes(locale as Locales))
    .map((locale) =>
      docList.map((docPath) =>
        limit(() => auditFile(docPath, locale as Locales))
      )
    );

  await Promise.all(pushPromises.flat());
};

audit();
