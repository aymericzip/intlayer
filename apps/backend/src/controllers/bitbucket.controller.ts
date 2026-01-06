import * as bitbucketService from '@services/bitbucket.service';
import { getBitbucketTokenFromUser } from '@services/bitbucket.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';

export type BitbucketGetAuthUrlQuerystring = {
  redirectUri: string;
};

export type BitbucketGetAuthUrlResult = ResponseData<{
  authUrl: string;
}>;

export const getAuthUrl = async (
  request: FastifyRequest<{ Querystring: BitbucketGetAuthUrlQuerystring }>,
  reply: FastifyReply
): Promise<void> => {
  const { redirectUri } = request.query;

  if (!redirectUri) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'BITBUCKET_REDIRECT_URI_MISSING'
    );
  }

  try {
    const authUrl = bitbucketService.getAuthorizationUrl(redirectUri);
    const responseData = formatResponse<{ authUrl: string }>({
      data: { authUrl },
    });
    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type BitbucketAuthCallbackBody = {
  code: string;
};

export type BitbucketAuthCallbackResult = ResponseData<{
  token: string;
}>;

export const authCallback = async (
  request: FastifyRequest<{ Body: BitbucketAuthCallbackBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { code } = request.body;

  if (!code) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'BITBUCKET_CODE_MISSING'
    );
  }

  try {
    const token = await bitbucketService.exchangeCodeForToken(code);
    const responseData = formatResponse<{ token: string }>({
      data: { token },
    });
    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type BitbucketListReposQuerystring = {
  token?: string;
};

export type BitbucketListReposResult = ResponseData<
  bitbucketService.BitbucketRepository[]
>;

export const listRepos = async (
  request: FastifyRequest<{ Querystring: BitbucketListReposQuerystring }>,
  reply: FastifyReply
): Promise<void> => {
  const { token } = request.query;
  const userId = request.locals?.user?.id;

  try {
    let accessToken: string | undefined = token;

    if (!accessToken && userId) {
      accessToken =
        (await getBitbucketTokenFromUser(String(userId))) ?? undefined;
    }

    if (!accessToken) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'BITBUCKET_TOKEN_MISSING'
      );
    }

    const repos = await bitbucketService.getUserRepositories(accessToken);
    const responseData = formatResponse<bitbucketService.BitbucketRepository[]>(
      {
        data: repos,
      }
    );
    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type BitbucketCheckConfigBody = {
  token?: string;
  workspace: string;
  repoSlug: string;
  branch?: string;
};

export type BitbucketCheckConfigResult = ResponseData<{
  hasConfig: boolean;
  configPaths: string[];
}>;

/**
 * Check if intlayer.config.ts (or candidates) exists in a Bitbucket repository
 */
export const checkConfig = async (
  request: FastifyRequest<{ Body: BitbucketCheckConfigBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { token, workspace, repoSlug, branch = 'main' } = request.body;
  const userId = request.locals?.user?.id;

  try {
    let accessToken: string | undefined = token;

    if (!accessToken && userId) {
      accessToken =
        (await getBitbucketTokenFromUser(String(userId))) ?? undefined;
    }

    if (!accessToken || !workspace || !repoSlug) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'BITBUCKET_CHECK_CONFIG_MISSING_PARAMS'
      );
    }

    const configPaths = await bitbucketService.checkIntlayerConfig(
      accessToken,
      workspace,
      repoSlug,
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

export type BitbucketGetConfigFileBody = {
  token?: string;
  workspace: string;
  repoSlug: string;
  branch?: string;
  path?: string;
};

export type BitbucketGetConfigFileResult = ResponseData<{
  content: string;
}>;

export const getConfigFile = async (
  request: FastifyRequest<{ Body: BitbucketGetConfigFileBody }>,
  reply: FastifyReply
): Promise<void> => {
  const {
    token,
    workspace,
    repoSlug,
    branch = 'main',
    path = 'intlayer.config.ts',
  } = request.body;
  const userId = request.locals?.user?.id;

  try {
    let accessToken: string | undefined = token;

    if (!accessToken && userId) {
      accessToken =
        (await getBitbucketTokenFromUser(String(userId))) ?? undefined;
    }

    if (!accessToken || !workspace || !repoSlug) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'BITBUCKET_GET_CONFIG_FILE_MISSING_PARAMS'
      );
    }

    const content = await bitbucketService.getRepositoryFileContents(
      accessToken,
      workspace,
      repoSlug,
      path,
      branch
    );

    if (!content) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'BITBUCKET_CONFIG_FILE_NOT_FOUND'
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
