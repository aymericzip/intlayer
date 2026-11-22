/** Placeholder shown in place of the hidden part of an API key. */
const HIDDEN_PART_PLACEHOLDER = '...';

/**
 * Shortens a server-masked API key for display: each run of asterisks
 * becomes an ellipsis (`sk-proj-****…****vLcA` → `sk-proj-...vLcA`).
 * Display only: the backend detects masked keys by their `*` characters.
 */
export const formatMaskedAPIKey = (maskedAPIKey: string): string =>
  maskedAPIKey.replace(/\*+/g, HIDDEN_PART_PLACEHOLDER);
