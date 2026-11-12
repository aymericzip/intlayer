import { createCliSessionToken } from '@services/cliSessionToken.service';
import { getProjectById } from '@services/project.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { mapOrganizationToAPI } from '@utils/mapper/organization';
import { mapProjectToAPI } from '@utils/mapper/project';
import { mapUserToAPI } from '@utils/mapper/user';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { OrganizationAPI } from '@/types/organization.types';
import type { ProjectAPI } from '@/types/project.types';
import type { UserAPI } from '@/types/user.types';

export type CreateCliSessionTokenResult = ResponseData<{
  token: string;
  expiresAt: Date;
}>;

type CliSessionMe = {
  project: ProjectAPI;
  user: UserAPI | null;
  organization: OrganizationAPI | null;
};

export type GetCliSessionMeResult = ResponseData<CliSessionMe>;

/**
 * Creates a short-lived (2h) CLI session token tied to the authenticated user's
 * current organization and project. Requires a valid browser session.
 */
export const createCliSessionTokenHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { user, organization, project } = request.session || {};

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  try {
    const result = await createCliSessionToken(
      user.id,
      String(organization.id),
      String(project.id)
    );

    return reply.send(
      formatResponse<{ token: string; expiresAt: Date }>({
        data: result,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Returns the user, organization and project bound to the CLI session.
 * Used by the CLI to verify the session token and check config consistency,
 * and by the local editor to show who is signed in.
 */
export const getCliSessionMeHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { project, user, organization } = request.session || {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  try {
    const projectData = await getProjectById(String(project.id));

    if (!projectData) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PROJECT_NOT_DEFINED'
      );
    }

    return reply.send(
      formatResponse<CliSessionMe>({
        data: {
          project: mapProjectToAPI(projectData),
          user: mapUserToAPI(user ?? null),
          organization: mapOrganizationToAPI(organization ?? null),
        },
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
