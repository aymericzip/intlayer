import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  AuditEvent,
  GetRecursiveAuditStatusResult,
  GetScannedHostParams,
  GetScannedHostResult,
  GetScannedHostsQuery,
  GetScannedHostsResult,
  GetTechnologyUsageQuery,
  GetTechnologyUsageResult,
  ScanRoutes,
  StartRecursiveAuditResult,
  scanContract,
} from '@intlayer/backend-contract/scan';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

export type {
  AuditEvent,
  GetRecursiveAuditStatusResult,
  GetScannedHostParams,
  GetScannedHostResult,
  GetScannedHostsQuery,
  GetScannedHostsResult,
  GetTechnologyUsageQuery,
  GetTechnologyUsageResult,
  StartRecursiveAuditResult,
};

export type ScanUrlBody = {
  url: string;
  /**
   * Force a new audit. Without it, a URL audited less than an hour ago is
   * replayed from cache (its first event carries `cachedAt`).
   */
  refresh?: boolean;
  onMessage?: (event: AuditEvent) => void;
  onDone?: () => void;
};

export type DiscoverUrlsParams = {
  url: string;
};

export type DiscoverUrlsResult = {
  urls: string[];
};

export type StartRecursiveAuditBody = {
  url: string;
  urls?: string[];
};

export type GetRecursiveAuditStatusParams = {
  jobId: string;
};

export type RecursiveAuditJobParams = {
  jobId: string;
};

/** Prefix of the routes, checked against the backend contract. */
const scanGroup = {
  prefix: '/api/scan',
} as const satisfies Pick<typeof scanContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const scanEndpoints = {
  scan: { method: 'GET', path: '/' },
  getTechnologyUsage: { method: 'GET', path: '/technologies' },
  getScannedHosts: { method: 'GET', path: '/hosts' },
  getScannedHost: { method: 'GET', path: '/hosts/:host' },
  reportHostDetection: { method: 'POST', path: '/hosts/detections' },
  discoverUrls: { method: 'GET', path: '/recursive/discover' },
  startRecursive: { method: 'POST', path: '/recursive/start' },
  getRecursiveStatus: { method: 'GET', path: '/recursive/:jobId' },
  cancelRecursive: { method: 'POST', path: '/recursive/:jobId/cancel' },
  pauseRecursive: { method: 'POST', path: '/recursive/:jobId/pause' },
  resumeRecursive: { method: 'POST', path: '/recursive/:jobId/resume' },
} as const satisfies RouteEndpoints<ScanRoutes>;

