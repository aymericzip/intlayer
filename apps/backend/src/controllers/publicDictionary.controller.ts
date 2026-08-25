import * as dictionaryService from '@services/dictionary.service';
import { verifyPublicBrowserTokenScope } from '@utils/crypto/publicBrowserToken';
import { type AppError, ErrorHandler } from '@utils/errors';
import { mapDictionaryToAPI } from '@utils/mapper/dictionary';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { DictionaryAPI } from '@/types/dictionary.types';

/** Hard cap on keys accepted per request, so one call cannot scan the project. */
const MAX_KEYS_PER_REQUEST = 100;

export type GetPublicDictionariesQuery = {
  /** Comma-separated dictionary keys to fetch. */
  keys?: string;
};

export type GetPublicDictionariesResult = ResponseData<DictionaryAPI[]>;
export type GetPublicDictionaryKeysResult = ResponseData<string[]>;

/**
 * Resolves the project a public browser token grants `dictionary:read` on.
 *
 * Returns `null` when the request carries no such token — the caller then
 * answers with a generic unauthorized error, never revealing whether the
 * project exists.
 */
const resolvePublicProjectId = (request: FastifyRequest): string | null => {
  const bearerToken = request.headers.authorization
    ?.match(/^Bearer\s+(.+)$/i)?.[1]
    ?.trim();

  return (
    verifyPublicBrowserTokenScope(bearerToken, 'dictionary:read')?.projectId ??
    null
  );
};

/**
 * Public — returns the dictionary keys published for the token's project.
 *
 * Lets a browser-only app discover its content at runtime without a server
 * route: the page holds just the public `clientId`, exchanges it for a browser
 * token, and reads from here.
 *
 * Only the keys are exposed, which the rendered page already reveals.
 */
export const getPublicDictionaryKeys = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const projectId = resolvePublicProjectId(request);

  if (!projectId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'INVALID_ACCESS_TOKEN'
    );
  }

  try {
    const dictionaries = await dictionaryService.findDictionaries({
      projectIds: projectId,
    });

    return reply.status(200).send(
      formatResponse<string[]>({
        data: dictionaries.map((dictionary) => dictionary.key),
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Public — returns published dictionary content by key for the token's project.
 *
 * This is the content the app renders, so it is already public to anyone
 * viewing the page; serving it to the browser directly is what removes the need
 * for a server route or a server action.
 *
 * Writes are deliberately not available on this token: see
 * `PUBLIC_BROWSER_SCOPES`.
 */
export const getPublicDictionaries = async (
  request: FastifyRequest<{ Querystring: GetPublicDictionariesQuery }>,
  reply: FastifyReply
): Promise<void> => {
  const projectId = resolvePublicProjectId(request);

  if (!projectId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'INVALID_ACCESS_TOKEN'
    );
  }

  const keys = (request.query?.keys ?? '')
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean)
    .slice(0, MAX_KEYS_PER_REQUEST);

  if (keys.length === 0) {
    return reply
      .status(200)
      .send(formatResponse<DictionaryAPI[]>({ data: [] }));
  }

  try {
    const dictionaries = await dictionaryService.getDictionariesByKeys(
      keys,
      projectId
    );

    return reply.status(200).send(
      formatResponse<DictionaryAPI[]>({
        data: dictionaries.map((dictionary) => mapDictionaryToAPI(dictionary)),
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
