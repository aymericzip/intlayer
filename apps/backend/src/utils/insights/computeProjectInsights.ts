import type { Locale } from '@intlayer/types/allLocales';
import type { ContentNode } from '@intlayer/types/dictionary';
import { TRANSLATION } from '@intlayer/types/nodeType';
import type { ProjectAPI } from '@/types/project.types';
import type {
  LocaleInsight,
  ProjectInsights,
} from '@/types/projectInsights.types';

/** Minimal dictionary shape required to compute insights. */
export type InsightDictionaryInput = {
  key: string;
  content: ContentNode | null;
  updatedAt: number;
};

/** Per-dictionary translation-node stats. */
export type ContentNodeStats = {
  /** Number of translation nodes (one per translatable key). */
  keyCount: number;
  /** Number of keys filled, per locale. */
  perLocaleTranslated: Record<string, number>;
};

/** Number of recently-updated dictionaries surfaced on the overview. */
const RECENTLY_UPDATED_LIMIT = 5;

/**
 * Returns `true` when a translation value counts as "filled" (i.e. it carries a
 * real, non-empty value rather than a `null`/empty placeholder). Mirrors the
 * null-placeholder convention used by
 * {@link file://./../../../packages/@intlayer/core/src/deepTransformPlugins/getMissingLocalesContent.ts getMissingLocalesContent},
 * but evaluated at value granularity.
 */
const isValueFilled = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number' || typeof value === 'boolean') return true;
  if (Array.isArray(value)) return value.some(isValueFilled);
  if (typeof value === 'object') {
    return Object.values(value).some(isValueFilled);
  }
  return false;
};

/**
 * Recursively walks a dictionary content node, counting translation nodes and,
 * for each requested locale, how many of them carry a filled value.
 *
 * Every translation node (`t()` call) is counted as exactly one key. The walk
 * descends into every object value — including the values held inside a
 * translation node — so nested translation nodes are counted as their own keys.
 *
 * @param node - The content node to inspect (a dictionary's latest content).
 * @param locales - Locales to evaluate fill status for.
 * @returns Aggregated key count and per-locale filled counts.
 */
export const countContentNodeStats = (
  node: ContentNode | null | undefined,
  locales: Locale[]
): ContentNodeStats => {
  const perLocaleTranslated: Record<string, number> = Object.fromEntries(
    locales.map((locale) => [locale, 0])
  );
  const stats: ContentNodeStats = { keyCount: 0, perLocaleTranslated };

  const walk = (current: unknown): void => {
    if (current === null || typeof current !== 'object') return;

    if (Array.isArray(current)) {
      current.forEach(walk);
      return;
    }

    const record = current as Record<string, unknown>;

    if (record.nodeType === TRANSLATION) {
      const translations = (record[TRANSLATION] ?? {}) as Record<
        string,
        unknown
      >;

      stats.keyCount += 1;
      for (const locale of locales) {
        if (isValueFilled(translations[locale])) {
          stats.perLocaleTranslated[locale] += 1;
        }
      }

      // Descend into translation values to catch nested translation nodes.
      for (const value of Object.values(translations)) {
        walk(value);
      }
      return;
    }

    // Plain object or any other node type — descend into all values.
    for (const value of Object.values(record)) {
      walk(value);
    }
  };

  walk(node);

  return stats;
};

/**
 * Computes the project-wide localization insights surfaced on the dashboard
 * overview page, from the project configuration and the latest content of each
 * of its dictionaries.
 *
 * @param project - The project (API shape) to summarize.
 * @param dictionaries - The project's dictionaries with their latest content.
 * @returns A fully-populated {@link ProjectInsights} snapshot.
 */
export const computeProjectInsights = (
  project: ProjectAPI,
  dictionaries: InsightDictionaryInput[]
): ProjectInsights => {
  const i18n = project.configuration?.internationalization;
  const locales = (i18n?.locales ?? []) as Locale[];
  const defaultLocale = (i18n?.defaultLocale ?? null) as Locale | null;
  const nonDefaultLocales = locales.filter(
    (locale) => locale !== defaultLocale
  );

  // Aggregate per-locale filled counts and per-dictionary completeness.
  const totalPerLocaleTranslated: Record<string, number> = Object.fromEntries(
    locales.map((locale) => [locale, 0])
  );
  let keyCount = 0;
  let dictionariesWithMissingTranslations = 0;

  for (const dictionary of dictionaries) {
    const stats = countContentNodeStats(dictionary.content, locales);
    keyCount += stats.keyCount;

    for (const locale of locales) {
      totalPerLocaleTranslated[locale] += stats.perLocaleTranslated[locale];
    }

    const hasMissing =
      stats.keyCount > 0 &&
      nonDefaultLocales.some(
        (locale) => stats.perLocaleTranslated[locale] < stats.keyCount
      );
    if (hasMissing) dictionariesWithMissingTranslations += 1;
  }

  // Per-locale breakdown, default locale first.
  const orderedLocales: Locale[] = defaultLocale
    ? [defaultLocale, ...nonDefaultLocales]
    : [...locales];

  const localeInsights: LocaleInsight[] = orderedLocales.map((locale) => {
    const translatedKeys = totalPerLocaleTranslated[locale] ?? 0;
    return {
      locale,
      isDefault: locale === defaultLocale,
      translatedKeys,
      totalKeys: keyCount,
      missingKeys: Math.max(keyCount - translatedKeys, 0),
      completionRate: keyCount > 0 ? translatedKeys / keyCount : 0,
    };
  });

  const translationUnitCount = keyCount * nonDefaultLocales.length;
  const translatedUnitCount = nonDefaultLocales.reduce(
    (sum, locale) => sum + (totalPerLocaleTranslated[locale] ?? 0),
    0
  );
  const overallCompletionRate =
    translationUnitCount > 0 ? translatedUnitCount / translationUnitCount : 0;

  const fullyTranslatedLocaleCount = localeInsights.filter(
    (insight) => insight.totalKeys > 0 && insight.completionRate >= 1
  ).length;

  const recentlyUpdated = [...dictionaries]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, RECENTLY_UPDATED_LIMIT)
    .map((dictionary) => ({
      key: dictionary.key,
      updatedAt: dictionary.updatedAt,
    }));

  return {
    projectId: String(project.id),
    generatedAt: Date.now(),
    defaultLocale,
    localeCount: locales.length,
    dictionaryCount: dictionaries.length,
    keyCount,
    translationUnitCount,
    translatedUnitCount,
    overallCompletionRate,
    fullyTranslatedLocaleCount,
    dictionariesWithMissingTranslations,
    missingTranslationCount: Math.max(
      translationUnitCount - translatedUnitCount,
      0
    ),
    localeInsights,
    recentlyUpdated,
    lastUpdatedAt: recentlyUpdated[0]?.updatedAt ?? null,
    memberCount: project.membersIds?.length ?? 0,
    adminCount: project.adminsIds?.length ?? 0,
    environmentCount: project.environments?.length ?? 0,
    autoFill: Boolean(project.autoFill),
    aiConfigured: Boolean(
      project.configuration?.ai?.apiKeyConfigured ||
        project.configuration?.ai?.apiKey
    ),
    repositoryProvider: project.repository?.provider ?? null,
    applicationURL: project.configuration?.editor?.applicationURL ?? null,
  };
};
