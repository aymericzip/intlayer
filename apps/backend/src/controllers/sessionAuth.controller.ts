/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@logger';
import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import { sessionAuthRoutes } from '@routes/sessionAuth.routes';
import { sendEmail } from '@services/email.service';
import * as sessionAuthService from '@services/sessionAuth.service';
import * as userService from '@services/user.service';
import { generateToken } from '@utils/CSRF';
import { ErrorHandler, AppError, GenericError } from '@utils/errors';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Organization } from '@/types/organization.types';
import { Project } from '@/types/project.types';
import type {
  Session,
  GithubSessionProvider,
  GoogleSessionProvider,
} from '@/types/session.types';
import type { UserAPI, UserData } from '@/types/user.types';

export type CSRFTokenData = { csrf_token: string };
export type SetCSRFTokenResult = ResponseData<CSRFTokenData>;

export const setCSRFToken = (
  req: Request,
  res: Response<SetCSRFTokenResult>,
  _next: NextFunction
) => {
  const csrf_token = generateToken(req, res);

  const responseData = formatResponse<CSRFTokenData>({
    data: { csrf_token },
  });

  res.locals.csrf_token = csrf_token;
  res.json(responseData);
};

export type RegisterBody = { email: string; password: string };
export type RegisterResult = ResponseData<UserAPI>;

/**
 * Handles user registration.
 */
export const registerEmailPassword = async (
  req: Request<any, any, RegisterBody>,
  res: ResponseWithInformation<RegisterResult>,
  _next: NextFunction
): Promise<void> => {
  const { user } = res.locals;

  if (user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_ALREADY_LOGGED_IN');
    return;
  }

  const userData = req.body;

  try {
    let user = await userService.getUserByEmail(userData.email);

    if (user) {
      const emailProvider = user.provider?.find(
        (provider) => provider.provider === 'email'
      );

      if (emailProvider) {
        if (emailProvider.emailValidated) {
          ErrorHandler.handleGenericErrorResponse(
            res,
            'EMAIL_ALREADY_VALIDATED'
          );
          return;
        } else {
          user = await sessionAuthService.updateUserProvider(
            user._id,
            'email',
            {
              secret: uuidv4(),
            }
          );
        }
      } else {
        user = await sessionAuthService.addUserProvider(user._id, {
          provider: 'email',
          emailValidated: undefined,
          secret: uuidv4(),
        });
      }
    } else {
      user = await userService.createUser(userData);
      logger.info(`New registration: ${user.name} - ${user.email}`);
    }

    if (!user) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_CREATION_FAILED', {
        email: userData.email,
      });
      return;
    }

    await sessionAuthService.setUserAuth(res, user);

    const formattedUser = userService.formatUserForAPI(user);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type LoginBody = {
  email: string;
  password: string;
};
export type LoginResult = ResponseData<UserAPI>;

/**
 * Handles user login.
 */
export const loginEmailPassword = async (
  req: Request<any, any, LoginBody>,
  res: ResponseWithInformation<LoginResult>,
  _next: NextFunction
): Promise<void> => {
  const { user } = res.locals;

  if (user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_ALREADY_LOGGED_IN');
    return;
  }

  const { email, password } = req.body;

  try {
    const { user: loggedInUser, error } =
      await sessionAuthService.testUserPassword(email, password);

    if (error) {
      if (!user) {
        ErrorHandler.handleGenericErrorResponse(res, 'LOGIN_FAILED');
        return;
      }
    }

    if (!loggedInUser) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
      return;
    }

    await sessionAuthService.setUserAuth(res, loggedInUser);

    const formattedUser = userService.formatUserForAPI(loggedInUser);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    logger.info(`Login: ${loggedInUser.email}`);

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type LogoutResult = ResponseData<undefined>;

/**
 * Handles user logout and clears cookies.
 */
export const logOut = async (
  _req: Request,
  res: ResponseWithInformation<LogoutResult>,
  _next: NextFunction
): Promise<void> => {
  const { user } = res.locals;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
    return;
  }

  await sessionAuthService.clearUserAuth(res);
  sessionAuthService.clearOrganizationAuth(res);
  sessionAuthService.clearProjectAuth(res);

  logger.info(`Logout: ${user.name} - ${user.email}`);

  const responseData = formatResponse<undefined>({ data: undefined });

  res.json(responseData);
};

export type UpdatePasswordBody = {
  oldPassword: string;
  newPassword: string;
};
export type UpdatePasswordResult = ResponseData<UserAPI>;

/**
 * Updates the user's password.
 */
