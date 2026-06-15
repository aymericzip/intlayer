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
  const outputParts: string[] = [];

  plan.actions.forEach((action, actionIndex) => {
    if (action.kind === 'reuse') {
      outputParts.push(targetBlocks[action.targetIndex].content);
    } else if (action.kind === 'review' || action.kind === 'insert_new') {
      const reviewedContent = reviewedSegments.get(actionIndex);

      if (reviewedContent !== undefined) {
        outputParts.push(reviewedContent);
      } else {
        // Fallback: if review failed, use existing or blank
        if (action.kind === 'review' && action.targetIndex !== null) {
          outputParts.push(targetBlocks[action.targetIndex].content);
        } else {
          outputParts.push('\n');
        }
      }
    } else if (action.kind === 'delete') {
      const reviewedContent = reviewedSegments.get(actionIndex);
      if (reviewedContent !== undefined) {
        // Caller explicitly resolved this block: empty string = actually delete,
        // non-empty string = replacement content.
        if (reviewedContent) outputParts.push(reviewedContent);
      } else {
        // Default: keep verbatim. A target block with no base counterpart may
        // just be a section the aligner could not follow (reordering, split
        // prose) — keeping it prevents accidental data loss in log/read-only mode.
        outputParts.push(targetBlocks[action.targetIndex].content);
      }
    }
  });

  return outputParts.join('');
};