export const getAuditAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  /**
   * Streams a single-page SEO audit as Server-Sent Events.
   *
   * Usage:
   * ```ts
   * await audit.scanUrl({
   *   url: 'https://example.com',
   *   onMessage: (event) => console.log(event),
   *   onDone: () => console.log('done'),
   * });
   * ```
   */
  const discoverUrls = async (
    params?: DiscoverUrlsParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<DiscoverUrlsResult>(
      buildRouteURL(backendURL, scanGroup, scanEndpoints.discoverUrls),
      authAPIOptions,
      otherOptions,
      {
        method: scanEndpoints.discoverUrls.method,
        params,
      }
    );

  const scanUrl = async (
    body?: ScanUrlBody,
    otherOptions: FetcherOptions = {}
  ) => {
    if (!body?.url) return;

    const { url, refresh, onMessage, onDone } = body;

    const params = new URLSearchParams({ url });
    if (refresh) params.set('refresh', 'true');
    const endpoint = `${buildRouteURL(backendURL, scanGroup, scanEndpoints.scan)}?${params.toString()}`;

    const response = await fetch(endpoint, {
      method: scanEndpoints.scan.method,
      headers: {
        Accept: 'text/event-stream',
        ...authAPIOptions.headers,
        ...otherOptions.headers,
      },
      credentials: 'include',
      signal: otherOptions.signal,
    });

    if (!response.ok) {
      let errorMessage = 'An error occurred';
      try {
        const errorData = await response.json();
        errorMessage = JSON.stringify(errorData.error) ?? errorMessage;
      } catch {
        try {
          const errorText = await response.text();
          if (errorText) errorMessage = errorText;
        } catch {
          // ignore
        }
      }
      throw new Error(errorMessage);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No reader available');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const event = JSON.parse(line.slice(6)) as AuditEvent;
            onMessage?.(event);
          } catch {
            // ignore malformed lines
          }
        }
      }
    }

    onDone?.();
  };

  /**
   * Starts a recursive audit job for the given URL.
   */
  const startRecursiveAudit = async (
    body?: StartRecursiveAuditBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<StartRecursiveAuditResult>(
      buildRouteURL(backendURL, scanGroup, scanEndpoints.startRecursive),
      authAPIOptions,
      otherOptions,
      {
        method: scanEndpoints.startRecursive.method,
        params: body?.url ? { url: body.url } : undefined,
        body: body?.urls !== undefined ? { urls: body.urls as any } : undefined,
      }
    );

  /**
   * Gets the status of a recursive audit job.
   */
  const getRecursiveAuditStatus = async (
    params?: GetRecursiveAuditStatusParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetRecursiveAuditStatusResult>(
      buildRouteURL(backendURL, scanGroup, scanEndpoints.getRecursiveStatus, {
        jobId: String(params?.jobId),
      }),
      authAPIOptions,
      otherOptions,
      {
        method: scanEndpoints.getRecursiveStatus.method,
      }
    );

  const cancelRecursiveAudit = async (
    params?: RecursiveAuditJobParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<{ success: boolean }>(
      buildRouteURL(backendURL, scanGroup, scanEndpoints.cancelRecursive, {
        jobId: String(params?.jobId),
      }),
      authAPIOptions,
      otherOptions,
      { method: scanEndpoints.cancelRecursive.method }
    );

  const pauseRecursiveAudit = async (
    params?: RecursiveAuditJobParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<{ success: boolean }>(
      buildRouteURL(backendURL, scanGroup, scanEndpoints.pauseRecursive, {
        jobId: String(params?.jobId),
      }),
      authAPIOptions,
      otherOptions,
      { method: scanEndpoints.pauseRecursive.method }
    );

  const resumeRecursiveAudit = async (
    params?: RecursiveAuditJobParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<{ success: boolean }>(
      buildRouteURL(backendURL, scanGroup, scanEndpoints.resumeRecursive, {
        jobId: String(params?.jobId),
      }),
      authAPIOptions,
      otherOptions,
      { method: scanEndpoints.resumeRecursive.method }
    );

  /**
   * Admin — number of scanned domains using each technology.
   */
  const getTechnologyUsage = async (
    params?: GetTechnologyUsageQuery,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetTechnologyUsageResult>(
      buildRouteURL(backendURL, scanGroup, scanEndpoints.getTechnologyUsage),
      authAPIOptions,
      otherOptions,
      { method: scanEndpoints.getTechnologyUsage.method, params }
    );

  /**
   * Admin — scanned hosts, most recently scanned first, filterable by
   * technology.
   */
  const getScannedHosts = async (
    params?: GetScannedHostsQuery,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetScannedHostsResult>(
      buildRouteURL(backendURL, scanGroup, scanEndpoints.getScannedHosts),
      authAPIOptions,
      otherOptions,
      { method: scanEndpoints.getScannedHosts.method, params }
    );

  /**
   * Admin — a scanned host with its stored scans, newest first.
   */
  const getScannedHost = async (
    params?: GetScannedHostParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetScannedHostResult>(
      buildRouteURL(backendURL, scanGroup, scanEndpoints.getScannedHost, {
        host: params?.host ?? '',
      }),
      authAPIOptions,
      otherOptions,
      { method: scanEndpoints.getScannedHost.method }
    );

  return {
    getTechnologyUsage,
    getScannedHosts,
    getScannedHost,
    discoverUrls,
    scanUrl,
    startRecursiveAudit,
    getRecursiveAuditStatus,
    cancelRecursiveAudit,
    pauseRecursiveAudit,
    resumeRecursiveAudit,
  };
};

/**
 * Authenticated `audit` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const auditEndpoint = createEndpoint(getAuditAPI);
