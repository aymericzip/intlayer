import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import {
  buildReviewReport,
  formatReviewReport,
  type ReviewReport,
} from '@intlayer/engine/docReview';
import { formatLocale, formatPath } from '@intlayer/engine/utils';
import type { Locale } from '@intlayer/types/allLocales';

/**
 * Compare a base document with its translation without calling any AI.
 *
 * @param baseFilePath - Absolute path of the base (source) document.
 * @param outputFilePath - Absolute path of the target (translated) document.
 * @param changedLines - 1-based base line numbers that changed (from git), if any.
 * @returns The structured review report.
 */
export const buildFileReviewReport = async (
  baseFilePath: string,
  outputFilePath: string,
  changedLines?: number[]
): Promise<ReviewReport> => {
  const baseText = await readFile(baseFilePath, 'utf-8');
  const targetText = existsSync(outputFilePath)
    ? await readFile(outputFilePath, 'utf-8').catch(() => '')
    : '';

  return buildReviewReport({ baseText, targetText, changedLines });
};

/**
 * Log the blocks that need attention (with their line ranges and content) for a
 * single file/locale pair, so another agent or a human can generate the missing
 * translations.
 *
 * @param report - The report built by {@link buildFileReviewReport}.
 * @param baseFilePath - Absolute path of the base (source) document.
 * @param locale - The target locale being reviewed.
 * @param baseLocale - The base locale used as reference.
 * @param configOptions - Optional Intlayer configuration overrides.
 */
export const logReviewFileBlocks = (
  report: ReviewReport,
  baseFilePath: string,
  locale: Locale,
  baseLocale: Locale,
  configOptions?: GetConfigurationOptions
): void => {
  const configuration = getConfiguration(configOptions);
  const appLogger = getAppLogger({ log: { ...configuration.log, prefix: '' } });

  const formatted = formatReviewReport(report, {
    baseLabel: formatLocale(baseLocale),
    targetLabel: formatLocale(locale),
  });

  appLogger(`${formatPath(baseFilePath)} → ${formatLocale(locale)}`);
  for (const line of formatted.split('\n')) {
    appLogger(line);
  }
};
