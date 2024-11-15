'use client';

import type {
  OAuth2Token,
  Organization,
  Project,
  UserAPI,
} from '@intlayer/backend';
import {
  type PropsWithChildren,
  type FC,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useCSRF } from './useCSRF';
import { useOAuth2 } from './useOAuth2';
import { useSession } from './useSession';

export type Session = {
  user: UserAPI | null;
  organization: Organization | null;
  project: Project | null;
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

export const AuthContext = createContext<SessionContextProps>({
  session: undefined,
  setSession: () => null,
  fetchSession: () => Promise.resolve(undefined),
  revalidateSession: () => Promise.resolve(undefined),
  csrfToken: null,
  csrfTokenFetched: false,
  oAuth2AccessToken: null,
  isProjectAdmin: null,
  isOrganizationAdmin: null,
});

export const useAuth = () => useContext(AuthContext);

export type AuthProviderProps = PropsWithChildren<{
  /**
   * auth session
   */
  session?: Session | null;
}>;

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children,
  session: sessionProp,
}) => {
  const { csrfToken, csrfTokenFetched } = useCSRF();
  const { session, fetchSession, revalidateSession, setSession } =
    useSession(sessionProp);
  const { oAuth2AccessToken } = useOAuth2(csrfToken);

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

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};
