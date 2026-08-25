import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Stateless, short-lived bearer tokens that browser code can obtain without any
 * confidential credential.
 *
 * This is the Google-Analytics model: an app ships only its **public**
 * `clientId`, exchanges it for one of these (see `createPublicBrowserToken`),
 * and calls the API directly — no server route, no server action, no secret in
 * the bundle.
 *
 * What keeps that safe is the scope, not the token: a public token may only do
 * things whose data is already public on the page that obtained it, or which
 * are append-only. It can read published dictionary content and submit
 * analytics events. It can never write content, read a project, an
 * organization, a user, or spend AI credits — those need a real credential
 * (server-side `clientSecret`) or a signed-in user.
 *
 * Tokens are signed rather than stored: the exchange is public and runs once
 * per visitor session, so a database-backed token would turn every first page
 * view into a write.
 */

/** Derivation label, so the signing key cannot collide with another feature's. */
const SIGNING_CONTEXT = 'intlayer.analytics.ingest.v1';

/** Version prefix, so the token format can evolve without ambiguity. */
const TOKEN_VERSION = 'v1';

/** How long an issued token stays valid. */
export const PUBLIC_BROWSER_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Capabilities a public browser token may carry.
 *
 * Deliberately narrow — see the module doc for what must never be added here.
 */
export const PUBLIC_BROWSER_SCOPES = [
  /** Submit analytics events for the project (append-only). */
  'analytics:ingest',
  /** Read the project's published dictionary content (already public). */
  'dictionary:read',
] as const;

export type PublicBrowserScope = (typeof PUBLIC_BROWSER_SCOPES)[number];

/** Payload encoded in the token. Kept terse — it is sent on every request. */
type PublicBrowserTokenPayload = {
  /** Project the token acts on. */
  projectId: string;
  /** Granted capabilities. */
  scopes: PublicBrowserScope[];
  /** Expiry, as epoch milliseconds. */
  expiresAt: number;
};

/** What a verified token authorises. */
export type PublicBrowserTokenContext = {
  projectId: string;
  scopes: PublicBrowserScope[];
};

/**
 * Derives the HMAC key used to sign public browser tokens.
 *
 * @returns The signing key.
 * @throws If `BETTER_AUTH_SECRET` is not defined.
 */
const getSigningKey = (): string => {
  const secret = process.env.BETTER_AUTH_SECRET;

  if (!secret) {
    throw new Error(
      'BETTER_AUTH_SECRET must be defined to sign public browser tokens'
    );
  }

  return `${secret}:${SIGNING_CONTEXT}`;
};

/** Base64url-encodes a UTF-8 string. */
const encodeSegment = (value: string): string =>
  Buffer.from(value, 'utf8').toString('base64url');

/** Signs a token body, returning the base64url MAC. */
const signBody = (body: string): string =>
  createHmac('sha256', getSigningKey()).update(body).digest('base64url');

/**
 * Issues a public browser token for a project.
 *
 * @param projectId - The project the token acts on.
 * @param scopes - Capabilities to grant. Defaults to the full public set.
 * @returns The token, its granted scopes, and its lifetime in seconds.
 */
export const signPublicBrowserToken = (
  projectId: string,
  scopes: PublicBrowserScope[] = [...PUBLIC_BROWSER_SCOPES]
): { token: string; scopes: PublicBrowserScope[]; expiresIn: number } => {
  const payload: PublicBrowserTokenPayload = {
    projectId,
    scopes,
    expiresAt: Date.now() + PUBLIC_BROWSER_TOKEN_TTL_MS,
  };

  const body = `${TOKEN_VERSION}.${encodeSegment(JSON.stringify(payload))}`;

  return {
    token: `${body}.${signBody(body)}`,
    scopes,
    expiresIn: Math.floor(PUBLIC_BROWSER_TOKEN_TTL_MS / 1000),
  };
};

/**
 * Verifies a public browser token and returns what it authorises.
 *
 * Never throws: a malformed, forged, or expired token is simply not a valid
 * one, and callers treat every failure identically.
 *
 * @param token - The token presented by the browser.
 * @returns The project and granted scopes, or `null` when unusable.
 */
export const verifyPublicBrowserToken = (
  token: string | undefined
): PublicBrowserTokenContext | null => {
  if (!token) return null;

  try {
    const separatorIndex = token.lastIndexOf('.');
    if (separatorIndex <= 0) return null;

    const body = token.slice(0, separatorIndex);
    const signature = token.slice(separatorIndex + 1);

    if (!body.startsWith(`${TOKEN_VERSION}.`)) return null;

    const expectedSignature = Buffer.from(signBody(body), 'base64url');
    const providedSignature = Buffer.from(signature, 'base64url');

    // Length is checked first: `timingSafeEqual` throws on a mismatch.
    if (expectedSignature.length !== providedSignature.length) return null;
    if (!timingSafeEqual(expectedSignature, providedSignature)) return null;

    const payload = JSON.parse(
      Buffer.from(body.slice(TOKEN_VERSION.length + 1), 'base64url').toString(
        'utf8'
      )
    ) as PublicBrowserTokenPayload;

    if (typeof payload?.projectId !== 'string') return null;
    if (typeof payload?.expiresAt !== 'number') return null;
    if (payload.expiresAt <= Date.now()) return null;

    // Unknown scope names are dropped rather than rejected, so a token issued
    // by a newer deployment keeps working against an older one for the scopes
    // that node still understands.
    const scopes = (Array.isArray(payload.scopes) ? payload.scopes : []).filter(
      (scope): scope is PublicBrowserScope =>
        (PUBLIC_BROWSER_SCOPES as readonly string[]).includes(scope)
    );

    if (scopes.length === 0) return null;

    return { projectId: payload.projectId, scopes };
  } catch {
    return null;
  }
};

/**
 * Verifies a token and checks it carries a given capability.
 *
 * @param token - The token presented by the browser.
 * @param scope - The capability the endpoint requires.
 * @returns The context when the token grants `scope`, otherwise `null`.
 */
export const verifyPublicBrowserTokenScope = (
  token: string | undefined,
  scope: PublicBrowserScope
): PublicBrowserTokenContext | null => {
  const context = verifyPublicBrowserToken(token);

  if (!context?.scopes.includes(scope)) return null;

  return context;
};
