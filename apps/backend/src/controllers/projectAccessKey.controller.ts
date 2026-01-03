import { sendEmail } from '@services/email.service';
import * as projectAccessKeyService from '@services/projectAccessKey.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { hasPermission, intersectPermissions } from '@utils/permissions';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import type { AccessKeyData, OAuth2Access } from '@/types/project.types';

export type AddNewAccessKeyBody = AccessKeyData;
export type AddNewAccessKeyResponse = ResponseData<OAuth2Access>;

/**
 * Adds a new access key to a project.
 */
export const addNewAccessKey = async (
  request: FastifyRequest<{ Body: AddNewAccessKeyBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, roles, permissions } = request.locals || {};
  const { grants, name, expiresAt } = request.body;

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.locals,
      targetProjectIds: [project.id],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const filteredPermisions = intersectPermissions(permissions || [], grants);

  try {
    const newAccessKey = await projectAccessKeyService.addNewAccessKey(
      {
        name,
        expiresAt,
        grants: filteredPermisions,
      },
      project.id,
      user
    );

    const responseData = formatResponse<OAuth2Access>({
      message: t({
        en: 'Access key created successfully',
        es: 'Clave de acceso creada con éxito',
        fr: "Clé d'accès créée avec succès",
      }),
      description: t({
        en: 'The access key has been created successfully',
        es: 'La clave de acceso ha sido creada con éxito',
        fr: "La clé d'accès a été créée avec succès",
      }),
      data: newAccessKey,
    });

    sendEmail({
      type: 'oAuthTokenCreated',
      to: user.email,
      username: user.name,
      applicationName: newAccessKey.name ?? newAccessKey.clientId,
      scopes: newAccessKey.grants,
      tokenDetailsUrl: `${process.env.APP_URL}/oauth2/token`,
      securityLogUrl: `${process.env.APP_URL}/security-log`,
      supportUrl: `${process.env.APP_URL}/support`,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type DeleteAccessKeyBody = { clientId: string };
export type DeleteAccessKeyResponse = ResponseData<null>;

/**
 * Deletes an access key from a project.
 */
export const deleteAccessKey = async (
  request: FastifyRequest<{ Body: DeleteAccessKeyBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, roles } = request.locals || {};
  const { clientId } = request.body;

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!clientId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'CLIENT_ID_NOT_FOUND'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.locals,
      targetProjectIds: [project.id],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const deletedAccessKey = await projectAccessKeyService.deleteAccessKey(
      clientId,
      project,
      user.id
    );

    if (!deletedAccessKey) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ACCESS_KEY_NOT_FOUND',
        {
          clientId,
        }
      );
    }

    const responseData = formatResponse<null>({
      message: t({
        en: 'Access key deleted successfully',
        es: 'Clave de acceso eliminada con éxito',
        fr: "Clé d'accès supprimée avec succès",
      }),
      description: t({
        en: 'The access key has been deleted successfully',
        es: 'La clave de acceso ha sido eliminada con éxito',
        fr: "La clé d'accès a été supprimée avec succès",
      }),
      data: null,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type RefreshAccessKeyBody = { clientId: string };
export type RefreshAccessKeyResponse = ResponseData<OAuth2Access>;

/**
 * Refreshes an access key from a project.
 */
export const refreshAccessKey = async (
  request: FastifyRequest<{ Body: RefreshAccessKeyBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, roles } = request.locals || {};
  const { clientId } = request.body;

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!clientId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'CLIENT_ID_NOT_FOUND'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.locals,
      targetProjectIds: [project?.id],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const newAccessKey = await projectAccessKeyService.refreshAccessKey(
      clientId,
      project?.id,
      user?.id
    );

    const responseData = formatResponse<OAuth2Access>({
      message: t({
        en: 'Access key refreshed successfully',
        es: 'Clave de acceso actualizada con éxito',
        fr: "Clé d'accès actualisée avec succès",
      }),
      description: t({
        en: 'The access key has been refreshed successfully',
        es: 'La clave de acceso ha sido actualizada con éxito',
        fr: "La clé d'accès a été actualisée avec succès",
      }),
      data: newAccessKey,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
