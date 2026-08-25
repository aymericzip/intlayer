import * as analyticsService from '@services/analytics.service';
import {
  type PublicBrowserScope,
  signPublicBrowserToken,
} from '@utils/crypto/publicBrowserToken';
import { type AppError, ErrorHandler } from '@utils/errors';
import { isBotRequest } from '@utils/isBotRequest';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';

export type CreatePublicBrowserTokenBody = {
  /** The project's public key (`editor.clientId`). */
  clientId?: string;
};

export type CreatePublicBrowserTokenResult = ResponseData<{
  /** `null` when the key is unknown or the origin is not allowed. */
  token: string | null;
  /** Capabilities granted; empty when no token was issued. */
  scopes: PublicBrowserScope[];
  /** Token lifetime in seconds; `0` when no token was issued. */
  expiresIn: number;
}>;

type TokenPayload = {
  token: string | null;
  scopes: PublicBrowserScope[];
  expiresIn: number;
};

/**
 * Public — exchanges a project's public `clientId` for a short-lived,
 * narrowly-scoped browser token.
 *
 * This is what lets an app call the Intlayer API straight from the browser with
 * no server route and no server action, the way an analytics SDK does: the page
 * ships only the public project key, and the confidential `clientSecret` never
 * leaves the server.
 *
 * Since the browser holds no secret, the exchange is authorised by the
 * request's `Origin`, which must match one of the origins the project declared
 * in its configuration. Projects that declared none — a native app has no
 * origin to declare — are still served.
 *
 * `Origin` is enforced by browsers but freely set by any other HTTP client, so
 * it is a hardening measure, not a security boundary. That is precisely why the
 * granted scopes are limited to append-only writes and to data already public
 * on the page: see `PUBLIC_BROWSER_SCOPES`.
 *
 * The response never distinguishes "unknown key" from "origin not allowed", so
 * the endpoint cannot be used to probe which projects exist.
 */
export const createPublicBrowserToken = async (
  request: FastifyRequest<{ Body: CreatePublicBrowserTokenBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { clientId } = request.body ?? {};

  const refuse = () =>
    reply.status(200).send(
      formatResponse<TokenPayload>({
        data: { token: null, scopes: [], expiresIn: 0 },
      })
    );

  if (!clientId || isBotRequest(request)) return refuse();

  try {
    const project =
      await analyticsService.resolveIngestProjectByClientId(clientId);

    if (!project) return refuse();

    const origin = request.headers.origin;

    // An origin is only enforced when both sides have one: a project that
    // declared its URLs, and a caller that is a browser. A native SDK sends no
    // `Origin` header and cannot be checked this way.
    if (origin && project.allowedOrigins.length > 0) {
      if (!project.allowedOrigins.includes(origin)) return refuse();
    }

    const { token, scopes, expiresIn } = signPublicBrowserToken(
      String(project.id)
    );

    return reply
      .status(200)
      .send(
        formatResponse<TokenPayload>({ data: { token, scopes, expiresIn } })
      );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
