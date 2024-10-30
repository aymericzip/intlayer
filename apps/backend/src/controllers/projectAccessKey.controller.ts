import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import * as projectAccessKeyService from '@services/projectAccessKey.service';
import { AppError, ErrorHandler } from '@utils/errors';
import { type ResponseData, formatResponse } from '@utils/responseData';
import type { NextFunction, Request } from 'express';
import type { AccessKeyData, OAuth2Access } from '@/types/project.types';

export type AddNewAccessKeyBody = AccessKeyData;
export type AddNewAccessKeyResponse = ResponseData<OAuth2Access>;

/**
 * Adds a new access key to a project.
 */
export const addNewAccessKey = async (
  req: Request<AddNewAccessKeyBody>,
  res: ResponseWithInformation<AddNewAccessKeyResponse>,
  _next: NextFunction
): Promise<void> => {
  const { user, project } = res.locals;

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_FOUND');
    return;
  }

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
    return;
  }

  try {
    const newAccessKey = await projectAccessKeyService.addNewAccessKey(
      req.body,
      project._id,
      user
    );

    const responseData = formatResponse<OAuth2Access>({
      data: newAccessKey,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type DeleteAccessKeyBody = { clientId: string };
export type DeleteAccessKeyResponse = ResponseData<null>;

/**
 * Deletes an access key from a project.
 */
export const deleteAccessKey = async (
  req: Request,
  res: ResponseWithInformation<AddNewAccessKeyResponse>,
  _next: NextFunction
): Promise<void> => {
  const { user, project } = res.locals;
  const { clientId } = req.body;

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_FOUND');
    return;
  }

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
    return;
  }

  if (!clientId) {
    ErrorHandler.handleGenericErrorResponse(res, 'CLIENT_ID_NOT_FOUND');
    return;
  }

  try {
    const deletedAccessKey = await projectAccessKeyService.deleteAccessKey(
      clientId,
      project
    );

    if (!deletedAccessKey) {
      ErrorHandler.handleGenericErrorResponse(res, 'ACCESS_KEY_NOT_FOUND', {
        clientId,
      });
      return;
    }

    const responseData = formatResponse<null>({
      data: null,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type RefreshAccessKeyBody = { clientId: string };
export type RefreshAccessKeyResponse = ResponseData<OAuth2Access>;

/**
 * Refreshes an access key from a project.
 */
export const refreshAccessKey = async (
  req: Request<RefreshAccessKeyBody>,
  res: ResponseWithInformation<RefreshAccessKeyResponse>,
  _next: NextFunction
): Promise<void> => {
  const { user, project } = res.locals;
  const { clientId } = req.body;

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_NOT_FOUND');
  }

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_FOUND');
  }

  if (!clientId) {
    ErrorHandler.handleGenericErrorResponse(res, 'CLIENT_ID_NOT_FOUND');
  }

  try {
    const newAccessKey = await projectAccessKeyService.refreshAccessKey(
      clientId,
      project!._id
    );

    const responseData = formatResponse<OAuth2Access>({
      data: newAccessKey,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
