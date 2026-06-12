import type { Locale } from '@intlayer/types/allLocales';
import type { ContentNode } from '@intlayer/types/dictionary';
import { TRANSLATION } from '@intlayer/types/nodeType';
import { describe, expect, it } from 'vitest';
import type { ProjectAPI } from '@/types/project.types';
import {
  computeProjectInsights,
  countContentNodeStats,
  type InsightDictionaryInput,
} from './computeProjectInsights';

const EN = 'en' as Locale;
const FR = 'fr' as Locale;
const ES = 'es' as Locale;

/** Builds a translation node for the given per-locale values. */
const translation = (values: Partial<Record<Locale, unknown>>): ContentNode =>
  ({
    nodeType: TRANSLATION,
    [TRANSLATION]: values,
  }) as unknown as ContentNode;

/** Minimal project stub with the i18n + metadata fields the util reads. */
const makeProject = (
  locales: Locale[],
  defaultLocale: Locale,
  overrides: Partial<ProjectAPI> = {}
): ProjectAPI =>
  ({
    id: 'project-1',
    membersIds: ['u1', 'u2'],
    adminsIds: ['u1'],
    environments: [],
    autoFill: false,
    configuration: {
      internationalization: { locales, defaultLocale },
    },
    ...overrides,
  }) as unknown as ProjectAPI;

describe('countContentNodeStats', () => {
  it('counts one key per translation node and filled locales', () => {
    const content = {
      title: translation({ en: 'Hello', fr: 'Bonjour' }),
      body: { nested: translation({ en: 'World' }) },
    } as unknown as ContentNode;

    const stats = countContentNodeStats(content, [EN, FR]);

    expect(stats.keyCount).toBe(2);
    expect(stats.perLocaleTranslated[EN]).toBe(2);
    expect(stats.perLocaleTranslated[FR]).toBe(1);
  });

  it('treats null and empty strings as unfilled', () => {
    const content = {
      a: translation({ en: 'Hi', fr: null }),
      b: translation({ en: 'There', fr: '   ' }),
    } as unknown as ContentNode;

    const stats = countContentNodeStats(content, [EN, FR]);

    expect(stats.keyCount).toBe(2);
    expect(stats.perLocaleTranslated[EN]).toBe(2);
    expect(stats.perLocaleTranslated[FR]).toBe(0);
  });

  it('descends into arrays and nested objects', () => {
    const content = {
      list: [translation({ en: 'One', fr: 'Un' }), translation({ en: 'Two' })],
    } as unknown as ContentNode;

    const stats = countContentNodeStats(content, [EN, FR]);

    expect(stats.keyCount).toBe(2);
    expect(stats.perLocaleTranslated[FR]).toBe(1);
  });

  it('returns zero counts for empty content', () => {
    const stats = countContentNodeStats(null, [EN, FR]);
    expect(stats.keyCount).toBe(0);
    expect(stats.perLocaleTranslated[FR]).toBe(0);
  });
});

describe('computeProjectInsights', () => {
  it('reports zeroed metrics for a project with no dictionaries', () => {
    const insights = computeProjectInsights(makeProject([EN, FR], EN), []);

    expect(insights.dictionaryCount).toBe(0);
    expect(insights.keyCount).toBe(0);
    expect(insights.translationUnitCount).toBe(0);
    expect(insights.overallCompletionRate).toBe(0);
    expect(insights.localeCount).toBe(2);
    expect(insights.localeInsights[0].isDefault).toBe(true);
    expect(insights.lastUpdatedAt).toBeNull();
  });

  it('computes full completion when every target locale is filled', () => {
    const dictionaries: InsightDictionaryInput[] = [
      {
        key: 'home',
        updatedAt: 1000,
        content: {
          title: translation({ en: 'Hello', fr: 'Bonjour' }),
        } as unknown as ContentNode,
      },
    ];

    const insights = computeProjectInsights(
      makeProject([EN, FR], EN),
      dictionaries
    );

    expect(insights.keyCount).toBe(1);
    expect(insights.translationUnitCount).toBe(1);
    expect(insights.translatedUnitCount).toBe(1);
    expect(insights.overallCompletionRate).toBe(1);
    expect(insights.missingTranslationCount).toBe(0);
    expect(insights.dictionariesWithMissingTranslations).toBe(0);
    // default (en) + fr both fully translated
    expect(insights.fullyTranslatedLocaleCount).toBe(2);
  });

  it('computes partial completion across multiple target locales', () => {
    const dictionaries: InsightDictionaryInput[] = [
      {
        key: 'home',
        updatedAt: 2000,
        content: {
          a: translation({ en: 'A', fr: 'A-fr' }),
          b: translation({ en: 'B' }),
        } as unknown as ContentNode,
      },
    ];

    const insights = computeProjectInsights(
      makeProject([EN, FR, ES], EN),
      dictionaries
    );

    // 2 keys × 2 non-default locales = 4 units; fr has 1, es has 0 → 1 filled
    expect(insights.keyCount).toBe(2);
    expect(insights.translationUnitCount).toBe(4);
    expect(insights.translatedUnitCount).toBe(1);
    expect(insights.missingTranslationCount).toBe(3);
    expect(insights.dictionariesWithMissingTranslations).toBe(1);

    const fr = insights.localeInsights.find((l) => l.locale === FR);
    expect(fr?.translatedKeys).toBe(1);
    expect(fr?.missingKeys).toBe(1);
    expect(fr?.completionRate).toBe(0.5);
  });

  it('surfaces project metadata and recent activity', () => {
    const dictionaries: InsightDictionaryInput[] = [
      { key: 'old', updatedAt: 100, content: null },
      { key: 'new', updatedAt: 500, content: null },
    ];

    const insights = computeProjectInsights(
      makeProject([EN, FR], EN, {
        autoFill: true,
        configuration: {
          internationalization: { locales: [EN, FR], defaultLocale: EN },
          ai: { apiKeyConfigured: true },
          editor: { applicationURL: 'https://example.com' },
        },
        repository: { provider: 'github' },
      } as unknown as Partial<ProjectAPI>),
      dictionaries
    );

    expect(insights.autoFill).toBe(true);
    expect(insights.aiConfigured).toBe(true);
    expect(insights.applicationURL).toBe('https://example.com');
    expect(insights.repositoryProvider).toBe('github');
    expect(insights.memberCount).toBe(2);
    expect(insights.adminCount).toBe(1);
    expect(insights.recentlyUpdated[0].key).toBe('new');
    expect(insights.lastUpdatedAt).toBe(500);
  });
});
