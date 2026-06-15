/**
 * Semantic category a markdown block can belong to.
 *
 * Used to weight the alignment between a base document and its translation.
 */
export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'list_item'
  | 'code_block'
  | 'blockquote'
  | 'table'
  | 'horizontal_rule'
  | 'html'
  | 'unknown';

/**
 * A raw markdown block extracted from a document, with its line range.
 */
export type Block = {
  type: BlockType;
  content: string;
  /** 1-based line number where the block starts (inclusive). */
  lineStart: number;
  /** 1-based line number where the block ends (inclusive). */
  lineEnd: number;
};

/**
 * A {@link Block} enriched with normalized text used for similarity matching.
 */
export type NormalizedBlock = Block & {
  /** Lower-cased, markdown-stripped text used for semantic comparison. */
  semanticText: string;
  /** Non-letter characters (digits, punctuation, symbols) kept as a structural anchor. */
  anchorText: string;
};

/**
 * A {@link NormalizedBlock} enriched with content digests used to detect reuse.
 */
export type FingerprintedBlock = NormalizedBlock & {
  semanticDigest: string;
  anchorDigest: string;
  compositeKey: string;
  contextKey?: string;
};

/**
 * A single alignment between a base block and an (optional) target block.
 *
 * `baseIndex === -1` means the target block has no base counterpart (deletion).
 * `targetIndex === null` means the base block has no target counterpart (insertion).
 */
export type AlignmentPair = {
  baseIndex: number;
  targetIndex: number | null;
  similarityScore: number;
};

/**
 * An action the merge step should take for a given aligned pair of blocks.
 */
export type PlannedAction =
  | { kind: 'reuse'; baseIndex: number; targetIndex: number }
  | { kind: 'review'; baseIndex: number; targetIndex: number | null }
  | { kind: 'insert_new'; baseIndex: number }
  | { kind: 'delete'; targetIndex: number };

export type AlignmentPlan = {
  actions: PlannedAction[];
};

/** A 1-based line number that changed in the base document. */
export type LineChange = number;

export type SimilarityOptions = {
  /** Minimum anchor similarity to consider two blocks identical (for example 0.90). */
  minimumMatchForReuse: number;
  /** Minimum anchor similarity to consider two blocks near-duplicates (for example 0.80). */
  minimumMatchForNearDuplicate: number;
};
