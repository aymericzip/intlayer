/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@logger';
import { OrganizationModel } from '@models/organization.model';
import { ProjectModel } from '@models/project.model';
import { UserModel } from '@models/user.model';
import { getAuthModel, authenticateOptions } from '@utils/oAuth2';
import { NextFunction, Request, Response } from 'express';
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
  req: Request,
  _res: Response,
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

    console.log('--- 2', oAuthToken.rights);
    const {
      organization: organizationRights,
      project: projectRights,
      dictionary: dictionaryRights,
    } = oAuthToken.rights;

    console.log('--- 3', oAuthToken.rights);

    console.log('--- organizationRights', organizationRights);
    res.locals.organizationRights = organizationRights;
    res.locals.isOrganizationAdmin = organizationRights?.admin ?? false;
    res.locals.projectRights = projectRights;
    res.locals.isProjectAdmin = projectRights?.admin ?? false;
    res.locals.dictionaryRights = dictionaryRights;

    console.log('--- oAuthToken.user._id', oAuthToken.user._id);
    const user = await UserModel.findById(oAuthToken.user._id);

    if (user) {
      res.locals.user = user;
      res.locals.authType = 'oauth2';
    }

    console.log(
      '--- oAuthToken.organization._id',
      oAuthToken.organization && oAuthToken.organization._id
    );

    const organization = await OrganizationModel.findById(
      oAuthToken.organization._id
    );

    if (organization) {
      res.locals.organization = organization;
    }

    console.log('--- oAuthToken.organization._id', oAuthToken.organization._id);

    console.log('--- oAuthToken.project._id', oAuthToken.project._id);
    const project = await ProjectModel.findById(oAuthToken.project._id);

    console.log('--- project', project);

    if (project) {
      res.locals.project = project;
    }
  } catch (err) {
    logger.info(err);
  }
  next();
};
