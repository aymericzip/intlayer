// Block alignment
export { alignBaseAndTargetBlocks } from './alignBlocks';
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
export { buildAlignmentPlan, mergeReviewedSegments } from './pipeline';
// Action planning
export { planAlignmentActions } from './planActions';
// Document reconstruction
export type { SegmentToReview } from './rebuildDocument';
export { identifySegmentsToReview } from './rebuildDocument';
// Review report (changed-blocks diff for backend / CLI --log / agents)
export type {
  BuildReviewReportInput,
  LineRange,
  ReviewBlockAction,
  ReviewReport,
  ReviewReportBlock,
  ReviewReportSummary,
} from './reviewReport';
export { buildReviewReport, formatReviewReport } from './reviewReport';
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
