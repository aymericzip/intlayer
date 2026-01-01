import { logger } from '@logger';
import {
  getOAuth2AccessTokenContext,
  validateOAuth2AccessToken,
} from '@services/oAuth2.service';
import { formatSession } from '@utils/auth/getAuth';
import { type AppError, ErrorHandler } from '@utils/errors';
import { authenticateOptions, getAuthModel } from '@utils/oAuth2';
import type { FastifyReply, FastifyRequest } from 'fastify';
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

// Extend FastifyRequest to include oauth
declare module 'fastify' {
  interface FastifyRequest {
    oauth?: OAuth2Server;
  }
}

export type RequestWithOAuth2Information = FastifyRequest & {
  oauth: OAuth2Server;
};

export const attachOAuthInstance = async (
  request: FastifyRequest,
  _reply: FastifyReply
) => {
  // Attach the instance OAuth to the requests
  (request as RequestWithOAuth2Information).oauth = oauth;
};

// Middleware to authenticate requests
export const oAuth2Middleware = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  if (!request.locals) {
    request.locals = {} as any;
  }

  if (typeof request.locals?.authType !== 'undefined') {
    // Skip if user is already authenticated (ex: session)
    return;
  }

  try {
    const hasToken = Boolean(request.headers.authorization);

    if (!hasToken) {
      // If the request does not have a token, skip the oAuth2 authentication
      // Necessary because the oAuth2 library will throw an error if the token is not present
      return;
    }

    // Authenticate the request using OAuth2
    const oauthRequest = new OAuthRequest({
      headers: request.headers,
      method: request.method,
      query: request.query as any,
      body: request.body as any,
    });
    const oauthResponse = new OAuthResponse(reply.raw);

    const oAuthToken = await (
      request as RequestWithOAuth2Information
    ).oauth.authenticate(oauthRequest, oauthResponse, authenticateOptions);

    const validatedToken = await validateOAuth2AccessToken(
      oAuthToken.accessToken
    );

    const result = await getOAuth2AccessTokenContext(validatedToken);

    const formattedSession = formatSession(result);
    const locals = request.locals;
    if (locals) {
      locals.authType = 'session';

      // Attach the session to the request locals
      for (const [key, value] of Object.entries(formattedSession)) {
        (locals as any)[key] = value;
      }
    }

    logger.info(
      'OAuth2 bearer token authenticated',
      formattedSession.user.email
    );
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply as any, error as AppError);
    return;
  }
};
