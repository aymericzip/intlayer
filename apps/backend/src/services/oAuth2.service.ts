import { randomBytes } from 'node:crypto';
import { OAuth2AccessTokenModel } from '@models/oAuth2.model';
import { ProjectModel } from '@models/project.model';
import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';
import { GenericError } from '@utils/errors';
import { mapOrganizationToAPI } from '@utils/mapper/organization';
import { mapProjectToAPI } from '@utils/mapper/project';
import { mapUserToAPI } from '@utils/mapper/user';
import { getTokenExpireAt } from '@utils/oAuth2';
import type { Types } from 'mongoose';
import type { Callback, Client } from 'oauth2-server';
import type { OAuth2Token } from '@/types/oAuth2.types';
import type { Organization } from '@/types/organization.types';
import type {
  OAuth2Access,
  OAuth2AccessContext,
  Project,
  ProjectDocument,
} from '@/types/project.types';
import type { User, UserAPI, UserDocument } from '@/types/user.types';
import type { Token } from '../schemas/oAuth2.schema';
import { getOrganizationById } from './organization.service';
import { getUserById } from './user.service';

/**
 * Function to generate client credentials
 *
 * @returns The client id and client secret
 */
export const generateClientCredentials = (): {
  clientId: string;
  clientSecret: string;
} => {
  const clientId = randomBytes(16).toString('hex'); // Generate a 16 character hexadecimal string
  const clientSecret = randomBytes(32).toString('hex'); // Generate a 32 character hexadecimal string

  return { clientId, clientSecret };
};

/**
 * Method to get the client and the project
 *
 * @param clientId - The client id
 * @param clientSecret - The client secret
 * @returns The an object containing the client, the rights and the project or false if not found
 */
export const getClientAndProjectByClientId = async (
  clientId: string
): Promise<
  | {
      client: Client;
      oAuth2Access: OAuth2Access;
      project: ProjectDocument;
      grants: Token['grants'];
    }
  | false
> => {
  const project = await ProjectModel.findOne({
    'oAuth2Access.clientId': clientId,
  });

  if (!project) {
    return false;
  }

  const oAuth2Access = project.oAuth2Access.find(
    (access) => access.clientId === clientId
  );

  if (!oAuth2Access) {
    return false;
  }

  const formattedClient: Client = {
    id: oAuth2Access.clientId,
    clientId,
    clientSecret: oAuth2Access.clientSecret,
    grants: ['client_credentials'],
  };

  return {
    client: formattedClient,
    oAuth2Access,
    grants: oAuth2Access.grants,
    project,
  };
};

/**
 * Get the client and verify that the client secret is correct
 *
 * @param clientId - The client id
 * @param clientSecret - The client secret
 * @returns The client or false if not found
 */
export const getClient = async (
  clientId: string,
  clientSecret: string
): Promise<Client | false> => {
  const result = await getClientAndProjectByClientId(clientId);

  if (!result) {
    return false;
  }

  const { client } = result;

  if (!client || client.clientSecret !== clientSecret) {
    return false;
  }

  return client;
};

/**
 * Format an OAuth2Token
 *
 * @param token - The token to format
 * @param client - The client
 * @param user - The user
 * @param project - The project
 * @param organization - The organization
 * @param grants - The grants
 * @returns The formatted token
 */
export const formatOAuth2Token = (
  token: Token,
  client: Client,
  user: UserAPI,
  project: Project,
  organization: Organization,
  grants: Token['grants']
): OAuth2Token => {
  // biome-ignore lint/correctness/noUnusedVariables: Just filter out clientId
  const { clientId, userId, ...restToken } = token;

  if (String(userId) !== String(user.id)) {
    throw new GenericError('USER_ID_MISMATCH');
  }

  const formattedToken: OAuth2Token = {
    ...restToken,
    client,
    user: mapUserToAPI(user),
    organization: mapOrganizationToAPI(organization),
    project: mapProjectToAPI(project),
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt ?? new Date('999-99-99'),
    grants,
  };

  return formattedToken;
};

/**
 * Format a auth token for the database
 *
 * @param token - The oAuth2 token to format
 * @param clientId - The client ID
 * @param userId - The user ID
 * @returns
 */
