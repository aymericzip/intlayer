import { getConfiguration } from './client';
import { Logger, logger } from './logger';

export const appLogger: Logger = (content, details) =>
  logger(content, {
    ...(details ?? {}),
    config: { ...getConfiguration().log, ...(details?.config ?? {}) },
  });
