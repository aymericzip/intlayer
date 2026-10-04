import type { SessionAPI } from '@intlayer/backend-contract/session';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { createIsomorphicFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

const IS_PRERENDERING: boolean =
  typeof process !== 'undefined' && process.env?.TSS_PRERENDERING === 'true';

/**
 * Incoming request headers relayed to the backend during SSR.
 */
const FORWARDED_REQUEST_HEADERS = [
  'cookie',
  'user-agent',
  'accept-language',
  'x-forwarded-for',
] as const;

const getSafeHeaders = createIsomorphicFn()
  .server(async () => {
    try {
      const requestHeaders = getRequestHeaders();
      const forwardedHeaders = new Headers();

      for (const headerName of FORWARDED_REQUEST_HEADERS) {
        const headerValue = requestHeaders.get(headerName);

        if (headerValue) forwardedHeaders.set(headerName, headerValue);
      }

      return forwardedHeaders;
    } catch {
      return undefined;
    }
  })
  .client(async () => undefined);

const SESSION_FETCH_TIMEOUT_MS = 5_000;

export const safeGetSession = async (query?: {
  disableCookieCache?: boolean;
}): Promise<SessionAPI | null> => {
  if (IS_PRERENDERING) return null;

  const intlayerAPI = getAuthAPI();
  const headers = await getSafeHeaders();
  try {
    const result = await intlayerAPI.getSession({
      ...(query ? { query } : {}),
      fetchOptions: {
        headers,
        signal: AbortSignal.timeout(SESSION_FETCH_TIMEOUT_MS),
      },
    });
    return (result.data ?? null) as unknown as SessionAPI | null;
  } catch (err) {
    console.warn('[auth] getSession failed, treating as anonymous:', err);
    return null;
  }
};

export const sessionQueryOptions = {
  queryKey: ['session'],
  queryFn: () => safeGetSession(),
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
} as const;

export const deviceSessionsQueryOptions = {
  queryKey: ['deviceSessions'],
  queryFn: async () => {
    const intlayerAPI = getAuthAPI();
    const result = await intlayerAPI.listDeviceSessions();
    return result?.data ?? [];
  },
  staleTime: 60 * 1000,
} as const;
