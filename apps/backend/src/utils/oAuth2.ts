import {
  getClient,
  saveToken,
  getAccessToken,
  verifyScope,
  getUserFromClient,
} from '@services/oAuth2.service';
import OAuth2Server, { AuthenticateOptions } from 'oauth2-server';

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
