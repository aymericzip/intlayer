import type { Organization } from '@/types/organization.types';
import type {
  OAuth2Access,
  Project,
  ProjectDocument,
} from '@/types/project.types';
import type { User, UserDocument } from '@/types/user.types';
import { OAuth2AccessTokenModel } from '@models/oAuth2.model';
import { ProjectModel } from '@models/project.model';
import { GenericError } from '@utils/errors';
import { getTokenExpireAt } from '@utils/oAuth2';
import { randomBytes } from 'crypto';
import { Types } from 'mongoose';
import type { Token } from '../schemas/oAuth2.schema';
import { getOrganizationById } from './organization.service';
import { getUserById } from './user.service';

/**
 * OAuth2 Client interface for better-auth integration
 */
export interface OAuth2Client {
  id: string;
  clientId: string;
  clientSecret: string;
  grants: string[];
}

/**
 * Function to generate client credentials
 */
export const generateClientCredentials = (): {
  clientId: string;
  clientSecret: string;
} => {
  const clientId = randomBytes(16).toString('hex');
  const clientSecret = randomBytes(32).toString('hex');
  return { clientId, clientSecret };
};

/**
 * Get client and project by client ID for better-auth integration
 */
export const getClientAndProjectByClientId = async (
  clientId: string
): Promise<
  | {
      client: OAuth2Client;
      oAuth2Access: OAuth2Access;
      project: ProjectDocument;
      rights: Token['rights'];
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

  const formattedClient: OAuth2Client = {
    id: oAuth2Access.clientId,
    clientId,
    clientSecret: oAuth2Access.clientSecret,
    grants: ['client_credentials'],
  };

  return {
    client: formattedClient,
    oAuth2Access,
    rights: oAuth2Access.rights,
    project,
  };
};

/**
 * Validate OAuth2 client credentials
 */
export const validateOAuth2Client = async (
  clientId: string,
  clientSecret: string
): Promise<OAuth2Client | false> => {
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
 * Create OAuth2 access token using better-auth bearer plugin
 */
export const createOAuth2AccessToken = async (
  clientId: string,
  userId: string | Types.ObjectId
): Promise<{
  accessToken: string;
  expiresAt: Date;
  rights: Token['rights'];
} | null> => {
  try {
    const result = await getClientAndProjectByClientId(clientId);

    if (!result) {
      return null;
    }

    const { rights } = result;

    // Generate access token
    const accessToken = randomBytes(32).toString('hex');
    const expiresAt = getTokenExpireAt();

    // Save token to database
    const tokenData: Token = {
      clientId,
      userId: userId as Types.ObjectId,
      accessToken,
      expiresIn: expiresAt,
    };

    await OAuth2AccessTokenModel.create(tokenData);

    return {
      accessToken,
      expiresAt,
      rights,
    };
  } catch (error) {
    throw new GenericError('AUTH_ERROR', { error: (error as Error).message });
  }
};

/**
 * Validate OAuth2 access token and return user context
 */
export const validateOAuth2AccessToken = async (
  accessToken: string
): Promise<{
  user: User;
  project: Project;
  organization: Organization;
  rights: Token['rights'];
} | null> => {
  try {
    const token = await OAuth2AccessTokenModel.findOne({
      accessToken,
    });

    if (!token) {
      return null;
    }

    // Check if token is expired
    if (new Date() > new Date(token.expiresIn)) {
      return null;
    }

    const { userId, clientId } = token;

    const user = await getUserById(String(userId));
    if (!user) {
      return null;
    }

    const result = await getClientAndProjectByClientId(clientId);
    if (!result) {
      return null;
    }

    const { project, rights } = result;

    const organization = await getOrganizationById(project.organizationId);
    if (!organization) {
      return null;
    }

    return {
      user,
      project,
      organization,
      rights,
    };
  } catch (error) {
    return null;
  }
};

/**
 * Get user from OAuth2 client (for client credentials flow)
 */
export const getUserFromOAuth2Client = async (
  clientId: string
): Promise<UserDocument | false> => {
  const response = await getClientAndProjectByClientId(clientId);

  if (!response) {
    return false;
  }

  const { userId } = response.oAuth2Access;

  if (!userId) {
    return false;
  }

  const user = await getUserById(String(userId));
  return user ?? false;
};

/**
 * Revoke OAuth2 access token
 */
export const revokeOAuth2AccessToken = async (
  accessToken: string
): Promise<boolean> => {
  try {
    const result = await OAuth2AccessTokenModel.deleteOne({
      accessToken,
    });

    return result.deletedCount > 0;
  } catch (error) {
    return false;
  }
};

/**
 * Clean up expired OAuth2 tokens
 */
export const cleanupExpiredTokens = async (): Promise<number> => {
  try {
    const result = await OAuth2AccessTokenModel.deleteMany({
      expiresIn: { $lt: new Date() },
    });

    return result.deletedCount;
  } catch (error) {
    return 0;
  }
};
