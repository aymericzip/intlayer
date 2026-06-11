/**
 * Mutualized SEO/i18n scoring logic.
 *
 * This module is the single source of truth for turning audit/scan events into
 * a weighted score. It is consumed both by the hosted backend SEO audit
 * (`apps/backend`) and by the `intlayer scan` CLI command, so it must stay free
 * of any server-only dependency (no Fastify, no Cheerio, no logger coupling).
 */

/** Accumulated score across all checks that ran. */
export type Score = {
  /** Sum of points obtained (success = full, warning = half, error = none). */
  score: number;
  /** Maximum achievable points for the checks that ran. */
  totalScore: number;
};

/**
 * Minimal shape of an event needed to contribute to the score.
 *
 * The `type` is the check identifier. URL-scoped checks are suffixed with the
 * URL using a backslash separator (e.g. `url_htmlLang\https://example.com`), so
 * only the part before the first backslash is used to look up the weight.
 */
export type ScorableEvent = {
  type?: string;
  status?: string;
};

/**
 * Resolve how many points an event contributes based on its status.
 * - `warning` → half of the weight
 * - `error` → none
 * - anything else (`success`, `started`, `done`, …) → full weight
 */
const scoreCheck = (score: number, event: ScorableEvent): number => {
  if (event.status === 'warning') return score / 2;
  if (event.status === 'error') return 0;
  return score;
};

/** Weight (in points) of every scorable check. */
export const scoreRecord = {
  robots_robotsPresent: 10,
  robots_noLocalizedUrlsForgotten: 8,
  sitemap_sitemapPresent: 10,
  sitemap_noLocalizedUrlsForgotten: 9,
  sitemap_hasAlternates: 8,
  sitemap_hasXDefault: 7,
  url_htmlLang: 9,
  url_htmlDir: 3,
  url_hasCanonical: 10,
  url_hreflang: 9,
  url_hasLocalizedLinks: 8,
  url_hasXDefault: 7,
  url_allAnchorsLocalized: 6,
  url_currentLocale: 3,
  url_unusedBundleContent: 8,
} as const;

/** Identifier of a scorable check (without the URL suffix). */
export type ScoreCheckType = keyof typeof scoreRecord;

/**
 * Apply a single event to the running score, returning a new {@link Score}.
 * Unknown check types are ignored so the function is safe to call on every
 * emitted event.
 *
 * @param score - The current accumulated score.
 * @param event - The event to fold into the score.
 * @returns A new score with the event applied.
 */
export const mutateScore = (score: Score, event: ScorableEvent): Score => {
  const newScore: Score = { ...score };

  const typeWithoutUrl = event.type?.split('\\')[0];

  if (!typeWithoutUrl) {
    return newScore;
  }

  const scoreValue = scoreRecord[typeWithoutUrl as ScoreCheckType];

  if (typeof scoreValue === 'number') {
    newScore.score += scoreCheck(scoreValue, event);
    newScore.totalScore += scoreValue;
  }

  return newScore;
};

/**
 * Convert a raw {@link Score} into a 0–100 percentage.
 *
 * @param score - The accumulated score.
 * @returns The rounded percentage, or 0 when no check ran.
 */
export const toScorePercent = (score: Score): number =>
  Math.round(score.totalScore > 0 ? (score.score / score.totalScore) * 100 : 0);
