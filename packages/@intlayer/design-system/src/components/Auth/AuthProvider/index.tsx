'use client';

import type { Organization, Project, UserAPI } from '@intlayer/backend';
import {
  type PropsWithChildren,
  type FC,
  createContext,
  useContext,
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
  csrfToken: string | null;
  setCsrfToken: (csrfToken: string | null) => void;
};

export const SessionContext = createContext<SessionContextProps>({
  session: undefined,
  setSession: () => null,
  checkSession: () => Promise.resolve(),
  csrfToken: null,
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
  const { session, setSession, fetchSession } = useSession(sessionProp);
  const { csrfToken, setCsrfToken } = useCSRF();

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
        checkSession: fetchSession,
        csrfToken,
        setCsrfToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
