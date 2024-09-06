/* eslint-disable sonarjs/no-duplicate-string */
import type { ResponseWithInformation } from '@middlewares/auth.middleware';
import {
  clearCSRFToken as clearCSRFTokenService,
  clearOrganizationAuth as clearOrganizationAuthService,
  clearProjectAuth as clearProjectAuthService,
  clearUserAuth as clearUserAuthService,
  loginUser as loginUserService,
  setCSRFToken as setCSRFTokenService,
  setUserAuth as setUserAuthService,
  changeUserPassword as changeUserPasswordService,
  activateUser as activateUserService,
  requestPasswordReset as requestPasswordResetService,
  resetUserPassword as resetUserPasswordService,
  addUserProvider as addUserProviderService,
  getUserProvider as getUserProviderService,
  updateUserProvider as updateUserProviderService,
} from '@services/auth.service';
import {
  createUser as createUserService,
  formatUserForAPI as formatUserForAPIService,
  getUserByEmail as getUserByEmailService,
  getUserById as getUserByIdService,
  getUserBySession as getUserBySessionService,
  updateUserById as updateUserByIdService,
} from '@services/user.service';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { Request, Response } from 'express';
import { Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '@/logger';
import type {
  Session,
  GithubSessionProvider,
  GoogleSessionProvider,
} from '@/types/session.types';
import type { User, UserAPI, UserData } from '@/types/user.types';

type CSRFTokenProps = {
  csrfToken: () => string;
};

type RequestWithCSRFToken<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
  Locals extends Record<string, any> = Record<string, any>,
> = Request<P, ResBody, ReqBody, ReqQuery, Locals> & CSRFTokenProps;

type JWTData = { csrfToken: string; user: UserAPI | null };
type ControlJWTResult = ResponseData<JWTData>;

/**
 * Handles JWT generation and setting cookies.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing CSRF token and user information.
 */
export const controlJWT = async (
  req: Request,
  res: ResponseWithInformation<ControlJWTResult>
) => {
  const csrfToken = (req as RequestWithCSRFToken).csrfToken();

  if (!csrfToken) {
    clearCSRFTokenService(res);
  }

  setCSRFTokenService(res, csrfToken);

  const user = res.locals.user;

  if (!user) {
    return res.json(
      formatResponse<JWTData>({ data: { csrfToken, user: null } })
    );
  }

  await setUserAuthService(res, user);
  const formattedUser = formatUserForAPIService(user);

  const responseData = formatResponse<JWTData>({
    data: { csrfToken, user: formattedUser },
  });

  return res.json(responseData);
};

export type RegisterBody = { email: string; password: string };
export type RegisterResult = ResponseData<UserAPI>;

/**
 * Handles user registration.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response with user information or error status.
 */
export const registerEmailPassword = async (
  req: Request<any, any, RegisterBody>,
  res: ResponseWithInformation<RegisterResult>
) => {
  const user = res.locals.user;

  if (user) {
    const errorMessage = `User already logged in`;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  const userData = req.body;

  try {
    let user = await getUserByEmailService(userData.email);

    if (user) {
      const emailProvider = user.provider?.find(
        (provider) => provider.provider === 'email'
      );

      if (emailProvider) {
        if (emailProvider.emailValidated) {
          const errorMessage = `Email already validated - ${userData.email}`;

          logger.error(errorMessage);

          const responseCode = HttpStatusCodes.BAD_REQUEST_400;
          const responseData = formatResponse<UserAPI>({
            error: errorMessage,
            status: responseCode,
          });

          return res.status(responseCode).json(responseData);
        } else {
          user = await updateUserProviderService(user._id, 'email', {
            secret: uuidv4(),
          });
        }
      } else {
        user = await addUserProviderService(user._id, {
          provider: 'email',
          emailValidated: undefined,
          secret: uuidv4(),
        });
      }
    } else {
      user = await createUserService(userData);
      logger.info(`New registration: ${user.name} - ${user.email}`);
    }

    if (!user) {
      const errorMessage = `User creation failed - ${userData.email}`;

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
      const responseData = formatResponse<UserAPI>({
        error: errorMessage,
        status: responseCode,
      });

      return res.status(responseCode).json(responseData);
    }

    await setUserAuthService(res, user);

    const formattedUser = formatUserForAPIService(user);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    return res.json(responseData);
  } catch (err) {
    logger.error(err);
    return res.sendStatus(500);
  }
};

export type LoginBody = {
  email: string;
  password: string;
};
export type LoginResult = ResponseData<UserAPI>;

/**
 * Handles user login.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response with user information or error status.
 */
export const loginEmailPassword = async (
  req: Request<any, any, LoginBody>,
  res: ResponseWithInformation<LoginResult>
) => {
  const user = res.locals.user;

  if (user) {
    const errorMessage = `User already logged in`;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  const { email, password } = req.body;

  try {
    const loggedInUser = await loginUserService(email, password);

    await setUserAuthService(res, loggedInUser);

    const formattedUser = formatUserForAPIService(loggedInUser);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    logger.info(`Login: ${loggedInUser.email}`);

    return res.json(responseData);
  } catch (err) {
    const errorMessage: string = (err as { message: string }).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.UNAUTHORIZED_401;
    const responseData = formatResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type LogoutResult = ResponseData<undefined>;

/**
 * Handles user logout and clears cookies.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response indicating logout success.
 */
export const logOut = (
  _req: Request,
  res: ResponseWithInformation<LogoutResult>
): Response => {
  const user: User | null = res.locals.user;

  if (!user) {
    const errorMessage = `User logout failed`;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.UNAUTHORIZED_401;
    const responseData = formatResponse<undefined>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  clearUserAuthService(res);
  clearOrganizationAuthService(res);
  clearProjectAuthService(res);

  logger.info(`Logout: ${user.name} - ${user.email}`);

  const responseData = formatResponse<undefined>({ data: undefined });

  return res.json(responseData);
};

export type UpdatePasswordBody = {
  oldPassword: string;
  newPassword: string;
};
export type UpdatePasswordResult = ResponseData<UserAPI>;

/**
 * Updates the user's password.
 * @param req - Express request object.
 * @param  res - Express response object.
 * @returns  Response containing the updated user or error message.
 */
export const updatePassword = async (
  req: Request<undefined, any, UpdatePasswordBody>,
  res: ResponseWithInformation<UpdatePasswordResult>
) => {
  const { oldPassword, newPassword } = req.body;
  let user = res.locals.user;

  if (!user) {
    return res.sendStatus(404).json();
  }

  try {
    if (newPassword !== '') {
      user = await changeUserPasswordService(
        user._id,
        oldPassword,
        newPassword
      );

      if (!user || typeof user !== 'object') {
        const errorMessage = 'User data not found';

        logger.error(errorMessage);

        const responseCode = HttpStatusCodes.BAD_REQUEST_400;
        const responseData = formatResponse<UserAPI>({
          error: errorMessage,
          status: responseCode,
        });

        return res.status(responseCode).json(responseData);
      }

      logger.info(
        `Password changed - User : Name : ${user.name}, id : ${user._id}`
      );

      const formattedUser = formatUserForAPIService(user);

      const responseData = formatResponse<UserAPI>({ data: formattedUser });

      return res.json(responseData);
    }
  } catch (err) {
    const errorMessage: string = (err as { message: string }).message;
    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.FORBIDDEN_403;
    const responseData = formatResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type ValidEmailParams = { secret: string; userId: string };
export type ValidEmailResult = ResponseData<UserAPI>;

/**
 * Validates a user's email based on the provided secret and user ID.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the validated user or error message.
 */
export const validEmail = async (
  req: Request<ValidEmailParams, any, any>,
  res: ResponseWithInformation<ValidEmailResult>
) => {
  const userId = req.params.userId as unknown as User['_id'];
  const secret = req.params.secret;
  const organization = res.locals.organization;

  if (!Types.ObjectId.isValid(userId.toString())) {
    const responseCode = HttpStatusCodes.NOT_FOUND_404;

    const responseData = formatResponse<UserAPI>({
      error: 'User id not valid',
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (!organization) {
    const responseCode = HttpStatusCodes.NOT_FOUND_404;

    const responseData = formatResponse<UserAPI>({
      error: 'Organization not found',
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  const user = await getUserByIdService(userId);

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.NOT_FOUND_404;
    const responseData = formatResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  await activateUserService(user._id, secret);

  logger.info(`User activated - User: Name: ${user.name}, id: ${user._id}`);

  const formattedUser = formatUserForAPIService(user);
  const responseData = formatResponse<UserAPI>({ data: formattedUser });

  return res.json(responseData);
};

export type AskResetPasswordBody = {
  email: string;
};
export type AskResetPasswordResult = ResponseData<undefined>;

/**
 * Requests a password reset for a user.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response indicating the status of the password reset request.
 */
export const askResetPassword = async (
  req: Request<undefined, any, AskResetPasswordBody>,
  res: ResponseWithInformation<AskResetPasswordResult>
) => {
  const { email } = req.body as Partial<AskResetPasswordBody>;

  if (!email) {
    const errorMessage = 'Email not provided';
    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<undefined>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const updatedUser = await requestPasswordResetService(email);

    if (!updatedUser) {
      const errorMessage = 'User not found';

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.NOT_FOUND_404;
      const responseData = formatResponse<undefined>({
        error: errorMessage,
        status: responseCode,
      });

      return res.status(responseCode).json(responseData);
    }

    logger.info(
      `Ask changing password - User: Name: ${updatedUser.name}, id: ${updatedUser._id}`
    );

    const responseData = formatResponse<undefined>({ data: undefined });

    return res.json(responseData);
  } catch (err) {
    logger.error(err);
    return res.sendStatus(500);
  }
};

export type ResetPasswordParams = { secret: string; userId: string };
export type ResetPasswordResult = ResponseData<UserAPI>;

/**
 * Resets a user's password based on the provided secret and user ID.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the updated user or error message.
 */
export const resetPassword = async (
  req: Request<ResetPasswordParams, any, any>,
  res: Response<ResetPasswordResult>
) => {
  const { secret, userId } = req.params as Partial<ResetPasswordParams>;
  const password: string = req.body.password;

  const userIdString = String(userId);

  if (!userId || !userIdString || !Types.ObjectId.isValid(userIdString)) {
    const errorMessage = `User id invalid - ${userIdString}`;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (!secret) {
    const errorMessage = 'Secret not provided';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const updatedUser = await resetUserPasswordService(
      userId,
      secret,
      password
    );

    logger.info(
      `Password changed - User: Name: ${updatedUser.name}, id: ${updatedUser._id}`
    );

    const formattedUser = formatUserForAPIService(updatedUser);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    return res.json(responseData);
  } catch (err) {
    const errorMessage: string = (err as { message: string }).message;
    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<UserAPI>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
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
  user: UserAPI;
  session: Session;
};
export type GetSessionInformationResult = ResponseData<SessionInformation>;

/**
 * Gets information about a session for a user.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the session and user or error message.
 */
export const getSessionInformation = async (
  req: Request<undefined, undefined, undefined, GetSessionInformationQuery>,
  res: ResponseWithInformation<GetSessionInformationResult>
) => {
  const { session_token: sessionToken } = req.query;

  let user = res.locals.user;

  try {
    if (sessionToken) {
      user = await getUserBySessionService(sessionToken);
    }

    if (!user) {
      const errorMessage = 'User not found';

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.NOT_FOUND_404;
      const responseData = formatResponse<SessionInformation>({
        error: errorMessage,
        status: responseCode,
      });

      return res.status(responseCode).json(responseData);
    }

    const session = user.session;

    if (!session) {
      const errorMessage = 'Session not found';

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.NOT_FOUND_404;
      const responseData = formatResponse<SessionInformation>({
        error: errorMessage,
        status: responseCode,
      });

      return res.status(responseCode).json(responseData);
    }

    const formattedUser: SessionInformation['user'] = {
      ...formatUserForAPIService(user),
      role: 'user',
    };

    const responseData = formatResponse<SessionInformation>({
      data: { session, user: formattedUser },
    });

    return res.json(responseData);
  } catch (err) {
    const errorMessage: string = (err as { message: string }).message;
    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<SessionInformation>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type GithubCallbackQuery = {
  code: string;
  redirect_uri: string;
};

export type GithubCallbackResult = ResponseData<UserAPI>;

/**
 * Handles GitHub OAuth callback.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the user or error message.
 */
export const githubCallback = async (
  req: Request<undefined, undefined, undefined, GithubCallbackQuery>,
  res: ResponseWithInformation<GithubCallbackResult>
) => {
  const { code, redirect_uri } = req.query;

  if (!code) {
    const errorMessage = 'Code not provided';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;

    return res.redirect(responseCode, redirect_uri);
  }

  if (!redirect_uri) {
    const errorMessage = 'Redirect URI not provided';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;

    return res.redirect(responseCode, redirect_uri);
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
      throw new Error('Failed to fetch user data from GitHub');
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
      throw new Error('Failed to fetch user email from GitHub');
    }

    const emails: { primary: boolean; email: string }[] =
      await emailResponse.json();

    const primaryEmail = emails.find((email) => email.primary)?.email;

    if (!primaryEmail) {
      const errorMessage = 'Primary email not found';

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.NOT_FOUND_404;

      return res.redirect(responseCode, redirect_uri);
    }

    let existingUser = await getUserByEmailService(primaryEmail);

    if (existingUser) {
      const existingProvider = await getUserProviderService(
        existingUser._id,
        'github'
      );

      if (existingProvider?.providerAccountId !== userData.id) {
        const updatedUser = await updateUserProviderService(
          existingUser._id,
          'github',
          {
            providerAccountId: userData.id,
          }
        );

        logger.info(
          `GitHub login provider updated - User: Name: ${updatedUser.name}, id: ${updatedUser._id}`
        );

        if (updatedUser) {
          existingUser = updatedUser;
        }
      }

      const updatedUser = await updateUserByIdService(existingUser._id, {
        name: existingUser.name ?? userData.name,
      });

      await setUserAuthService(res, updatedUser);

      return res.redirect(redirect_uri);
    }

    const userInformation: UserData = {
      name: userData.name,
      email: primaryEmail,
    };

    const userProvider: GithubSessionProvider = {
      provider: 'github',
      providerAccountId: userData.id,
    };

    const user = await createUserService({
      ...userInformation,
      provider: [userProvider],
    });

    await setUserAuthService(res, user);

    logger.info(`GitHub login - User: Name: ${user.name}, id: ${user._id}`);

    res.redirect(redirect_uri);
  } catch (err) {
    const errorMessage: string = (err as { message: string }).message;
    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;

    return res.redirect(responseCode, redirect_uri);
  }
};

export type GoogleCallbackQuery = {
  code: string;
  state: string;
};

export type GoogleCallbackResult = ResponseData<UserAPI>;

/**
 * Handles Google OAuth 2 callback.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing the user or error message.
 */
export const googleCallback = async (
  req: Request<undefined, undefined, undefined, GoogleCallbackQuery>,
  res: ResponseWithInformation<GoogleCallbackResult>
) => {
  const { code, state } = req.query;

  const decodedState = decodeURIComponent(state);
  const { redirect_uri } = JSON.parse(decodedState);

  if (!code) {
    const errorMessage = 'code not provided';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;

    return res.redirect(responseCode, redirect_uri);
  }

  if (!redirect_uri) {
    const errorMessage = 'Redirect URI not provided';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;

    return res.redirect(responseCode, redirect_uri);
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

      return res.redirect(responseCode, redirect_uri);
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

      return res.redirect(responseCode, redirect_uri);
    }

    let existingUser = await getUserByEmailService(userData.email);

    if (existingUser) {
      const existingProvider = await getUserProviderService(
        existingUser._id,
        'google'
      );

      if (existingProvider?.providerAccountId !== userData.sub) {
        const updatedUser = await updateUserProviderService(
          existingUser._id,
          'google',
          {
            providerAccountId: userData.id,
          }
        );

        logger.info(
          `Google login provider updated - User: Name: ${updatedUser.name}, id: ${updatedUser._id}`
        );

        if (updatedUser) {
          existingUser = updatedUser;
        }
      }

      const updatedUser = await updateUserByIdService(existingUser._id, {
        name: existingUser.name ?? userData.name,
      });

      await setUserAuthService(res, updatedUser);

      return res.redirect(redirect_uri);
    }

    const userInformation: UserData = {
      name: userData.name,
      email: userData.email,
    };

    const userProvider: GoogleSessionProvider = {
      provider: 'google',
      providerAccountId: userData.id,
    };

    const user = await createUserService({
      ...userInformation,
      provider: [userProvider],
    });

    await setUserAuthService(res, user);

    logger.info(`Google login - User: Name: ${user.name}, id: ${user._id}`);

    // res.redirect(redirect_uri);
  } catch (err) {
    const errorMessage: string = (err as { message: string }).message;
    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;

    return res.redirect(responseCode, redirect_uri);
  }
};
