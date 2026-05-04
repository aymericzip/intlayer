import type { SessionAPI } from '@intlayer/backend';
import { getAuthAPI } from '@intlayer/design-system/libs';
import {
  App_Auth_SignIn_Path,
  App_Home_Path,
} from '@intlayer/design-system/routes';
import type { QueryClient } from '@tanstack/react-query';
import { redirect } from '@tanstack/react-router';
import { createIsomorphicFn } from '@tanstack/react-start';
import { getLocalizedUrl, type LocalesValues } from 'intlayer';
import { accessValidation } from '#components/Auth/AuthenticationBarrier/accessValidation';

interface ValidateAuthProps {
  queryClient: QueryClient;
  pathname: string;
  search: Record<string, unknown>;
  locale?: LocalesValues;
  accessRule: Parameters<typeof accessValidation>[0];
  redirectionRoute?: string;
}

const getSafeHeaders = createIsomorphicFn()
  .server(async () => {
    try {
      const { getRequestHeaders } = await import(
        '@tanstack/react-start/server'
      );
      return getRequestHeaders();
    } catch {
      return undefined;
    }
  })
  .client(async () => undefined);

const SESSION_FETCH_TIMEOUT_MS = 5_000;

const safeGetSession = async (query?: {
  disableCookieCache?: boolean;
}): Promise<SessionAPI | null> => {
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
    // Backend unreachable, timed out, or upstream aborted: degrade to
    // "no session" so SSR can render (or redirect) instead of 500'ing.
    console.warn('[auth] getSession failed, treating as anonymous:', err);
    return null;
  }
};

export const sessionQueryOptions = {
  queryKey: ['session'],
  queryFn: () => safeGetSession(),
  // Match the design-system `useSession` hook so both subscribers on the
  // ['session'] key agree about freshness. Otherwise beforeLoad and
  // AuthenticationBarrierClient can disagree about whether to refetch and
  // redirect each other in circles.
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
} as const;

/**
 * Force a backend round-trip that bypasses better-auth's signed cookie
 * cache (5-min TTL). Used when the cached session would cause a wrongful
 * redirect, since `selectProject`/`selectOrganization` write to Mongo
 * directly without refreshing that cookie.
 */
export const refetchFreshSession = async (
  queryClient: QueryClient
): Promise<SessionAPI | null> => {
  const fresh = await safeGetSession({ disableCookieCache: true });
  queryClient.setQueryData(sessionQueryOptions.queryKey, fresh);
  return fresh;
};

const wouldRedirect = (
  accessRule: Parameters<typeof accessValidation>[0],
  session: SessionAPI | null
): boolean => {
  let triggered = false;
  accessValidation(
    accessRule,
    session,
    () => {
      triggered = true;
    },
    '',
    true
  );
  return triggered;
};

export const validateAuth = async ({
  queryClient,
  pathname,
  search,
  locale,
  accessRule,
  redirectionRoute,
}: ValidateAuthProps) => {
  let session = await queryClient.ensureQueryData(sessionQueryOptions);

  // Before redirecting, double-check against backend truth: the local
  // cache (or better-auth's cookie cache) may be lagging behind a recent
  // org/project switch.
  if (wouldRedirect(accessRule, session)) {
    session = await refetchFreshSession(queryClient);
  }

  const redirectUrlSearch =
    typeof search.redirect_url === 'string' ? search.redirect_url : null;

  const effectivePathname =
    pathname === App_Auth_SignIn_Path ? App_Home_Path : pathname;

  const redirectURL =
    redirectionRoute ??
    redirectUrlSearch ??
    `${App_Auth_SignIn_Path}?redirect_url=${encodeURIComponent(effectivePathname)}`;

  const localizedRedirectionURL = locale
    ? getLocalizedUrl(redirectURL, locale)
    : redirectURL;

  accessValidation(
    accessRule,
    session,
    (url) => {
      throw redirect({ to: url });
    },
    localizedRedirectionURL,
    true
  );

  return session;
};
