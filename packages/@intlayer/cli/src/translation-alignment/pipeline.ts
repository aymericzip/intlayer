import { alignEnglishAndFrenchBlocks } from './alignBlocks';
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
import type {
  AlignmentPlan,
  FingerprintedBlock,
  SimilarityOptions,
} from './types';

export type BuildAlignmentPlanInput = {
  englishText: string;
  frenchText: string;
  changedLines: number[] | undefined;
  similarityOptions?: Partial<SimilarityOptions>;
};

export type BuildAlignmentPlanOutput = {
  englishBlocks: FingerprintedBlock[];
  frenchBlocks: FingerprintedBlock[];
  plan: AlignmentPlan;
  segmentsToReview: SegmentToReview[];
};

export const buildAlignmentPlan = ({
  englishText,
  frenchText,
  changedLines,
  similarityOptions,
}: BuildAlignmentPlanInput): BuildAlignmentPlanOutput => {
  const englishBlocksRaw = segmentDocument(englishText);
  const frenchBlocksRaw = segmentDocument(frenchText);

  const englishNormalized = englishBlocksRaw.map(normalizeBlock);
  const frenchNormalized = frenchBlocksRaw.map(normalizeBlock);

  const englishBlocks: FingerprintedBlock[] = englishNormalized.map(
    (block, index, array) =>
      fingerprintBlock(
        block,
        array[index - 1] ?? null,
        array[index + 1] ?? null
      )
  );
  const frenchBlocks: FingerprintedBlock[] = frenchNormalized.map(
    (block, index, array) =>
      fingerprintBlock(
        block,
        array[index - 1] ?? null,
        array[index + 1] ?? null
      )
  );

  const alignment = alignEnglishAndFrenchBlocks(englishBlocks, frenchBlocks);

  const changedIndexes = mapChangedLinesToBlocks(
    englishBlocks,
    Array.isArray(changedLines) ? changedLines : []
  );

  const plan = planAlignmentActions(alignment, changedIndexes, {
    minimumMatchForReuse: similarityOptions?.minimumMatchForReuse ?? 0.9,
    minimumMatchForNearDuplicate:
      similarityOptions?.minimumMatchForNearDuplicate ?? 0.8,
  });

  const { segmentsToReview } = identifySegmentsToReview({
    englishBlocks,
    frenchBlocks,
    plan,
  });

  return { englishBlocks, frenchBlocks, plan, segmentsToReview };
};

export { mergeReviewedSegments };
export type { SegmentToReview };
