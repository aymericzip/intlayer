import { logger } from '@logger/index';
import { ProjectModel } from '@models/project.model';
import type { ObjectId } from 'mongoose';
import { generateClientCredentials } from './auth2.service';
import type {
  AccessKeyData,
  OAuth2Access,
  OAuth2AccessData,
  Project,
} from '@/types/project.types';
import { User } from '@/types/user.types';
import { getProjectById } from './project.service';

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
    const errorMessage =
      'The project was not updated. Check that the project ID is correct.';

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const updatedProject = await getProjectById(projectId);

  const newAccessKeyId = updatedProject.oAuth2Access.find(
    (access) => access.clientId === clientId
  );

  if (!newAccessKeyId) {
    const errorMessage =
      'An error occurred while adding the access key. Check that the project ID is correct.';

    logger.error(errorMessage);
    throw new Error(errorMessage);
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
    const errorMessage =
      'The access key was not found. Check that the client ID is correct.';

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const result = await ProjectModel.updateOne(
    { 'oAuth2Access.clientId': clientId },
    { $pull: { oAuth2Access: { clientId } } }
  );

  if (result.modifiedCount === 0) {
    const errorMessage =
      'The access key was not deleted. Check that the client ID is correct.';

    logger.error(errorMessage);
    throw new Error(errorMessage);
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
    const errorMessage =
      'The access key was not found. Check that the client ID and project ID are correct.';

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const projectAccess = project.oAuth2Access.find(
    (access) => access.clientId === clientId
  );

  if (!projectAccess) {
    const errorMessage =
      'The access key was not found. Check that the client ID is correct.';

    logger.error(errorMessage);
    throw new Error(errorMessage);
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
    const errorMessage =
      'The access key was not updated. Check that the client ID is correct.';

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const updatedProject = await getProjectById(projectId);

  const newAccessKeyId = updatedProject.oAuth2Access.find(
    (access) => access.clientId === projectAccess.clientId
  );

  if (!newAccessKeyId) {
    const errorMessage =
      'An error occurred while adding the access key. Check that the project ID is correct.';

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return newAccessKeyId;
};
