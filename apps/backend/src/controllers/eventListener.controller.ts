import { logger } from '@logger';
import { ErrorHandler } from '@utils/errors';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { DictionaryAPI } from '@/types/dictionary.types';

export type Object = 'DICTIONARY';
export type Status = 'ADDED' | 'UPDATED' | 'DELETED' | 'CREATED';

export type MessageEventData = {
  object: Object;
  status: Status;
  data: any;
};

let clients: Array<{
  id: number;
  projectId: string;
  res: { raw: FastifyReply['raw'] };
}> = [];
const MAX_SSE_CONNECTIONS = 10;

export type SendDictionaryUpdateArg = {
  dictionary: DictionaryAPI;
  status: 'ADDED' | 'UPDATED' | 'DELETED' | 'CREATED';
};

export const sendDictionaryUpdate = (args: SendDictionaryUpdateArg[]) => {
  const projectIds = args.flatMap((arg) => arg.dictionary.projectIds);

  const filteredClients = clients.filter((client) =>
    projectIds.map((id) => String(id)).includes(String(client.projectId))
  );

  const data: MessageEventData[] = args.map((arg) => ({
    object: 'DICTIONARY',
    status: arg.status,
    data: arg.dictionary,
  }));

  process.nextTick(() => {
    for (const client of filteredClients) {
      client.res.raw.write(`data: ${JSON.stringify(data)}\n\n`);
    }
  });
};

export type CheckDictionaryChangeSSEParams = { accessToken: string };

/**
 * SSE to check the email verification status
 */
export const listenChangeSSE = async (
  request: FastifyRequest<{ Params: CheckDictionaryChangeSSEParams }>,
  reply: FastifyReply
) => {
  const { project } = request.locals || {};

  if (clients.length >= MAX_SSE_CONNECTIONS) {
    ErrorHandler.handleGenericErrorResponse(reply, 'TOO_MANY_CONNECTIONS');
    return;
  }

  // Set headers for SSE
  reply.raw.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  reply.raw.setHeader('Cache-Control', 'no-cache, no-transform');
  reply.raw.setHeader('Connection', 'keep-alive');
  reply.raw.setHeader('X-Accel-Buffering', 'no'); // For Nginx buffering

  // Send initial data to ensure the connection is open
  reply.raw.write(':\n\n'); // Comment to keep connection alive
  reply.raw.flushHeaders?.();

  const clientId = Date.now();

  // Add client to the list
  const newClient = {
    id: clientId,
    projectId: String(project?.id),
    res: { raw: reply.raw },
  };
  clients.push(newClient);

  logger.info(
    `New client connected to SSE. Total clients: ${clients.length ?? 0}`
  );

  // Remove client on connection close
  request.raw.on('close', () => {
    clients = clients.filter((client) => client.id !== clientId);
  });
};
