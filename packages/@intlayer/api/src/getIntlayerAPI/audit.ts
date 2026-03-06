import type {
  AuditEvent,
  GetRecursiveAuditStatusResult,
  StartRecursiveAuditResult,
} from '@intlayer/backend';
import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types';
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

export type StartRecursiveAuditBody = {
  url: string;
};

export type GetRecursiveAuditStatusParams = {
  jobId: string;
};

export const getAuditAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration?.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
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
            // ignore unparseable lines
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
        // @ts-ignore params will be stringified by the fetcher
        params: body,
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

  return {
    scanUrl,
    startRecursiveAudit,
    getRecursiveAuditStatus,
  };
};
