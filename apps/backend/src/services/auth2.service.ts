import { randomBytes } from 'crypto';
import { OAuth2AccessTokenModel } from '@models/oAuth2.model';
import { ProjectModel } from '@models/project.model';
import { Client, User, Token as OAuth2Token, Callback } from 'oauth2-server';
import { Token } from '../schemas/oAuth2.schema';
import { getOrganizationById } from './organization.service';
import { getUserById } from './user.service';
import { Organization } from '@/types/organization.types';
import { OAuth2Access, Project } from '@/types/project.types';

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
 * @returns The an object containing the client and the project or false if not found
 */
export const getClientAndProjectByClientId = async (
  clientId: string
): Promise<
  { client: Client; oAuth2Access: OAuth2Access; project: Project } | false
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

  return { client: formattedClient, oAuth2Access, project };
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
 * @param token
 * @param client
 * @param user
 * @param project
 * @param organization
 * @returns
 */
export const formatOAuth2Token = (
  token: Token,
  client: Client,
  user: User,
  project: Project,
  organization: Organization
): OAuth2Token => {
  const { clientId, userId, ...restToken } = token;

  if (String(userId) !== String(user._id)) {
    throw new Error('User id does not match');
  }

  const formattedToken: OAuth2Token = {
    ...restToken,
    client,
    user,
    organization,
    project,
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt ?? new Date('999-99-99'),
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
  userId: User['_id']
): Token => {
  const formattedToken: Token = {
    clientId: clientId,
    userId: userId,
    accessToken: token.accessToken,
    expiresIn: token.accessTokenExpiresAt,
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
  user: User
): Promise<OAuth2Token | false> => {
  const formattedAccessToken: Token = formatDBToken(token, client.id, user._id);

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
    organization
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

  const { client, project } = result;

  const organization = await getOrganizationById(project.organizationId);

  if (!organization) {
    return false;
  }

  const formattedAccessToken = formatOAuth2Token(
    token,
    client,
    user,
    project,
    organization
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
): Promise<User | false> => {
  const response = await getClientAndProjectByClientId(client.id);

  if (!response) {
    return false;
  }

  const { userId } = response.oAuth2Access;

  if (!userId) {
    return false;
  }

  const user: User = getUserById(userId);

  return user;
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
