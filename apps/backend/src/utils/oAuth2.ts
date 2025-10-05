import {
  getAccessToken,
  getClient,
  getUserFromClient,
  saveToken,
  verifyScope,
} from '@services/oAuth2.service';
import type OAuth2Server from 'oauth2-server';
import type { AuthenticateOptions } from 'oauth2-server';

export const ACCESS_TOKEN_EXPIRES_IN = 60 * 60 * 2; // 2 hour

export const getTokenExpireAt = () =>
  new Date(Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000);

export const authenticateOptions: AuthenticateOptions = {
  scope: undefined,
  addAcceptedScopesHeader: undefined,
  addAuthorizedScopesHeader: undefined,
  allowBearerTokensInQueryString: undefined,
};

export const getAuthModel = (): OAuth2Server.ClientCredentialsModel => ({
  getClient,
  saveToken,
  getUserFromClient,
  verifyScope,
  getAccessToken,
});
