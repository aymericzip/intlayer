import type { ResponseWithInformation } from '@middlewares/auth.middleware';
import {
  clearCSRFToken as clearCSRFTokenService,
  clearOrganizationAuth as clearOrganizationAuthService,
  clearProjectAuth as clearProjectAuthService,
  clearUserAuth as clearUserAuthService,
  generateRandomString as generateRandomStringService,
  loginUser as loginUserService,
  setCSRFToken as setCSRFTokenService,
  setUserAuth as setUserAuthService,
} from '@services/auth.service';
import {
  checkUserExists,
  createUser as createUserService,
} from '@services/user.service';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { Request, Response } from 'express';
import { logger } from '@/logger';
import type { User, UserWithPasswordNotHashed } from '@/types/user.types';

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

type JWTData = { csrfToken: string; user: User | null };
type ControlJWTResult = ResponseData<JWTData>;

/**
 * Handles JWT generation and setting cookies.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing CSRF token and user information.
 */
export const controlJWT = (
  req: Request,
  res: ResponseWithInformation<ControlJWTResult>
) => {
  const csrfToken = (req as RequestWithCSRFToken).csrfToken();

  if (!csrfToken) {
    clearCSRFTokenService(res);
  }

  setCSRFTokenService(res, csrfToken);

  const user = res.locals.user;

  if (user) {
    setUserAuthService(res, user);
  }

  const responseData = formatResponse<JWTData>({
    data: { csrfToken, user },
  });

  return res.json(responseData);
};

export type RegisterBody = UserWithPasswordNotHashed;
export type RegisterResult = ResponseData<User>;

/**
 * Handles user registration.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response with user information or error status.
 */
export const register = async (
  req: Request<any, any, RegisterBody>,
  res: ResponseWithInformation<RegisterResult>
) => {
  const userData = req.body;

  try {
    const existingUser = await checkUserExists(userData.email);

    if (existingUser) {
      const errorMessage = `User already exists - ${userData.email}`;

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.BAD_REQUEST;
      const responseData = formatResponse<User>({
        error: errorMessage,
        status: responseCode,
      });

      return res.status(responseCode).json(responseData);
    }

    const newUser = await createUserService({
      ...userData,
      secret: generateRandomStringService(35),
    });

    if (!newUser) {
      const errorMessage = `User creation failed - ${userData.email}`;

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
      const responseData = formatResponse<User>({
        error: errorMessage,
        status: responseCode,
      });

      return res.status(responseCode).json(responseData);
    }

    logger.info(
      `New registration: ${newUser.firstname} ${newUser.lastname} - ${newUser.email}`
    );

    const responseData = formatResponse<User>({ data: newUser });

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
export type LoginResult = ResponseData<User>;

/**
 * Handles user login.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response with user information or error status.
 */
export const login = async (
  req: Request<any, any, LoginBody>,
  res: ResponseWithInformation
) => {
  const { email, password } = req.body;

  try {
    const user = await loginUserService(email, password);

    setUserAuthService(res, user);

    const responseData = formatResponse<User>({ data: user });

    logger.info(`Login: ${user.email}`);

    return res.json(responseData);
  } catch (err) {
    const errorMessage: string = (err as { message: string }).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.UNAUTHORIZED;
    const responseData = formatResponse<User>({
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

    const responseCode = HttpStatusCodes.UNAUTHORIZED;
    const responseData = formatResponse<undefined>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  clearUserAuthService(res);
  clearOrganizationAuthService(res);
  clearProjectAuthService(res);

  logger.info(`Logout: ${user.firstname} ${user.lastname} - ${user.email}`);

  const responseData = formatResponse<undefined>({ data: undefined });

  return res.json(responseData);
};