export const updatePassword = async (
  req: Request<undefined, any, UpdatePasswordBody>,
  res: ResponseWithInformation<UpdatePasswordResult>,
  _next: NextFunction
): Promise<void> => {
  const { oldPassword, newPassword } = req.body;
  let { user } = res.locals;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
    return;
  }

  try {
    const { error } = await sessionAuthService.testUserPassword(
      user.email,
      oldPassword
    );

    if (error) {
      ErrorHandler.handleGenericErrorResponse(res, 'LOGIN_FAILED');
      return;
    }

    user = await sessionAuthService.changeUserPassword(
      user._id,
      oldPassword,
      newPassword
    );

    if (!user || typeof user !== 'object') {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_DATA_NOT_FOUND');
      return;
    }

    logger.info(
      `Password changed - User : Name : ${user.name}, id : ${String(user._id)}`
    );

    const formattedUser = userService.formatUserForAPI(user);

    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type ValidEmailParams = { secret: string; userId: string };
export type ValidEmailResult = ResponseData<UserAPI>;

/**
 * Validates a user's email based on the provided secret and user ID.
 */
export const validEmail = async (
  req: Request<ValidEmailParams, any, any>,
  res: ResponseWithInformation<ValidEmailResult>,
  _next: NextFunction
): Promise<void> => {
  const { userId, secret } = req.params;
  const { organization } = res.locals;

  if (!Types.ObjectId.isValid(userId.toString())) {
    ErrorHandler.handleGenericErrorResponse(res, 'INVALID_USER_ID');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_FOUND');
    return;
  }

  const user = await userService.getUserById(userId);

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND', { userId });
    return;
  }

  await sessionAuthService.activateUser(user._id, secret);

  logger.info(
    `User activated - User: Name: ${user.name}, id: ${String(user._id)}`
  );

  await sendEmail({
    type: 'welcome',
    to: user.email,
    username: user.name,
    loginLink: sessionAuthRoutes.loginEmailPassword.url,
  });

  const formattedUser = userService.formatUserForAPI(user);
  const responseData = formatResponse<UserAPI>({ data: formattedUser });

  res.json(responseData);
};

export type AskResetPasswordBody = {
  email: string;
};
export type AskResetPasswordResult = ResponseData<undefined>;

/**
 * Requests a password reset for a user.
 */
