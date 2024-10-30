import { ProjectModel } from '@models/project.model';
import { GenericError } from '@utils/errors';
import type { ObjectId } from 'mongoose';
import { generateClientCredentials } from './oAuth2.service';
import { getProjectById } from './project.service';
import type {
  AccessKeyData,
  OAuth2Access,
  OAuth2AccessData,
  Project,
} from '@/types/project.types';
import { User } from '@/types/user.types';

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
  projectId: string | ObjectId,
  user: User
): Promise<OAuth2Access> => {
  const { clientId, clientSecret } = generateClientCredentials();

  const newAccessKey: OAuth2AccessData = {
    ...accessKeyData,
    clientId,
    clientSecret,
    userId: user._id,
    accessToken: [],
  };

  const result = await ProjectModel.updateOne(
    { _id: projectId },
    { $push: { oAuth2Access: newAccessKey } }
  );

  if (result.modifiedCount === 0) {
    throw new GenericError('ACCESS_KEY_CREATION_FAILED', {
      accessKeyData,
      projectId,
      userId: user._id,
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
      userId: user._id,
    });
  }

  return newAccessKeyId;
};

export const deleteAccessKey = async (
  clientId: string | ObjectId,
  project: Project
) => {
  const projectAccess = project.oAuth2Access.find(
    (access) => access.clientId === clientId
  );

  if (!projectAccess) {
    throw new GenericError('ACCESS_KEY_NOT_FOUND', {
      clientId,
      projectId: project._id,
    });
  }

  const result = await ProjectModel.updateOne(
    { 'oAuth2Access.clientId': clientId },
    { $pull: { oAuth2Access: { clientId } } }
  );

  if (result.modifiedCount === 0) {
    throw new GenericError('ACCESS_KEY_DELETION_FAILED', {
      clientId,
      projectId: project._id,
    });
  }

  return projectAccess;
};

export const refreshAccessKey = async (
  clientId: string | ObjectId,
  projectId: string | ObjectId
): Promise<OAuth2Access> => {
  const project = await ProjectModel.findOne({
    _id: projectId,
    'oAuth2Access.clientId': clientId,
  });

  if (!project) {
    throw new GenericError('PROJECT_NOT_FOUND', {
      clientId,
      projectId,
    });
  }

  const projectAccess = project.oAuth2Access.find(
    (access) => access.clientId === clientId
  );

  if (!projectAccess) {
    throw new GenericError('ACCESS_KEY_NOT_FOUND', {
      clientId,
      projectId: project._id,
    });
  }

  const { clientSecret } = generateClientCredentials();

  const result = await ProjectModel.updateOne(
    { 'oAuth2Access.clientId': clientId },
    {
      $set: {
        'oAuth2Access.$.clientId': projectAccess.clientId,
        'oAuth2Access.$.clientSecret': clientSecret,
      },
    }
  );

  if (result.modifiedCount === 0) {
    throw new GenericError('ACCESS_KEy_UPDATE_FAILED', {
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
    });
  }

  return newAccessKeyId;
};
