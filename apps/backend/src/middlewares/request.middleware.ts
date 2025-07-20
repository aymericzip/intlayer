import { logger } from '@logger';
import { ResponseWithInformation } from '@utils/auth/getAuth';
import type { NextFunction, Request } from 'express';

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
