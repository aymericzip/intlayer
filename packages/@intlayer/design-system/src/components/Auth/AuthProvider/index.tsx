'use client';

import type { Organization, Project, UserAPI } from '@intlayer/backend';
import {
  type PropsWithChildren,
  type FC,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useCSRF } from './useCSRF';
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
};

export const SessionContext = createContext<SessionContextProps>({
  session: undefined,
  setSession: () => null,
  checkSession: () => Promise.resolve(),
  csrfToken: null,
  csrfTokenFetched: false,
  setCsrfToken: () => null,
});

export const useAuth = () => useContext(SessionContext);

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

  const memoValue = useMemo(
    () => ({
      session,
      setSession,
      checkSession: fetchSession,
      csrfToken,
      csrfTokenFetched,
      setCsrfToken,
    }),
    [
      session,
      setSession,
      fetchSession,
      csrfToken,
      csrfTokenFetched,
      setCsrfToken,
    ]
  );

  return (
    <SessionContext.Provider value={memoValue}>
      {children}
    </SessionContext.Provider>
  );
};