export const askResetPassword = async (
  req: Request<undefined, any, AskResetPasswordBody>,
  res: ResponseWithInformation<AskResetPasswordResult>,
  _next: NextFunction
): Promise<void> => {
  const { email } = req.body as Partial<AskResetPasswordBody>;

  if (!email) {
    ErrorHandler.handleGenericErrorResponse(res, 'EMAIL_NOT_PROVIDED');
    return;
  }

  try {
    const updatedUser = await sessionAuthService.requestPasswordReset(email);

    if (!updatedUser) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND', { email });
      return;
    }

    logger.info(
      `Ask changing password - User: Name: ${updatedUser.name}, id: ${String(updatedUser._id)}`
    );

    await sendEmail({
      type: 'resetPassword',
      to: updatedUser.email,
      username: updatedUser.name,
      resetLink: sessionAuthRoutes.resetPassword.url({
        userId: String(updatedUser._id),
        secret:
          updatedUser.provider?.find(
            (provider) => provider.provider === 'email'
          )?.secret ?? '',
      }),
    });

    const responseData = formatResponse<undefined>({ data: undefined });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type ResetPasswordParams = { secret: string; userId: string };
export type ResetPasswordResult = ResponseData<UserAPI>;

/**
 * Resets a user's password based on the provided secret and user ID.
 */
export const resetPassword = async (
  req: Request<ResetPasswordParams, any, any>,
  res: Response<ResetPasswordResult>,
  _next: NextFunction
): Promise<void> => {
  const { secret, userId } = req.params as Partial<ResetPasswordParams>;
  const password: string = req.body.password;

  const userIdString = String(userId);

  if (!userId || !userIdString || !Types.ObjectId.isValid(userIdString)) {
    ErrorHandler.handleGenericErrorResponse(res, 'INVALID_USER_ID', { userId });
    return;
  }

  if (!secret) {
    ErrorHandler.handleGenericErrorResponse(res, 'SECRET_NOT_PROVIDED');
    return;
  }

  try {
    const updatedUser = await sessionAuthService.resetUserPassword(
      userId,
      secret,
      password
    );

    logger.info(
      `Password changed - User: Name: ${updatedUser.name}, id: ${String(updatedUser._id)}`
    );

    await sendEmail({
      type: 'passwordChangeConfirmation',
      to: updatedUser.email,
      username: updatedUser.name,
    });

    const formattedUser = userService.formatUserForAPI(updatedUser);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type CreateSessionBody = {
  sessionToken: string;
  userId: string;
  expires: Date;
};
export type CreateSessionResult = ResponseData<Session>;

export type GetSessionInformationQuery = {
  session_token?: string;
};
type SessionInformation = {
  user: UserAPI | null;
  organization: Organization | null;
  project: Project | null;
  session: Session | null;
};
export type GetSessionInformationResult = ResponseData<SessionInformation>;

/**
 * Gets information about a session for a user.
 */
export const getSessionInformation = async (
  req: Request<undefined, undefined, undefined, GetSessionInformationQuery>,
  res: ResponseWithInformation<GetSessionInformationResult>,
  _next: NextFunction
): Promise<void> => {
  const { session_token: sessionToken } = req.query;

  let { user } = res.locals;
  const { organization, project } = res.locals;

  try {
    if (sessionToken) {
      user = await userService.getUserBySession(sessionToken);
    }

    if (!user) {
      ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
      return;
    }

    const session = user.session;

    if (!session) {
      ErrorHandler.handleGenericErrorResponse(res, 'SESSION_NOT_FOUND');
      return;
    }

    const formattedUser: SessionInformation['user'] = {
      ...userService.formatUserForAPI(user),
      role: 'user',
    };

    const responseData = formatResponse<SessionInformation>({
      data: { session, user: formattedUser, organization, project },
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type GithubLoginQueryParams = {
  origin: string;
};
export type GithubLoginQueryResult = ResponseData<undefined>;

export const githubLoginQuery = (
  req: Request<undefined, undefined, undefined, GithubLoginQueryParams>,
  res: ResponseWithInformation<GithubLoginQueryResult>,
  _next: NextFunction
): void => {
  const { origin } = req.query;
  const { user } = res.locals;

  if (user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_ALREADY_LOGGED_IN');
    return;
  }

  const encodedOrigin = encodeURIComponent(origin);

  const redirectURI = `${process.env.BACKEND_URL}/api/auth/callback/github?redirect_uri=${encodedOrigin}`;
  const encodedRedirectURI = encodeURIComponent(redirectURI);

  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodedRedirectURI}`
  );
};

export type GithubCallbackQuery = {
  code: string;
  redirect_uri: string;
};

export type GithubCallbackResult = ResponseData<UserAPI>;

/**
 * Handles GitHub OAuth callback.
 */
export const githubCallback = async (
  req: Request<undefined, undefined, undefined, GithubCallbackQuery>,
  res: ResponseWithInformation<GithubCallbackResult>,
  _next: NextFunction
): Promise<void> => {
  const { code, redirect_uri } = req.query;

  if (!code) {
    const errorMessage = 'Code not provided';

    logger.error(errorMessage);

    res.redirect(redirect_uri);
    return;
  }

  if (!redirect_uri) {
    const errorMessage = 'Redirect URI not provided';

    logger.error(errorMessage);

    res.redirect(redirect_uri);
    return;
  }

  try {
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    const userResponse = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!userResponse.ok) {
      throw new GenericError('GITHUB_FETCH_USER_DATA_FAILED', { userResponse });
    }

    const userData = await userResponse.json();

    const emailResponse = await fetch('https://api.github.com/user/emails', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!emailResponse.ok) {
      throw new GenericError('GIT_HUB_FETCH_USER_EMAIL_FAILED', {
        emailResponse,
      });
    }

    const emails: { primary: boolean; email: string }[] =
      await emailResponse.json();

    const primaryEmail = emails.find((email) => email.primary)?.email;

    if (!primaryEmail) {
      const errorMessage = 'Primary email not found';

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.NOT_FOUND_404;

      res.redirect(responseCode, redirect_uri);
      return;
    }

    let existingUser = await userService.getUserByEmail(primaryEmail);

    if (existingUser) {
      const existingProvider = await sessionAuthService.getUserProvider(
        existingUser._id,
        'github'
      );

      if (existingProvider?.providerAccountId !== userData.id) {
        const updatedUser = await sessionAuthService.updateUserProvider(
          existingUser._id,
          'github',
          {
            providerAccountId: userData.id,
          }
        );

        logger.info(
          `GitHub login provider updated - User: Name: ${updatedUser.name}, id: ${String(updatedUser._id)}`
        );

        if (updatedUser) {
          existingUser = updatedUser;
        }
      }

      const updatedUser = await userService.updateUserById(existingUser._id, {
        name: existingUser.name ?? userData.name,
      });

      await sessionAuthService.setUserAuth(res, updatedUser);

      res.redirect(redirect_uri);
      return;
    }

    const userInformation: UserData = {
      name: userData.name,
      email: primaryEmail,
    };

    const userProvider: GithubSessionProvider = {
      provider: 'github',
      providerAccountId: userData.id,
    };

    const user = await userService.createUser({
      ...userInformation,
      provider: [userProvider],
    });

    await sessionAuthService.setUserAuth(res, user);

    logger.info(
      `GitHub login - User: Name: ${user.name}, id: ${String(user._id)}`
    );

    await sendEmail({
      type: 'welcome',
      to: user.email,
      username: user.name,
      loginLink: sessionAuthRoutes.loginEmailPassword.url,
    });

    res.redirect(redirect_uri);
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type GoogleLoginQueryParams = {
  origin: string;
};

export type GoogleLoginResult = ResponseData<undefined>;

export const googleLoginQuery = (
  req: Request<undefined, undefined, undefined, GoogleLoginQueryParams>,
  res: ResponseWithInformation<GoogleLoginResult>,
  _next: NextFunction
): void => {
  const { origin } = req.query;
  const { user } = res.locals;

  if (user) {
    const errorMessage = `User already logged in - ${user?.email}`;

    logger.error(errorMessage);

    res.redirect(origin);
    return;
  }

  const responseType = 'code';
  const scope = [
    'https%3A//www.googleapis.com/auth/userinfo.email',
    'https%3A//www.googleapis.com/auth/userinfo.profile',
  ].join(' ');
  const includeGrantedScopes = 'false';

  const encodedOrigin = encodeURIComponent(origin);
  const state = JSON.stringify({ redirect_uri: encodedOrigin });

  const redirectURI = `${process.env.BACKEND_URL}/api/auth/callback/google`;

  res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}&include_granted_scopes=${includeGrantedScopes}&state=${state}`
  );
};

export type GoogleCallbackQuery = {
  code: string;
  state: string;
};

export type GoogleCallbackResult = ResponseData<UserAPI>;

/**
 * Handles Google OAuth 2 callback.
 */
export const googleCallback = async (
  req: Request<undefined, undefined, undefined, GoogleCallbackQuery>,
  res: ResponseWithInformation<GoogleCallbackResult>,
  _next: NextFunction
): Promise<void> => {
  const { code, state } = req.query;

  const decodedState = decodeURIComponent(state);
  const { redirect_uri } = JSON.parse(decodedState);

  if (!code) {
    const errorMessage = 'code not provided';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;

    res.redirect(responseCode, redirect_uri);
    return;
  }

  if (!redirect_uri) {
    const errorMessage = 'Redirect URI not provided';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;

    res.redirect(responseCode, redirect_uri);
    return;
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        redirect_uri: `${process.env.BACKEND_URL}/api/auth/callback/google`,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: 'authorization_code',
      }),
    });

    const responseData = await tokenResponse.json();

    const { access_token: accessToken } = responseData;

    if (!accessToken) {
      const errorMessage = 'Failed to fetch access_token';

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;

      res.redirect(responseCode, redirect_uri);
      return;
    }

    const userResponse = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userData = await userResponse.json();

    if (!userData.email) {
      const errorMessage = 'Failed to fetch user data from Google';

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;

      res.redirect(responseCode, redirect_uri);
      return;
    }

    let existingUser = await userService.getUserByEmail(userData.email);

    if (existingUser) {
      const existingProvider = await sessionAuthService.getUserProvider(
        existingUser._id,
        'google'
      );

      if (existingProvider?.providerAccountId !== userData.sub) {
        const updatedUser = await sessionAuthService.updateUserProvider(
          existingUser._id,
          'google',
          {
            providerAccountId: userData.id,
          }
        );

        logger.info(
          `Google login provider updated - User: Name: ${updatedUser.name}, id: ${String(updatedUser._id)}`
        );

        if (updatedUser) {
          existingUser = updatedUser;
        }
      }

      const updatedUser = await userService.updateUserById(existingUser._id, {
        name: existingUser.name ?? userData.name,
      });

      await sessionAuthService.setUserAuth(res, updatedUser);

      res.redirect(redirect_uri);
      return;
    }

    const userInformation: UserData = {
      name: userData.name,
      email: userData.email,
    };

    const userProvider: GoogleSessionProvider = {
      provider: 'google',
      providerAccountId: userData.id,
    };

    const user = await userService.createUser({
      ...userInformation,
      provider: [userProvider],
    });

    await sessionAuthService.setUserAuth(res, user);

    logger.info(
      `Google login - User: Name: ${user.name}, id: ${String(user._id)}`
    );

    await sendEmail({
      type: 'welcome',
      to: user.email,
      username: user.name,
      loginLink: sessionAuthRoutes.loginEmailPassword.url,
    });

    // res.redirect(redirect_uri);
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
