import type { AuditEvent } from './types';

/** Public Intlayer backend running the audit. */
export const DEFAULT_BACKEND_URL = 'https://back.intlayer.org';

export type ScanUrlOptions = {
  /** Absolute URL of the page to audit. */
  url: string;
  /** Called for every SSE event streamed by the backend. */
  onMessage: (event: AuditEvent) => void;
  /** Aborts the underlying fetch. */
  signal?: AbortSignal;
  /** Override the backend origin (defaults to {@link DEFAULT_BACKEND_URL}). */
  backendUrl?: string;
};

/**
 * Streams a full i18n/SEO audit of `url` from the Intlayer backend
 * (`GET /api/scan?url=…`, Server-Sent Events).
 *
 * Mirrors `getAuditAPI().scanUrl` from `@intlayer/api`, kept standalone so the
 * extension bundle stays minimal. Resolves once the stream is fully consumed.
 */
export const scanUrl = async ({
  url,
  onMessage,
  signal,
  backendUrl = DEFAULT_BACKEND_URL,
}: ScanUrlOptions): Promise<void> => {
  const params = new URLSearchParams({ url });
  const endpoint = `${backendUrl}/api/scan?${params.toString()}`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: { Accept: 'text/event-stream' },
    signal,
  });

  if (!response.ok) {
    let errorMessage = `Scan request failed (${response.status})`;
    try {
      const errorText = await response.text();
      if (errorText) errorMessage = errorText;
    } catch {
      // Keep the status-based message.
    }
    throw new Error(errorMessage);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response stream available');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      try {
        onMessage(JSON.parse(line.slice(6)) as AuditEvent);
      } catch {
        // Ignore malformed SSE lines.
      }
    }
  }
};
