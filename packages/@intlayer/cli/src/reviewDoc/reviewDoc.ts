import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { AIConfig } from '@intlayer/ai';
import type { AIOptions } from '@intlayer/api';
import * as ANSIColors from '@intlayer/config/colors';
import {
  colorize,
  colorizeNumber,
  getAppLogger,
  x,
} from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import {
  type ListGitFilesOptions,
  listGitFiles,
  listGitLines,
  logConfigDetails,
} from '@intlayer/engine/cli';
import {
  buildReviewReport,
  type ReviewReportSummary,
} from '@intlayer/engine/docReview';
import { formatLocale, formatPath, parallelize } from '@intlayer/engine/utils';
import type { Locale } from '@intlayer/types/allLocales';
import fg from 'fast-glob';
import { checkFileModifiedRange } from '../utils/checkFileModifiedRange';
import { formatLineRanges } from '../utils/formatLineRanges';
import { getOutputFilePath } from '../utils/getOutputFilePath';
import { type AIClient, setupAI } from '../utils/setupAI';
import { reviewFileBlockAware } from './reviewDocBlockAware';
import { buildFileReviewReport, logReviewFileBlocks } from './reviewDocLog';
import { createReviewProgressLogger } from './reviewDocProgress';
import {
  formatReviewSynthesis,
  type ReviewFileResult,
  type ReviewOutcome,
} from './reviewDocSynthesis';

/**
 * How the review should be run.
 *
 * - `apply`: translate the diverging blocks with AI and write the target files.
 * - `report`: no AI. Log every block that needs attention (line numbers and
 *   content, for both locales) so another agent can generate the translations.
 * - `synthesis`: no AI, no per-block output. Only log the final synthesis of the
 *   documents that are up to date and the ones that still have blocks to edit.
 */
