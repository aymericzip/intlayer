'use client';

import { backendAPI } from '@utils/backend-api';
import {
  type PropsWithChildren,
  type FC,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import type { Organization } from '@/types/organization.types';
import type { Project } from '@/types/project.types';
import type { UserAPI } from '@/types/user.types';

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
      const { data } = await backendAPI.auth.getSessionInformation();

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
