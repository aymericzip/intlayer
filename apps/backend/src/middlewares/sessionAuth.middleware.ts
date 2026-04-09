import { type Auth, formatSession } from '@utils/auth/getAuth';
import { fromNodeHeaders } from 'better-auth/node';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Session } from '@/types/session.types';

// Extend FastifyRequest with a typed session property (registered via decorateRequest in index.ts)
declare module 'fastify' {
  interface FastifyRequest {
    session: (Session & { authType?: string }) | null;
  }
}

export const authMiddleware =
  (auth: Auth) =>
  async (request: FastifyRequest, _reply: FastifyReply) => {
    if (request.session?.authType) {
      // Skip if user is already authenticated (ex: oAuth2)
      return;
    }

    const sessionData = await auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    if (sessionData) {
      request.session = {
        ...formatSession(sessionData),
        authType: 'session',
      };
    }
  };
