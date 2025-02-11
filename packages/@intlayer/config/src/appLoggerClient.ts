import { getConfiguration } from './client';
import { type Logger, logger } from './logger';

export const appLogger: Logger = (content, details) =>
  logger(content, {
    ...(details ?? {}),
    config: { ...getConfiguration().log, ...(details?.config ?? {}) },
  });
