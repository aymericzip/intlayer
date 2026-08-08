import {
  Backend_Health,
  Backend_Root,
  Mcp_Root,
  Mcp_Sse,
  Website_Doc_IntlayerCMS,
  Website_Doc_MCP,
  Website_Home,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';

/**
 * API catalog advertising every Intlayer API an agent may call.
 *
 * Relations are expressed as object keys mapping to arrays, which is the JSON
 * linkset serialisation RFC 9264 defines and RFC 9727 Appendix A demonstrates.
 *
 * `service-desc` is deliberately absent: neither API ships a machine-readable
 * OpenAPI description yet, and advertising a URL that does not resolve is worse
 * for agents than omitting an optional relation.
 *
 * @see https://www.rfc-editor.org/rfc/rfc9727
 */
const apiCatalog = {
  linkset: [
    {
      anchor: Backend_Root,
      'service-doc': [
        {
          href: Website_Doc_IntlayerCMS,
          type: 'text/html',
          title: 'Intlayer CMS and backend API documentation',
        },
      ],
      status: [{ href: Backend_Health, type: 'application/json' }],
      'oauth-protected-resource': [
        {
          href: `${Backend_Root}/.well-known/oauth-protected-resource`,
          type: 'application/json',
        },
      ],
    },
    {
      anchor: Mcp_Root,
      'service-doc': [
        {
          href: Website_Doc_MCP,
          type: 'text/html',
          title: 'Intlayer MCP server documentation',
        },
      ],
      item: [{ href: Mcp_Sse, title: 'Streamable HTTP / SSE MCP endpoint' }],
    },
    {
      anchor: Website_Home,
      'service-doc': [
        {
          href: `${Website_Home}llms.txt`,
          type: 'text/plain',
          title: 'Documentation index for AI agents',
        },
      ],
    },
  ],
} as const;

export const Route = createFileRoute('/.well-known/api-catalog')({
  server: {
    handlers: {
      GET: () =>
        new Response(JSON.stringify(apiCatalog, null, 2), {
          status: 200,
          headers: {
            'Content-Type': 'application/linkset+json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            'Access-Control-Allow-Origin': '*',
            'X-Content-Type-Options': 'nosniff',
          },
        }),
    },
  },
});
