import {
  type BearerAuth,
  BearerAuthProvider,
} from '@intlayer/design-system/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, type FunctionComponent } from 'preact';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'preact/hooks';

/** Delay between two auth checks while the CMS login tab is open. */
const LOGIN_POLL_INTERVAL_MS = 2000;

/**
 * Time after which a pending login stops being shown as in progress. A closed
 * login tab cannot be detected, so the login button comes back to retry.
 */
const LOGIN_WAIT_TIMEOUT_MS = 30 * 1000;

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

/** Editor identity, as shown by the profile menu. */
export type EditorAuthState = {
  /** `null` when neither a login session nor an access key is available. */
  auth: EditorAuthData['auth'];
  isLoggingIn: boolean;
  /** Runs the `intlayer login` browser flow on the editor server. */
  login: () => void;
  /** Drops the login session; a configured access key stays in use. */
  logout: () => void;
  isLoggingOut: boolean;
};

const EditorAuthContext = createContext<EditorAuthState | null>(null);

/** Editor identity and sign-in actions, `null` outside the provider. */
export const useEditorAuth = (): EditorAuthState | null =>
  useContext(EditorAuthContext);

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
export const EditorAuthProvider: FunctionComponent = ({ children }) => {
  const queryClient = useQueryClient();
  const [isRequestingLogin, setIsRequestingLogin] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [isLoginWaitExpired, setIsLoginWaitExpired] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const isLoginPending = Boolean(data?.isLoginPending);

  // Restarted on each attempt; polling goes on, so a late login still lands
  useEffect(() => {
    setIsLoginWaitExpired(false);

    if (!isLoginPending) return;

    const timeout = setTimeout(
      () => setIsLoginWaitExpired(true),
      LOGIN_WAIT_TIMEOUT_MS
    );

    return () => clearTimeout(timeout);
  }, [isLoginPending, loginAttempt]);

  const login = useCallback(() => {
    setIsRequestingLogin(true);
    setLoginAttempt((previousAttempt) => previousAttempt + 1);

    fetch('/api/auth/login', { method: 'POST' })
      .then(() =>
        queryClient.invalidateQueries({ queryKey: EDITOR_AUTH_QUERY_KEY })
      )
      .finally(() => setIsRequestingLogin(false));
  }, [queryClient]);

  const logout = useCallback(() => {
    setIsLoggingOut(true);

    fetch('/api/auth/logout', { method: 'POST' })
      .then((response) => response.json())
      .then((result: { data: EditorAuthData | null }) =>
        queryClient.setQueryData(EDITOR_AUTH_QUERY_KEY, result.data)
      )
      .finally(() => setIsLoggingOut(false));
  }, [queryClient]);

  const isLoggingIn =
    isRequestingLogin || (isLoginPending && !isLoginWaitExpired);

  // Every API hook reads this value: keep it stable between renders
  const bearerAuth = useMemo<BearerAuth>(
    () => ({
      accessToken: auth?.accessToken ?? null,
      user: auth?.user,
      organization: auth?.organization,
      project: auth?.project,
      login,
      isLoggingIn,
    }),
    [auth, login, isLoggingIn]
  );

  const editorAuthState = useMemo<EditorAuthState>(
    () => ({ auth, isLoggingIn, login, logout, isLoggingOut }),
    [auth, isLoggingIn, login, logout, isLoggingOut]
  );

  return (
    <EditorAuthContext.Provider value={editorAuthState}>
      <BearerAuthProvider value={bearerAuth}>{children}</BearerAuthProvider>
    </EditorAuthContext.Provider>
  );
};
