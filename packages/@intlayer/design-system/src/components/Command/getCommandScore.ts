/** Scores by match quality; any positive score means the item is shown. */
const EXACT_MATCH_SCORE = 1;
const PREFIX_MATCH_SCORE = 0.9;
const WORD_PREFIX_MATCH_SCORE = 0.8;
const SUBSTRING_MATCH_SCORE = 0.6;
const SUBSEQUENCE_MATCH_SCORE = 0.3;
const NO_MATCH_SCORE = 0;

const isSubsequence = (candidate: string, search: string): boolean => {
  let searchIndex = 0;

  for (const character of candidate) {
    if (character === search[searchIndex]) searchIndex++;
    if (searchIndex === search.length) return true;
  }

  return false;
};

const scoreCandidate = (candidate: string, search: string): number => {
  if (candidate === search) return EXACT_MATCH_SCORE;
  if (candidate.startsWith(search)) return PREFIX_MATCH_SCORE;
  if (candidate.split(/[\s\-_/]+/).some((word) => word.startsWith(search))) {
    return WORD_PREFIX_MATCH_SCORE;
  }
  if (candidate.includes(search)) return SUBSTRING_MATCH_SCORE;
  if (isSubsequence(candidate, search)) return SUBSEQUENCE_MATCH_SCORE;

  return NO_MATCH_SCORE;
};

/**
 * Case-insensitive fuzzy score of a command item against a search, between 0
 * (hidden) and 1 (exact match). Keywords count as alternative values.
 *
 * @example
 * getCommandScore('Make shorter', 'short'); // 0.8
 * getCommandScore('Fix grammar', 'fxg'); // 0.3
 */
export const getCommandScore = (
  value: string,
  search: string,
  keywords: readonly string[] = []
): number => {
  const normalizedSearch = search.trim().toLowerCase();

  if (!normalizedSearch) return EXACT_MATCH_SCORE;

  return Math.max(
    ...[value, ...keywords].map((candidate) =>
      scoreCandidate(candidate.trim().toLowerCase(), normalizedSearch)
    )
  );
};
