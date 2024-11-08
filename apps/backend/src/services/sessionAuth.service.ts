import { logger } from '@logger';
import { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import {
  Cookies,
  getClearCookieOptions,
  getCookieOptions,
  MAX_AGE,
} from '@utils/cookies';
import { GenericError } from '@utils/errors';
import { mapUserToAPI } from '@utils/mapper/user';
import { hash, genSalt, compare } from 'bcrypt';
import type { Response } from 'express';
import { t } from 'express-intlayer';
import jwt from 'jsonwebtoken';
import type { Document, ObjectId } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-cycle
import { getUserByEmail, getUserById, updateUserById } from './user.service';
import type { Organization } from '@/types/organization.types';
import type { Project } from '@/types/project.types';
import type {
  SessionProviders,
  EmailPasswordSessionProvider,
  GoogleSessionProvider,
  GithubSessionProvider,
  Session,
} from '@/types/session.types';
import type { User, UserWithPasswordNotHashed } from '@/types/user.types';

/**
 * Adds a session to a user or updates the existing one.
 * @param user - User object.
 * @returns Updated user object.
 */
export const addSession = async (user: User): Promise<User> => {
  const userSessionToken = uuidv4();

  const session: Session = {
    sessionToken: userSessionToken,
    expires: new Date(Date.now() + MAX_AGE),
  };

  const updatedUser: User = await updateUserById(user._id, { session });

  return updatedUser;
};

export const removeSession = async (user: User): Promise<User> => {
  const session = undefined;

  const updatedUser: User = await updateUserById(user._id, { session });

  return updatedUser;
};

/**
 * Set user auth locals object
 * @param res - Express response object.
 * @param user - User object.
 */
export const setUserAuth = async (res: Response, user: User) => {
  const formattedUser = mapUserToAPI(user);

  const userToken = jwt.sign(formattedUser, process.env.JWT_TOKEN_SECRET!, {
    expiresIn: MAX_AGE,
  });

  if (!userToken) {
    throw new GenericError('JWT_TOKEN_CREATION_FAILED_USER', { user });
  }

  const cookieOptions = getCookieOptions();

  res.cookie(Cookies.JWT_USER, userToken, cookieOptions);

  const userWithSession = await addSession(user);

  const userSessionToken = userWithSession.session?.sessionToken;

  res.cookie(Cookies.JWT_AUTH, userSessionToken, cookieOptions);

  res.locals.user = user;
  logger.info(
    `User logged in - User: Name: ${user.name}, id: ${String(user._id)}`
  );
};

/**
 * Clears the JWT auth cookies and user locals object.
 * @param res - Express response object.
 */
export const clearUserAuth = async (res: ResponseWithInformation) => {
  const { user } = res.locals;
  const cookiesOptions = getClearCookieOptions();

  if (user) {
    await removeSession(user);
  }

  res.cookie(Cookies.JWT_AUTH, '', cookiesOptions);
  res.cookie(Cookies.JWT_USER, '', cookiesOptions);

  res.locals.user = null;
  res.locals.authType = null;
};

/**
 *
 * @param res
 * @param organization
 * @returns
 */
export const setOrganizationAuth = (
  res: ResponseWithInformation,
  organization: Organization
) => {
  const organizationData = {
    _id: organization._id,
    name: organization.name,
  };

  const organizationToken = jwt.sign(
    organizationData,
    process.env.JWT_TOKEN_SECRET!,
    {
      expiresIn: MAX_AGE,
    }
  );

  if (!organizationToken) {
    throw new GenericError('JWT_TOKEN_CREATION_FAILED_ORGANIZATION', {
      organization,
    });
  }

  res.cookie(Cookies.JWT_ORGANIZATION, organizationToken, getCookieOptions());

  res.locals.organization = organization;
};

/**
 * Clears the JWT organization cookies and organization locals object.
 * @param res - Express response object.
 */
export const clearOrganizationAuth = (res: ResponseWithInformation) => {
  res.locals.organization = null;

  res.cookie(Cookies.JWT_ORGANIZATION, '', getClearCookieOptions());
};

/**
 * Set project auth locals object
 * @param res - Express response object.
 * @param project - Project object.
 */
export const setProjectAuth = (
  res: ResponseWithInformation,
  project: Project
) => {
  const { organization } = res.locals;
  const projectData = {
    _id: project._id,
    name: project.name,
  };

  const projectToken = jwt.sign(projectData, process.env.JWT_TOKEN_SECRET!, {
    expiresIn: MAX_AGE,
  });

  if (!projectToken) {
    throw new GenericError('JWT_TOKEN_CREATION_FAILED_PROJECT', {
      project,
    });
  }

  res.cookie(Cookies.JWT_PROJECT, projectToken, getCookieOptions());

  if (!organization) {
    throw new GenericError('ORGANIZATION_NOT_FOUND', {
      project,
    });
  }

  if (
    // if the project is not in the organization's projects
    String(organization._id) !== String(project.organizationId)
  ) {
    throw new GenericError('JWT_TOKEN_ORGANIZATION_MISMATCH_PROJECT', {
      project,
    });
  }

  res.locals.project = project;
};

/**
 * Clears the JWT project cookies and project locals object.
 * @param res - Express response object.
 */
export const clearProjectAuth = (res: Response) => {
  res.locals.project = null;

  res.cookie(Cookies.JWT_PROJECT, '', getClearCookieOptions());
};

/**
 * Activates a user by setting the emailValidated flag to true.
 * @param user - The user object.
 * @returns
 */
export const activateUser = async (
  userId: string | ObjectId,
  secret: string
): Promise<User> => {
  return await updateUserProvider(userId, 'email', {
    secret,
  });
};

/**
 * Generates a random secret string of a specified length.
 * @param length - The length of the secret.
 * @returns The generated secret string.
 */
export const generateSecret = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');
};

