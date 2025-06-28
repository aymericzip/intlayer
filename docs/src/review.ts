import { Locales, logger, retryManager } from '@intlayer/config';
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
import { fixChunkStartEndChars } from './utils/fixChunkStartEndChars';
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

    let updatedFileContent = fileToReviewContent;
    let fileResultContent = '';

    // Prepare the base prompt for ChatGPT
    const basePrompt = (await readFileContent('./src/REVIEW_PROMPT.md'))
      .replaceAll('{{locale}}', locale)
      .replaceAll('{{localeName}}', getLocaleName(locale, baseLocale));

    const openai: OpenAI = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    const baseChunks = chunkText(basedFileContent, 800, 0);

    logger(`   -> Base file will be split into ${baseChunks.length} chunk(s)`);

    for (let i = 0; i < baseChunks.length; i++) {
      const baseChunkContext = baseChunks[i];

      const getBaseChunkContextPrompt = () =>
        `**CHUNK ${i + 1} to ${Math.min(i + 3, baseChunks.length)} of ${baseChunks.length}** is the base chunk in ${getLocaleName(baseLocale, baseLocale)} (${baseLocale}) as reference.\n` +
        `///chunksStart///` +
        (baseChunks[i - 1]?.content ?? '') +
        baseChunkContext.content +
        (baseChunks[i + 1]?.content ?? '') +
        `///chunksEnd///`;

      const getChunkToReviewPrompt = () =>
        `**CHUNK ${i + 1} to ${Math.min(i + 3, baseChunks.length)} of ${baseChunks.length}** is the current chunk to review in ${getLocaleName(locale, baseLocale)} (${locale}) as reference.\n` +
        `///chunksStart///` +
        getChunk(updatedFileContent, {
          lineStart: baseChunks[i - 1]?.lineStart ?? 0,
          lineLength:
            (baseChunks[i - 1]?.lineLength ?? 0) +
            baseChunkContext.lineLength +
            (baseChunks[i + 1]?.lineLength ?? 0),
        }) +
        `///chunksEnd///`;

      // Make the actual translation call
      let reviewedChunkResult = await retryManager(async () => {
        const result = await chunkInference(openai, [
          { role: 'system', content: basePrompt },
          { role: 'system', content: getBaseChunkContextPrompt() },
          { role: 'system', content: getChunkToReviewPrompt() },
          {
            role: 'system',
            content: `The next user message will be the **CHUNK ${i + 1} of ${baseChunks.length}** that should be translated in ${getLocaleName(locale, baseLocale)} (${locale}).`,
          },
          { role: 'user', content: baseChunkContext.content },
        ]);

        const fixedReviewedChunkResult = fixChunkStartEndChars(
          result,
          baseChunkContext.content
        );

        return fixedReviewedChunkResult;
      })();

      updatedFileContent = updatedFileContent.replace(
        baseChunkContext.content,
        reviewedChunkResult
      );

      fileResultContent += reviewedChunkResult;
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
