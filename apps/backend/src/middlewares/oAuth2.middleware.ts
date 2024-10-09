/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrganizationModel } from '@models/organization.model';
import { ProjectModel } from '@models/project.model';
import { UserModel } from '@models/user.model';
import { getAuthModel } from '@utils/oAuth';
import { NextFunction, Request } from 'express';
import OAuth2Server, {
  Request as OAuthRequest,
  Response as OAuthResponse,
  Token,
} from 'oauth2-server';
import { ResponseWithInformation } from './sessionAuth.middleware';
import { HttpStatusCodes } from '@/utils/httpStatusCodes';

// Configuration of the OAuth server
const oauth = new OAuth2Server({
  model: getAuthModel(),
  accessTokenLifetime: 60 * 60, // 1 hour
  allowBearerTokensInQueryString: true,
});

export type RequestWithOAuth2Information<ReqBody = any> = Request<ReqBody> & {
  oauth: OAuth2Server;
};

export const attachOAuthInstance = async (
  req: RequestWithOAuth2Information,
  _res: ResponseWithInformation,
  next: NextFunction
) => {
  // Attach the instance OAuth to the requests
  (req as RequestWithOAuth2Information).oauth = oauth;

  next();
};

// Middleware to authenticate requests
export const authenticateOAuth2 = async (
  req: RequestWithOAuth2Information,
  res: ResponseWithInformation,
  next: NextFunction
): Promise<void> => {
  const { user, project, organization } = res.locals;

  try {
    if (user && project && organization) {
      // User is authenticated using the session auth
      next();
    } else {
      // Authenticate the request using OAuth2
      const oauthRequest = new OAuthRequest(req);
      const oauthResponse = new OAuthResponse(res);
      const oAuthToken: Token = await req.oauth.authenticate(
        oauthRequest,
        oauthResponse
      );

      const user = await UserModel.findById(oAuthToken.user._id);

      if (user) {
        res.locals.user = user;
      }

      const organization = await OrganizationModel.findById(
        oAuthToken.organization._id
      );

      if (organization) {
        res.locals.organization = organization;
      }

      const project = await ProjectModel.findById(oAuthToken.project._id);

      if (project) {
        res.locals.project = project;
      }

      next();
    }
  } catch (err) {
    res.status(err.code ?? HttpStatusCodes.INTERNAL_SERVER_ERROR_500).json(err);
  }
};
