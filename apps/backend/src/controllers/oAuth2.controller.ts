import type { RequestWithOAuth2Information } from '@middlewares/oAuth2.middleware';
import { type AppError, ErrorHandler } from '@utils/errors';
import { type ResponseData, formatResponse } from '@utils/responseData';
import type { Response, Request, NextFunction } from 'express';
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
export const getOAuth2Token = async (
  req: Request,
  res: Response<GetOAuth2TokenResult>,
  _next: NextFunction
): Promise<void> => {
  const oauthRequest = new OAuthRequest(req);
  const oauthResponse = new OAuthResponse(res);

  try {
    const token: OAuth2Token = (await (
      req as unknown as RequestWithOAuth2Information<
        undefined,
        undefined,
        GetOAuth2TokenBody
      >
    ).oauth.token(oauthRequest, oauthResponse)) as OAuth2Token;

    const responseData = formatResponse<OAuth2Token>({
      data: token,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
