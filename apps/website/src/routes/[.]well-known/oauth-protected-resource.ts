import {
  AuthMd_Path,
  Backend_Root,
  Website_Doc_IntlayerCMS,
  Website_Home,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';

/**
 * OAuth 2.0 Protected Resource Metadata (RFC 9728).
 *
 * The Intlayer API lives on a dedicated origin, so the authoritative copy of
 * this document is served by the resource server itself at
 * `https://back.intlayer.org/.well-known/oauth-protected-resource`. This copy is
 * published on the website origin as a discovery convenience, because agents
 * that only know the brand domain start their lookup here.
 *
 * `scopes_supported` is intentionally omitted: the API authorises requests from
 * the role attached to the access key rather than from requested scopes, so
 * listing scope names here would advertise a negotiation that does not exist.
 *
 * @see https://www.rfc-editor.org/rfc/rfc9728
 */
const protectedResourceMetadata = {
  resource: Backend_Root,
  authorization_servers: [Backend_Root],
  bearer_methods_supported: ['header'],
  resource_documentation: Website_Doc_IntlayerCMS,
  resource_registration: `${Website_Home.replace(/\/$/, '')}${AuthMd_Path}`,
} as const;

export const Route = createFileRoute('/.well-known/oauth-protected-resource')({
  server: {
    handlers: {
      GET: () =>
        new Response(JSON.stringify(protectedResourceMetadata, null, 2), {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            'Access-Control-Allow-Origin': '*',
            'X-Content-Type-Options': 'nosniff',
          },
        }),
    },
  },
});
