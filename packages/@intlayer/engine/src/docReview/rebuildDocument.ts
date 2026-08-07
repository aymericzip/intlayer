import type { AlignmentPlan, FingerprintedBlock } from './types';

/**
 * A block that needs to be translated or re-translated by an external consumer
 * (an AI client, a human, or an agent).
 */
export type SegmentToReview = {
  /** The base block to translate. */
  baseBlock: FingerprintedBlock;
  /** Existing target translation, or `null` when the block is new. */
  targetBlockText: string | null;
  /** Index of the originating action within {@link AlignmentPlan.actions}. */
  actionIndex: number;
};

export type RebuildInput = {
  baseBlocks: FingerprintedBlock[];
  targetBlocks: FingerprintedBlock[];
  plan: AlignmentPlan;
};

export type RebuildResult = {
  segmentsToReview: SegmentToReview[];
};

/**
 * Analyze the alignment plan and return only the segments that need
 * review/translation. Does not generate output text - that is done by
 * {@link mergeReviewedSegments} once the translations are available.
 *
 * @param input - The base/target blocks and the alignment plan.
 * @returns The list of segments that require translation.
 */
export const identifySegmentsToReview = ({
  baseBlocks,
  targetBlocks,
  plan,
}: RebuildInput): RebuildResult => {
  const segmentsToReview: SegmentToReview[] = [];

  plan.actions.forEach((action, actionIndex) => {
    if (action.kind === 'review') {
      const baseBlock = baseBlocks[action.baseIndex];
      const targetBlockText =
        action.targetIndex !== null
          ? targetBlocks[action.targetIndex].content
          : null;

      segmentsToReview.push({ baseBlock, targetBlockText, actionIndex });
    } else if (action.kind === 'insert_new') {
      const baseBlock = baseBlocks[action.baseIndex];

      segmentsToReview.push({
        baseBlock,
        targetBlockText: null,
        actionIndex,
      });
    }
  });

  return { segmentsToReview };
};

/** Markdown separates two blocks with a blank line. */
const endsWithBlockBoundary = (text: string): boolean =>
  /\n[ \t]*\n$/.test(text);

/**
 * The newlines missing at the end of `text` for it to close a markdown block.
 *
 * @param text - The document built so far.
 * @returns `''`, `'\n'` or `'\n\n'` depending on how the text already ends.
 */
const buildBlockSeparator = (text: string): string => {
  if (text.length === 0 || endsWithBlockBoundary(text)) return '';

  return text.endsWith('\n') ? '\n' : '\n\n';
};

/**
 * Merge reviewed translations back into the final document following the
 * alignment plan, reusing untouched target blocks as-is.
 *
 * @param plan - The alignment plan.
 * @param targetBlocks - Blocks of the existing target document.
 * @param reviewedSegments - Map of action index to its reviewed translation.
 * @returns The rebuilt target document.
 */
export const mergeReviewedSegments = (
  plan: AlignmentPlan,
  targetBlocks: FingerprintedBlock[],
  reviewedSegments: Map<number, string>
): string => {
  let mergedText = '';
  let previousPartWasGenerated = false;

  /**
   * Append one part, keeping a blank line around the content this run produced.
   *
   * Blocks own the blank lines that trail them, so two verbatim blocks already
   * separate themselves and are appended untouched — a document with nothing to
   * change merges back byte for byte. Generated content is the exception: the
   * block it lands after may be the one that used to end the document, which
   * carries no trailing blank line, and the two would be glued into a single
   * markdown block (a heading swallowed by the paragraph above it).
   */
  const appendPart = (content: string, isGenerated: boolean): void => {
    if (content.length === 0) return;

    if (isGenerated || previousPartWasGenerated) {
      mergedText += buildBlockSeparator(mergedText);
    }

    mergedText += content;
    previousPartWasGenerated = isGenerated;
  };

  plan.actions.forEach((action, actionIndex) => {
    if (action.kind === 'reuse') {
      appendPart(targetBlocks[action.targetIndex]!.content, false);
    } else if (action.kind === 'review' || action.kind === 'insert_new') {
      const reviewedContent = reviewedSegments.get(actionIndex);

      if (reviewedContent !== undefined) {
        appendPart(reviewedContent, true);
      } else {
        // Fallback: if review failed, use existing or blank
        if (action.kind === 'review' && action.targetIndex !== null) {
          appendPart(targetBlocks[action.targetIndex]!.content, false);
        } else {
          appendPart('\n', false);
        }
      }
    } else if (action.kind === 'delete') {
      const reviewedContent = reviewedSegments.get(actionIndex);
      if (reviewedContent !== undefined) {
        // Caller explicitly resolved this block: empty string = actually delete,
        // non-empty string = replacement content.
        appendPart(reviewedContent, true);
      } else {
        // Default: keep verbatim. A target block with no base counterpart may
        // just be a section the aligner could not follow (reordering, split
        // prose) — keeping it prevents accidental data loss in log/read-only mode.
        appendPart(targetBlocks[action.targetIndex]!.content, false);
      }
    }
  });

  return mergedText;
};
