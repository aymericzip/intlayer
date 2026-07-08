import type {
  GetAnalyticsOverviewResult,
  GetAudienceResult,
  GetContentStatsResult,
  GetExperimentResultsResult,
  IngestAnalyticsBody,
  IngestAnalyticsResult,
} from '@intlayer/backend';
import { editor } from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

export const getAnalyticsAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL = intlayerConfig?.editor?.backendURL ?? editor.backendURL;

  const ANALYTICS_API_ROUTE = `${backendURL}/api/analytics`;

  /**
   * Ingest a batch of analytics events. Public — attribution is by the
   * project's `clientId` in the body.
   * @param body - Session id, sdk version, and the collected events.
   * @returns The number of accepted events.
   */
  const sendEvents = async (
    body: IngestAnalyticsBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<IngestAnalyticsResult>(
      `${ANALYTICS_API_ROUTE}/events`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body,
      }
    );

  /**
   * Page/locale totals for the authenticated project.
   * @returns Views grouped by url and locale.
   */
  const getOverview = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetAnalyticsOverviewResult>(
      `${ANALYTICS_API_ROUTE}/overview`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  /**
   * Audience report: distinct visitors (today / 7d / window), page views, the
   * daily evolution series, and locale + country breakdowns.
   * @param days - Rolling window size in days (default 30).
   * @returns The audience statistics.
   */
  const getAudience = async (days = 30, otherOptions: FetcherOptions = {}) =>
    await fetcher<GetAudienceResult>(
      `${ANALYTICS_API_ROUTE}/audience`,
      authAPIOptions,
      otherOptions,
      {
        method: 'GET',
        params: { days: String(days) },
      }
    );

  /**
   * Per-content exposure totals — "which content is actually shown".
   * @returns Exposures grouped by dictionary key, key path, and locale.
   */
  const getContentStats = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetContentStatsResult>(
      `${ANALYTICS_API_ROUTE}/content-stats`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  /**
   * A/B experiment results with per-variant conversion rates and significance.
   * @param experimentKey - The experiment to evaluate.
   * @returns The experiment result set.
   */
  const getExperimentResults = async (
    experimentKey: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetExperimentResultsResult>(
      `${ANALYTICS_API_ROUTE}/experiments/${experimentKey}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  return {
    sendEvents,
    getOverview,
    getAudience,
    getContentStats,
    getExperimentResults,
  };
};

/**
 * Authenticated `analytics` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const analyticsEndpoint = createEndpoint(getAnalyticsAPI);
