import type { AlignmentPlan, FingerprintedBlock } from './types';

export type SegmentToReview = {
  englishBlock: FingerprintedBlock;
  frenchBlockText: string | null;
  actionIndex: number;
};

export type RebuildInput = {
  englishBlocks: FingerprintedBlock[];
  frenchBlocks: FingerprintedBlock[];
  plan: AlignmentPlan;
};

export type RebuildResult = {
  segmentsToReview: SegmentToReview[];
};

/**
 * Analyzes the alignment plan and returns only the segments that need review/translation.
 * Does not generate output text - that's done by mergeReviewedSegments after translation.
 */
export const identifySegmentsToReview = ({
  englishBlocks,
  frenchBlocks,
  plan,
}: RebuildInput): RebuildResult => {
  const segmentsToReview: SegmentToReview[] = [];

  plan.actions.forEach((action, actionIndex) => {
    if (action.kind === 'review') {
      const englishBlock = englishBlocks[action.englishIndex];
      const frenchBlockText =
        action.frenchIndex !== null
          ? frenchBlocks[action.frenchIndex].content
          : null;

      segmentsToReview.push({ englishBlock, frenchBlockText, actionIndex });
    } else if (action.kind === 'insert_new') {
      const englishBlock = englishBlocks[action.englishIndex];

      segmentsToReview.push({
        englishBlock,
        frenchBlockText: null,
        actionIndex,
      });
    }
  });

  return { segmentsToReview };
};

/**
 * Merges reviewed translations back into the final document following the alignment plan.
 */
export const mergeReviewedSegments = (
  plan: AlignmentPlan,
  frenchBlocks: FingerprintedBlock[],
  reviewedSegments: Map<number, string>
): string => {
  const outputParts: string[] = [];

  plan.actions.forEach((action, actionIndex) => {
    if (action.kind === 'reuse') {
      outputParts.push(frenchBlocks[action.frenchIndex].content);
    } else if (action.kind === 'review' || action.kind === 'insert_new') {
      const reviewedContent = reviewedSegments.get(actionIndex);

      if (reviewedContent !== undefined) {
        outputParts.push(reviewedContent);
      } else {
        // Fallback: if review failed, use existing or blank
        if (action.kind === 'review' && action.frenchIndex !== null) {
          outputParts.push(frenchBlocks[action.frenchIndex].content);
        } else {
          outputParts.push('\n');
        }
      }
    }
    // "delete" actions are simply skipped - no output
  });

  return outputParts.join('');
};