export const formatDBToken = (
  token: OAuth2Token,
  clientId: Client['id'],
  userId: User['id'] | string
): Token => {
  const formattedToken: Token = {
    id: token.id,
    clientId: clientId,
    userId: userId as Types.ObjectId,
    accessToken: token.accessToken,
    expiresIn: token.accessTokenExpiresAt ?? getTokenExpireAt(),
  };

  return formattedToken;
};

/**
 * Method to save the token
 *
 * @param token - The token
 * @param client - The client
 * @param user - The user
 * @returns The saved token or false if not saved
 */
export const saveToken = async (
  token: OAuth2Token,
  client: Client,
  user: UserAPI
): Promise<OAuth2Token | false> => {
  const formattedAccessToken: Token = formatDBToken(token, client.id, user.id);

  const result = await OAuth2AccessTokenModel.create(formattedAccessToken);

  if (!result) {
    return false;
  }

  const result2 = await getClientAndProjectByClientId(result.clientId);

  if (!result2) {
    return false;
  }

  const { project } = result2;

  const organization = await getOrganizationById(project.organizationId);

  if (!organization) {
    return false;
  }

  const formattedResult = formatOAuth2Token(
    formattedAccessToken,
    client,
    user,
    project,
    organization,
    token.rights
  );
  return formattedResult;
};

/**
 * Method to get the access token
 *
 * @param accessToken - The access token
 * @returns The access token or false if not found
 */
export const getAccessToken = async (
  accessToken: string
): Promise<OAuth2Token | false> => {
  const token = await OAuth2AccessTokenModel.findOne({
    accessToken,
  });

  if (!token) {
    return false;
  }

  const { userId, clientId } = token;

  const user = await getUserById(userId);

  if (!user) {
    return false;
  }

  const result = await getClientAndProjectByClientId(clientId);

  if (!result) {
    return false;
  }

  const { client, project, grants } = result;

  const organization = await getOrganizationById(project.organizationId);

  if (!organization) {
    return false;
  }

  const formattedAccessToken = formatOAuth2Token(
    token,
    client,
    user,
    project,
    organization,
    grants
  );

  return formattedAccessToken;
};

/**
 * Method to get the user from the client
 *
 * @param client - The client
 * @returns The user or false if not found
 */
export const getUserFromClient = async (
  client: Client
): Promise<UserDocument | false> => {
  const response = await getClientAndProjectByClientId(client.id);

  if (!response) {
    return false;
  }

  const { userId } = response.oAuth2Access;

  if (!userId) {
    return false;
  }

  const user = await getUserById(userId);

  return user ?? false;
};

/**
 * Method to verify the permissions (grants)
 *
 * @param token - The token
 * @param scope - The scope
 * @returns True if the token has the required scope, false otherwise
 */
export const verifyScope = async (
  _token: OAuth2Token,
  _scope: string,
  _callback?: Callback<boolean> | undefined
): Promise<boolean> => {
  // Implement the verification of scopes if necessary
  return true;
};

/**
 * Validate OAuth2 access token and return user context
 */
export const validateOAuth2AccessToken = async (
  accessToken: string
): Promise<Token> => {
  try {
    const token = await OAuth2AccessTokenModel.findOne({
      accessToken,
    });

    if (!token) {
      throw new GenericError('INVALID_ACCESS_TOKEN');
    }

    // Check if token is expired
    if (new Date() > new Date(token.expiresIn)) {
      throw new GenericError('EXPIRED_ACCESS_TOKEN');
    }

    return ensureMongoDocumentToObject(token);
  } catch (_error) {
    throw new GenericError('INVALID_ACCESS_TOKEN');
  }
};

/**
 * Validate OAuth2 access token and return user context
 */
export const getOAuth2AccessTokenContext = async (
  token: Token
): Promise<OAuth2AccessContext> => {
  const { userId, clientId } = token;

  const user = await getUserById(String(userId));

  const result = await getClientAndProjectByClientId(clientId);

  if (!result) {
    throw new GenericError('INVALID_ACCESS_TOKEN');
  }

  const { project, grants } = result;

  const organization = await getOrganizationById(project.organizationId);

  return {
    accessToken: token.accessToken,
    user: user ? mapUserToAPI(user) : undefined,
    project: project ? mapProjectToAPI(project) : undefined,
    organization: organization ? mapOrganizationToAPI(organization) : undefined,
    grants,
  };
};
