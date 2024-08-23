import type { Request, Response, NextFunction } from 'express';
import { logger } from '@/logger';

export const logRequestURL = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  process.env.NODE_ENV === 'developement' &&
    logger.info(`Request - ${req.method} - ${req.originalUrl}`);
  next();
};
