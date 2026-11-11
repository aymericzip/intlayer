import { getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import { HttpStatusCodes } from '@utils/httpStatusCodes';
import { formatResponse } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';

/** Levels the editor client may report at. */
const CLIENT_LOG_LEVELS = ['info', 'warn', 'error'] as const;

export type ClientLogLevel = (typeof CLIENT_LOG_LEVELS)[number];

export type ClientLogBody = {
  level: ClientLogLevel;
  message: string;
};

/** Longest message printed, to keep a runaway client from flooding the terminal. */
export const MAX_CLIENT_LOG_LENGTH = 2_000;

const envFileOptions = {
  env: process.env.NODE_ENV,
  envFile: process.env.ENV_FILE,
};

const isClientLogLevel = (level: unknown): level is ClientLogLevel =>
  CLIENT_LOG_LEVELS.includes(level as ClientLogLevel);

/**
 * Removes control characters (ANSI escapes included) so a reported message
 * cannot rewrite the terminal, and caps its length.
 */
export const sanitizeClientLogMessage = (message: string): string => {
  const printableMessage = message
    // oxlint-disable-next-line no-control-regex -- stripping control characters is the intent
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F-\u009F]/g, '')
    .trim();

  return printableMessage.length > MAX_CLIENT_LOG_LENGTH
    ? `${printableMessage.slice(0, MAX_CLIENT_LOG_LENGTH)}…`
    : printableMessage;
};

/**
 * Prints an error met by the editor client (application unreachable, frame
 * blocked by its framing policy…) in the editor server terminal, where the
 * developer is looking.
 */
export const logClientEvent = async (
  request: FastifyRequest<{ Body: Partial<ClientLogBody> | undefined }>,
  reply: FastifyReply
): Promise<void> => {
  const { level, message } = request.body ?? {};

  if (!isClientLogLevel(level) || typeof message !== 'string') {
    return reply.status(HttpStatusCodes.BAD_REQUEST_400).send(
      formatResponse<null>({
        error: {
          code: 'INVALID_CLIENT_LOG',
          title: 'Invalid log',
          message: `Expected { level: ${CLIENT_LOG_LEVELS.join(' | ')}, message: string }.`,
        },
        status: HttpStatusCodes.BAD_REQUEST_400,
      })
    );
  }

  const sanitizedMessage = sanitizeClientLogMessage(message);

  if (sanitizedMessage.length > 0) {
    getAppLogger(getConfiguration(envFileOptions))(sanitizedMessage, {
      level,
    });
  }

  return reply.status(HttpStatusCodes.NO_CONTENT_204).send();
};
