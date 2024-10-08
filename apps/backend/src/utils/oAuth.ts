import {
  getClient,
  saveToken,
  getAccessToken,
  verifyScope,
  getUserFromClient,
} from '@services/auth2.service';
import type OAuth2Server from 'oauth2-server';

export const ACCESS_TOKEN_EXPIRES_IN = 60 * 60 * 2; // 2 hour
export const ACCESS_TOKEN_EXPIRES_AT = new Date(
  Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000
);

export const authModel: OAuth2Server.ClientCredentialsModel = {
  getClient,
  saveToken,
  getUserFromClient,
  verifyScope,
  getAccessToken,
};
