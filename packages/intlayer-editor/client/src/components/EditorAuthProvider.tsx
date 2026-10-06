'use client';

import {
  type BearerAuth,
  BearerAuthProvider,
} from '@intlayer/design-system/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type FC, type PropsWithChildren, useEffect, useState } from 'react';

/** Delay between two auth checks while the CMS login tab is open. */
const LOGIN_POLL_INTERVAL_MS = 2000;

/** Longest delay `setTimeout` supports; longer ones fire immediately. */
const MAX_TIMEOUT_MS = 2 ** 31 - 1;

const EDITOR_AUTH_QUERY_KEY = ['editorAuth'];

/** Payload of the editor server `GET /api/auth` route. */
type EditorAuthData = {
  auth:
    | (Omit<BearerAuth, 'login' | 'isLoggingIn'> & {
        accessToken: string;
        expiresAt: string | null;
        authType: 'session' | 'accessKey';
      })
    | null;
  isLoginPending: boolean;
};

const fetchEditorAuth = async (): Promise<EditorAuthData | null> => {
  const response = await fetch('/api/auth');
  const result: { data: EditorAuthData | null } = await response.json();

  return result.data;
};

/**
 * Authenticates the editor against the CMS with the identity resolved by the
 * editor server (`intlayer login` session, else access key). When signed out,
 * `login` opens the CMS login page as `intlayer login` does.
 */
export const EditorAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const [isRequestingLogin, setIsRequestingLogin] = useState(false);

  const { data } = useQuery({
    queryKey: EDITOR_AUTH_QUERY_KEY,
    queryFn: fetchEditorAuth,
    // Poll while the CMS login tab is open, to pick up the session it stores
    refetchInterval: (query) =>
      query.state.data?.isLoginPending ? LOGIN_POLL_INTERVAL_MS : false,
    refetchOnWindowFocus: true,
  });

  const auth = data?.auth ?? null;

  // Refetch as the token expires, to renew it or fall back to signed out
  useEffect(() => {
    if (!auth?.expiresAt) return;

    const delay = new Date(auth.expiresAt).getTime() - Date.now();

    if (delay > MAX_TIMEOUT_MS) return;

    const timeout = setTimeout(
      () => queryClient.invalidateQueries({ queryKey: EDITOR_AUTH_QUERY_KEY }),
      Math.max(delay, 0)
    );

    return () => clearTimeout(timeout);
  }, [auth?.expiresAt, queryClient]);

  const login = () => {
    setIsRequestingLogin(true);

    fetch('/api/auth/login', { method: 'POST' })
      .then(() =>
        queryClient.invalidateQueries({ queryKey: EDITOR_AUTH_QUERY_KEY })
      )
      .finally(() => setIsRequestingLogin(false));
  };

  const bearerAuth: BearerAuth = {
    accessToken: auth?.accessToken ?? null,
    user: auth?.user,
    organization: auth?.organization,
    project: auth?.project,
    login,
    isLoggingIn: isRequestingLogin || Boolean(data?.isLoginPending),
  };

  return <BearerAuthProvider value={bearerAuth}>{children}</BearerAuthProvider>;
};
