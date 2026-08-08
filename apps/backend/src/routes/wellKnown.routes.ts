import { ACCESS_TOKEN_EXPIRES_IN } from '@utils/oAuth2';
import type { FastifyInstance } from 'fastify';

/**
 * Discovery documents that let AI agents and OAuth clients learn how to
 * authenticate against this API without reading the documentation first.
 *
 * These endpoints deliberately bypass `formatResponse`: RFC 8414 and RFC 9728
 * define the response body as the metadata object itself, and wrapping it in
 * the `{ data }` envelope would make the documents unreadable to every
 * standards-compliant client.
 */

const getBackendUrl = (): string =>
  process.env.BACKEND_URL ?? 'https://back.intlayer.org';

const getWebsiteUrl = (): string =>
  process.env.WEBSITE_URL ?? 'https://intlayer.org';

const DISCOVERY_HEADERS = {
  'Cache-Control': 'public, max-age=3600',
  'Access-Control-Allow-Origin': '*',
  'X-Content-Type-Options': 'nosniff',
} as const;

/**
 * Builds the OAuth 2.0 Authorization Server Metadata document.
 *
 * The issuer is this origin, which is what makes the document valid where it is
 * served — a copy hosted on the website origin could not claim the same issuer.
 *
 * `client_credentials` is the only advertised grant because it is the only one
 * the server implements: tokens are minted from project access keys, and there
 * is no authorization endpoint, no refresh token and no dynamic registration.
 *
 * @see https://www.rfc-editor.org/rfc/rfc8414
 */
const getAuthorizationServerMetadata = () => {
  const backendUrl = getBackendUrl();

  return {
    issuer: backendUrl,
    token_endpoint: `${backendUrl}/oauth2/token`,
    grant_types_supported: ['client_credentials'],
    response_types_supported: [],
    token_endpoint_auth_methods_supported: ['client_secret_post'],
    service_documentation: `${getWebsiteUrl()}/doc/concept/cms`,
    /**
     * Agent-facing registration hints (auth.md). Registration is a human step:
     * an account holder creates a project access key in the dashboard, so
     * `register_uri` points at that screen rather than at an API endpoint an
     * agent could call.
     */
    agent_auth: {
      skill: `${getWebsiteUrl()}/auth.md`,
      register_uri: 'https://app.intlayer.org/projects',
      registration_type: 'manual',
      identity_types_supported: ['project'],
      credential_types_supported: ['client_credentials'],
      revocation_uri: 'https://app.intlayer.org/projects',
      token_lifetime_seconds: ACCESS_TOKEN_EXPIRES_IN,
    },
  };
};

/**
 * Builds the OAuth 2.0 Protected Resource Metadata document.
 *
 * `scopes_supported` is intentionally omitted: authorisation derives from the
 * role attached to the access key rather than from requested scopes, so listing
 * scope names would advertise a negotiation this server does not perform.
 *
 * @see https://www.rfc-editor.org/rfc/rfc9728
 */
const getProtectedResourceMetadata = () => {
  const backendUrl = getBackendUrl();

  return {
    resource: backendUrl,
    authorization_servers: [backendUrl],
    bearer_methods_supported: ['header'],
    resource_documentation: `${getWebsiteUrl()}/doc/concept/cms`,
    resource_registration: `${getWebsiteUrl()}/auth.md`,
  };
};

/**
 * Registers the OAuth discovery endpoints on the Fastify instance.
 *
 * @param app - Fastify instance to register the routes on.
 */
export const registerWellKnownRoutes = (app: FastifyInstance): void => {
  app.get('/.well-known/oauth-authorization-server', async (_request, reply) =>
    reply
      .headers(DISCOVERY_HEADERS)
      .type('application/json; charset=utf-8')
      .status(200)
      .send(getAuthorizationServerMetadata())
  );

  app.get('/.well-known/oauth-protected-resource', async (_request, reply) =>
    reply
      .headers(DISCOVERY_HEADERS)
      .type('application/json; charset=utf-8')
      .status(200)
      .send(getProtectedResourceMetadata())
  );
};
