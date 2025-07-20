import { validateOAuth2AccessToken } from '@services/betterAuthOAuth2.service';
import type { ResponseWithInformation } from '@utils/auth/getAuth';
import { GenericError } from '@utils/errors';
import type { NextFunction, Request } from 'express';

interface RequestWithOAuth2Information extends Request {
  headers: {
    authorization?: string;
  };
}

/**
 * Middleware to authenticate OAuth2 requests using better-auth integration
 */
export const authenticateOAuth2 = async (
  req: RequestWithOAuth2Information,
  res: ResponseWithInformation,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const accessToken = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!accessToken) {
      return next();
    }

    // Validate the OAuth2 access token
    const authContext = await validateOAuth2AccessToken(accessToken);

    if (!authContext) {
      return next();
    }

    const { user, project, organization, rights } = authContext;

    // Set authentication context in response locals
    res.locals.user = user;
    res.locals.organization = organization;
    res.locals.project = project;
    res.locals.authType = 'oauth2';
    res.locals.organizationRights = rights.organization;
    res.locals.projectRights = rights.project;
    res.locals.dictionaryRights = rights.dictionary;
    res.locals.isOrganizationAdmin = false; // OAuth2 doesn't use admin concept
    res.locals.isProjectAdmin = false; // OAuth2 doesn't use admin concept
    res.locals.session = null; // OAuth2 doesn't use sessions

    next();
  } catch (error) {
    next();
  }
};

/**
 * Middleware to handle OAuth2 token creation endpoint
 */
export const handleOAuth2Token = async (
  req: Request,
  res: ResponseWithInformation,
  next: NextFunction
): Promise<void> => {
  try {
    const { grant_type, client_id, client_secret } = req.body;

    if (grant_type !== 'client_credentials') {
      throw new GenericError('INVALID_OAUTH_GRANT_TYPE');
    }

    if (!client_id || !client_secret) {
      throw new GenericError('INVALID_OAUTH_CLIENT');
    }

    // Import here to avoid circular dependencies
    const {
      validateOAuth2Client,
      createOAuth2AccessToken,
      getUserFromOAuth2Client,
    } = await import('@services/betterAuthOAuth2.service');

    // Validate client credentials
    const client = await validateOAuth2Client(client_id, client_secret);

    if (!client) {
      throw new GenericError('INVALID_OAUTH_CLIENT');
    }

    // Get user associated with this client
    const user = await getUserFromOAuth2Client(client_id);

    if (!user) {
      throw new GenericError('USER_NOT_FOUND');
    }

    // Create access token
    const tokenData = await createOAuth2AccessToken(
      client_id,
      String(user._id)
    );

    if (!tokenData) {
      throw new GenericError('AUTH_ERROR');
    }

    const { accessToken, expiresAt } = tokenData;

    // Return OAuth2 token response
    res.json({
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: Math.floor((expiresAt.getTime() - Date.now()) / 1000),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to attach OAuth2 instance information
 * This can be used to provide OAuth2 server capabilities
 */
export const attachOAuth2Instance = (
  req: Request,
  res: ResponseWithInformation,
  next: NextFunction
): void => {
  // This middleware can be used to attach OAuth2 server instance if needed
  // For now, we're using better-auth's bearer plugin approach
  next();
};
