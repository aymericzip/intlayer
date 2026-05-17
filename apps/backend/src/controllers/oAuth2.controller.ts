import type { RequestWithOAuth2Information } from '@middlewares/oAuth2.middleware';
import {
  Request as OAuthRequest,
  Response as OAuthResponse,
} from '@node-oauth/oauth2-server';
import { extendOAuth2AccessToken } from '@services/oAuth2.service';
import { type AppError, ErrorHandler, GenericError } from '@utils/errors';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { OAuth2Token } from '@/types/oAuth2.types';

export type GetOAuth2TokenBody = {
  grant_type: 'client_credentials';
  client_id: string;
  client_secret: string;
};
export type GetOAuth2TokenResult = ResponseData<OAuth2Token>;

// Method to get the token
export const getOAuth2AccessToken = async (
  request: FastifyRequest<{ Body: GetOAuth2TokenBody }>,
  reply: FastifyReply
): Promise<void> => {
  const oauthRequest = new OAuthRequest({
    headers: request.headers as Record<string, string>,
    method: request.method,
    query: request.query as Record<string, string>,
    body: request.body as any,
  });
  const oauthResponse = new OAuthResponse(reply.raw);

  try {
    const token: OAuth2Token = (await (
      request as unknown as RequestWithOAuth2Information
    ).oauth.token(oauthRequest, oauthResponse)) as OAuth2Token;

    const responseData = formatResponse<OAuth2Token>({
      data: token,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type ExtendOAuth2TokenResult = ResponseData<{
  accessToken: string;
  accessTokenExpiresAt: Date;
}>;

/**
 * Extend the lifetime of the bearer token attached to the current request.
 * Lets long-running clients keep using the same token instead of
 * re-authenticating on a fixed schedule.
 */
export const extendOAuth2Token = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const authorization = request.headers.authorization;
    const accessToken = authorization?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();

    if (!accessToken) {
      throw new GenericError('INVALID_ACCESS_TOKEN');
    }

    const accessTokenExpiresAt = await extendOAuth2AccessToken(accessToken);

    return reply.send(
      formatResponse<{ accessToken: string; accessTokenExpiresAt: Date }>({
        data: { accessToken, accessTokenExpiresAt },
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
