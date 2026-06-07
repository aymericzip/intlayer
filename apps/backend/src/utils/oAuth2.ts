import type { AuthenticateOptions } from '@node-oauth/oauth2-server';

export const ACCESS_TOKEN_EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days

// Sliding refresh: when an access token is used and its remaining lifetime
// drops below this threshold, push the expiry back to a full
// ACCESS_TOKEN_EXPIRES_IN window. Keeps actively-used tokens alive without
// minting a new one on every request.
export const ACCESS_TOKEN_REFRESH_THRESHOLD = 60 * 60 * 24; // 1 day

export const getTokenExpireAt = () =>
  new Date(Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000);

export const shouldExtendOAuth2Token = (expiresAt: Date | string): boolean => {
  const remainingMs = new Date(expiresAt).getTime() - Date.now();
  return remainingMs < ACCESS_TOKEN_REFRESH_THRESHOLD * 1000;
};

export const authenticateOptions: AuthenticateOptions = {
  scope: undefined,
  addAcceptedScopesHeader: undefined,
  addAuthorizedScopesHeader: undefined,
  allowBearerTokensInQueryString: undefined,
};
