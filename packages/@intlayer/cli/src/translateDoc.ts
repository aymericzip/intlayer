import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { readAsset } from 'utils:asset';
import type { AIConfig, AIOptions } from '@intlayer/ai';
import {
  formatLocale,
  formatPath,
  getChunk,
  type ListGitFilesOptions,
  listGitFiles,
  parallelize,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  colon,
  colorize,
  colorizeNumber,
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
  retryManager,
} from '@intlayer/config';
import type { IntlayerConfig, Locale } from '@intlayer/types';
import fg from 'fast-glob';
import { chunkText } from './utils/calculateChunks';
import { checkFileModifiedRange } from './utils/checkFileModifiedRange';
import { chunkInference } from './utils/chunkInference';
import { fixChunkStartEndChars } from './utils/fixChunkStartEndChars';
import { getOutputFilePath } from './utils/getOutputFilePath';
import { type AIClient, setupAI } from './utils/setupAI';

/**
 * Shared error state for circuit breaker pattern
 */
type ErrorState = {
  count: number;
  maxErrors: number;
  shouldStop: boolean;
};

/**
 * Translate a single file for a given locale
 * Returns TRUE if successful, FALSE if failed/skipped
 */
export const translateFile = async (
  baseFilePath: string,
  outputFilePath: string,
  locale: Locale,
  baseLocale: Locale,
  configuration: IntlayerConfig,
  errorState: ErrorState,
  aiOptions?: AIOptions,
  customInstructions?: string,
  aiClient?: AIClient,
  aiConfig?: AIConfig
): Promise<boolean> => {
  // Circuit Breaker Check
  if (errorState.shouldStop) {
    return false;
  }

  const appLogger = getAppLogger(configuration, {
    config: {
      prefix: '',
    },
  });

  try {
    // Read File
    const fileContent = await readFile(baseFilePath, 'utf-8');

    let fileResultContent = fileContent;

    // Prepare formatting
    const filePrefixText = `${ANSIColors.GREY_DARK}[${formatPath(baseFilePath)}${ANSIColors.GREY_DARK}] `;
    const filePrefix = [
      colon(filePrefixText, { colSize: 40 }),
      `→ ${ANSIColors.RESET}`,
    ].join('');

    const prefixText = `${ANSIColors.GREY_DARK}[${formatPath(baseFilePath)}${ANSIColors.GREY_DARK}][${formatLocale(locale)}${ANSIColors.GREY_DARK}] `;
    const prefix = [
      colon(prefixText, { colSize: 40 }),
      `→ ${ANSIColors.RESET}`,
    ].join('');

    // Chunking
    const chunks = chunkText(fileContent);
    appLogger(
      `${filePrefix}Base file splitted into ${colorizeNumber(chunks.length)} chunks`
    );

    // Instead of replacing content in a string, we push to an array
    const translatedParts: string[] = [];

    // Prepare Base Prompt
    const basePrompt = readAsset('./prompts/TRANSLATE_PROMPT.md', 'utf-8')
      .replaceAll('{{localeName}}', `${formatLocale(locale, false)}`)
      .replaceAll('{{baseLocaleName}}', `${formatLocale(baseLocale, false)}`)
      .replace('{{applicationContext}}', aiOptions?.applicationContext ?? '-')
      .replace('{{customInstructions}}', customInstructions ?? '-');

    // Iterate and Translate
    for await (const [i, chunk] of chunks.entries()) {
      // Circuit Breaker Check inside the loop (in case error happened elsewhere while processing)
      if (errorState.shouldStop) return false;

      const isFirstChunk = i === 0;
      const fileToTranslateCurrentChunk = chunk.content;

      // Build the chunk-specific prompt
      const getPrevChunkPrompt = () =>
        `**CHUNK ${i} of ${chunks.length}** that has been translated in ${formatLocale(locale)}:\n` +
        `///chunkStart///` +
        getChunk(translatedParts.join(''), chunks[i - 1]) +
        `///chunkEnd///`;

      const getBaseChunkContextPrompt = () =>
        `**CHUNK ${i + 1} to ${Math.min(i + 3, chunks.length)} of ${chunks.length}** is the base chunk in ${formatLocale(baseLocale, false)} as reference.\n` +
        `///chunksStart///` +
        (chunks[i - 1]?.content ?? '') +
        chunks[i].content +
        (chunks[i + 1]?.content ?? '') +
        `///chunksEnd///`;

      // Make the actual translation call
      const chunkTranslation = await retryManager(async () => {
        const result = await chunkInference(
          [
            { role: 'system', content: basePrompt },
            { role: 'system', content: getBaseChunkContextPrompt() },
            ...(isFirstChunk
              ? []
              : [{ role: 'system', content: getPrevChunkPrompt() } as const]),
            {
              role: 'system',
              content: `The next user message will be the **CHUNK ${colorizeNumber(i + 1)} of ${colorizeNumber(chunks.length)}** in ${formatLocale(baseLocale, false)} to translate in ${formatLocale(locale, false)}.\n
                STRICT INSTRUCTIONS:
                1. Translate ONLY the content of this specific chunk. 
                2. Do NOT repeat the content from the previous chunk.
                3. Start the translation exactly where the previous chunk ended.
                4. Preserve all code blocks and formatting exactly.`,
            },
            { role: 'user', content: fileToTranslateCurrentChunk },
          ],
          aiOptions,
          configuration,
          aiClient,
          aiConfig
        );

        appLogger(
          [
            `${prefix}`,
            `${ANSIColors.GREY_DARK}[Chunk `,
            colorizeNumber(i + 1),
            `${ANSIColors.GREY_DARK} of `,
            colorizeNumber(chunks.length),
            `${ANSIColors.GREY_DARK}] →${ANSIColors.RESET} `,
            `${colorizeNumber(result.tokenUsed)} tokens used`,
          ].join('')
        );

        const fixedTranslatedChunkResult = fixChunkStartEndChars(
          result?.fileContent,
          fileToTranslateCurrentChunk
        );

        return fixedTranslatedChunkResult;
      })();

      // Replace the chunk in the file content
      fileResultContent = fileResultContent.replace(
        fileToTranslateCurrentChunk,
        chunkTranslation
      );
    }

    // Write final file by joining parts
    const finalContent = translatedParts.join('');

    mkdirSync(dirname(outputFilePath), { recursive: true });
    writeFileSync(outputFilePath, finalContent);

    const relativePath = relative(
      configuration.content.baseDir,
      outputFilePath
    );

    appLogger(
      `${colorize('✔', ANSIColors.GREEN)} File ${formatPath(relativePath)} created/updated successfully.`
    );

    return true; // Success
  } catch (error: any) {
    // Handle Errors and Update State

    errorState.count++;

    // If it's an Access Denied error, stop immediately (set count to max)
    const errorString = JSON.stringify(error);
    const errorMessage = error?.message ?? '';
    if (
      errorString.includes('AI_ACCESS_DENIED') ||
      errorMessage.includes('Access keys') ||
      errorMessage.includes('Access denied') ||
      errorMessage.includes('Invalid Access keys')
    ) {
      errorState.count = errorState.maxErrors + 1;
      appLogger(
        `${colorize('✖', ANSIColors.RED)} Critical Authentication Error. Aborting all tasks.`
      );
    }

    if (errorState.count >= errorState.maxErrors && !errorState.shouldStop) {
      errorState.shouldStop = true;
      appLogger(
        `${colorize('✖', ANSIColors.RED)} Too many errors (${errorState.count}). Stopping process.`
      );
    }

    return false; // Failed
  }
};

