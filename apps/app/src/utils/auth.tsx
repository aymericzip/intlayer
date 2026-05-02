import type { SessionAPI } from '@intlayer/backend';
import { getAuthAPI } from '@intlayer/design-system/libs';
import {
  App_Auth_SignIn_Path,
  App_Home_Path,
} from '@intlayer/design-system/routes';
import type { QueryClient } from '@tanstack/react-query';
import { redirect } from '@tanstack/react-router';
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

export const sessionQueryOptions = {
  queryKey: ['session'],
  queryFn: async () => {
    const intlayerAPI = getAuthAPI();
    const result = await intlayerAPI.getSession();
    // Narrow to the public shape we want to expose
    return result.data as unknown as SessionAPI;
  },
  // Session data rarely changes during navigation, so keep it fresh for 1 minute
  // This prevents unnecessary refetches when navigating between pages
  staleTime: 60 * 1000,
  gcTime: 5 * 60 * 1000,
} as const;

/**
 * Force a backend round-trip that bypasses better-auth's signed cookie
 * cache (5-min TTL). Used when the cached session would cause a wrongful
 * redirect, since `selectProject`/`selectOrganization` write to Mongo
 * directly without refreshing that cookie.
 */
export const refetchFreshSession = async (
  queryClient: QueryClient
): Promise<SessionAPI> => {
  const intlayerAPI = getAuthAPI();
  const result = await intlayerAPI.getSession({
    query: { disableCookieCache: true },
  });
  const fresh = result.data as unknown as SessionAPI;
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
