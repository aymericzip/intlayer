import { logger } from '@logger/index';
import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import {
  addNewAccessKey as addNewAccessKeyService,
  deleteAccessKey as deleteAccessKeyService,
  refreshAccessKey as refreshAccessKeyService,
} from '@services/projectAccessKey.service';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import { type ResponseData, formatResponse } from '@utils/responseData';
import type { Request } from 'express';
import type { AccessKeyData, OAuth2Access } from '@/types/project.types';

export type AddNewAccessKeyBody = AccessKeyData;
export type AddNewAccessKeyResponse = ResponseData<OAuth2Access>;

/**
 * Adds a new access key to a project.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns The new access key.
 */
export const addNewAccessKey = async (
  req: Request<AddNewAccessKeyBody>,
  res: ResponseWithInformation<AddNewAccessKeyResponse>
) => {
  const { user, project } = res.locals;

  if (!project) {
    const errorMessage = 'Project id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<OAuth2Access>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<OAuth2Access>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const newAccessKey = await addNewAccessKeyService(
      req.body,
      project._id,
      user
    );

    const responseData = formatResponse<OAuth2Access>({
      data: newAccessKey,
    });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<OAuth2Access>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type DeleteAccessKeyBody = { clientId: string };
export type DeleteAccessKeyResponse = ResponseData<null>;

/**
 * Deletes an access key from a project.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Response confirming the deletion.
 */
export const deleteAccessKey = async (
  req: Request,
  res: ResponseWithInformation<AddNewAccessKeyResponse>
) => {
  const { user, project } = res.locals;
  const { clientId } = req.body;

  if (!project) {
    const errorMessage = 'Project id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<OAuth2Access>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<null>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (!clientId) {
    const errorMessage = 'Client id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<null>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const deletedAccessKey = await deleteAccessKeyService(clientId, project);

    if (!deletedAccessKey) {
      const errorMessage = 'Access key not found';

      logger.error(errorMessage);

      const responseCode = HttpStatusCodes.NOT_FOUND_404;
      const responseData = formatResponse<null>({
        error: errorMessage,
        status: responseCode,
      });

      return res.status(responseCode).json(responseData);
    }

    const responseData = formatResponse<null>({
      data: null,
    });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<null>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};

export type RefreshAccessKeyBody = { clientId: string };
export type RefreshAccessKeyResponse = ResponseData<OAuth2Access>;

/**
 * Refreshes an access key from a project.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns The new access key.
 */
export const refreshAccessKey = async (
  req: Request<RefreshAccessKeyBody>,
  res: ResponseWithInformation<RefreshAccessKeyResponse>
) => {
  const { user, project } = res.locals;
  const { clientId } = req.body;

  if (!project) {
    const errorMessage = 'Project id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<OAuth2Access>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (!user) {
    const errorMessage = 'User not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<OAuth2Access>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  if (!clientId) {
    const errorMessage = 'Client id not found';

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.BAD_REQUEST_400;
    const responseData = formatResponse<OAuth2Access>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }

  try {
    const newAccessKey = await refreshAccessKeyService(clientId, project._id);

    const responseData = formatResponse<OAuth2Access>({
      data: newAccessKey,
    });

    return res.json(responseData);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    logger.error(errorMessage);

    const responseCode = HttpStatusCodes.INTERNAL_SERVER_ERROR_500;
    const responseData = formatResponse<OAuth2Access>({
      error: errorMessage,
      status: responseCode,
    });

    return res.status(responseCode).json(responseData);
  }
};
