import * as ANSIColors from '@intlayer/config/colors';
import { colorize, colorizeNumber } from '@intlayer/config/logger';
import { buildAlignmentPlan } from './pipeline';

/**
 * The kind of change detected for a block when reviewing a translation against
 * its base document.
 *
 * - `review`: the base block changed and its translation must be updated.
 * - `insert_new`: the base block has no translation yet and must be added.
 * - `delete`: the target block no longer exists in the base and should be removed.
 */
export type ReviewBlockAction = 'review' | 'insert_new' | 'delete';

/** A 1-based, inclusive line range within a document. */
export type LineRange = {
  start: number;
  end: number;
};

/**
 * A single block that diverges between the base document and its translation.
 *
 * This is the unit an external translator (AI client, human, or agent) needs to
 * act on: it carries the base content to translate, the existing translation to
 * update, and where each lives so the change can be located in the file.
 */
export type ReviewReportBlock = {
  /** What should happen to this block. */
  action: ReviewBlockAction;
  /** Line range of the block in the base document (omitted for pure deletions). */
  baseLineRange?: LineRange;
  /** Line range of the block in the target document (omitted for new insertions). */
  targetLineRange?: LineRange;
  /** Raw markdown of the base block (omitted for pure deletions). */
  baseContent?: string;
  /** Existing translation of the block (omitted for new insertions). */
  targetContent?: string;
};

export type ReviewReportSummary = {
  /** Number of blocks reused as-is (unchanged translation). */
  reuse: number;
  /** Number of blocks whose translation must be updated. */
  review: number;
  /** Number of blocks missing a translation. */
  insertNew: number;
  /** Number of stale target blocks to delete. */
  delete: number;
};

export type ReviewReport = {
  /** Only the blocks that diverge (review, insert_new, delete). */
  blocks: ReviewReportBlock[];
  /** Counts per action over the whole document, including reused blocks. */
  summary: ReviewReportSummary;
};

export type BuildReviewReportInput = {
  /** The base (source) document, used as the translation reference. */
  baseText: string;
  /** The existing target (translated) document, possibly empty. */
  targetText: string;
  /**
   * 1-based line numbers that changed in the base document. When omitted, only
   * inserted and deleted blocks are reported (no aligned block is flagged for
   * review since there is no way to know which ones changed).
   */
  changedLines?: number[];
};

/**
 * Compare a base markdown document with its translation and report only the
 * blocks that need attention, with their line ranges and content.
 *
 * Reusable across the CLI (`doc review --log`), the backend (comparing two
 * translation contents stored in database), and agents that generate the
 * missing translations.
 *
 * @param input - The base/target texts and optional changed lines.
 * @returns The divergent blocks and a per-action summary.
 */
export const buildReviewReport = ({
  baseText,
  targetText,
  changedLines,
}: BuildReviewReportInput): ReviewReport => {
  const { baseBlocks, targetBlocks, plan } = buildAlignmentPlan({
    baseText,
    targetText,
    changedLines,
  });

  const summary: ReviewReportSummary = {
    reuse: 0,
    review: 0,
    insertNew: 0,
    delete: 0,
  };

  const blocks: ReviewReportBlock[] = [];

  for (const [actionIndex, action] of plan.actions.entries()) {
    if (action.kind === 'reuse') {
      summary.reuse += 1;
      continue;
    }

    if (action.kind === 'review') {
      summary.review += 1;
      const baseBlock = baseBlocks[action.baseIndex];

      if (!baseBlock) continue;

      const targetBlock =
        action.targetIndex !== null ? targetBlocks[action.targetIndex] : null;

      blocks.push({
        action: 'review',
        baseLineRange: { start: baseBlock.lineStart, end: baseBlock.lineEnd },
        targetLineRange: targetBlock
          ? { start: targetBlock.lineStart, end: targetBlock.lineEnd }
          : undefined,
        baseContent: baseBlock.content,
        targetContent: targetBlock?.content,
      });
      continue;
    }

    if (action.kind === 'insert_new') {
      summary.insertNew += 1;
      const baseBlock = baseBlocks[action.baseIndex];

      if (!baseBlock) continue;

      // Find the target line after which the new block should be inserted:
      // scan backwards for the last action that produced a target block.
      let insertAfterLine: number | undefined;
      for (let prevIndex = actionIndex - 1; prevIndex >= 0; prevIndex--) {
        const prevAction = plan.actions[prevIndex];
        if (!prevAction) continue;

        let targetIdx: number | null = null;
        if (prevAction.kind === 'reuse') targetIdx = prevAction.targetIndex;
        else if (
          prevAction.kind === 'review' &&
          prevAction.targetIndex !== null
        )
          targetIdx = prevAction.targetIndex;
        else if (prevAction.kind === 'delete')
          targetIdx = prevAction.targetIndex;

        if (targetIdx !== null) {
          const prevTargetBlock = targetBlocks[targetIdx];
          if (prevTargetBlock) {
            insertAfterLine = prevTargetBlock.lineEnd + 1;
            break;
          }
        }
      }

      blocks.push({
        action: 'insert_new',
        baseLineRange: { start: baseBlock.lineStart, end: baseBlock.lineEnd },
        targetLineRange:
          insertAfterLine !== undefined
            ? { start: insertAfterLine, end: insertAfterLine }
            : undefined,
        baseContent: baseBlock.content,
      });
      continue;
    }

    if (action.kind === 'delete') {
      summary.delete += 1;
      const targetBlock = targetBlocks[action.targetIndex];

      if (!targetBlock) continue;

      blocks.push({
        action: 'delete',
        targetLineRange: {
          start: targetBlock.lineStart,
          end: targetBlock.lineEnd,
        },
        targetContent: targetBlock.content,
      });
    }
  }

  return { blocks, summary };
};

