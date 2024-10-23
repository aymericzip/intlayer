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
  useState,
  useEffect,
} from 'react';
import { useAsyncCacheStore } from '../../../hooks/useAsync/useAsyncCacheStore';
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
  isProjectAdmin: boolean;
  isOrganizationAdmin: boolean;
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
  isProjectAdmin: false,
  isOrganizationAdmin: false,
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
  const [isProjectAdmin, setIsProjectAdmin] = useState<boolean>(false);
  const [isOrganizationAdmin, setIsOrganizationAdmin] =
    useState<boolean>(false);
  const clearCache = useAsyncCacheStore((state) => state.clearCache);

  useEffect(() => {
    if (session?.user && session.organization) {
      setIsOrganizationAdmin(
        session.organization.adminsIds.includes(session.user._id)
      );
    }
    if (session?.user && session.project) {
      setIsProjectAdmin(
        session.project?.adminsIds.includes(session.user._id) ?? false
      );
    }
  }, [session]);

  useEffect(() => {
    // Clear cache of useAsync when session changes
    clearCache();
  }, [
    session?.organization?._id,
    session?.project?._id,
    session?.user?._id,
    clearCache,
  ]);

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
      isProjectAdmin,
      isOrganizationAdmin,
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
      isProjectAdmin,
      isOrganizationAdmin,
    ]
  );

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};
