'use client';

import type {
  OAuth2Token,
  OrganizationAPI,
  ProjectAPI,
  UserAPI,
} from '@intlayer/backend';
import { type IntlayerConfig } from '@intlayer/config/client';
import { useMemo } from 'react';
import { useCSRF } from './useCSRF';
import { useOAuth2 } from './useOAuth2';
import { useSession } from './useSession';

export type Session = {
  user: UserAPI | null;
  organization: OrganizationAPI | null;
  project: ProjectAPI | null;
  isOrganizationAdmin: boolean;
  isProjectAdmin: boolean;
};

type SessionContextProps = {
  session: Session | null | undefined;
  setSession: (session: Session | null) => void;
  fetchSession: () => Promise<Session | null | undefined>;
  revalidateSession: () => Promise<Session | null | undefined>;
  csrfToken: string | null | undefined;
  csrfTokenFetched: boolean;
  oAuth2AccessToken: OAuth2Token | null | undefined;
  isProjectAdmin: boolean | null | undefined;
  isOrganizationAdmin: boolean | null | undefined;
};

export const useAuth = ({
  session: sessionProp,
  intlayerConfiguration,
}: {
  session?: Session | null;
  intlayerConfiguration?: IntlayerConfig;
} = {}) => {
  const { csrfToken, csrfTokenFetched } = useCSRF(intlayerConfiguration);
  const { session, fetchSession, revalidateSession, setSession } = useSession(
    sessionProp,
    intlayerConfiguration
  );
  const { oAuth2AccessToken } = useOAuth2(csrfToken, intlayerConfiguration);

  const memoValue: SessionContextProps = useMemo(
    () => ({
      session,
      fetchSession,
      setSession,
      revalidateSession,
      csrfToken,
      csrfTokenFetched,
      oAuth2AccessToken,
      isProjectAdmin: session?.isProjectAdmin,
      isOrganizationAdmin: session?.isOrganizationAdmin,
    }),
    [
      session,
      setSession,
      fetchSession,
      revalidateSession,
      csrfToken,
      csrfTokenFetched,
      oAuth2AccessToken,
    ]
  );

  return memoValue;
};