/** Render a line range as a blue colored string, or an orange dash when absent. */
const colorizeLineRange = (range?: LineRange): string => {
  if (!range) return colorize('—', ANSIColors.ORANGE);
  const rangeStr =
    range.start === range.end
      ? `L${range.start}`
      : `L${range.start}-${range.end}`;
  return colorize(rangeStr, ANSIColors.BLUE);
};

/**
 * Colorize a count with green when zero (nothing to do) and a caller-supplied
 * non-zero color (orange for warnings, red for destructive actions).
 */
const colorizeCount = (
  count: number,
  nonZeroColor: (typeof ANSIColors)[keyof typeof ANSIColors]
): string =>
  colorizeNumber(count, {
    zero: ANSIColors.GREEN,
    one: nonZeroColor,
    two: nonZeroColor,
    few: nonZeroColor,
    many: nonZeroColor,
    other: nonZeroColor,
  });

/**
 * Render a {@link ReviewReport} as a human and agent readable log.
 *
 * Each divergent block is printed with its action, the base/target line ranges,
 * the base content to translate, and the existing translation to update.
 *
 * @param report - The report to format.
 * @param options - Optional labels for the base and target locales.
 * @returns A multi-line string describing every block that needs attention.
 */
export const formatReviewReport = (
  report: ReviewReport,
  options?: { baseLabel?: string; targetLabel?: string }
): string => {
  const baseLabel = options?.baseLabel ?? 'base';
  const targetLabel = options?.targetLabel ?? 'target';

  const { summary, blocks } = report;

  // Build the summary header piece-by-piece so each count uses its own color.
  const header = [
    colorize('Review report: ', ANSIColors.ORANGE),
    colorizeCount(blocks.length, ANSIColors.ORANGE),
    colorize(' block(s) need attention (review=', ANSIColors.ORANGE),
    colorizeCount(summary.review, ANSIColors.ORANGE),
    colorize(', new=', ANSIColors.ORANGE),
    colorizeCount(summary.insertNew, ANSIColors.ORANGE),
    colorize(', delete=', ANSIColors.ORANGE),
    colorizeCount(summary.delete, ANSIColors.RED),
    colorize(', reuse=', ANSIColors.ORANGE),
    colorizeNumber(summary.reuse),
    colorize(').', ANSIColors.ORANGE),
  ].join('');

  if (blocks.length === 0) {
    return `${header}\n${colorize('No changes needed.', ANSIColors.GREEN)}`;
  }

  const sections = blocks.map((block, index) => {
    const lines: string[] = [];

    // Block header: each token colored individually.
    const blockHeader = [
      colorize('--- Block ', ANSIColors.ORANGE),
      colorizeNumber(index + 1),
      colorize('/', ANSIColors.ORANGE),
      colorizeNumber(blocks.length),
      colorize(` [${block.action}] `, ANSIColors.ORANGE),
      baseLabel,
      colorize(' ', ANSIColors.ORANGE),
      colorizeLineRange(block.baseLineRange),
      colorize(' → ', ANSIColors.ORANGE),
      targetLabel,
      colorize(' ', ANSIColors.ORANGE),
      colorizeLineRange(block.targetLineRange),
      colorize(' ---', ANSIColors.ORANGE),
    ].join('');

    lines.push(blockHeader);

    if (block.baseContent !== undefined) {
      lines.push(colorize(`[${baseLabel}]`, ANSIColors.BEIGE));
      lines.push(colorize(block.baseContent.trimEnd(), ANSIColors.GREY));
    }

    if (block.targetContent !== undefined) {
      lines.push(colorize(`[${targetLabel}]`, ANSIColors.BEIGE));
      lines.push(colorize(block.targetContent.trimEnd(), ANSIColors.GREY));
    } else if (block.action === 'insert_new') {
      lines.push(colorize(`[${targetLabel}]`, ANSIColors.BEIGE));
      lines.push(colorize('(missing — to be translated)', ANSIColors.ORANGE));
    }

    return lines.join('\n');
  });

  const editingNote = colorize(
    'Tip: start editing from the last block — working bottom-up keeps earlier line numbers accurate.',
    ANSIColors.GREY
  );

  return [header, '', ...sections, '', editingNote].join('\n');
};
