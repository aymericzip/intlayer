import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { listGitFiles, parallelize, pLimit } from '@intlayer/chokidar';
import {
  ANSIColors,
  colorize,
  colorizeNumber,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import type { Locale } from '@intlayer/types';
import fg from 'fast-glob';
import { checkFileModifiedRange } from '../utils/checkFileModifiedRange';
import { getOutputFilePath } from '../utils/getOutputFilePath';
import { setupAI } from '../utils/setupAI';
import { translateFile } from './translateFile';
import type { ErrorState, TranslateDocOptions } from './types';

export const translateDoc = async ({
  docPattern,
  locales,
  excludedGlobPattern,
  baseLocale,
  aiOptions,
  nbSimultaneousFileProcessed = 20, // Default to a higher concurrency for chunks
  configOptions,
  customInstructions,
  skipIfModifiedBefore,
  skipIfModifiedAfter,
  skipIfExists,
  gitOptions,
  flushStrategy = 'incremental',
}: TranslateDocOptions) => {
  const configuration = getConfiguration(configOptions);
  const appLogger = getAppLogger(configuration);

  // 1. GLOBAL QUEUE SETUP
  // We use pLimit to create a single bottleneck for AI requests.
  // This queue is shared across all files and locales.
  const maxConcurrentChunks = nbSimultaneousFileProcessed;
  const globalChunkLimiter = pLimit(maxConcurrentChunks);

  let docList: string[] = await fg(docPattern, {
    ignore: excludedGlobPattern,
  });

  const aiResult = await setupAI(configuration, aiOptions);
  if (!aiResult?.hasAIAccess) return;
  const { aiClient, aiConfig } = aiResult;

  if (gitOptions) {
    const gitChangedFiles = await listGitFiles(gitOptions);
    if (gitChangedFiles) {
      docList = docList.filter((path) =>
        gitChangedFiles.some((gitFile) => join(process.cwd(), path) === gitFile)
      );
    }
  }

  const batchStartTime = performance.now();

  appLogger(
    `Translating ${colorizeNumber(docList.length)} files to ${colorizeNumber(locales.length)} locales. \n` +
      `Global Concurrency: ${colorizeNumber(maxConcurrentChunks)} chunks in parallel.`
  );

  const errorState: ErrorState = {
    count: 0,
    maxErrors: 5,
    shouldStop: false,
  };

  // 2. FLATTENED TASK LIST
  // We create a task for every File x Locale combination.
  const allTasks = docList.flatMap((docPath) =>
    locales.map((locale) => async () => {
      if (errorState.shouldStop) return;

      const absoluteBaseFilePath = join(configuration.content.baseDir, docPath);
      const outputFilePath = getOutputFilePath(
        absoluteBaseFilePath,
        locale,
        baseLocale
      );

      // Skip logic
      if (skipIfExists && existsSync(outputFilePath)) return;

      if (flushStrategy === 'incremental' && !existsSync(outputFilePath)) {
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

      // Execute translation using the SHARED limiter
      await translateFile({
        baseFilePath: absoluteBaseFilePath,
        outputFilePath,
        locale: locale as Locale,
        baseLocale,
        configuration,
        errorState,
        aiOptions,
        customInstructions,
        aiClient,
        aiConfig,
        flushStrategy,
        limit: globalChunkLimiter, // Pass the global queue
      });
    })
  );

  // 3. HIGH-THROUGHPUT FILE OPENER
  // We open many files simultaneously (e.g., 50) to ensure the global chunk queue
  // is always saturated with work.
  // If we open too few files, the chunk queue might drain faster than we can read new files.
  const FILE_OPEN_LIMIT = 50;

  await parallelize(allTasks, (task) => task(), FILE_OPEN_LIMIT);

  const batchEndTime = performance.now();
  const batchDuration = ((batchEndTime - batchStartTime) / 1000).toFixed(2);

  if (errorState.count > 0) {
    appLogger(`Finished with ${errorState.count} errors in ${batchDuration}s.`);
  } else {
    appLogger(
      `${colorize('✔', ANSIColors.GREEN)} Batch completed successfully in ${colorizeNumber(batchDuration)}s.`
    );
  }
};
