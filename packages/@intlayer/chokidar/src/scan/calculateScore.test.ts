import { describe, expect, it } from 'vitest';
import { mutateScore, type Score, toScorePercent } from './calculateScore';

describe('mutateScore', () => {
  const empty: Score = { score: 0, totalScore: 0 };

  it('awards the full weight for a successful check', () => {
    const result = mutateScore(empty, {
      type: 'url_htmlLang',
      status: 'success',
    });
    expect(result).toEqual({ score: 9, totalScore: 9 });
  });

  it('awards half the weight for a warning', () => {
    const result = mutateScore(empty, {
      type: 'sitemap_sitemapPresent',
      status: 'warning',
    });
    expect(result).toEqual({ score: 5, totalScore: 10 });
  });

  it('awards no points for an error but counts the total', () => {
    const result = mutateScore(empty, {
      type: 'url_hasXDefault',
      status: 'error',
    });
    expect(result).toEqual({ score: 0, totalScore: 7 });
  });

  it('strips the URL suffix from the type before scoring', () => {
    const result = mutateScore(empty, {
      type: 'url_htmlLang\\https://example.com/page',
      status: 'success',
    });
    expect(result).toEqual({ score: 9, totalScore: 9 });
  });

  it('ignores unknown check types', () => {
    const result = mutateScore(empty, {
      type: 'unknown_check',
      status: 'success',
    });
    expect(result).toEqual(empty);
  });

  it('ignores events without a type', () => {
    expect(mutateScore(empty, { status: 'success' })).toEqual(empty);
  });
});

describe('toScorePercent', () => {
  it('returns 0 when nothing was scored', () => {
    expect(toScorePercent({ score: 0, totalScore: 0 })).toBe(0);
  });

  it('rounds the percentage', () => {
    expect(toScorePercent({ score: 1, totalScore: 3 })).toBe(33);
    expect(toScorePercent({ score: 2, totalScore: 3 })).toBe(67);
  });
});