export type ReviewDocMode = 'apply' | 'report' | 'synthesis';

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
  skipIfExists?: boolean;
  gitOptions?: ListGitFilesOptions;
  /** How the review should be run. Defaults to `apply`. See {@link ReviewDocMode}. */
  mode?: ReviewDocMode;
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
  skipIfExists,
  gitOptions,
  mode = 'apply',
}: ReviewDocOptions) => {
  const configuration = getConfiguration(configOptions);
  logConfigDetails(configOptions);

  const appLogger = getAppLogger({ log: { ...configuration.log, prefix: '' } });

  // The `report` and `synthesis` modes never call an AI, so the AI access
  // checks are skipped.
  let aiClient: AIClient | undefined;
  let aiConfig: AIConfig | undefined;

  if (mode === 'apply') {
    const aiResult = await setupAI(configuration, aiOptions);

    if (!aiResult?.hasAIAccess) return [];

    aiClient = aiResult.aiClient;
    aiConfig = aiResult.aiConfig;

    if (aiResult.isCustomAI && aiClient && aiConfig) {
      const { hasAIAccess, error } = await aiClient.checkAISDKAccess(aiConfig);
      if (!hasAIAccess) {
        appLogger(`${x} ${error}`);
        return [];
      }
    }
  }

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

  // In `synthesis` mode only the final recap is printed, so the per-file
  // progress logs are muted.
  const logProgress: typeof appLogger = (...content) => {
    if (mode === 'synthesis') return;
    appLogger(...content);
  };

  // Filled by every task, then rendered as the end-of-run synthesis.
  const reviewResults: ReviewFileResult[] = [];

  /** A document is up to date when no block has to be added, reviewed or removed. */
  const getOutcome = (summary: ReviewReportSummary): ReviewOutcome =>
    summary.review + summary.insertNew + summary.delete > 0
      ? 'toEdit'
      : 'upToDate';

  // Create all tasks to be processed
  const allTasks = docList.flatMap((docPath) =>
    locales.map((locale) => async () => {
      logProgress(
        `Reviewing file: ${formatPath(docPath)} to ${formatLocale(locale)}`
      );

      const absoluteBaseFilePath = join(configuration.system.baseDir, docPath);
      const outputFilePath = getOutputFilePath(
        absoluteBaseFilePath,
        locale,
        baseLocale
      );

      // Skip if file exists and skipIfExists option is enabled
      if (skipIfExists && existsSync(outputFilePath)) {
        const relativePath = relative(
          configuration.system.baseDir,
          outputFilePath
        );
        logProgress(
          `${colorize('⊘', ANSIColors.YELLOW)} File ${formatPath(relativePath)} already exists, skipping.`
        );
        reviewResults.push({ docPath, locale, outcome: 'skipped' });
        return;
      }

      // Check modification range only if the file exists
      if (existsSync(outputFilePath)) {
        const fileModificationData = checkFileModifiedRange(outputFilePath, {
          skipIfModifiedBefore,
          skipIfModifiedAfter,
        });

        if (fileModificationData.isSkipped) {
          logProgress(fileModificationData.message);
          reviewResults.push({ docPath, locale, outcome: 'skipped' });
          return;
        }
      } else if (skipIfModifiedBefore || skipIfModifiedAfter) {
        // Log if we intended to check modification time but couldn't because the file doesn't exist
        logProgress(
          `${colorize('!', ANSIColors.YELLOW)} File ${formatPath(outputFilePath)} does not exist, skipping modification date check.`
        );
      }

      let changedLines: number[] | undefined;
      // FIXED: Enable git optimization that was previously commented out
      if (gitOptions) {
        const gitChangedLines = await listGitLines(
          absoluteBaseFilePath,
          gitOptions
        );
        changedLines = gitChangedLines;

        // Report the base lines that changed, then the corresponding line span
        // in the target document — i.e. the blocks the alignment will actually
        // re-translate. `review` blocks are exactly the aligned base blocks the
        // changed lines touched, so their `targetLineRange` is the matching span
        // in the existing translation.
        logProgress(
          `Changed lines (${formatLocale(baseLocale)}): ${formatLineRanges(gitChangedLines)}`
        );

        const baseText = await readFile(absoluteBaseFilePath, 'utf-8').catch(
          () => ''
        );
        const targetText = existsSync(outputFilePath)
          ? await readFile(outputFilePath, 'utf-8').catch(() => '')
          : '';

        const { blocks } = buildReviewReport({
          baseText,
          targetText,
          changedLines: gitChangedLines,
        });

        const correspondingTargetLines = blocks.flatMap((block) => {
          if (block.action !== 'review' || !block.targetLineRange) return [];

          const { start, end } = block.targetLineRange;
          return Array.from(
            { length: end - start + 1 },
            (_unused, offset) => start + offset
          );
        });

        logProgress(
          `Corresponding block (${formatLocale(locale)}): ${formatLineRanges(correspondingTargetLines)}`
        );
      }

      if (mode !== 'apply') {
        const report = await buildFileReviewReport(
          absoluteBaseFilePath,
          outputFilePath,
          changedLines
        );

        if (mode === 'report') {
          logReviewFileBlocks(
            report,
            absoluteBaseFilePath,
            locale as Locale,
            baseLocale,
            configOptions
          );
        }

        reviewResults.push({
          docPath,
          locale,
          outcome: getOutcome(report.summary),
          summary: report.summary,
        });
        return;
      }

      const reviewSummary = await reviewFileBlockAware(
        absoluteBaseFilePath,
        outputFilePath,
        locale as Locale,
        baseLocale,
        aiOptions,
        configOptions,
        customInstructions,
        changedLines,
        aiClient,
        aiConfig
      );

      reviewResults.push({
        docPath,
        locale,
        outcome: getOutcome(reviewSummary),
        summary: reviewSummary,
      });
    })
  );

  // The per-file logs are muted in `synthesis` mode, so a progress line keeps
  // the run readable while every document is compared.
  const progressLogger = createReviewProgressLogger(allTasks.length);

  if (mode === 'synthesis') progressLogger.start();

  await parallelize(
    allTasks,
    async (task) => {
      await task();
      progressLogger.increment();
    },
    nbSimultaneousFileProcessed ?? 3
  );

  progressLogger.stop();

  const synthesis = formatReviewSynthesis(reviewResults, {
    hasAppliedChanges: mode === 'apply',
  });

  for (const line of synthesis.split('\n')) {
    appLogger(line);
  }

  return reviewResults;
};
