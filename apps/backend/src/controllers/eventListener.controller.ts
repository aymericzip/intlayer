import type { DictionaryAPI } from '@/types/dictionary.types';
import { logger } from '@logger';
import type { ResponseWithInformation } from '@utils/auth/getAuth';
import { ErrorHandler } from '@utils/errors';
import type { Request, Response } from 'express';

export type Object = 'DICTIONARY';
export type Status = 'ADDED' | 'UPDATED' | 'DELETED' | 'CREATED';

export type MessageEventData = {
  object: Object;
  status: Status;
  data: any;
};

let clients: Array<{ id: number; projectId: string; res: Response }> = [];
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
      client.res.write(`data: ${JSON.stringify(data)}\n\n`);
      client.res.flush?.(); // Ensure the data is sent immediately
    }
  });
};

export type CheckDictionaryChangeSSEParams = { accessToken: string };

/**
 * SSE to check the email verification status
 */
export const listenChangeSSE = async (
  req: Request<CheckDictionaryChangeSSEParams, any, any>,
  res: ResponseWithInformation
) => {
  const { accessToken } = req.params;

  if (!accessToken) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_AUTHENTICATED');
    return;
  }

  if (clients.length >= MAX_SSE_CONNECTIONS) {
    ErrorHandler.handleGenericErrorResponse(res, 'TOO_MANY_CONNECTIONS');
    return;
  }

  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // For Nginx buffering

  // Send initial data to ensure the connection is open
  res.write(':\n\n'); // Comment to keep connection alive
  res.flushHeaders?.();

  const clientId = Date.now();

  // Add client to the list
  const newClient = {
    id: clientId,
    projectId: String((res.locals.session as any).session.activeProjectId),
    res,
  };
  clients.push(newClient);

  logger.info(
    `New client connected to SSE. Total clients: ${clients.length ?? 0}`
  );

  // Remove client on connection close
  req.on('close', () => {
    clients = clients.filter((client) => client.id !== clientId);
  });
};
