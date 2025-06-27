import { Locales, logger } from '@intlayer/config';
import { getLocaleName } from '@intlayer/core';
import dotenv from 'dotenv';
import fg from 'fast-glob';
import { mkdirSync, writeFileSync } from 'fs';
import { OpenAI } from 'openai';
import pLimit from 'p-limit';
import { dirname, relative } from 'path';
import { BASE_LOCALE, LOCALE_LIST } from './common';
import { chunkText } from './utils/calculateChunks';
import { chunkInference } from './utils/chunkInference';
import { getChunk } from './utils/getChunk';
import { readFileContent } from './utils/readFileContent';

dotenv.config();

// Fill the list of files to audit if you want to audit only a subset of the files
// If empty list is provided, the audit will run on all markdown files present in the /en folder
const DOC_LIST: string[] = [
  // './docs/en/**/*.md',
  // './blog/en/**/*.md',
  './docs/en/**/packages/express-intlayer/index.md',
];
const EXCLUDED_GLOB_PATTEN: string[] = [
  '**/node_modules/**',
  '**/dist/**',
  '**/src/**',
];

// Number of files to process simultaneously
const NB_SIMULTANEOUS_FILE_PROCESSED: number = 1;

const LOCALE_LIST_TO_TRANSLATE: Locales[] = LOCALE_LIST.filter(
  // Include all locales except English
  // Change it to include your specific locales if you want to audit only a subset of the locale(s)
  (locale) => locale === Locales.FRENCH
);

/**
 * Translate a single file for a given locale
 */
export const auditFile = async (
  filePath: string,
  locale: Locales,
  baseLocale: Locales
) => {
  try {
    const projectPath = process.cwd();
    const relativePath = relative(projectPath, filePath);
    logger(`${locale}: Auditing file: ${relativePath}`);

    // Determine the target locale file path
    const localeFilePath = filePath.replace(`/${baseLocale}/`, `/${locale}/`);
    const basedFileContent = await readFileContent(filePath);
    const fileToReviewContent = await readFileContent(localeFilePath);
    let fileResultContent = fileToReviewContent;

    // Prepare the base prompt for ChatGPT
    const basePrompt = (await readFileContent('./src/REVIEW_PROMPT.md'))
      .replaceAll('{{locale}}', locale)
      .replaceAll('{{localeName}}', getLocaleName(locale));

    const openai: OpenAI = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    const baseChunks = chunkText(basedFileContent);

    logger(`   -> Base file will be split into ${baseChunks.length} chunk(s)`);

    for (let i = 0; i < baseChunks.length; i++) {
      const isFirstChunk = i === 0;
      const isLastChunk = i === baseChunks.length - 1;

      const getFileToReviewPrevChunk = () => {
        console.log({
          ch: getChunk(fileResultContent, baseChunks[i - 1]),
          baseChunks: baseChunks[i - 1].content,
        });

        return getChunk(fileResultContent, baseChunks[i - 1]);
      };

      const getFileToReviewNextChunk = () =>
        getChunk(fileResultContent, baseChunks[i + 1]);

      const currentChunk = baseChunks[i];

      const fileToReviewCurrentChunk = getChunk(
        fileToReviewContent,
        currentChunk
      );

      const getPrevBaseChunkPrompt = () =>
        `**CHUNK ${i} of ${baseChunks.length}** is the base chunk in ${getLocaleName(baseLocale)} (${baseLocale}) as reference.\n` +
        `---chunkStart---` +
        baseChunks[i - 1].content +
        `---chunkEnd---`;

      const getCurrentBaseChunkPrompt = () =>
        `**CHUNK ${i + 1} of ${baseChunks.length}** is the base chunk in ${getLocaleName(baseLocale)} (${baseLocale}) as reference.\n` +
        `---chunkStart---` +
        currentChunk.content +
        `---chunkEnd---`;

      const getPrevFileToReviewChunkPrompt = () =>
        `**CHUNK ${i} of ${baseChunks.length}** that has been reviewed in ${getLocaleName(locale)} (${locale}).\n` +
        `---chunkStart---` +
        getFileToReviewPrevChunk() +
        `---chunkEnd---`;

      const getCurrentFileToReviewChunkPrompt = () =>
        `The next user message will be the **CHUNK ${i + 1} of ${baseChunks.length}** that should be reviewed in ${getLocaleName(locale)} (${locale}).`;

      const getNextFileToReviewChunkPrompt = () =>
        `**CHUNK ${i + 2} of ${baseChunks.length}** as context for formatting in ${getLocaleName(baseLocale)} (${baseLocale}):\n` +
        `---chunkStart---` +
        getFileToReviewNextChunk() +
        `---chunkEnd---`;

      // Make the actual translation call
      const chunkAudition = await chunkInference(openai, [
        { role: 'system', content: basePrompt },
        ...(isFirstChunk
          ? []
          : ([
              { role: 'system', content: getPrevBaseChunkPrompt() },
              { role: 'system', content: getCurrentBaseChunkPrompt() },
              { role: 'system', content: getPrevFileToReviewChunkPrompt() },
            ] as const)),
        ...(isLastChunk
          ? []
          : ([
              { role: 'system', content: getNextFileToReviewChunkPrompt() },
            ] as const)),
        {
          role: 'system',
          content: getCurrentFileToReviewChunkPrompt(),
        },
        { role: 'user', content: fileToReviewCurrentChunk },
      ]);

      fileResultContent =
        fileResultContent.substring(0, currentChunk.charStart) +
        chunkAudition +
        fileResultContent.substring(
          currentChunk.charStart + currentChunk.charLength
        );
    }

    // 4. Write the final translation to the appropriate file path
    const dir = dirname(localeFilePath);

    mkdirSync(dir, { recursive: true });
    writeFileSync(localeFilePath, fileResultContent);

    logger(`    -> File ${localeFilePath} created/updated successfully.`);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Main audit function: scans all .md files in "en/" (unless you specified DOC_LIST),
 * then audits them to each locale in LOCALE_LIST.
 */
export const auditEntry = async () => {
  const limit = pLimit(NB_SIMULTANEOUS_FILE_PROCESSED);

  const docList: string[] = fg.sync(DOC_LIST, {
    ignore: EXCLUDED_GLOB_PATTEN,
  });

  if (!process.env.OPEN_AI_API_KEY) {
    throw new Error(
      'No OpenAI API key provided. Please set the OPEN_AI_API_KEY variable in the .env file.'
    );
  }

  logger(`   -> Base locale is ${BASE_LOCALE}`);
  logger(`   -> Auditing ${LOCALE_LIST_TO_TRANSLATE.length} locales`);
  logger(LOCALE_LIST_TO_TRANSLATE);
  logger(docList.map((path) => `${path}\n`));

  const tasks = LOCALE_LIST_TO_TRANSLATE.flatMap((locale) =>
    docList.map((docPath) =>
      limit(() => auditFile(docPath, locale as Locales, BASE_LOCALE))
    )
  );

  await Promise.all(tasks);
};

auditEntry().catch((err) => console.error('Audition failed:', err));
