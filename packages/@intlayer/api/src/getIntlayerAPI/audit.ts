import type {
  AuditEvent,
  GetRecursiveAuditStatusResult,
  StartRecursiveAuditResult,
} from '@intlayer/backend';
import configuration from '@intlayer/config/built';
import { DefaultValues } from '@intlayer/config/client';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FetcherOptions, fetcher } from '../fetcher';

export type {
  AuditEvent,
  GetRecursiveAuditStatusResult,
  StartRecursiveAuditResult,
};

export type ScanUrlBody = {
  url: string;
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

export const getAuditAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  let backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration?.editor?.backendURL;

  if (!backendURL) {
    backendURL = DefaultValues.Editor.BACKEND_URL;
    console.dir({ intlayerConfig, configuration }, { depth: null });
    console.error('Backend URL is not defined in the Intlayer configuration.');
  }

  const AUDIT_API_ROUTE = `${backendURL}/api/scan`;

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
      `${AUDIT_API_ROUTE}/recursive/discover`,
      authAPIOptions,
      otherOptions,
      {
        method: 'GET',
        params,
      }
    );

  const scanUrl = async (
    body?: ScanUrlBody,
    otherOptions: FetcherOptions = {}
  ) => {
    if (!body?.url) return;

    const { url, onMessage, onDone } = body;

    const params = new URLSearchParams({ url });
    const endpoint = `${AUDIT_API_ROUTE}?${params.toString()}`;

    const response = await fetch(endpoint, {
      method: 'GET',
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
      `${AUDIT_API_ROUTE}/recursive/start`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      `${AUDIT_API_ROUTE}/recursive/${params?.jobId}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'GET',
      }
    );

  const cancelRecursiveAudit = async (
    params?: RecursiveAuditJobParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<{ success: boolean }>(
      `${AUDIT_API_ROUTE}/recursive/${params?.jobId}/cancel`,
      authAPIOptions,
      otherOptions,
      { method: 'POST' }
    );

  const pauseRecursiveAudit = async (
    params?: RecursiveAuditJobParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<{ success: boolean }>(
      `${AUDIT_API_ROUTE}/recursive/${params?.jobId}/pause`,
      authAPIOptions,
      otherOptions,
      { method: 'POST' }
    );

  const resumeRecursiveAudit = async (
    params?: RecursiveAuditJobParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<{ success: boolean }>(
      `${AUDIT_API_ROUTE}/recursive/${params?.jobId}/resume`,
      authAPIOptions,
      otherOptions,
      { method: 'POST' }
    );

  return {
    discoverUrls,
    scanUrl,
    startRecursiveAudit,
    getRecursiveAuditStatus,
    cancelRecursiveAudit,
    pauseRecursiveAudit,
    resumeRecursiveAudit,
  };
};
