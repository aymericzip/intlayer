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

export type Block = {
  type: BlockType;
  content: string;
  lineStart: number;
  lineEnd: number;
};

export type NormalizedBlock = Block & {
  semanticText: string;
  anchorText: string;
};

export type FingerprintedBlock = NormalizedBlock & {
  semanticDigest: string;
  anchorDigest: string;
  compositeKey: string;
  contextKey?: string;
};

export type AlignmentPair = {
  englishIndex: number;
  frenchIndex: number | null;
  similarityScore: number;
};

export type PlannedAction =
  | { kind: 'reuse'; englishIndex: number; frenchIndex: number }
  | { kind: 'review'; englishIndex: number; frenchIndex: number | null }
  | { kind: 'insert_new'; englishIndex: number }
  | { kind: 'delete'; frenchIndex: number };

export type AlignmentPlan = {
  actions: PlannedAction[];
};

export type LineChange = number;

export type SimilarityOptions = {
  minimumMatchForReuse: number; // for example 0.90
  minimumMatchForNearDuplicate: number; // for example 0.80
};
