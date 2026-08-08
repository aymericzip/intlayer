import {
  App_Dashboard_Projects,
  Backend_OAuth2_Token,
  Backend_Root,
  Website_Doc_IntlayerCMS,
  Website_Domain,
  WellKnown_OAuthProtectedResource_Path,
} from '@intlayer/design-system/routes';

/**
 * Agent-facing authentication guide served at the site root as `/auth.md`.
 *
 * Describes the credential flow the API actually implements: OAuth 2.0
 * `client_credentials` against access keys minted per project. Registration is
 * deliberately documented as a human step, because the API exposes no dynamic
 * client registration endpoint an agent could call on its own.
 *
 * @see https://github.com/workos/auth.md
 */
const authMarkdown = `# auth.md

Machine-readable authentication guide for AI agents calling the Intlayer API.

## Audience

Autonomous agents and scripted clients that need to read or write Intlayer
dictionaries, projects and translations programmatically.

## Resource

- **API base URL:** ${Backend_Root}
- **Protected resource metadata:** https://${Website_Domain}${WellKnown_OAuthProtectedResource_Path}
- **Authorization server metadata:** ${Backend_Root}/.well-known/oauth-authorization-server

## Registration

Intlayer does **not** support dynamic client registration. Credentials are
issued per project by a human account holder:

1. Sign in at ${App_Dashboard_Projects}.
2. Select or create a project.
3. Create an access key. The dashboard returns a **client ID** and a
   **client secret**; the secret is shown once.

An agent operating on a user's behalf must be handed these values out of band —
it cannot mint them itself.

## Obtaining a token

Exchange the access key for a bearer token using the OAuth 2.0
\`client_credentials\` grant. It is the only grant this API supports.

\`\`\`http
POST ${Backend_OAuth2_Token}
Content-Type: application/json

{
  "grant_type": "client_credentials",
  "client_id": "<client id>",
  "client_secret": "<client secret>"
}
\`\`\`

The token is valid for 7 days. Actively used tokens are extended
automatically; a client may also refresh one explicitly via
\`POST ${Backend_Root}/oauth2/token/extend\`.

> **Note:** the token response is wrapped in Intlayer's standard envelope
> (\`{ "data": { ... } }\`) rather than returned as a bare RFC 6749 token
> response. Read the token from \`data.accessToken\`.

## Using the token

Send the token as a bearer credential on every request:

\`\`\`http
GET ${Backend_Root}/api/dictionary
Authorization: Bearer <access token>
\`\`\`

## Authorization

Access is governed by the role attached to the access key, not by requested
OAuth scopes. A key may additionally be restricted to specific environments and
locales. Requests outside those bounds fail with a permission error.

## Revocation

Delete the access key from the project dashboard at ${App_Dashboard_Projects}.
Tokens issued from a deleted key stop validating.

## Documentation

${Website_Doc_IntlayerCMS}
`;

/**
 * Serves the agent authentication guide.
 *
 * @returns `text/markdown` auth.md document.
 */
export const GET = (): Response =>
  new Response(authMarkdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    },
  });
