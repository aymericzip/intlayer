import { relative } from 'path';
import { Locales } from '@intlayer/config';
import { getLocaleName } from '@intlayer/core';
import fg from 'fast-glob';
import { OpenAI } from 'openai';
import pLimit from 'p-limit';
import { getFileContent, getAbsolutePath, writeFileContent } from './fs';
import { localeObject } from './localeList';

const projectPath = process.cwd();

const OPEN_AI_API_KEY = '';

// The prompt template to send to ChatGPT, requesting an audit of content declaration files.
const CHAT_GPT_PROMPT = getFileContent(getAbsolutePath('./PROMPT.md'));

export const auditFile = async (filePath: string, locale: Locales) => {
  try {
    const relativePath = relative(projectPath, filePath);
    console.info(`Translating file: ${relativePath}`);

    const fileContent = getFileContent(filePath);

    const openai = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
    });

    // Prepare the prompt for ChatGPT by replacing placeholders with actual values.
    const prompt = CHAT_GPT_PROMPT.replace('{{locale}}', locale)
      .replace('{{localeName}}', getLocaleName(locale))
      .replace('{{fileContent}}', fileContent);

    // Example of how you might request a completion from ChatGPT:
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: prompt }],
    });

    const newContent = chatCompletion.choices[0].message?.content;

    if (newContent) {
      const localeFilePath = filePath.replace('en/', `${locale}/`);
      writeFileContent(localeFilePath, newContent);

      console.info(`File ${localeFilePath} created/updated`);
    }

    console.info(
      `${chatCompletion.usage?.total_tokens} tokens used in the request`
    );
  } catch (error) {
    console.error(error);
  }
};

const excludedLocales = [
  Locales.ENGLISH,
  Locales.SPANISH,
  Locales.FRENCH,
  Locales.ENGLISH_UNITED_KINGDOM,
];

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
  const limit = pLimit(1); // Limit the number of concurrent requests

  const docList: string[] = fg.sync('en/**/*.md');

  if (!OPEN_AI_API_KEY) {
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

  await Promise.all(pushPromises);
};

audit();
