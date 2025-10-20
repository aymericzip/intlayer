import { mkdirSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { readAsset } from 'utils:asset';
import type { AIOptions } from '@intlayer/api'; // OAuth handled by API proxy
import {
  formatLocale,
  formatPath,
  getChunk,
  type ListGitFilesOptions,
  listGitFiles,
  listGitLines,
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
import { getLocaleName } from '@intlayer/core';
import { type Locale, Locales } from '@intlayer/types';
import fg from 'fast-glob';
import { chunkText } from './utils/calculateChunks';
import { checkAIAccess } from './utils/checkAccess';
import { checkFileModifiedRange } from './utils/checkFileModifiedRange';
import { chunkInference } from './utils/chunkInference';
import { fixChunkStartEndChars } from './utils/fixChunkStartEndChars';
import { getOutputFilePath } from './utils/getOutputFilePath';
import { mapChunksBetweenFiles } from './utils/mapChunksBetweenFiles';

/**
 * Translate a single file for a given locale
 */
export const reviewFile = async (
  baseFilePath: string,
  outputFilePath: string,
  locale: Locale,
  baseLocale: Locale,
  aiOptions?: AIOptions,
  configOptions?: GetConfigurationOptions,
  customInstructions?: string,
  changedLines?: number[]
) => {
  try {
    const configuration = getConfiguration(configOptions);
    const appLogger = getAppLogger(configuration);

    const basedFileContent = await readFile(baseFilePath, 'utf-8');
    const fileToReviewContent = await readFile(outputFilePath, 'utf-8');

    let updatedFileContent = fileToReviewContent;
    let fileResultContent = '';

    // Prepare the base prompt for ChatGPT
    const basePrompt = readAsset('./prompts/REVIEW_PROMPT.md', 'utf-8')
      .replaceAll('{{localeName}}', `${formatLocale(locale, false)}`)
      .replaceAll('{{baseLocaleName}}', `${formatLocale(baseLocale, false)}`)
      .replace('{{applicationContext}}', aiOptions?.applicationContext ?? '-')
      .replace('{{customInstructions}}', customInstructions ?? '-');

    const filePrexixText = `${ANSIColors.GREY_DARK}[${formatPath(baseFilePath)}${ANSIColors.GREY_DARK}] `;
    const filePrefix = [
      colon(filePrexixText, { colSize: 40 }),
      `→ ${ANSIColors.RESET}`,
    ].join('');

    const prefixText = `${ANSIColors.GREY_DARK}[${formatPath(baseFilePath)}${ANSIColors.GREY_DARK}][${formatLocale(locale)}${ANSIColors.GREY_DARK}] `;
    const prefix = [
      colon(prefixText, { colSize: 40 }),
      `→ ${ANSIColors.RESET}`,
    ].join('');

    // FIXED: Use proper chunk mapping when changed lines are available
    if (changedLines && changedLines.length > 0) {
      appLogger(
        `${filePrefix}Using optimization with ${colorizeNumber(changedLines.length)} changed lines`
      );

      // Map chunks between base and updated files properly
      const chunkMappings = mapChunksBetweenFiles(
        basedFileContent,
        updatedFileContent,
        800,
        changedLines
      );

      appLogger(
        `${filePrefix}Base file mapped to ${colorizeNumber(chunkMappings.length)} chunk mappings`
      );

      for await (const [i, mapping] of chunkMappings.entries()) {
        const { baseChunk, updatedChunk, hasChanges } = mapping;

        if (!hasChanges && updatedChunk) {
          // No changes detected, use the existing translated content
          appLogger(
            `${prefix}No changes found for chunk ${colorizeNumber(i + 1)}, preserving existing translation`
          );

          // Extract the corresponding chunk from the existing translated file
          const existingChunk = getChunk(fileToReviewContent, {
            lineStart: updatedChunk.lineStart,
            lineLength: updatedChunk.lineLength,
          });

          fileResultContent += existingChunk;
          continue;
        }

        if (!updatedChunk) {
          // Chunk was completely deleted, skip it
          appLogger(
            `${prefix}Chunk ${colorizeNumber(i + 1)} was deleted, skipping`
          );
          continue;
        }

        // Process chunks with changes
        const baseChunkContext = baseChunk;

        const getBaseChunkContextPrompt = () =>
          `**CHUNK ${i + 1} of ${chunkMappings.length}** is the base chunk in ${formatLocale(baseLocale, false)} as reference.\n` +
          `///chunksStart///` +
          baseChunkContext.content +
          `///chunksEnd///`;

        const getChunkToReviewPrompt = () =>
          `**CHUNK ${i + 1} of ${chunkMappings.length}** is the current chunk to review in ${formatLocale(locale, false)}.\n` +
          `///chunksStart///` +
          updatedChunk.content +
          `///chunksEnd///`;

        // Make the actual translation call
        const reviewedChunkResult = await retryManager(async () => {
          const result = await chunkInference(
            [
              { role: 'system', content: basePrompt },
              { role: 'system', content: getBaseChunkContextPrompt() },
              { role: 'system', content: getChunkToReviewPrompt() },
              {
                role: 'system',
                content: `The next user message will be the **CHUNK ${colorizeNumber(i + 1)} of ${colorizeNumber(chunkMappings.length)}** that should be translated in ${getLocaleName(locale, Locales.ENGLISH)} (${locale}).`,
              },
              { role: 'user', content: baseChunkContext.content },
            ],
            aiOptions,
            configuration
          );

          appLogger(
            `${prefix}${colorizeNumber(result.tokenUsed)} tokens used - Chunk ${colorizeNumber(i + 1)} of ${colorizeNumber(chunkMappings.length)}`
          );

          const fixedReviewedChunkResult = fixChunkStartEndChars(
            result?.fileContent,
            baseChunkContext.content
          );

          return fixedReviewedChunkResult;
        })();

        fileResultContent += reviewedChunkResult;
      }
    } else {
      // FALLBACK: Process all chunks when no optimization is available
      appLogger(`${filePrefix}Processing all chunks (no optimization)`);

      const baseChunks = chunkText(basedFileContent, 800, 0);
      appLogger(
        `${filePrefix}Base file splitted into ${colorizeNumber(baseChunks.length)} chunks`
      );

      for await (const [i, baseChunk] of baseChunks.entries()) {
        const baseChunkContext = baseChunk;

        const getBaseChunkContextPrompt = () =>
          `**CHUNK ${i + 1} to ${Math.min(i + 3, baseChunks.length)} of ${baseChunks.length}** is the base chunk in ${formatLocale(baseLocale, false)} as reference.\n` +
          `///chunksStart///` +
          (baseChunks[i - 1]?.content ?? '') +
          baseChunkContext.content +
          (baseChunks[i + 1]?.content ?? '') +
          `///chunksEnd///`;

        const getChunkToReviewPrompt = () =>
          `**CHUNK ${i + 1} to ${Math.min(i + 3, baseChunks.length)} of ${baseChunks.length}** is the current chunk to review in ${formatLocale(locale, false)} as reference.\n` +
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
        const reviewedChunkResult = await retryManager(async () => {
          const result = await chunkInference(
            [
              { role: 'system', content: basePrompt },
              { role: 'system', content: getBaseChunkContextPrompt() },
              { role: 'system', content: getChunkToReviewPrompt() },
              {
                role: 'system',
                content: `The next user message will be the **CHUNK ${colorizeNumber(i + 1)} of ${colorizeNumber(baseChunks.length)}** that should be translated in ${getLocaleName(locale, Locales.ENGLISH)} (${locale}).`,
              },
              { role: 'user', content: baseChunkContext.content },
            ],
            aiOptions,
            configuration
          );

          appLogger(
            `${prefix}${colorizeNumber(result.tokenUsed)} tokens used - Chunk ${colorizeNumber(i + 1)} of ${colorizeNumber(baseChunks.length)}`
          );

          const fixedReviewedChunkResult = fixChunkStartEndChars(
            result?.fileContent,
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
    }

    mkdirSync(dirname(outputFilePath), { recursive: true });
    writeFileSync(outputFilePath, fileResultContent);

    const relativePath = relative(
      configuration.content.baseDir,
      outputFilePath
    );

    appLogger(
      `${colorize('✔', ANSIColors.GREEN)} File ${formatPath(relativePath)} created/updated successfully.`
    );
  } catch (error) {
    console.error(error);
  }
};

type ReviewDocOptions = {
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
  gitOptions?: ListGitFilesOptions;
};

/**
 * Main audit function: scans all .md files in "en/" (unless you specified DOC_LIST),
 * then audits them to each locale in LOCALE_LIST.
 */
export const reviewDoc = async ({
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
  gitOptions,
}: ReviewDocOptions) => {
  const configuration = getConfiguration(configOptions);
  const appLogger = getAppLogger(configuration);

  const hasCMSAuth = await checkAIAccess(configuration, aiOptions);

  if (!hasCMSAuth) return;

  if (nbSimultaneousFileProcessed && nbSimultaneousFileProcessed > 10) {
    appLogger(
      `Warning: nbSimultaneousFileProcessed is set to ${nbSimultaneousFileProcessed}, which is greater than 10. Setting it to 10.`
    );
    nbSimultaneousFileProcessed = 10; // Limit the number of simultaneous file processed to 10
  }

  let docList: string[] = await fg(docPattern, {
    ignore: excludedGlobPattern,
  });

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
    `Reviewing ${colorizeNumber(locales.length)} locales: [ ${formatLocale(locales)} ]`
  );

  appLogger(`Reviewing ${colorizeNumber(docList.length)} files:`);
  appLogger(docList.map((path) => ` - ${formatPath(path)}\n`));

  // Create all tasks to be processed
  const allTasks = docList.flatMap((docPath) =>
    locales.map((locale) => async () => {
      appLogger(
        `Reviewing file: ${formatPath(docPath)} to ${formatLocale(locale)}`
      );

      const absoluteBaseFilePath = join(configuration.content.baseDir, docPath);
      const outputFilePath = getOutputFilePath(
        absoluteBaseFilePath,
        locale,
        baseLocale
      );

      const fileModificationData = checkFileModifiedRange(outputFilePath, {
        skipIfModifiedBefore,
        skipIfModifiedAfter,
      });

      if (fileModificationData.isSkipped) {
        appLogger(fileModificationData.message);
        return;
      }

      let changedLines: number[] | undefined;
      // FIXED: Enable git optimization that was previously commented out
      if (gitOptions) {
        const gitChangedLines = await listGitLines(
          absoluteBaseFilePath,
          gitOptions
        );

        appLogger(`Git changed lines: ${gitChangedLines.join(', ')}`);
        changedLines = gitChangedLines;
      }

      await reviewFile(
        absoluteBaseFilePath,
        outputFilePath,
        locale as Locale,
        baseLocale,
        aiOptions,
        configOptions,
        customInstructions,
        changedLines
      );
    })
  );

  await parallelize(
    allTasks,
    (task) => task(),
    nbSimultaneousFileProcessed ?? 3
  );
};
