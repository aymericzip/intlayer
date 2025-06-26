import { Locales, logger } from '@intlayer/config';
import { getLocaleName } from '@intlayer/core';
import dotenv from 'dotenv';
import fg from 'fast-glob';
import { mkdirSync, writeFileSync } from 'fs';
import { OpenAI } from 'openai';
import pLimit from 'p-limit';
import { dirname, relative } from 'path';
import { BASE_LOCALE, LOCALE_LIST, readFileContent } from './common';
import { chunkInference, chunkStringByCharacters } from './utils';

dotenv.config();

// Fill the list of files to audit if you want to audit only a subset of the files
// If empty list is provided, the audit will run on all markdown files present in the /en folder
const DOC_LIST: string[] = ['./docs/en/**/*.md', './blog/en/**/*.md'];
const EXCLUDED_GLOB_PATTEN: string[] = [
  '**/node_modules/**',
  '**/dist/**',
  '**/src/**',
];

// Number of files to process simultaneously
const NB_SIMULTANEOUS_FILE_PROCESSED: number = 1;

const CHECK_STRUCTURE_INCONSISTENCY: boolean = false;

/**
 * You can tweak this to a smaller or larger size depending on how close you get to token limits.
 * If the content is significantly larger, you may need to reduce this chunk size.
 */
const CHUNK_SIZE_IN_CHARS = 8000;

const LOCALE_LIST_TO_TRANSLATE: Locales[] = LOCALE_LIST.filter(
  // Include all locales except English
  // Change it to include your specific locales if you want to audit only a subset of the locale(s)
  (locale) => locale !== Locales.ENGLISH
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

    // Prepare the base prompt for ChatGPT
    const basePrompt = (await readFileContent('./src/REVIEW_PROMPT.md'))
      .replaceAll('{{locale}}', locale)
      .replaceAll('{{localeName}}', getLocaleName(locale));

    const openai: OpenAI = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    // 1. Chunk the file if it is too large
    const baseChunks = chunkStringByCharacters(
      basedFileContent,
      CHUNK_SIZE_IN_CHARS
    );
    const fileToReviewChunks = chunkStringByCharacters(
      fileToReviewContent,
      CHUNK_SIZE_IN_CHARS
    );
    logger(`   -> Base file will be split into ${baseChunks.length} chunk(s)`);
    logger(
      `   -> File to review will be split into ${fileToReviewChunks.length} chunk(s)`
    );

    let auditedChunks: string[] = [];

    for (let i = 0; i < baseChunks.length; i++) {
      const isFirstChunk = i === 0;

      const prevBaseChunkPrompt = isFirstChunk
        ? ''
        : `
Below is **CHUNK ${i} of ${baseChunks.length}** is the base chunk in ${baseLocale} as reference.

---chunkStart---${fileToReviewChunks[i - 1]}---chunkEnd---`;

      const currentBaseChunkPrompt = isFirstChunk
        ? ''
        : `
Below is **CHUNK ${i + 1} of ${baseChunks.length}** is the base chunk in ${baseLocale} as reference.

---chunkStart---${fileToReviewChunks[i]}---chunkEnd---`;

      // Build the chunk-specific prompt
      const prevFileToReviewChunkPrompt = isFirstChunk
        ? ''
        : `
Below is **CHUNK ${i} of ${fileToReviewChunks.length}** that has been reviewed in ${locale}. 

---chunkStart---${fileToReviewChunks[i - 1]}---chunkEnd---

The following message will be the **CHUNK ${i + 1} of ${fileToReviewChunks.length}** to review in ${locale}:
`;

      const chunk = baseChunks[i];

      // Make the actual translation call
      const chunkAudition = await chunkInference(openai, [
        { role: 'system', content: basePrompt },
        { role: 'system', content: prevBaseChunkPrompt },
        { role: 'system', content: currentBaseChunkPrompt },
        { role: 'system', content: prevFileToReviewChunkPrompt },
        { role: 'user', content: fileToReviewChunks[i] },
      ]);

      // Collect the partial translation
      auditedChunks.push(chunkAudition);
    }

    // 2. Re-assemble all auditd chunks
    const finalAudition = auditedChunks.join('\n\n');

    // 4. Write the final translation to the appropriate file path
    const dir = dirname(localeFilePath);

    mkdirSync(dir, { recursive: true });
    writeFileSync(localeFilePath, finalAudition);

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
