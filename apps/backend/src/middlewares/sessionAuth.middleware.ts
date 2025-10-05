import { type Auth, formatSession } from '@utils/auth/getAuth';
import { fromNodeHeaders } from 'better-auth/node';
import type { NextFunction, Request, Response } from 'express';
import type { Session } from '@/types/session.types';

export type ResponseWithSession<
  ResBody = any,
  Locals extends Record<string, any> = Record<string, any> & Session,
> = Response<ResBody, Locals>;

export const authMiddleware =
  (auth: Auth) => async (req: Request, res: Response, next: NextFunction) => {
    if (typeof res.locals.authType !== 'undefined') {
      // Skip if user is already authenticated (ex: oAuth2)
      return next();
    }

    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (session) {
      const formattedSession = formatSession(session);
      res.locals.authType = 'session';

      // Attach the session to the response locals
      Object.entries(formattedSession).forEach(([key, value]) => {
        (res.locals as any)[key] = value;
      });

      return next();
    }

    next();
  };
