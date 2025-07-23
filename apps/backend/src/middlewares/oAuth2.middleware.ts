import { logger } from '@logger';
import {
  getOAuth2AccessTokenContext,
  validateOAuth2AccessToken,
} from '@services/oAuth2.service';
import { formatSession } from '@utils/auth/getAuth';
import { AppError, ErrorHandler } from '@utils/errors';
import { authenticateOptions, getAuthModel } from '@utils/oAuth2';
import type { NextFunction, Request, Response } from 'express';
import OAuth2Server, {
  Request as OAuthRequest,
  Response as OAuthResponse,
} from 'oauth2-server';

// Configuration of the OAuth server
const oauth = new OAuth2Server({
  model: getAuthModel(),
  accessTokenLifetime: 60 * 60, // 1 hour
  allowBearerTokensInQueryString: true,
});

export type RequestWithOAuth2Information<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
> = Request<P, ResBody, ReqBody, ReqQuery> & {
  oauth: OAuth2Server;
};

export const attachOAuthInstance = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // Attach the instance OAuth to the requests
  (req as RequestWithOAuth2Information).oauth = oauth;

  next();
};

// Middleware to authenticate requests
export const oAuth2Middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (typeof res.locals.authType !== 'undefined') {
    // Skip if user is already authenticated (ex: session)
    return next();
  }

  try {
    const hasToken = !!req.headers.authorization;

    if (!hasToken) {
      // If the request does not have a token, skip the oAuth2 authentication
      // Necessary because the oAuth2 library will throw an error if the token is not present
      return next();
    }

    // Authenticate the request using OAuth2
    const oauthRequest = new OAuthRequest(req);

    const oauthResponse = new OAuthResponse(res);

    const oAuthToken = await (
      req as RequestWithOAuth2Information
    ).oauth.authenticate(oauthRequest, oauthResponse, authenticateOptions);

    const validatedToken = await validateOAuth2AccessToken(
      oAuthToken.accessToken
    );

    const result = await getOAuth2AccessTokenContext(validatedToken);

    const formattedSession = formatSession(result);
    res.locals.authType = 'session';

    // Attach the session to the response locals
    Object.entries(formattedSession).forEach(([key, value]) => {
      (res.locals as any)[key] = value;
    });

    logger.info(
      'OAuth2 bearer token authenticated',
      formattedSession.user.email
    );
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);

    return;
  }

  next();
};
