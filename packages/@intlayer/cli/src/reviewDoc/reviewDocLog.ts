import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import {
  buildReviewReport,
  formatReviewReport,
  type ReviewReport,
} from '@intlayer/chokidar/docReview';
import { formatLocale, formatPath } from '@intlayer/chokidar/utils';
import { getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import type { Locale } from '@intlayer/types/allLocales';

/**
 * Log-only review of a single file/locale pair.
 *
 * Instead of calling an AI to translate the changed blocks, this compares the
 * base document with its translation and logs the blocks that need attention
 * (with their line ranges and content) so another agent or a human can generate
 * the missing translations.
 *
 * @param baseFilePath - Absolute path of the base (source) document.
 * @param outputFilePath - Absolute path of the target (translated) document.
 * @param locale - The target locale being reviewed.
 * @param baseLocale - The base locale used as reference.
 * @param configOptions - Optional Intlayer configuration overrides.
 * @param changedLines - 1-based base line numbers that changed (from git), if any.
 * @returns The structured review report.
 */
export const logReviewFileBlocks = async (
  baseFilePath: string,
  outputFilePath: string,
  locale: Locale,
  baseLocale: Locale,
  configOptions?: GetConfigurationOptions,
  changedLines?: number[]
): Promise<ReviewReport> => {
  const configuration = getConfiguration(configOptions);
  const appLogger = getAppLogger(configuration);

  const baseText = await readFile(baseFilePath, 'utf-8');
  const targetText = existsSync(outputFilePath)
    ? await readFile(outputFilePath, 'utf-8').catch(() => '')
    : '';

  const report = buildReviewReport({ baseText, targetText, changedLines });

  const formatted = formatReviewReport(report, {
    baseLabel: formatLocale(baseLocale, false),
    targetLabel: formatLocale(locale, false),
  });

  appLogger([
    `${formatPath(baseFilePath)} → ${formatLocale(locale)}\n`,
    formatted,
  ]);

  return report;
};
