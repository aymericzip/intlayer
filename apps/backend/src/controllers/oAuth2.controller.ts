import type { RequestWithOAuth2Information } from '@middlewares/oAuth2.middleware';
import { type AppError, ErrorHandler } from '@utils/errors';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  Request as OAuthRequest,
  Response as OAuthResponse,
} from 'oauth2-server';
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
    headers: request.headers,
    method: request.method,
    query: request.query as any,
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
