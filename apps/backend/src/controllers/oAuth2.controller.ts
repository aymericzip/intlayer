import { RequestWithOAuth2Information } from '@middlewares/oAuth2.middleware';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import { formatResponse, ResponseData } from '@utils/responseData';
import { Response, Request } from 'express';
import {
  type Token as OAuth2ServerToken,
  Request as OAuthRequest,
  Response as OAuthResponse,
} from 'oauth2-server';

export type GetOAuth2TokenBody = {
  grant_type: 'client_credentials';
  client_id: string;
  client_secret: string;
};
export type OAuth2Token = {
  [K in keyof OAuth2ServerToken]: OAuth2ServerToken[K];
};
export type GetOAuth2TokenResult = ResponseData<OAuth2Token>;

// Method to get the token
export const getOAuth2Token = async (
  req: Request,
  res: Response
): Promise<void> => {
  const oauthRequest = new OAuthRequest(req);
  const oauthResponse = new OAuthResponse(res);

  try {
    const token: OAuth2Token = await (
      req as unknown as RequestWithOAuth2Information<
        undefined,
        undefined,
        GetOAuth2TokenBody
      >
    ).oauth.token(oauthRequest, oauthResponse);

    const responseData = formatResponse<OAuth2Token>({
      data: token,
    });

    res.json(responseData);
    return;
  } catch (err) {
    const error = err as { code?: number; message: string };
    res
      .status(error.code ?? HttpStatusCodes.INTERNAL_SERVER_ERROR_500)
      .json(err);
  }
};
