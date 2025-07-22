import type {
  AccessKeyData,
  OAuth2Access,
  OAuth2AccessData,
  Project,
  Rights,
  TokenRights,
} from '@/types/project.types';
import type { User } from '@/types/user.types';
import { ProjectModel } from '@models/project.model';
import { GenericError } from '@utils/errors';
import type { Types } from 'mongoose';
import { getProjectById } from './project.service';

const generateClientCredentials = () => {
  return {
    clientId: crypto.randomUUID(),
    clientSecret: crypto.randomUUID(),
  };
};

/**
 * Adds a new access key to a project.
 *
 * @param accessKeyData - The access key data.
 * @param projectId - The ID of the project to add the access key to.
 * @param user - The user adding the access key.
 * @returns The new access key.
 *
 */
export const addNewAccessKey = async (
  accessKeyData: AccessKeyData,
  projectId: string | Types.ObjectId,
  user: User,
  organizationRights: Rights,
  projectRights: Rights,
  dictionaryRights: Rights
): Promise<OAuth2Access> => {
  const { clientId, clientSecret } = generateClientCredentials();

  const newAccessKey: OAuth2AccessData = {
    ...accessKeyData,
    clientId,
    clientSecret,
    userId: user.id,
    accessToken: [],
    rights: restrictAccessKeyRights(
      accessKeyData,
      organizationRights,
      projectRights,
      dictionaryRights
    ),
  };

  const result = await ProjectModel.updateOne(
    { _id: projectId },
    { $push: { oAuth2Access: newAccessKey } }
  );

  if (result.modifiedCount === 0) {
    throw new GenericError('ACCESS_KEY_CREATION_FAILED', {
      accessKeyData,
      projectId,
      userId: user.id,
    });
  }

  const updatedProject = await getProjectById(projectId);

  const newAccessKeyId = updatedProject.oAuth2Access.find(
    (access) => access.clientId === clientId
  );

  if (!newAccessKeyId) {
    throw new GenericError('ACCESS_KEY_CREATION_FAILED', {
      accessKeyData,
      projectId,
      userId: user.id,
    });
  }

  return newAccessKeyId;
};

export const deleteAccessKey = async (
  clientId: string | Types.ObjectId,
  project: Project,
  userId: string | Types.ObjectId
) => {
  const projectAccess = project.oAuth2Access.find(
    (access) =>
      access.clientId === clientId && String(access.userId) === String(userId)
  );

  if (!projectAccess) {
    throw new GenericError('ACCESS_KEY_NOT_FOUND', {
      clientId,
      projectId: project.id,
    });
  }

  const result = await ProjectModel.updateOne(
    {
      'oAuth2Access.clientId': clientId,
      'oAuth2Access.userId': String(userId),
    },
    { $pull: { oAuth2Access: { clientId } } }
  );

  if (result.modifiedCount === 0) {
    throw new GenericError('ACCESS_KEY_DELETION_FAILED', {
      clientId,
      projectId: project.id,
    });
  }

  return projectAccess;
};

export const refreshAccessKey = async (
  clientId: string | Types.ObjectId,
  projectId: string | Types.ObjectId,
  userId: string | Types.ObjectId
): Promise<OAuth2Access> => {
  const project = await ProjectModel.findOne({
    _id: projectId,
    'oAuth2Access.clientId': clientId,
    'oAuth2Access.userId': String(userId),
  });

  if (!project) {
    throw new GenericError('PROJECT_NOT_FOUND', {
      clientId,
      projectId,
      userId,
    });
  }

  const projectAccess = project.oAuth2Access.find(
    (access) => access.clientId === clientId
  );

  if (!projectAccess) {
    throw new GenericError('ACCESS_KEY_NOT_FOUND', {
      clientId,
      projectId: project.id,
    });
  }

  const { clientSecret } = generateClientCredentials();

  const result = await ProjectModel.updateOne(
    {
      'oAuth2Access.clientId': clientId,
      'oAuth2Access.userId': String(userId),
    },
    {
      $set: {
        'oAuth2Access.$.clientId': projectAccess.clientId,
        'oAuth2Access.$.clientSecret': clientSecret,
      },
    }
  );

  if (result.modifiedCount === 0) {
    throw new GenericError('ACCESS_KEY_UPDATE_FAILED', {
      clientId,
      projectId,
    });
  }

  const updatedProject = await getProjectById(projectId);

  const newAccessKeyId = updatedProject.oAuth2Access.find(
    (access) => access.clientId === projectAccess.clientId
  );

  if (!newAccessKeyId) {
    throw new GenericError('ACCESS_KEY_CREATION_FAILED', {
      accessKeyData: updatedProject.oAuth2Access,
      projectId,
      userId,
    });
  }

  return newAccessKeyId;
};

const restrictRights = (givenRights: Rights, userRights: Rights): Rights => {
  const restrictedRights: Rights = {} as Rights;

  for (const key in givenRights) {
    if (Object.prototype.hasOwnProperty.call(givenRights, key)) {
      restrictedRights[key as keyof Rights] =
        givenRights[key as keyof Rights] && userRights[key as keyof Rights];
    }
  }

  return restrictedRights;
};

const restrictAccessKeyRights = (
  accessKey: AccessKeyData,
  organizationsRights: Rights,
  projectRights: Rights,
  dictionaryRights: Rights
): TokenRights => ({
  dictionary: restrictRights(accessKey.rights.dictionary, dictionaryRights),
  project: restrictRights(accessKey.rights.project, projectRights),
  organization: restrictRights(
    accessKey.rights.organization,
    organizationsRights
  ),
});
