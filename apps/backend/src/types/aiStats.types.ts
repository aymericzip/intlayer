/** Aggregated token-usage breakdown per AI model. */
export type AIModelUsage = {
  /** AI model identifier (e.g. `gpt-4o-mini`). */
  aiModel: string;
  /** Number of discussions that used this model. */
  discussionCount: number;
  /** Total prompt / input tokens consumed by this model. */
  totalInputTokens: number;
  /** Total completion / output tokens produced by this model. */
  totalOutputTokens: number;
  /** Sum of input and output tokens for this model. */
  totalTokens: number;
};

/** Project-level AI usage statistics surfaced on the dashboard overview. */
export type AIStats = {
  /** The project the stats were computed for. */
  projectId: string;
  /** Unix epoch (ms) at which the snapshot was computed. */
  generatedAt: number;
  /** Total number of saved dashboard chat discussions for the project. */
  totalDiscussions: number;
  /** Total prompt / input tokens consumed across all discussions. */
  totalInputTokens: number;
  /** Total completion / output tokens produced across all discussions. */
  totalOutputTokens: number;
  /** Grand total of all tokens (input + output). */
  totalTokens: number;
  /** Per-model breakdown (only includes discussions that recorded token usage). */
  modelUsage: AIModelUsage[];
};
