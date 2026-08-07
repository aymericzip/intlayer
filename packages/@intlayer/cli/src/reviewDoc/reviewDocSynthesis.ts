import * as ANSIColors from '@intlayer/config/colors';
import {
  type ANSIColorsType,
  colorize,
  colorizeNumber,
} from '@intlayer/config/logger';
import type { ReviewReportSummary } from '@intlayer/engine/docReview';
import { formatPath } from '@intlayer/engine/utils';
import type { Locale } from '@intlayer/types/allLocales';

/**
 * The outcome of reviewing one base document against one target locale.
 *
 * - `upToDate`: the translation matches the base document, nothing to do.
 * - `toEdit`: at least one block diverges (to review, to add, or to delete).
 * - `skipped`: the pair was not reviewed (already exists, modification range…).
 */
export type ReviewOutcome = 'upToDate' | 'toEdit' | 'skipped';

/** The result of reviewing a single base document / target locale pair. */
export type ReviewFileResult = {
  /** Path of the base document, as matched by the doc pattern. */
  docPath: string;
  /** The reviewed target locale. */
  locale: Locale;
  /** What the review concluded for this pair. */
  outcome: ReviewOutcome;
  /** Per-action block counts, when the document was actually compared. */
  summary?: ReviewReportSummary;
};

export type FormatReviewSynthesisOptions = {
  /**
   * When `true`, the diverging blocks were fixed during the run, so the section
   * is labelled `Updated` instead of `To edit`.
   */
  hasAppliedChanges?: boolean;
};

/** Group results by base document path, preserving the first-seen order. */
const groupResultsByDocPath = (
  results: ReviewFileResult[]
): Map<string, ReviewFileResult[]> => {
  const grouped = new Map<string, ReviewFileResult[]>();

  for (const result of results) {
    const existingResults = grouped.get(result.docPath);

    if (existingResults) existingResults.push(result);
    else grouped.set(result.docPath, [result]);
  }

  return grouped;
};

/** Render the per-action counts of a document, omitting the zeroed ones. */
const formatBlockCounts = (summary?: ReviewReportSummary): string => {
  if (!summary) return '';

  const countEntries: [label: string, count: number][] = [
    ['review', summary.review],
    ['new', summary.insertNew],
    ['delete', summary.delete],
  ];

  const formattedCounts = countEntries
    .filter(([, count]) => count > 0)
    .map(([label, count]) => `${label}=${colorizeNumber(count)}`);

  if (formattedCounts.length === 0) return '';

  return colorize(` (${formattedCounts.join(', ')})`, ANSIColors.GREY);
};

/** Render one outcome section: a title line followed by one line per document. */
const formatSection = (
  title: string,
  icon: string,
  color: ANSIColorsType,
  results: ReviewFileResult[],
  withBlockCounts: boolean
): string[] => {
  if (results.length === 0) return [];

  const lines: string[] = [
    `${colorize(icon, color)} ${colorize(title, color)} (${colorizeNumber(results.length)})`,
  ];

  for (const [docPath, docResults] of groupResultsByDocPath(results)) {
    lines.push(`   ${formatPath(docPath)}`);

    if (withBlockCounts) {
      for (const result of docResults) {
        lines.push(
          `     ${colorize(result.locale, color)}${formatBlockCounts(result.summary)}`
        );
      }
      continue;
    }

    const localeCodes = docResults.map((result) => result.locale).join(', ');
    lines.push(`     ${colorize(localeCodes, color)}`);
  }

  return lines;
};

/**
 * Render the end-of-run synthesis: which documents are aligned with their base
 * document and which ones still have blocks to edit.
 *
 * @param results - One entry per reviewed base document / target locale pair.
 * @param options - Rendering options.
 * @returns A multi-line string, ready to be logged.
 */
export const formatReviewSynthesis = (
  results: ReviewFileResult[],
  options?: FormatReviewSynthesisOptions
): string => {
  const upToDateResults = results.filter(
    (result) => result.outcome === 'upToDate'
  );
  const toEditResults = results.filter((result) => result.outcome === 'toEdit');
  const skippedResults = results.filter(
    (result) => result.outcome === 'skipped'
  );

  const documentCount = new Set(results.map((result) => result.docPath)).size;

  const header = [
    colorize('Review synthesis: ', ANSIColors.BEIGE),
    colorizeNumber(documentCount),
    colorize(' document(s), ', ANSIColors.BEIGE),
    colorizeNumber(results.length),
    colorize(' locale pair(s) — ', ANSIColors.BEIGE),
    colorizeNumber(upToDateResults.length),
    colorize(' up to date, ', ANSIColors.BEIGE),
    colorizeNumber(toEditResults.length),
    colorize(
      options?.hasAppliedChanges ? ' updated, ' : ' to edit, ',
      ANSIColors.BEIGE
    ),
    colorizeNumber(skippedResults.length),
    colorize(' skipped.', ANSIColors.BEIGE),
  ].join('');

  return [
    header,
    ...formatSection(
      options?.hasAppliedChanges ? 'Updated' : 'To edit',
      '✎',
      ANSIColors.ORANGE,
      toEditResults,
      true
    ),
    ...formatSection(
      'Up to date',
      '✔',
      ANSIColors.GREEN,
      upToDateResults,
      false
    ),
    ...formatSection('Skipped', '⊘', ANSIColors.YELLOW, skippedResults, false),
  ].join('\n');
};
