import { Locales, logger } from '@intlayer/config';
import { getLocaleName } from '@intlayer/core';
import dotenv from 'dotenv';
import fg from 'fast-glob';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { OpenAI } from 'openai';
import pLimit from 'p-limit';
import { dirname, relative } from 'path';
import { BASE_LOCALE, LOCALE_LIST } from './common';
import { chunkText } from './utils/calculateChunks';
import { chunkInference } from './utils/chunkInference';
import { getChunk } from './utils/getChunk';
import { getIsFileUpdatedRecently } from './utils/getIsFileUpdatedRecently';
import { getIsSimilarStructure } from './utils/getIsSimilarStructure';
import { readFileContent } from './utils/readFileContent';

dotenv.config();

// Fill the list of files to audit if you want to audit only a subset of the files
// If empty list is provided, the audit will run on all markdown files present in the /en folder
const DOC_LIST: string[] = [
  // './docs/en/**/*.md',
  // './blog/en/**/*.md',
  './docs/en/**/configuration.md',
];
const EXCLUDED_GLOB_PATTEN: string[] = [
  '**/node_modules/**',
  '**/dist/**',
  '**/src/**',
];

// Number of files to process simultaneously
const NB_SIMULTANEOUS_FILE_PROCESSED: number = 1;

const CHECK_STRUCTURE_INCONSISTENCY: boolean = false;

const LOCALE_LIST_TO_TRANSLATE: Locales[] = LOCALE_LIST.filter(
  // Include all locales except English
  // Change it to include your specific locales if you want to translate only a subset of the locale(s)
  (locale) => locale === Locales.FRENCH
);

/**
 * Translate a single file for a given locale
 */
export const translateFile = async (
  filePath: string,
  locale: Locales,
  baseLocale: Locales
) => {
  try {
    const projectPath = process.cwd();
    const relativePath = relative(projectPath, filePath);
    logger(`${locale}: Translating file: ${relativePath}`);

    // Determine the target locale file path
    const localeFilePath = filePath.replace(`/${baseLocale}/`, `/${locale}/`);
    const fileContent = await readFileContent(filePath);
    let fileResultContent = fileContent;

    // Skipping conditions
    if (existsSync(localeFilePath)) {
      if (CHECK_STRUCTURE_INCONSISTENCY) {
        const translatedFileContent = await readFileContent(localeFilePath);
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
    const basePrompt = (await readFileContent('./src/TRANSLATE_PROMPT.md'))
      .replaceAll('{{locale}}', locale)
      .replaceAll('{{localeName}}', getLocaleName(locale));

    const openai: OpenAI = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    // 1. Chunk the file by number of lines instead of characters
    const chunks = chunkText(fileContent);
    logger(`   -> File will be split into ${chunks.length} chunk(s)`);

    for (let i = 0; i < chunks.length; i++) {
      const isFirstChunk = i === 0;
      const isLastChunk = i === chunks.length - 1;

      const getFileToTranslatePrevChunk = () =>
        getChunk(fileResultContent, chunks[i - 1]);

      // Build the chunk-specific prompt
      const getPrevChunkPrompt = () =>
        `**CHUNK ${i} of ${chunks.length}** that has been translated in ${getLocaleName(locale)} (${locale}):\n` +
        `---chunkStart---` +
        getFileToTranslatePrevChunk() +
        `---chunkEnd---`;

      const getCurrentChunkPrompt = () =>
        `The next user message will be the **CHUNK ${i + 1} of ${chunks.length}** in ${getLocaleName(baseLocale)} (${baseLocale}) to translate in ${getLocaleName(locale)} (${locale}):`;

      const getNextChunkPrompt = () =>
        `**CHUNK ${i + 2} of ${chunks.length}** as context for formatting in ${getLocaleName(baseLocale)} (${baseLocale}):\n` +
        `---chunkStart---` +
        chunks[i + 1].content +
        `---chunkEnd---`;

      const fileToTranslateCurrentChunk = chunks[i].content;

      // Make the actual translation call
      const chunkTranslation = await chunkInference(openai, [
        { role: 'system', content: basePrompt },
        ...(isFirstChunk
          ? []
          : ([{ role: 'system', content: getPrevChunkPrompt() }] as const)),
        ...(isLastChunk
          ? []
          : ([{ role: 'system', content: getNextChunkPrompt() }] as const)),
        {
          role: 'system',
          content: getCurrentChunkPrompt(),
        },
        { role: 'user', content: fileToTranslateCurrentChunk },
      ]);

      // Replace the chunk in the file content
      fileResultContent = fileResultContent.replace(
        fileToTranslateCurrentChunk,
        chunkTranslation
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
 * Main translate function: scans all .md files in "en/" (unless you specified DOC_LIST),
 * then translates them to each locale in LOCALE_LIST.
 */
export const translateEntry = async () => {
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
  logger(`   -> Translating ${LOCALE_LIST_TO_TRANSLATE.length} locales`);
  logger(LOCALE_LIST_TO_TRANSLATE);
  logger(docList);

  const tasks = LOCALE_LIST_TO_TRANSLATE.flatMap((locale) =>
    docList.map((docPath) =>
      limit(() => translateFile(docPath, locale as Locales, BASE_LOCALE))
    )
  );

  await Promise.all(tasks);
};

translateEntry().catch((err) => console.error('Translation failed:', err));
