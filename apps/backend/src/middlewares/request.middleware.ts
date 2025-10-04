import { logger } from '@logger';
import type { NextFunction, Request, Response } from 'express';

export const logAPIRequestURL = (
  req: Request,
  res: Response,
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
