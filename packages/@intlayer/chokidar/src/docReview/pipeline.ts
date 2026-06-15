import { alignBaseAndTargetBlocks } from './alignBlocks';
import { fingerprintBlock } from './fingerprintBlock';
import { mapChangedLinesToBlocks } from './mapChangedLinesToBlocks';
import { normalizeBlock } from './normalizeBlock';
import { planAlignmentActions } from './planActions';
import {
  identifySegmentsToReview,
  mergeReviewedSegments,
  type SegmentToReview,
} from './rebuildDocument';
import { segmentDocument } from './segmentDocument';
import type { AlignmentPlan, FingerprintedBlock } from './types';

export type BuildAlignmentPlanInput = {
  /** The base (source) document, used as the translation reference. */
  baseText: string;
  /** The existing target (translated) document, possibly empty. */
  targetText: string;
  /** 1-based line numbers that changed in the base document, when known. */
  changedLines: number[] | undefined;
};

export type BuildAlignmentPlanOutput = {
  baseBlocks: FingerprintedBlock[];
  targetBlocks: FingerprintedBlock[];
  plan: AlignmentPlan;
  segmentsToReview: SegmentToReview[];
};

const fingerprintBlocks = (text: string): FingerprintedBlock[] => {
  const normalized = segmentDocument(text).map(normalizeBlock);

  return normalized.map((block, index, array) =>
    fingerprintBlock(block, array[index - 1] ?? null, array[index + 1] ?? null)
  );
};

/**
 * Build the block-aware alignment plan between a base document and its
 * translation.
 *
 * Both documents are segmented into blocks, fingerprinted, and aligned. When
 * `changedLines` is provided, only the touched base blocks are scheduled for
 * review; otherwise every aligned block is reused and only insertions/deletions
 * are detected.
 *
 * @param input - The base/target texts and optional changed lines.
 * @returns The blocks, the plan, and the segments that need translation.
 */
export const buildAlignmentPlan = ({
  baseText,
  targetText,
  changedLines,
}: BuildAlignmentPlanInput): BuildAlignmentPlanOutput => {
  const baseBlocks = fingerprintBlocks(baseText);
  const targetBlocks = fingerprintBlocks(targetText);

  const alignment = alignBaseAndTargetBlocks(baseBlocks, targetBlocks);

  const changedIndexes = mapChangedLinesToBlocks(
    baseBlocks,
    Array.isArray(changedLines) ? changedLines : []
  );

  const plan = planAlignmentActions(alignment, changedIndexes);

  const { segmentsToReview } = identifySegmentsToReview({
    baseBlocks,
    targetBlocks,
    plan,
  });

  return { baseBlocks, targetBlocks, plan, segmentsToReview };
};

export type { SegmentToReview };
export { mergeReviewedSegments };
