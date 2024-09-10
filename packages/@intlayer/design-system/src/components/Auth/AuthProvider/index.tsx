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
  session: Session | null;
  setSession: (session: Session | null) => void;
  checkSession: () => Promise<void>;
  csrfToken: string | null;
};

export const SessionContext = createContext<SessionContextProps>({
  session: null,
  setSession: () => null,
  checkSession: () => Promise.resolve(),
  csrfToken: null,
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
  const { csrfToken } = useCSRF();

  return (
    <SessionContext.Provider
      value={{
        session: session ?? null,
        setSession,
        checkSession: fetchSession,
        csrfToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
