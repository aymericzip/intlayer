import * as githubService from '@services/github.service';
import { getGitHubTokenFromUser } from '@services/github.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';

export type GitHubGetAuthUrlQuerystring = {
  redirectUri: string;
  login?: string;
};

export type GitHubGetAuthUrlResult = ResponseData<{
  authUrl: string;
}>;

export const getAuthUrl = async (
  request: FastifyRequest<{ Querystring: GitHubGetAuthUrlQuerystring }>,
  reply: FastifyReply
): Promise<void> => {
  const { redirectUri, login } = request.query;

  if (!redirectUri) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'GITHUB_REDIRECT_URI_MISSING'
    );
  }

  try {
    const authUrl = githubService.getAuthorizationUrl(redirectUri, login);
    const responseData = formatResponse<{ authUrl: string }>({
      data: { authUrl },
    });
    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GitHubAuthCallbackBody = {
  code: string;
};

export type GitHubAuthCallbackResult = ResponseData<{
  token: string;
}>;

export const authCallback = async (
  request: FastifyRequest<{ Body: GitHubAuthCallbackBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { code } = request.body;

  if (!code) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'GITHUB_CODE_MISSING'
    );
  }

  try {
    const token = await githubService.exchangeCodeForToken(code);
    const responseData = formatResponse<{ token: string }>({
      data: { token },
    });
    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GitHubListReposQuerystring = {
  token?: string;
};

export type GitHubListReposResult = ResponseData<
  githubService.GitHubRepository[]
>;

export const listRepos = async (
  request: FastifyRequest<{ Querystring: GitHubListReposQuerystring }>,
  reply: FastifyReply
): Promise<void> => {
  const { token } = request.query;
  const userId = request.locals?.user?.id;

  try {
    let accessToken: string | undefined = token;

    if (!accessToken && userId) {
      accessToken = (await getGitHubTokenFromUser(String(userId))) ?? undefined;
    }

    if (!accessToken) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'GITHUB_TOKEN_MISSING'
      );
    }

    const repos = await githubService.getUserRepos(accessToken);
    const responseData = formatResponse<githubService.GitHubRepository[]>({
      data: repos,
    });
    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GitHubCheckConfigBody = {
  token?: string;
  owner: string;
  repository: string;
  branch?: string;
};

export type GitHubCheckConfigResult = ResponseData<{
  hasConfig: boolean;
  configPaths: string[]; // Changed from single path to array
}>;

/**
 * Check if intlayer.config.ts (or candidates) exists in a repository
 */
export const checkConfig = async (
  request: FastifyRequest<{ Body: GitHubCheckConfigBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { token, owner, repository, branch = 'main' } = request.body;
  const userId = request.locals?.user?.id;

  try {
    let accessToken: string | undefined = token;

    if (!accessToken && userId) {
      accessToken = (await getGitHubTokenFromUser(String(userId))) ?? undefined;
    }

    if (!accessToken || !owner || !repository) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'GITHUB_CHECK_CONFIG_MISSING_PARAMS'
      );
    }

    // Returns array of strings
    const configPaths = await githubService.checkIntlayerConfig(
      accessToken,
      owner,
      repository,
      branch
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

export type GitHubGetConfigFileBody = {
  token?: string;
  owner: string;
  repository: string;
  branch?: string;
  path?: string;
};

export type GitHubGetConfigFileResult = ResponseData<{
  content: string;
}>;

export const getConfigFile = async (
  request: FastifyRequest<{ Body: GitHubGetConfigFileBody }>,
  reply: FastifyReply
): Promise<void> => {
  const {
    token,
    owner,
    repository,
    branch = 'main',
    path = 'intlayer.config.ts',
  } = request.body;
  const userId = request.locals?.user?.id;

  try {
    let accessToken: string | undefined = token;

    if (!accessToken && userId) {
      accessToken = (await getGitHubTokenFromUser(String(userId))) ?? undefined;
    }

    if (!accessToken || !owner || !repository) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'GITHUB_GET_CONFIG_FILE_MISSING_PARAMS'
      );
    }

    const content = await githubService.getRepositoryFileContents(
      accessToken,
      owner,
      repository,
      path,
      branch
    );

    if (!content) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'GITHUB_CONFIG_FILE_NOT_FOUND'
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
