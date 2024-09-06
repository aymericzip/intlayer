'use client';

import type { Organization, Project, UserAPI } from '@intlayer/backend';
import { intlayerAPI } from '@intlayer/core';
import {
  type PropsWithChildren,
  type FC,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

export type Session = {
  user: UserAPI | null;
  organization: Organization | null;
  project: Project | null;
};

type SessionContextProps = {
  session: Session | null;
  setSession: (session: Session | null) => void;
  checkSession: () => Promise<void>;
};

export const SessionContext = createContext<SessionContextProps>({
  session: null,
  setSession: () => null,
  checkSession: () => Promise.resolve(),
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
  const [session, setSession] = useState<Session | null>(null);

  const fetchSession = useCallback(async () => {
    if (sessionProp) {
      return;
    }

    try {
      const { data } = await intlayerAPI.auth.getSessionInformation();

      if (!data) {
        return setSession(null);
      }

      const session: Session = {
        user: data.user,
        organization: null,
        project: null,
      };

      setSession(session);
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  }, [sessionProp]);

  useEffect(() => {
    fetchSession().catch((error) =>
      console.error('Error fetching session:', error)
    );
  }, [fetchSession, sessionProp]);

  return (
    <SessionContext.Provider
      value={{
        session: session ?? null,
        setSession,
        checkSession: fetchSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
