import type { Request, NextFunction } from 'express';
import type { ResponseWithInformation } from './auth.middleware';
import { logger } from '@/logger';

export const logAPIRequestURL = (
  req: Request,
  res: ResponseWithInformation,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === 'developement') {
    logger.info(`API Request - ${req.method} - ${req.originalUrl}`);
  }

  next();
};