/**
 * Handles a password reset request for a user.
 * @param email - The user's email.
 * @param organization - The organization associated with the user.
 * @returns The user object or null if no user was found.
 */
export const requestPasswordReset = async (
  email: string
): Promise<User | null> => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new GenericError('USER_NOT_FOUND', { email });
  }

  return updateUserProvider(user._id as unknown as string, 'email', {
    secret: generateSecret(35),
  });
};

/**
 * Resets a user's password.
 * @param userId - The ID of the user.
 * @param secret - The secret token associated with the user.
 * @param newPassword - The new password to set.
 * @returns The updated user or null if the reset failed.
 */
export const resetUserPassword = async (
  userId: string | ObjectId,
  secret: string,
  newPassword: string
): Promise<User> => {
  const emailAndPasswordProvider = await getUserProvider(userId, 'email');

  if (!emailAndPasswordProvider) {
    throw new GenericError('USER_PROVIDER_NOT_FOUND', { userId });
  }

  if (emailAndPasswordProvider.secret !== secret) {
    throw new GenericError('USER_PROVIDER_SECRET_NOT_VALID', { userId });
  }

  const updatedUser: User = await updateUserProvider(userId, 'email', {
    passwordHash: await hash(newPassword, await genSalt()),
    secret,
  });

  return updatedUser;
};

type UserProvider<T extends SessionProviders['provider']> = T extends 'email'
  ? EmailPasswordSessionProvider
  : T extends 'google'
    ? GoogleSessionProvider
    : T extends 'github'
      ? GithubSessionProvider
      : SessionProviders;

/**
 * Gets a user's provider.
 * @param userId - The ID of the user.
 * @param provider - The provider to get.
 * @returns The user's provider.
 */
