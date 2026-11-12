import type { GenericOAuthConfig } from 'better-auth/plugins/generic-oauth';

type CodebergUser = {
  id: number;
  login: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
};

type GiteeUser = {
  id: number;
  login: string;
  name?: string;
  email?: string | null;
  avatar_url?: string;
};

type GiteeEmail = {
  email: string;
  state: string;
  scope: string[];
};

const fetchJson = async <Result>(
  url: string,
  headers: HeadersInit = {}
): Promise<Result | null> => {
  const response = await fetch(url, {
    headers: { Accept: 'application/json', ...headers },
  });

  return response.ok ? ((await response.json()) as Result) : null;
};

/** Codeberg (Forgejo) OAuth2 application. */
const getCodebergProvider = (
  clientId: string,
  clientSecret: string
): GenericOAuthConfig => ({
  providerId: 'codeberg',
  name: 'Codeberg',
  clientId,
  clientSecret,
  authorizationUrl: 'https://codeberg.org/login/oauth/authorize',
  tokenUrl: 'https://codeberg.org/login/oauth/access_token',
  scopes: ['read:user', 'write:repository'],
  getUserInfo: async (tokens) => {
    const user = await fetchJson<CodebergUser>(
      'https://codeberg.org/api/v1/user',
      { Authorization: `token ${tokens.accessToken}` }
    );

    if (!user) return null;

    return {
      id: user.id,
      name: user.full_name || user.login,
      email: user.email,
      image: user.avatar_url,
      // Forgejo only exposes the primary address, which it verifies
      emailVerified: Boolean(user.email),
    };
  },
});

/** Gitee OAuth2 application (API v5). */
const getGiteeProvider = (
  clientId: string,
  clientSecret: string
): GenericOAuthConfig => ({
  providerId: 'gitee',
  name: 'Gitee',
  clientId,
  clientSecret,
  authorizationUrl: 'https://gitee.com/oauth/authorize',
  tokenUrl: 'https://gitee.com/oauth/token',
  scopes: ['user_info', 'projects', 'pull_requests', 'emails'],
  // Gitee does not implement PKCE
  pkce: false,
  getUserInfo: async (tokens) => {
    const accessToken = encodeURIComponent(tokens.accessToken ?? '');
    const user = await fetchJson<GiteeUser>(
      `https://gitee.com/api/v5/user?access_token=${accessToken}`
    );

    if (!user) return null;

    // The profile email is often hidden: read the confirmed primary address
    const emails =
      (await fetchJson<GiteeEmail[]>(
        `https://gitee.com/api/v5/emails?access_token=${accessToken}`
      )) ?? [];
    const primaryEmail =
      emails.find(
        (email) =>
          email.state === 'confirmed' && email.scope.includes('primary')
      ) ?? emails.find((email) => email.state === 'confirmed');

    return {
      id: user.id,
      name: user.name || user.login,
      email: primaryEmail?.email ?? user.email ?? undefined,
      image: user.avatar_url,
      emailVerified: Boolean(primaryEmail),
    };
  },
});

/**
 * Gitea-compatible forges used to link repositories. Each is registered only
 * when its OAuth application is configured.
 */
export const getForgeOAuthProviders = (): GenericOAuthConfig[] => {
  const providers: GenericOAuthConfig[] = [];

  if (process.env.CODEBERG_CLIENT_ID && process.env.CODEBERG_CLIENT_SECRET) {
    providers.push(
      getCodebergProvider(
        process.env.CODEBERG_CLIENT_ID,
        process.env.CODEBERG_CLIENT_SECRET
      )
    );
  }

  if (process.env.GITEE_CLIENT_ID && process.env.GITEE_CLIENT_SECRET) {
    providers.push(
      getGiteeProvider(
        process.env.GITEE_CLIENT_ID,
        process.env.GITEE_CLIENT_SECRET
      )
    );
  }

  return providers;
};
