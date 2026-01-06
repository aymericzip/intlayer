import * as gitlabService from '@services/gitlab.service';
import { getGitLabTokenFromUser } from '@services/gitlab.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';

export type GitLabGetAuthUrlQuerystring = {
  redirectUri: string;
  instanceUrl?: string;
  login?: string;
};

export type GitLabGetAuthUrlResult = ResponseData<{
  authUrl: string;
}>;

export const getAuthUrl = async (
  request: FastifyRequest<{ Querystring: GitLabGetAuthUrlQuerystring }>,
  reply: FastifyReply
): Promise<void> => {
  const { redirectUri, instanceUrl, login } = request.query;

  if (!redirectUri) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'GITLAB_REDIRECT_URI_MISSING'
    );
  }

  try {
    const authUrl = gitlabService.getAuthorizationUrl(
      redirectUri,
      instanceUrl,
      login
    );
    const responseData = formatResponse<{ authUrl: string }>({
      data: { authUrl },
    });
    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GitLabAuthCallbackBody = {
  code: string;
  redirectUri: string;
  instanceUrl?: string;
};

export type GitLabAuthCallbackResult = ResponseData<{
  token: string;
}>;

export const authCallback = async (
  request: FastifyRequest<{ Body: GitLabAuthCallbackBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { code, redirectUri, instanceUrl } = request.body;

  if (!code || !redirectUri) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'GITLAB_CODE_MISSING'
    );
  }

  try {
    const token = await gitlabService.exchangeCodeForToken(
      code,
      redirectUri,
      instanceUrl
    );
    const responseData = formatResponse<{ token: string }>({
      data: { token },
    });
    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GitLabListProjectsQuerystring = {
  token?: string;
  instanceUrl?: string;
};

export type GitLabListProjectsResult = ResponseData<
  gitlabService.GitLabProject[]
>;

export const listProjects = async (
  request: FastifyRequest<{ Querystring: GitLabListProjectsQuerystring }>,
  reply: FastifyReply
): Promise<void> => {
  const { token, instanceUrl } = request.query;
  const userId = request.locals?.user?.id;

  try {
    let accessToken: string | undefined = token;

    if (!accessToken && userId) {
      accessToken = (await getGitLabTokenFromUser(String(userId))) ?? undefined;
    }

    if (!accessToken) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'GITLAB_TOKEN_MISSING'
      );
    }

    const projects = await gitlabService.getUserProjects(
      accessToken,
      instanceUrl
    );
    const responseData = formatResponse<gitlabService.GitLabProject[]>({
      data: projects,
    });
    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GitLabCheckConfigBody = {
  token?: string;
  projectId: number;
  branch?: string;
  instanceUrl?: string;
};

export type GitLabCheckConfigResult = ResponseData<{
  hasConfig: boolean;
  configPaths: string[];
}>;

/**
 * Check if intlayer.config.ts (or candidates) exists in a GitLab repository
 */
export const checkConfig = async (
  request: FastifyRequest<{ Body: GitLabCheckConfigBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { token, projectId, branch = 'main', instanceUrl } = request.body;
  const userId = request.locals?.user?.id;

  try {
    let accessToken: string | undefined = token;

    if (!accessToken && userId) {
      accessToken = (await getGitLabTokenFromUser(String(userId))) ?? undefined;
    }

    if (!accessToken || !projectId) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'GITLAB_CHECK_CONFIG_MISSING_PARAMS'
      );
    }

    const configPaths = await gitlabService.checkIntlayerConfig(
      accessToken,
      projectId,
      branch,
      instanceUrl
    );

    const responseData = formatResponse<{
      hasConfig: boolean;
      configPaths: string[];
    }>({
      data: {
        hasConfig: configPaths.length > 0,
        configPaths: configPaths,
      },
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GitLabGetConfigFileBody = {
  token?: string;
  projectId: number;
  branch?: string;
  path?: string;
  instanceUrl?: string;
};

export type GitLabGetConfigFileResult = ResponseData<{
  content: string;
}>;

export const getConfigFile = async (
  request: FastifyRequest<{ Body: GitLabGetConfigFileBody }>,
  reply: FastifyReply
): Promise<void> => {
  const {
    token,
    projectId,
    branch = 'main',
    path = 'intlayer.config.ts',
    instanceUrl,
  } = request.body;
  const userId = request.locals?.user?.id;

  try {
    let accessToken: string | undefined = token;

    if (!accessToken && userId) {
      accessToken = (await getGitLabTokenFromUser(String(userId))) ?? undefined;
    }

    if (!accessToken || !projectId) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'GITLAB_GET_CONFIG_FILE_MISSING_PARAMS'
      );
    }

    const content = await gitlabService.getRepositoryFileContents(
      accessToken,
      projectId,
      path,
      branch,
      instanceUrl
    );

    if (!content) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'GITLAB_CONFIG_FILE_NOT_FOUND'
      );
    }

    const responseData = formatResponse<{ content: string }>({
      data: { content },
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
