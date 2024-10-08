/* eslint-disable @typescript-eslint/no-explicit-any */
import { authModel } from '@utils/oAuth';
import { NextFunction, Request } from 'express';
import OAuth2Server, {
  Request as OAuthRequest,
  Response as OAuthResponse,
} from 'oauth2-server';
import { ResponseWithInformation } from './auth.middleware';
import { HttpStatusCodes } from '@/utils/httpStatusCodes';

// Configuration of the OAuth server
const oauth = new OAuth2Server({
  model: authModel,
  accessTokenLifetime: 60 * 60, // 1 hour
  allowBearerTokensInQueryString: true,
});

export type RequestWithOAuth2Information<ReqBody = any> = Request<ReqBody> & {
  oauth: OAuth2Server;
};

export const attachOAuthInstance = async (
  req: RequestWithOAuth2Information,
  res: ResponseWithInformation,
  next: NextFunction
) => {
  // Attach the instance OAuth to the requests
  (req as RequestWithOAuth2Information).oauth = oauth;

  next();
};

// Middleware to authenticate requests
export const authenticate = async (
  req: RequestWithOAuth2Information,
  res: ResponseWithInformation,
  next: NextFunction
): Promise<void> => {
  const oauthRequest = new OAuthRequest(req);
  const oauthResponse = new OAuthResponse(res);

  try {
    await req.oauth.authenticate(oauthRequest, oauthResponse);
    next();
  } catch (err) {
    res.status(err.code ?? HttpStatusCodes.INTERNAL_SERVER_ERROR_500).json(err);
  }
};
