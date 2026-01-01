import { type Auth, formatSession } from '@utils/auth/getAuth';
import { fromNodeHeaders } from 'better-auth/node';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Session } from '@/types/session.types';

// Extend FastifyRequest to include locals
declare module 'fastify' {
  interface FastifyRequest {
    locals?: {
      authType?: string;
      [key: string]: any;
    } & Session;
  }
}

export type ResponseWithSession<
  ResBody = any,
  Locals extends Record<string, any> = Record<string, any> & Session,
> = FastifyReply & {
  locals: Locals;
};

export const authMiddleware =
  (auth: Auth) => async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.locals) {
      request.locals = {};
    }

    if (typeof request.locals.authType !== 'undefined') {
      // Skip if user is already authenticated (ex: oAuth2)
      return;
    }

    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    if (session) {
      const formattedSession = formatSession(session);
      request.locals.authType = 'session';

      // Attach the session to the request locals
      Object.entries(formattedSession).forEach(([key, value]) => {
        (request.locals as any)[key] = value;
      });
    }
  };