type TranslateDocOptions = {
  docPattern: string[];
  locales: Locale[];
  excludedGlobPattern: string[];
  baseLocale: Locale;
  aiOptions?: AIOptions;
  nbSimultaneousFileProcessed?: number;
  configOptions?: GetConfigurationOptions;
  customInstructions?: string;
  skipIfModifiedBefore?: number | string | Date;
  skipIfModifiedAfter?: number | string | Date;
  skipIfExists?: boolean;
  gitOptions?: ListGitFilesOptions;
};

/**
 * Main translate function: scans all .md files in "en/" (unless you specified DOC_LIST),
 * then translates them to each locale in LOCALE_LIST.
 */
export const translateDoc = async ({
  docPattern,
  locales,
  excludedGlobPattern,
  baseLocale,
  aiOptions,
  nbSimultaneousFileProcessed,
  configOptions,
  customInstructions,
  skipIfModifiedBefore,
  skipIfModifiedAfter,
  skipIfExists,
  gitOptions,
}: TranslateDocOptions) => {
  const configuration = getConfiguration(configOptions);
  const appLogger = getAppLogger(configuration);

  if (nbSimultaneousFileProcessed && nbSimultaneousFileProcessed > 10) {
    appLogger(
      `Warning: nbSimultaneousFileProcessed is set to ${nbSimultaneousFileProcessed}, which is greater than 10. Setting it to 10.`
    );
    nbSimultaneousFileProcessed = 10; // Limit the number of simultaneous file processed to 10
  }

  let docList: string[] = await fg(docPattern, {
    ignore: excludedGlobPattern,
  });

  const aiResult = await setupAI(configuration, aiOptions);

  if (!aiResult?.hasAIAccess) return;

  const { aiClient, aiConfig } = aiResult;

  if (gitOptions) {
    const gitChangedFiles = await listGitFiles(gitOptions);

    if (gitChangedFiles) {
      // Convert dictionary file paths to be relative to git root for comparison

      // Filter dictionaries based on git changed files
      docList = docList.filter((path) =>
        gitChangedFiles.some((gitFile) => join(process.cwd(), path) === gitFile)
      );
    }
  }

  // OAuth handled by API proxy internally

  appLogger(`Base locale is ${formatLocale(baseLocale)}`);
  appLogger(
    `Translating ${colorizeNumber(locales.length)} locales: [ ${formatLocale(locales)} ]`
  );

  appLogger(`Translating ${colorizeNumber(docList.length)} files:`);
  docList.forEach((path) => {
    appLogger(` - ${formatPath(path)}`);
  });

  // Initialize Error State
  const MAX_ALLOWED_ERRORS = 5;
  const errorState: ErrorState = {
    count: 0,
    maxErrors: MAX_ALLOWED_ERRORS,
    shouldStop: false,
  };

  // Create all tasks to be processed
  const allTasks = docList.flatMap((docPath) =>
    locales.map((locale) => async () => {
      // Early exit if too many errors
      if (errorState.shouldStop) return;

      appLogger(
        `Translating file: ${formatPath(docPath)} to ${formatLocale(locale)}`
      );

      const absoluteBaseFilePath = join(configuration.content.baseDir, docPath);
      const outputFilePath = getOutputFilePath(
        absoluteBaseFilePath,
        locale,
        baseLocale
      );

      // Skip if file exists and skipIfExists option is enabled
      if (skipIfExists && existsSync(outputFilePath)) {
        const relativePath = relative(
          configuration.content.baseDir,
          outputFilePath
        );
        appLogger(
          `${colorize('⊘', ANSIColors.YELLOW)} File ${formatPath(relativePath)} already exists, skipping.`
        );
        return;
      }

      // check if the file exist, otherwise create it
      if (!existsSync(outputFilePath)) {
        const relativePath = relative(
          configuration.content.baseDir,
          outputFilePath
        );
        appLogger(
          `File ${formatPath(relativePath)} does not exist, creating it...`
        );
        mkdirSync(dirname(outputFilePath), { recursive: true });
        writeFileSync(outputFilePath, '');
      }

      const fileModificationData = checkFileModifiedRange(outputFilePath, {
        skipIfModifiedBefore,
        skipIfModifiedAfter,
      });

      if (fileModificationData.isSkipped) {
        appLogger(fileModificationData.message);
        return;
      }

      // Call translateFile with errorState
      await translateFile(
        absoluteBaseFilePath,
        outputFilePath,
        locale as Locale,
        baseLocale,
        configuration,
        errorState,
        aiOptions,
        customInstructions,
        aiClient,
        aiConfig
      );
    })
  );

  await parallelize(
    allTasks,
    (task) => task(),
    nbSimultaneousFileProcessed ?? 3
  );

  if (errorState.count > 0) {
    appLogger(
      `Process finished with ${colorizeNumber(errorState.count)} error${errorState.count === 1 ? '' : 's'}.`
    );
  }
};
