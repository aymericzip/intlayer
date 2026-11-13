/** Query parameters better-auth appends to a failed OAuth callback. */
const ERROR_PARAMETER = 'error';
const ERROR_DESCRIPTION_PARAMETER = 'error_description';

export type OAuthCallbackError = {
  /** Machine-readable code (ex: `account_not_linked`). */
  code: string;
  /** Provider or server explanation, when one was sent. */
  description: string | null;
  /** The URL without the error parameters. */
  cleanedUrl: string;
};

/**
 * Reads the error a failed OAuth sign-in / account link left in the URL.
 *
 * @param href - The current location.
 * @returns The error and the URL stripped of it, `null` when there is none.
 */
export const extractOAuthCallbackError = (
  href: string
): OAuthCallbackError | null => {
  const url = new URL(href);
  const code = url.searchParams.get(ERROR_PARAMETER);

  if (!code) return null;

  const description = url.searchParams.get(ERROR_DESCRIPTION_PARAMETER);

  url.searchParams.delete(ERROR_PARAMETER);
  url.searchParams.delete(ERROR_DESCRIPTION_PARAMETER);

  return { code, description, cleanedUrl: url.toString() };
};

/**
 * Tells whether every required scope was granted to a linked account.
 *
 * @param requiredScopes - Scopes the feature needs.
 * @param grantedScopes - Scopes stored on the linked account.
 */
export const hasRequiredScopes = (
  requiredScopes: readonly string[],
  grantedScopes: readonly string[] = []
): boolean =>
  requiredScopes.every((requiredScope) =>
    grantedScopes.includes(requiredScope)
  );
