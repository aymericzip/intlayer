import type { Locale } from '@intlayer/types/allLocales';
import type { RepositoryProvider } from './project.types';

/**
 * Translation health for a single locale of a project, computed at key
 * (translation-node) granularity.
 */
export type LocaleInsight = {
  /** The locale code (e.g. `en`, `fr`). */
  locale: Locale;
  /** Whether this is the project's default (source) locale. */
  isDefault: boolean;
  /** Number of keys that have a non-empty value for this locale. */
  translatedKeys: number;
  /** Total number of keys in the project. */
  totalKeys: number;
  /** Keys still missing a value for this locale (`totalKeys - translatedKeys`). */
  missingKeys: number;
  /** Completion ratio in the `[0, 1]` range (`translatedKeys / totalKeys`). */
  completionRate: number;
};

/**
 * Aggregated, project-wide localization insights surfaced on the dashboard
 * overview page. Computed server-side from the project configuration and the
 * latest content of every dictionary attached to the project.
 */
export type ProjectInsights = {
  /** The project the insights were computed for. */
  projectId: string;
  /** Unix epoch (ms) at which the snapshot was computed. */
  generatedAt: number;
  /** The project's default (source) locale, or `null` when not configured. */
  defaultLocale: Locale | null;
  /** Number of locales configured for the project. */
  localeCount: number;
  /** Number of dictionaries attached to the project. */
  dictionaryCount: number;
  /** Total number of translatable keys (translation nodes) across dictionaries. */
  keyCount: number;
  /** Target translation units: `keyCount × (number of non-default locales)`. */
  translationUnitCount: number;
  /** Translation units (non-default locales) that are filled. */
  translatedUnitCount: number;
  /** Overall completion ratio in the `[0, 1]` range. */
  overallCompletionRate: number;
  /** Number of locales that are 100% translated. */
  fullyTranslatedLocaleCount: number;
  /** Number of dictionaries missing at least one translation. */
  dictionariesWithMissingTranslations: number;
  /** Total missing translation units across all non-default locales. */
  missingTranslationCount: number;
  /** Per-locale completion breakdown (ordered with the default locale first). */
  localeInsights: LocaleInsight[];
  /** Most recently updated dictionaries (key + timestamp), newest first. */
  recentlyUpdated: { key: string; updatedAt: number }[];
  /** Timestamp of the most recently updated dictionary, or `null` when none. */
  lastUpdatedAt: number | null;
  /** Number of members on the project. */
  memberCount: number;
  /** Number of admins on the project. */
  adminCount: number;
  /** Number of environments configured for the project. */
  environmentCount: number;
  /** Whether auto-fill (auto-translation on push) is enabled. */
  autoFill: boolean;
  /** Whether an AI provider/API key is configured for the project. */
  aiConfigured: boolean;
  /** Connected git provider, or `null` when no repository is linked. */
  repositoryProvider: RepositoryProvider | null;
  /** The configured application URL (enables the scanner), or `null`. */
  applicationURL: string | null;
};
