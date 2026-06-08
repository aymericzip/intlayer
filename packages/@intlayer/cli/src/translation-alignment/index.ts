// Block alignment
export { alignEnglishAndFrenchBlocks } from './alignBlocks';
// Similarity computation
export {
  computeJaccardSimilarity,
  generateCharacterShingles,
} from './computeSimilarity';
// Block fingerprinting
export { fingerprintBlock } from './fingerprintBlock';
// Git integration
export { mapChangedLinesToBlocks } from './mapChangedLinesToBlocks';
// Block normalization
export { normalizeBlock } from './normalizeBlock';
// High-level pipeline
export type {
  BuildAlignmentPlanInput,
  BuildAlignmentPlanOutput,
} from './pipeline';
export { buildAlignmentPlan } from './pipeline';

// Action planning
export { planAlignmentActions } from './planActions';

// Document reconstruction
export type { SegmentToReview } from './rebuildDocument';
export {
  identifySegmentsToReview,
  mergeReviewedSegments,
} from './rebuildDocument';
// Document segmentation
export { segmentDocument } from './segmentDocument';
// Core types
export type {
  AlignmentPair,
  AlignmentPlan,
  Block,
  BlockType,
  FingerprintedBlock,
  LineChange,
  NormalizedBlock,
  PlannedAction,
  SimilarityOptions,
} from './types';
