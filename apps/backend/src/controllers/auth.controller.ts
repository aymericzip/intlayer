import type { ResponseWithInformation } from '@middlewares/auth.middleware';
import { UserModel } from '@models/user.model';
import type { User, UserWithPasswordNotHashed } from '@schemas/user.type';
import {
  clearCSRFToken,
  clearOrganizationAuth,
  clearProjectAuth,
  clearUserAuth,
  generateRandomString,
  loginUser,
  setCSRFToken,
  setUserAuth,
} from '@services/auth.service';
import { createUser, getUserByEmail } from '@services/user.service';
import type { Request, Response } from 'express';
import { logger } from '@/logger';

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

/**
 * Handles JWT generation and setting cookies.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response containing CSRF token and user information.
 */
export const controlJWT = (req: Request, res: ResponseWithInformation) => {
  const csrfToken = (req as RequestWithCSRFToken).csrfToken();

  if (!csrfToken) {
    clearCSRFToken(res);
  }

  setCSRFToken(res, csrfToken);

  const user = res.locals.user;

  if (user) {
    setUserAuth(res, user);
  }

  return res.status(200).json({ csrfToken, user });
};

/**
 * Handles user registration.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response with user information or error status.
 */
export const signUp = async (
  req: Request<any, any, UserWithPasswordNotHashed>,
  res: ResponseWithInformation
) => {
  const { email, password, firstname, lastname, phone } = req.body;

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      const newUser = await createUser({
        email,
        firstname,
        lastname,
        phone,
        password,
        secret: generateRandomString(35),
      });

      if (!newUser) {
        const errorMessage = `User creation failed - ${email}`;

        logger.error(errorMessage);

        return res.sendStatus(401).json({ error: errorMessage });
      }

      logger.info(
        `New registration: ${newUser.firstname} ${newUser.lastname} - ${newUser.email}`
      );

      return res.status(200).json(newUser);
    }

    return res.sendStatus(401);
  } catch (err) {
    logger.error(err);
    return res.sendStatus(500);
  }
};

export type UserLogInAttributes = {
  email: string;
  password: string;
};

/**
 * Handles user login.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response with user information or error status.
 */
export const signIn = async (
  req: Request<any, any, UserLogInAttributes>,
  res: ResponseWithInformation
) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);

    setUserAuth(res, user);

    return res.status(200).json(user);
  } catch (err) {
    const errorMessage: string = (err as { message: string }).message;

    logger.error(errorMessage);
    return res.sendStatus(401).json({ error: errorMessage });
  }
};

/**
 * Handles login via Firebase authentication.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response with user information or error status.
 */
export const logByFirebase = async (
  req: Request<any, any, User>,
  res: ResponseWithInformation
) => {
  const userData: User = req.body;

  try {
    let user = await getUserByEmail(userData.email);

    if (!user) {
      user = await createUser(userData);

      logger.info(
        `New firebase registration: ${user.firstname} ${user.lastname} - ${user.email}`
      );
    }

    if (user) {
      setUserAuth(res, user);

      logger.info(
        `New log: ${user.firstname} ${user.lastname} - ${user.email}`
      );

      return res.status(200).json(user);
    }

    return res.sendStatus(401);
  } catch (err) {
    logger.error(err);
    return res
      .status(200)
      .json({ state: 'Not send', user: 'Not created', errors: err });
  }
};

/**
 * Handles user logout and clears cookies.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns Response indicating logout success.
 */
export const logOut = (
  _req: Request,
  res: ResponseWithInformation
): Response => {
  const user: User | null = res.locals.user;

  if (!user) {
    const errorMessage = `User logout failed`;

    logger.error(errorMessage);
    return res.sendStatus(401).json({ error: errorMessage });
  }

  clearUserAuth(res);
  clearOrganizationAuth(res);
  clearProjectAuth(res);

  logger.info(`Logout: ${user.firstname} ${user.lastname} - ${user.email}`);

  return res.status(200);
};
