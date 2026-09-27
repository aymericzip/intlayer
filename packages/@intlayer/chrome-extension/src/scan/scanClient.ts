import type { PageDetectionResult } from '../detector/types';
import type { AuditEvent } from './types';

/** Public Intlayer backend running the audit. */
export const DEFAULT_BACKEND_URL = 'https://back.intlayer.org';

export type ScanUrlOptions = {
  /** Absolute URL of the page to audit. */
  url: string;
  /**
   * Run a new audit. Without it, a URL audited less than an hour ago is
   * replayed from the backend cache (first event carries `cachedAt`).
   */
  refresh?: boolean;
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
  refresh = false,
  onMessage,
  signal,
  backendUrl = DEFAULT_BACKEND_URL,
}: ScanUrlOptions): Promise<void> => {
  const params = new URLSearchParams({ url });
  if (refresh) params.set('refresh', 'true');
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

/** Most locales sent with a detection report (the backend caps at 100). */
const MAX_REPORTED_LOCALES = 100;

/** Locale shape accepted by the backend report schema. */
const REPORTABLE_LOCALE_PATTERN = /^[a-zA-Z]{2,3}([_-][a-zA-Z0-9]{2,8})*$/;

export type ReportHostDetectionOptions = {
  /** Result of the in-page detection. */
  detection: PageDetectionResult;
  /** Override the backend origin (defaults to {@link DEFAULT_BACKEND_URL}). */
  backendUrl?: string;
};

/**
 * Send the technologies detected on the inspected page to the Intlayer
 * backend (`POST /api/scan/hosts/detections`), which stores them on the host
 * and may queue a full audit of it. No cookie is sent. Failures are ignored:
 * the report must never disturb the popup.
 */
export const reportHostDetection = async ({
  detection,
  backendUrl = DEFAULT_BACKEND_URL,
}: ReportHostDetectionOptions): Promise<void> => {
  try {
    await fetch(`${backendUrl}/api/scan/hosts/detections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'omit',
      body: JSON.stringify({
        url: detection.url,
        technologies: detection.technologies.map(({ id, version }) => ({
          id,
          ...(version ? { version } : {}),
        })),
        routingStrategy: detection.routing.strategy,
        locales: detection.routing.locales
          .filter((locale) => REPORTABLE_LOCALE_PATTERN.test(locale))
          .slice(0, MAX_REPORTED_LOCALES),
        ...(detection.title ? { title: detection.title.slice(0, 300) } : {}),
      }),
    });
  } catch {
    // Offline or blocked: the popup works without the backend.
  }
};
