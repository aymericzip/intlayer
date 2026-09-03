/**
 * Apex domains whose subdomains are all first-party.
 *
 * Every `*.intlayer.org` / `*.intlayer.cn` deployment — dashboard, website,
 * showcase, preview builds — is operated by Intlayer and shares the
 * `.intlayer.org` session cookie, so the family is trusted as a whole rather
 * than enumerated host by host.
 */
const FIRST_PARTY_APEX_HOSTS = ['intlayer.org', 'intlayer.cn'] as const;

/**
 * Environment variables holding a first-party origin. Self-hosted deployments
 * point these at their own URLs, which is what makes a self-hosted dashboard
 * trusted without any extra configuration.
 */
const ORIGIN_ENVIRONMENT_VARIABLES = [
  'WEBSITE_URL',
  'APP_URL',
  'SHOWCASE_URL',
  'BACKEND_URL',
] as const;

/**
 * Extra origins for deployments that serve the dashboard from a host the
 * variables above do not cover (reverse proxy, vanity domain, staging).
 * Comma-separated, e.g. `TRUSTED_ORIGINS=https://cms.acme.com,https://acme.dev`.
 */
const EXTRA_ORIGINS_ENVIRONMENT_VARIABLE = 'TRUSTED_ORIGINS';

/**
 * Reduces a URL or origin string to its bare `scheme://host[:port]` form.
 *
 * @param value - A URL, or an `Origin` header value.
 * @returns The normalized origin, or `null` when `value` is not a valid
 * absolute URL. The literal `"null"` origin sent by sandboxed iframes and
 * cross-origin redirects fails to parse, so it is never trusted.
 */
export const toOrigin = (value: string): string | null => {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
};

/**
 * First-party origins declared through the environment.
 *
 * Read on every call rather than cached at import time because `index.ts`
 * loads the `.env` files after the module graph is evaluated.
 *
 * @returns Normalized, de-duplicated origins.
 */
export const getConfiguredOrigins = (): string[] => {
  const declaredValues = [
    ...ORIGIN_ENVIRONMENT_VARIABLES.map(
      (variableName) => process.env[variableName]
    ),
    ...(process.env[EXTRA_ORIGINS_ENVIRONMENT_VARIABLE]?.split(',') ?? []),
  ];

  const origins = declaredValues
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value))
    .map(toOrigin)
    .filter((origin): origin is string => origin !== null);

  return [...new Set(origins)];
};

/**
 * Tells whether a host belongs to one of the first-party apex domains.
 *
 * @param hostname - A lower-cased hostname, as produced by `URL`.
 */
const isFirstPartyHost = (hostname: string): boolean =>
  FIRST_PARTY_APEX_HOSTS.some(
    (apexHost) => hostname === apexHost || hostname.endsWith(`.${apexHost}`)
  );

/**
 * Tells whether an origin may hold and use Intlayer session cookies.
 *
 * An `*.intlayer.org` / `*.intlayer.cn` host is only trusted over HTTPS: the
 * production session cookie is flagged `secure`, so a plain-HTTP page on those
 * domains can never carry one and has nothing legitimate to authenticate with.
 * Origins configured through the environment are matched exactly, scheme
 * included, which is what keeps `http://localhost:3000` working in development
 * and in the self-hosted Docker setup.
 *
 * @param candidate - An `Origin` header value or a normalized origin.
 * @returns `true` when the origin is first-party.
 */
export const isTrustedOrigin = (candidate?: string | null): boolean => {
  if (!candidate) return false;

  const origin = toOrigin(candidate);
  if (!origin) return false;

  if (getConfiguredOrigins().includes(origin)) return true;

  const { protocol, hostname } = new URL(origin);

  return protocol === 'https:' && isFirstPartyHost(hostname);
};
