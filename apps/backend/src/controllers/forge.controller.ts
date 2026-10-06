import type {
  ForgeRepository,
  ForgeRoutes,
} from '@intlayer/backend-contract/gitProviders';
import type { ForgeService } from '@services/forge.service';
import type {
  ContractHandlers,
  ContractRequest,
} from '@utils/contract/registerContractRoutes';
import { type AppError, ErrorHandler } from '@utils/errors';
import type { ErrorCodes } from '@utils/errors/errorCodes';
import { formatResponse } from '@utils/responseData';
import type { FastifyReply } from 'fastify';

/** Error-code prefix of a forge (`CODEBERG_TOKEN_MISSING`, …). */
type ForgeErrorPrefix = 'CODEBERG' | 'GITEE';

type ForgeErrorSuffix =
  | 'TOKEN_MISSING'
  | 'CHECK_CONFIG_MISSING_PARAMS'
  | 'GET_CONFIG_FILE_MISSING_PARAMS'
  | 'CONFIG_FILE_NOT_FOUND';

/**
 * Route handlers of a Gitea-compatible forge. The token defaults to the one
 * of the account the signed-in user linked.
 */
export const createForgeController = (
  service: ForgeService,
  errorPrefix: ForgeErrorPrefix
): ContractHandlers<ForgeRoutes> => {
  const getErrorCode = (suffix: ForgeErrorSuffix): ErrorCodes =>
    `${errorPrefix}_${suffix}` satisfies `${ForgeErrorPrefix}_${ForgeErrorSuffix}` &
      ErrorCodes;

  const resolveAccessToken = async (
    token: string | undefined,
    userId: unknown
  ): Promise<string | undefined> =>
    token ??
    (userId
      ? ((await service.getTokenFromUser(String(userId))) ?? undefined)
      : undefined);

  const listRepos = async (
    request: ContractRequest<ForgeRoutes['listRepos']>,
    reply: FastifyReply
  ): Promise<void> => {
    try {
      const accessToken = await resolveAccessToken(
        request.query.token,
        request.session?.user?.id
      );

      if (!accessToken) {
        return ErrorHandler.handleGenericErrorResponse(
          reply,
          getErrorCode('TOKEN_MISSING')
        );
      }

      const repositories = await service.getUserRepositories(accessToken);

      return reply.send(
        formatResponse<ForgeRepository[]>({ data: repositories })
      );
    } catch (error) {
      return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    }
  };

  const checkConfig = async (
    request: ContractRequest<ForgeRoutes['checkConfig']>,
    reply: FastifyReply
  ): Promise<void> => {
    const { token, owner, repository, branch = 'main' } = request.body;

    try {
      const accessToken = await resolveAccessToken(
        token,
        request.session?.user?.id
      );

      if (!accessToken || !owner || !repository) {
        return ErrorHandler.handleGenericErrorResponse(
          reply,
          getErrorCode('CHECK_CONFIG_MISSING_PARAMS')
        );
      }

      const configPaths = await service.checkIntlayerConfig(
        accessToken,
        owner,
        repository,
        branch
      );

      return reply.send(
        formatResponse<{ hasConfig: boolean; configPaths: string[] }>({
          data: { hasConfig: configPaths.length > 0, configPaths },
        })
      );
    } catch (error) {
      return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    }
  };

  const getConfigFile = async (
    request: ContractRequest<ForgeRoutes['getConfigFile']>,
    reply: FastifyReply
  ): Promise<void> => {
    const {
      token,
      owner,
      repository,
      branch = 'main',
      path = 'intlayer.config.ts',
    } = request.body;

    try {
      const accessToken = await resolveAccessToken(
        token,
        request.session?.user?.id
      );

      if (!accessToken || !owner || !repository) {
        return ErrorHandler.handleGenericErrorResponse(
          reply,
          getErrorCode('GET_CONFIG_FILE_MISSING_PARAMS')
        );
      }

      const content = await service.getRepositoryFileContents(
        accessToken,
        owner,
        repository,
        path,
        branch
      );

      if (!content) {
        return ErrorHandler.handleGenericErrorResponse(
          reply,
          getErrorCode('CONFIG_FILE_NOT_FOUND')
        );
      }

      return reply.send(
        formatResponse<{ content: string }>({ data: { content } })
      );
    } catch (error) {
      return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    }
  };

  return { listRepos, checkConfig, getConfigFile };
};
