import { describe, expect, it } from 'vitest';
import {
  AI_CREDIT_USAGE_DEFAULT_DAYS,
  AI_CREDIT_USAGE_MAX_DAYS,
  buildAICreditDailyUsage,
  convertTokensToCredits,
  getAICreditUsageDayRange,
  parseAICreditUsageDays,
  getAICreditPeriodBounds,
  getAICreditPeriodKey,
  getMonthlyAITokenAllowance,
  getUsedTokensInPeriod,
  isUsingPlatformAIKey,
  TOKENS_PER_AI_CREDIT,
} from './aiCredits';

describe('getAICreditPeriodKey', () => {
  it('formats the UTC month with a padded month number', () => {
    expect(getAICreditPeriodKey(new Date('2026-03-15T12:00:00Z'))).toBe(
      '2026-03'
    );
  });

  it('uses UTC, not the local timezone, at month boundaries', () => {
    expect(getAICreditPeriodKey(new Date('2026-11-30T23:59:59Z'))).toBe(
      '2026-11'
    );
    expect(getAICreditPeriodKey(new Date('2026-12-01T00:00:00Z'))).toBe(
      '2026-12'
    );
  });
});

describe('getAICreditPeriodBounds', () => {
  it('returns the month start and the exclusive next-month start', () => {
    const { periodStart, periodEnd } = getAICreditPeriodBounds(
      new Date('2026-12-20T08:00:00Z')
    );

    expect(periodStart.toISOString()).toBe('2026-12-01T00:00:00.000Z');
    expect(periodEnd.toISOString()).toBe('2027-01-01T00:00:00.000Z');
  });
});

describe('convertTokensToCredits', () => {
  it('converts tokens to credits rounded to two decimals', () => {
    expect(convertTokensToCredits(TOKENS_PER_AI_CREDIT)).toBe(1);
    expect(convertTokensToCredits(1_234)).toBe(1.23);
    expect(convertTokensToCredits(0)).toBe(0);
  });
});

describe('getUsedTokensInPeriod', () => {
  it('returns the counter of the current period', () => {
    expect(
      getUsedTokensInPeriod(
        { periodKey: '2026-11', usedTokens: 500 },
        '2026-11'
      )
    ).toBe(500);
  });

  it('resets a counter left over from a previous month', () => {
    expect(
      getUsedTokensInPeriod(
        { periodKey: '2026-10', usedTokens: 500 },
        '2026-11'
      )
    ).toBe(0);
  });

  it('treats a missing counter as unused', () => {
    expect(getUsedTokensInPeriod(undefined, '2026-11')).toBe(0);
  });
});

describe('getMonthlyAITokenAllowance', () => {
  it('grants the plan allowance to an active plan', () => {
    expect(
      getMonthlyAITokenAllowance({ type: 'PREMIUM', status: 'active' })
    ).toBe(2_000 * TOKENS_PER_AI_CREDIT);
  });

  it('falls back to the FREE allowance for inactive or missing plans', () => {
    const freeAllowance = getMonthlyAITokenAllowance(undefined);

    expect(freeAllowance).toBe(100 * TOKENS_PER_AI_CREDIT);
    expect(
      getMonthlyAITokenAllowance({ type: 'ENTERPRISE', status: 'canceled' })
    ).toBe(freeAllowance);
  });
});

describe('isUsingPlatformAIKey', () => {
  it('bills requests without any API key', () => {
    expect(isUsingPlatformAIKey([{ provider: 'openai' as never }])).toBe(true);
    expect(isUsingPlatformAIKey([undefined, undefined])).toBe(true);
  });

  it('does not bill requests carrying their own API key', () => {
    expect(isUsingPlatformAIKey([undefined, { apiKey: 'sk-own-key' }])).toBe(
      false
    );
  });

  it('ignores masked API keys, which getAIConfig skips too', () => {
    expect(isUsingPlatformAIKey([{ apiKey: 'sk-****' }])).toBe(true);
  });

  it('does not bill local providers', () => {
    expect(
      isUsingPlatformAIKey([
        { provider: 'openai' as never },
        { provider: 'ollama' as never },
      ])
    ).toBe(false);
  });

  it('lets a higher-precedence source override the provider', () => {
    expect(
      isUsingPlatformAIKey([
        { provider: 'ollama' as never },
        { provider: 'openai' as never },
      ])
    ).toBe(true);
  });
});

describe('parseAICreditUsageDays', () => {
  it('defaults when the value is missing or not a number', () => {
    expect(parseAICreditUsageDays(undefined)).toBe(
      AI_CREDIT_USAGE_DEFAULT_DAYS
    );
    expect(parseAICreditUsageDays('abc')).toBe(AI_CREDIT_USAGE_DEFAULT_DAYS);
  });

  it('clamps the value to the supported range', () => {
    expect(parseAICreditUsageDays('0')).toBe(1);
    expect(parseAICreditUsageDays('9999')).toBe(AI_CREDIT_USAGE_MAX_DAYS);
    expect(parseAICreditUsageDays('7')).toBe(7);
  });
});

describe('getAICreditUsageDayRange', () => {
  it('covers the last N UTC days, today included', () => {
    const { from, to } = getAICreditUsageDayRange(
      3,
      new Date('2026-11-08T15:00:00Z')
    );

    expect(from.toISOString()).toBe('2026-11-06T00:00:00.000Z');
    expect(to.toISOString()).toBe('2026-11-09T00:00:00.000Z');
  });
});

describe('buildAICreditDailyUsage', () => {
  it('returns a continuous series with empty days and sorted features', () => {
    const days = buildAICreditDailyUsage(
      [
        {
          date: '2026-11-06',
          feature: 'chat',
          tokens: 500,
          requestCount: 2,
        },
        {
          date: '2026-11-06',
          feature: 'translation',
          tokens: 2_000,
          requestCount: 1,
        },
        {
          date: '2026-11-08',
          feature: 'autocomplete',
          tokens: 100,
          requestCount: 5,
        },
      ],
      new Date('2026-11-06T00:00:00Z'),
      3
    );

    expect(days.map((day) => day.date)).toEqual([
      '2026-11-06',
      '2026-11-07',
      '2026-11-08',
    ]);
    expect(days[0]).toMatchObject({
      tokens: 2_500,
      credits: 2.5,
      requestCount: 3,
    });
    expect(days[0].byFeature.map((usage) => usage.feature)).toEqual([
      'translation',
      'chat',
    ]);
    expect(days[1]).toEqual({
      date: '2026-11-07',
      tokens: 0,
      credits: 0,
      requestCount: 0,
      byFeature: [],
    });
  });
});
