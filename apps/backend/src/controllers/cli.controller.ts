import { RequestWithOAuth2Information } from '@middlewares/oAuth2.middleware';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import { Response } from 'express';
import {
  Request as OAuthRequest,
  Response as OAuthResponse,
} from 'oauth2-server';

// Method to get the token
export const token = async (
  req: RequestWithOAuth2Information,
  res: Response
): Promise<void> => {
  const oauthRequest = new OAuthRequest(req);
  const oauthResponse = new OAuthResponse(res);

  try {
    const token = await req.oauth.token(oauthRequest, oauthResponse);

    res.json(token);
  } catch (err) {
    res.status(err.code ?? HttpStatusCodes.INTERNAL_SERVER_ERROR_500).json(err);
  }
};