export const getUserProvider = async <T extends SessionProviders['provider']>(
  userId: string | ObjectId,
  provider: T,
  providerAccountId?: string
): Promise<UserProvider<T> | null> => {
  const user = await getUserById(userId);

  if (!user) {
    throw new GenericError('USER_NOT_FOUND', { userId });
  }

  const userProvider = user.provider?.find(
    (providerEl) =>
      (providerEl.provider === provider && !providerAccountId) ||
      (providerAccountId &&
        (providerEl as GithubSessionProvider).providerAccountId ===
          providerAccountId)
  );

  return (userProvider as UserProvider<T>) ?? null;
};

/**
 * Formats the given fields of a user's provider.
 * @param provider - The provider to update.
 * @param user - The user object.
 * @param providerUpdate - The updates to apply to the provider.
 * @returns The updated user provider.
 */
export const formatUserProviderUpdate = <
  T extends SessionProviders['provider'],
>(
  provider: T,
  user: Partial<User>,
  providerUpdate: Partial<UserProvider<T>>
): User['provider'] => {
  const userProvider: SessionProviders[] = (
    user.provider as unknown as Document
  ).toObject();
  const userProviderToUpdate = userProvider?.find(
    (providerEl) => providerEl.provider === provider
  );

  let updatedProvider: User['provider'];

  if (userProviderToUpdate) {
    const otherProviders =
      user.provider?.filter((p) => p.provider !== provider) ?? [];

    updatedProvider = [
      ...otherProviders,
      { ...userProviderToUpdate, ...providerUpdate, provider },
    ];
  } else {
    updatedProvider = [
      ...(user.provider ?? []),
      { ...providerUpdate, provider } as SessionProviders,
    ];
  }

  return updatedProvider;
};

/**
 * Updates the given fields of a user's provider.
 * @param userId - The ID of the user.
 * @param provider - The provider to update.
 * @param providerUpdate - The updates to apply to the provider.
 * @returns The updated user.
 */
export const updateUserProvider = async <
  T extends SessionProviders['provider'],
>(
  userId: string | ObjectId,
  provider: T,
  providerUpdate: Partial<UserProvider<T>>
): Promise<User> => {
  const user = await getUserById(userId);

  if (!user) {
    throw new GenericError('USER_NOT_FOUND', { userId });
  }

  const formattedProviderToUpdate = formatUserProviderUpdate(
    provider,
    user,
    providerUpdate
  );

  const updatedUser: User = await updateUserById(userId, {
    provider: formattedProviderToUpdate,
  });

  logger.info(
    `User provider updated - User: Name: ${updatedUser.name}, id: ${String(updatedUser._id)} - Provider: ${provider}`
  );

  return updatedUser;
};

/**
 * Updates the given fields of a user's provider.
 * @param userId - The ID of the user.
 * @param provider - The updates to apply to the provider.
 * @returns The updated user.
 */
export const addUserProvider = async (
  userId: string | ObjectId,
  provider: SessionProviders
): Promise<User> => {
  const user = await getUserById(userId);

  if (!user) {
    throw new GenericError('USER_NOT_FOUND', { userId });
  }

  const existingProvider = await getUserProvider(userId, provider.provider);

  if (existingProvider) {
    throw new GenericError('USER_PROVIDER_ALREADY_EXISTS', {
      userId,
      provider,
    });
  }

  const updatedProvider = [...(user.provider ?? []), provider];

  const updatedUser = await updateUserById(userId, {
    provider: updatedProvider,
  });

  logger.info(
    `User provider added - User: Name: ${updatedUser.name}, id: ${String(updatedUser._id)} - Provider: ${provider.provider}`
  );

  return updatedUser;
};

/**
 * Removes a user's provider.
 * @param userId - The ID of the user.
 * @param provider - The provider to remove.
 * @returns The updated user.
 */
