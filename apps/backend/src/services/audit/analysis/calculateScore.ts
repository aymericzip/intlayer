import { logger } from '@logger';
import type { AuditDataList, AuditEvent } from '../types';

export type Score = {
  score: number;
  totalScore: number;
};

const scoreCheck = (score: number, event: AuditEvent): number => {
  if (event.status === 'success') return score;
  if (event.status === 'warning') return score / 2;
  if (event.status === 'error') return 0;
  return score;
};

const scoreRecord = {
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
};

export const mutateScore = (score: Score, event: AuditEvent): Score => {
  const newScore: Score = { ...score };

  const typeWithoutUrl = event.type?.split('\\')[0];

  if (!typeWithoutUrl) {
    return newScore;
  }

  const scoreValue = scoreRecord[typeWithoutUrl as keyof typeof scoreRecord];

  if (typeof scoreValue === 'number') {
    newScore.score += scoreCheck(scoreValue, event);
    newScore.totalScore += scoreValue;
  }

  logger.info('Score mutation', {
    type: event.type,
    typeWithoutUrl,
    scoreValue,
    newScore,
  });

  return newScore;
};
