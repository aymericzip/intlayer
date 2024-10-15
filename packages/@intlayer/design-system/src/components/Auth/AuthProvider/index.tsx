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
};

type SessionContextProps = {
  session: Session | null | undefined;
  setSession: (session: Session | null) => void;
  checkSession: () => Promise<void>;
  csrfToken: string | null | undefined;
  csrfTokenFetched: boolean;
  setCsrfToken: (csrfToken: string | null) => void;
  oAuth2AccessToken: OAuth2Token | null | undefined;
  setOAuth2AccessToken: (oAuth2AccessToken: OAuth2Token | null) => void;
};

export const AuthContext = createContext<SessionContextProps>({
  session: undefined,
  setSession: () => null,
  checkSession: () => Promise.resolve(),
  csrfToken: null,
  csrfTokenFetched: false,
  setCsrfToken: () => null,
  oAuth2AccessToken: null,
  setOAuth2AccessToken: () => null,
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
  const { csrfToken, setCsrfToken, csrfTokenFetched } = useCSRF();
  const { session, setSession, fetchSession } = useSession(sessionProp);
  const { oAuth2AccessToken, setOAuth2AccessToken, fetchAccessToken } =
    useOAuth2(csrfToken);

  const memoValue: SessionContextProps = useMemo(
    () => ({
      session,
      setSession,
      checkSession: fetchSession,
      csrfToken,
      csrfTokenFetched,
      setCsrfToken,
      oAuth2AccessToken,
      setOAuth2AccessToken,
      fetchAccessToken,
    }),
    [
      session,
      setSession,
      fetchSession,
      csrfToken,
      csrfTokenFetched,
      setCsrfToken,
      oAuth2AccessToken,
      setOAuth2AccessToken,
      fetchAccessToken,
    ]
  );

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};