export const removeUserProvider = async (
  userId: string | ObjectId,
  provider: SessionProviders['provider'],
  providerAccountId?: string
) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new GenericError('USER_NOT_FOUND', { userId });
  }

  const existingProvider = await getUserProvider(
    userId,
    provider,
    providerAccountId
  );

  if (!existingProvider) {
    throw new GenericError('USER_PROVIDER_NOT_FOUND', {
      userId,
      provider,
    });
  }

  const updatedProvider = user.provider?.filter(
    (p) =>
      p.provider !== provider &&
      (!providerAccountId ||
        (providerAccountId &&
          (p as GithubSessionProvider).providerAccountId !== providerAccountId))
  );

  return await updateUserById(userId, {
    provider: updatedProvider,
  });
};

type TestUserPasswordResult = { user: User | null; error?: string };

/**
 * Logs in a user.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns The user object.
 */
export const testUserPassword = async (
  email: string,
  password: string
): Promise<TestUserPasswordResult> => {
  const user = await getUserByEmail(email);

  if (!user) {
    const errorMessages = {
      en: `User not found - ${email}`,
      fr: `Utilisateur non trouvé - ${email}`,
      es: `Usuario no encontrado - ${email}`,
    };

    return { user: null, error: t(errorMessages) };
  }

  const userEmailPasswordProvider = user.provider?.find(
    (provider) => provider.provider === 'email'
  );

  if (!userEmailPasswordProvider?.passwordHash) {
    const errorMessages = {
      en: `User request to login but no password defined: ${user.email}`,
      fr: `Demande de connexion d'utilisateur mais pas de mot de passe défini : ${user.email}`,
      es: `Solicitud de inicio de sesión de usuario pero no se define la contraseña : ${user.email}`,
    };

    return { user: null, error: t(errorMessages) };
  }

  const isMatch = await compare(
    password,
    userEmailPasswordProvider.passwordHash
  );

  if (!isMatch) {
    const errorMessages = {
      en: `Incorrect email or password: ${email}`,
      fr: `Email ou mot de passe incorrect : ${email}`,
      es: `Correo electrónico o contraseña incorrecta : ${email}`,
    };

    logger.error(errorMessages.en);

    // Await a random time to prevent brute force attacks
    const randomNumber = Math.floor(Math.random() * 1000) + 1000;
    await new Promise((resolve) => setTimeout(resolve, randomNumber));

    return { user: null, error: t(errorMessages) };
  }

  return { user };
};

/**
 * Hashes a user's password.
 * @param userWithPasswordNotHashed - The user object with password not hashed.
 * @returns The user object with hashed password.
 */
export const hashUserPassword = async (
  userWithPasswordNotHashed: UserWithPasswordNotHashed
): Promise<Partial<User>> => {
  const { password, ...user } = userWithPasswordNotHashed;

  if (!password) {
    throw new GenericError('USER_PASSWORD_NOT_DEFINED', { user });
  }

  const userProvider = formatUserProviderUpdate('email', user, {
    passwordHash: await hash(password, await genSalt()),
    secret: generateSecret(35),
  });

  return { ...user, provider: userProvider };
};

/**
 * Changes a user's password.
 * @param userId - The ID of the user.
 * @param oldPassword - The user's old password.
 * @param newPassword - The user's new password.
 * @returns The updated user or null if the password change failed.
 */
export const changeUserPassword = async (
  userId: string | ObjectId,
  oldPassword: string,
  newPassword: string
) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new GenericError('USER_NOT_FOUND', { userId });
  }

  const { email } = user;

  await testUserPassword(email, oldPassword);

  const updatedUser: User = await updateUserProvider(userId, 'email', {
    passwordHash: await hash(newPassword, await genSalt()),
  });

  return updatedUser;
};

/**
 * Resets a user's password.
 * @param userId - The ID of the user.
 * @param secret - The secret token associated with the user.
 * @param newPassword - The new password to set.
 * @returns The updated user or null if the reset failed.
 */
export const resetPassword = async (userId: string, password: string) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new GenericError('USER_NOT_FOUND', { userId });
  }

  const updatedUser: User = await updateUserProvider(userId, 'email', {
    passwordHash: await hash(password, await genSalt()),
  });

  return updatedUser;
};
