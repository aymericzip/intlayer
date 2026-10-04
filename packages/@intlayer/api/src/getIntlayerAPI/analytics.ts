import type {
  AnalyticsRoutes,
  AudienceRange,
  analyticsContract,
  GetAnalyticsOverviewResult,
  GetAudienceResult,
  GetContentStatsResult,
  GetExperimentResultsResult,
  GetPageMetadataResult,
  IngestAnalyticsBody,
  IngestAnalyticsResult,
} from '@intlayer/backend-contract/analytics';
import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

/** Prefix of the routes, checked against the backend contract. */
const analyticsGroup = {
  prefix: '/api/analytics',
} as const satisfies Pick<typeof analyticsContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const analyticsEndpoints = {
  ingestAnalyticsEvents: { method: 'POST', path: '/events' },
  getAnalyticsOverview: { method: 'GET', path: '/overview' },
  getAnalyticsAudience: { method: 'GET', path: '/audience' },
  getContentStats: { method: 'GET', path: '/content-stats' },
  getExperimentResults: { method: 'GET', path: '/experiments/:experimentKey' },
  getPageMetadata: { method: 'GET', path: '/page-metadata' },
} as const satisfies RouteEndpoints<AnalyticsRoutes>;

export const getAnalyticsAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

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
      buildRouteURL(
        backendURL,
        analyticsGroup,
        analyticsEndpoints.ingestAnalyticsEvents
      ),
      authAPIOptions,
      otherOptions,
      {
        method: analyticsEndpoints.ingestAnalyticsEvents.method,
        body,
      }
    );

  /**
   * Page/locale totals for the authenticated project.
   * @returns Views grouped by url and locale.
   */
  const getOverview = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetAnalyticsOverviewResult>(
      buildRouteURL(
        backendURL,
        analyticsGroup,
        analyticsEndpoints.getAnalyticsOverview
      ),
      authAPIOptions,
      otherOptions,
      { method: analyticsEndpoints.getAnalyticsOverview.method }
    );

  /**
   * Audience report: distinct visitors (today / 7d / window), page views, the
   * evolution series, and locale + country breakdowns.
   * @param range - Rolling window, either a named range (`1h`, `24h`, `7d`,
   *   `30d`, `90d`, `6mo`, `1y`, `3y`) or a number of days (default 30).
   * @returns The audience statistics.
   */
  const getAudience = async (
    range: AudienceRange | number = 30,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAudienceResult>(
      buildRouteURL(
        backendURL,
        analyticsGroup,
        analyticsEndpoints.getAnalyticsAudience
      ),
      authAPIOptions,
      otherOptions,
      {
        method: analyticsEndpoints.getAnalyticsAudience.method,
        params: typeof range === 'number' ? { days: String(range) } : { range },
      }
    );

  /**
   * Per-content exposure totals — "which content is actually shown".
   * @returns Exposures grouped by dictionary key, key path, and locale.
   */
  const getContentStats = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetContentStatsResult>(
      buildRouteURL(
        backendURL,
        analyticsGroup,
        analyticsEndpoints.getContentStats
      ),
      authAPIOptions,
      otherOptions,
      { method: analyticsEndpoints.getContentStats.method }
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
      buildRouteURL(
        backendURL,
        analyticsGroup,
        analyticsEndpoints.getExperimentResults,
        { experimentKey }
      ),
      authAPIOptions,
      otherOptions,
      { method: analyticsEndpoints.getExperimentResults.method }
    );

  /**
   * Page metadata (title and meta description) for a given url.
   * @param url - The page url to inspect.
   * @returns Title and description of the page.
   */
  const getPageMetadata = async (
    url: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetPageMetadataResult>(
      buildRouteURL(
        backendURL,
        analyticsGroup,
        analyticsEndpoints.getPageMetadata
      ),
      authAPIOptions,
      otherOptions,
      {
        method: analyticsEndpoints.getPageMetadata.method,
        params: { url },
      }
    );

  return {
    sendEvents,
    getOverview,
    getAudience,
    getContentStats,
    getExperimentResults,
    getPageMetadata,
  };
};

/**
 * Authenticated `analytics` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const analyticsEndpoint = createEndpoint(getAnalyticsAPI);
