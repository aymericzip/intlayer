import type { AIConfig, AIOptions } from '@intlayer/ai';
import { AiProviders } from '@intlayer/types/config';
import { getPlanDetails } from '@utils/plan';
import type { Plan } from '@/types/plan.types';

/** Number of AI tokens (input + output) billed as one AI credit. */
export const TOKENS_PER_AI_CREDIT = 1_000;

/** AI features that draw from the organization's AI credit balance. */
export const AI_CREDIT_FEATURES = [
  'translation',
  'translate_json',
  'custom_query',
  'audit_dictionary',
  'audit_dictionary_field',
  'audit_dictionary_metadata',
  'audit_tag',
  'chat',
  'autocomplete',
] as const;

export type AICreditFeature = (typeof AI_CREDIT_FEATURES)[number];

/** Monthly token counter stored on the organization. */
export type AICreditCounter = {
  /** Calendar month (UTC) the counter belongs to, formatted `YYYY-MM`. */
  periodKey: string;
  /** Tokens consumed on Intlayer's AI key during that month. */
  usedTokens: number;
};

/** Providers that run locally and never touch Intlayer's AI key. */
const LOCAL_PROVIDERS: ReadonlySet<string> = new Set([
  AiProviders.OLLAMA,
  AiProviders.LMSTUDIO,
]);

const isMaskedAPIKey = (apiKey: string): boolean => apiKey.includes('*');

/**
 * Returns the `YYYY-MM` (UTC) key of the credit period containing `date`.
 */
export const getAICreditPeriodKey = (date: Date): string =>
  `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;

/**
 * Returns the bounds of the calendar month (UTC) containing `date`.
 * `periodEnd` is exclusive: it is the first instant of the next month.
 */
export const getAICreditPeriodBounds = (
  date: Date
): { periodStart: Date; periodEnd: Date } => ({
  periodStart: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1)),
  periodEnd: new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1)
  ),
});

/**
 * Converts a token count into credits, rounded to two decimals.
 */
export const convertTokensToCredits = (tokens: number): number =>
  Math.round((tokens / TOKENS_PER_AI_CREDIT) * 100) / 100;

/**
 * Tokens consumed during the period `periodKey`. A counter left over from a
 * previous month counts as zero: the balance resets lazily.
 */
export const getUsedTokensInPeriod = (
  counter: AICreditCounter | undefined | null,
  periodKey: string
): number =>
  counter?.periodKey === periodKey ? Math.max(0, counter.usedTokens) : 0;

/**
 * Monthly token budget granted by a plan (inactive plans fall back to FREE).
 */
export const getMonthlyAITokenAllowance = (
  plan?: Pick<Plan, 'status' | 'type'>
): number => getPlanDetails(plan).monthlyAICredits * TOKENS_PER_AI_CREDIT;

/**
 * Whether a request resolves to Intlayer's own AI key, i.e. whether it must be
 * billed in credits. Mirrors `getAIConfig`'s merge: sources are ordered from
 * lowest to highest precedence and masked keys are ignored.
 *
 * @param aiOptionSources - e.g. `[defaultOptions, projectOptions, userOptions]`.
 */
export const isUsingPlatformAIKey = (
  aiOptionSources: readonly (AIOptions | undefined)[]
): boolean => {
  let provider: string | undefined;
  let apiKey: string | undefined;

  for (const source of aiOptionSources) {
    if (source?.provider) provider = source.provider;
    if (source?.apiKey && !isMaskedAPIKey(source.apiKey))
      apiKey = source.apiKey;
  }

  if (provider && LOCAL_PROVIDERS.has(provider)) return false;

  return !apiKey;
};

/** Provider and model an AI call actually ran on. */
export type AIModelIdentity = {
  /** Provider id, e.g. `openai` (the AI SDK `openai.responses` is trimmed). */
  provider?: string;
  model?: string;
};

/**
 * Reads the provider and model resolved by `getAIConfig`.
 */
export const getAIModelIdentity = (
  aiConfig?: Pick<AIConfig, 'model'>
): AIModelIdentity => {
  const languageModel = aiConfig?.model;

  if (!languageModel) return {};
  if (typeof languageModel === 'string') return { model: languageModel };

  return {
    provider: languageModel.provider.split('.')[0],
    model: languageModel.modelId,
  };
};

/** Default and maximum length of the day-by-day usage series. */
export const AI_CREDIT_USAGE_DEFAULT_DAYS = 30;
export const AI_CREDIT_USAGE_MAX_DAYS = 366;

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Parses the `days` query parameter, clamped to `[1, AI_CREDIT_USAGE_MAX_DAYS]`.
 */
export const parseAICreditUsageDays = (rawDays?: string): number => {
  const days = Number.parseInt(rawDays ?? '', 10);

  if (!Number.isFinite(days)) return AI_CREDIT_USAGE_DEFAULT_DAYS;

  return Math.min(AI_CREDIT_USAGE_MAX_DAYS, Math.max(1, days));
};

/** Formats a date as its UTC day, `YYYY-MM-DD`. */
export const formatUTCDay = (date: Date): string =>
  date.toISOString().slice(0, 10);

/**
 * UTC day range of the last `dayCount` days, today included.
 * `to` is exclusive: the first instant of tomorrow.
 */
export const getAICreditUsageDayRange = (
  dayCount: number,
  now: Date
): { from: Date; to: Date } => {
  const tomorrow = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1
  );

  return {
    from: new Date(tomorrow - dayCount * MILLISECONDS_PER_DAY),
    to: new Date(tomorrow),
  };
};

/** Usage of one feature on one UTC day, as aggregated from the ledger. */
export type AICreditDailyUsageRow = {
  date: string;
  feature: AICreditFeature;
  tokens: number;
  requestCount: number;
};

/** Usage of one feature on one day. */
export type AICreditFeatureDayUsage = {
  feature: AICreditFeature;
  tokens: number;
  credits: number;
  requestCount: number;
};

/** Usage of one day, all features combined then broken down. */
export type AICreditDayUsage = {
  date: string;
  tokens: number;
  credits: number;
  requestCount: number;
  byFeature: AICreditFeatureDayUsage[];
};

/**
 * Turns aggregated ledger rows into a continuous day series starting at
 * `from`: days without usage are present with zeros, features are sorted by
 * tokens (most expensive first).
 */
export const buildAICreditDailyUsage = (
  rows: readonly AICreditDailyUsageRow[],
  from: Date,
  dayCount: number
): AICreditDayUsage[] => {
  const rowsByDate = new Map<string, AICreditDailyUsageRow[]>();

  for (const row of rows) {
    const dateRows = rowsByDate.get(row.date) ?? [];
    dateRows.push(row);
    rowsByDate.set(row.date, dateRows);
  }

  return Array.from({ length: dayCount }, (_unused, dayIndex) => {
    const date = formatUTCDay(
      new Date(from.getTime() + dayIndex * MILLISECONDS_PER_DAY)
    );
    const dateRows = rowsByDate.get(date) ?? [];
    const tokens = dateRows.reduce((sum, row) => sum + row.tokens, 0);

    return {
      date,
      tokens,
      credits: convertTokensToCredits(tokens),
      requestCount: dateRows.reduce((sum, row) => sum + row.requestCount, 0),
      byFeature: [...dateRows]
        .sort((first, second) => second.tokens - first.tokens)
        .map((row) => ({
          feature: row.feature,
          tokens: row.tokens,
          credits: convertTokensToCredits(row.tokens),
          requestCount: row.requestCount,
        })),
    };
  });
};
