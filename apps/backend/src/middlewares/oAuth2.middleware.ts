/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@logger';
import { OrganizationModel } from '@models/organization.model';
import { ProjectModel } from '@models/project.model';
import { UserModel } from '@models/user.model';
import { getAuthModel, authenticateOptions } from '@utils/oAuth2';
import { NextFunction, Request } from 'express';
import OAuth2Server, {
  Request as OAuthRequest,
  Response as OAuthResponse,
} from 'oauth2-server';
import { ResponseWithInformation } from './sessionAuth.middleware';

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

    const oAuthToken = await req.oauth.authenticate(
      oauthRequest,
      oauthResponse,
      authenticateOptions
    );

    const user = await UserModel.findById(oAuthToken.user._id);

    if (user) {
      res.locals.user = user;
      res.locals.authType = 'oauth2';
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
  } catch (err) {
    logger.info(err);
  }
  next();
};
