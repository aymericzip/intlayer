import { logger } from '@logger/index';
import { UserModel } from '@models/user.model';
import type { Organization } from '@schemas/organization.type';
import type { Project } from '@schemas/project.type';
import type { CookieOptions, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { User } from '@/types/user.type';

export const DOMAIN = process.env.DOMAIN!;
export const MAX_AGE = 3 * 24 * 60 * 60 * 1000;
export const TOKEN_SECRET = process.env.TOKEN_SECRET!;

const cookieOptions: CookieOptions = {
  maxAge: MAX_AGE,
  path: '/',
  httpOnly: true,
  secure: true,
  domain: DOMAIN,
  sameSite: 'strict',
};

const clearCookieOptions: CookieOptions = {
  ...cookieOptions,
  maxAge: 1,
};

/**
 * Generates a random string of specified length.
 * @param length - Length of the random string.
 * @returns Randomly generated string.
 */
export const generateRandomString = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const randomString: string = Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join('');

  return randomString;
};

export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.login(email, password);

  if (!user) {
    const errorMessage = `User login failed - ${email}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return user;
};

/**
 * Set user auth locals object
 * @param res - Express response object.
 * @param user - User object.
 */
export const setUserAuth = (res: Response, user: User) => {
  const userData = {
    userId: user._id,
    email: user.email,
  };

  const userToken = jwt.sign(userData, TOKEN_SECRET, { expiresIn: MAX_AGE });

  if (!userToken) {
    const errorMessage = `JWT token creation failed for user ${user.firstname} ${user.lastname} - ${user.email}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  res.cookie('jwt_auth', userToken, cookieOptions);

  res.locals.user = user;
};

/**
 * Clears the JWT auth cookies and user locals object.
 * @param res - Express response object.
 */
export const clearUserAuth = (res: Response) => {
  res.locals.user = null;

  res.cookie('jwt_auth', '', clearCookieOptions);
};

/**
 *
 * @param res
 * @param organization
 * @returns
 */
export const setOrganizationAuth = (
  res: Response,
  organization: Organization
) => {
  const organizationData = {
    organizationId: organization._id,
    name: organization.name,
  };

  const organizationToken = jwt.sign(organizationData, TOKEN_SECRET, {
    expiresIn: MAX_AGE,
  });

  if (!organizationToken) {
    const errorMessage = `JWT token creation failed for organization ${organization.name}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  res.cookie('jwt_organization', organizationToken, cookieOptions);

  res.locals.organization = organization;
};

/**
 * Clears the JWT organization cookies and organization locals object.
 * @param res - Express response object.
 */
export const clearOrganizationAuth = (res: Response) => {
  res.locals.organization = null;

  res.cookie('jwt_organization', '', clearCookieOptions);
};

/**
 * Set project auth locals object
 * @param res - Express response object.
 * @param project - Project object.
 */
export const setProjectAuth = (res: Response, project: Project) => {
  const projectData = {
    projectId: project._id,
    name: project.name,
  };

  const projectToken = jwt.sign(projectData, TOKEN_SECRET, {
    expiresIn: MAX_AGE,
  });

  if (!projectToken) {
    const errorMessage = `JWT token creation failed for project ${project.name}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  res.cookie('jwt_project', projectToken, cookieOptions);

  res.locals.project = project;
};

/**
 * Clears the JWT project cookies and project locals object.
 * @param res - Express response object.
 */
export const clearProjectAuth = (res: Response) => {
  res.locals.project = null;

  res.cookie('jwt_project', '', clearCookieOptions);
};

/**
 * Set XSRF token cookie
 * @param res - Express response object.
 * @param csrfToken - XSRF token
 */
export const setCSRFToken = (res: Response, csrfToken: string) => {
  res.cookie('XSRF-TOKEN', csrfToken, cookieOptions);
};

/**
 * Clear XSRF token cookie
 * @param res - Express response object.
 */
export const clearCSRFToken = (res: Response) => {
  res.cookie('XSRF-TOKEN', '', clearCookieOptions);
};
