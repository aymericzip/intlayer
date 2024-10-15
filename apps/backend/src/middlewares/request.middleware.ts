import type { Request, NextFunction } from 'express';
import type { ResponseWithInformation } from './sessionAuth.middleware';
import { logger } from '@/logger';

export const logAPIRequestURL = (
  req: Request,
  res: ResponseWithInformation,
  next: NextFunction
): void => {
  const queryDetails = {
    params: req.params,
    query: req.query,
    body: req.body,
    locals: res.locals,
  };

  logger.info(
    `API Request - ${req.method} - ${req.originalUrl} - ${JSON.stringify(queryDetails, null, 2)}`
  );

  next();
};
