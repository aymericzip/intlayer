import { AsyncLocalStorage } from 'node:async_hooks';

/** Intlayer access key credentials (OAuth2 client credentials). */
export type McpClientCredentials = {
  clientId: string;
  clientSecret: string;
};

/**
 * Per-request authentication context, set by the transport from the incoming
 * request (ex: HTTP headers) so credentials never transit through tool
 * arguments, and therefore never through the model's context.
 */
export type McpRequestContext = {
  /** Access key credentials sent by the MCP client. */
  credentials?: McpClientCredentials;
  /** Ready-to-use Intlayer OAuth2 access token (`Authorization: Bearer`). */
  accessToken?: string;
};

/** Holds the {@link McpRequestContext} of the tool call being handled. */
export const mcpRequestContext: AsyncLocalStorage<McpRequestContext> =
  new AsyncLocalStorage<McpRequestContext>();

/** Header names accepted by the HTTP transport for access key credentials. */
export const CLIENT_ID_HEADER = 'x-intlayer-client-id';
export const CLIENT_SECRET_HEADER = 'x-intlayer-client-secret';

type HeaderValue = string | string[] | undefined;

const getFirstHeaderValue = (value: HeaderValue): string | undefined =>
  (Array.isArray(value) ? value[0] : value)?.trim() || undefined;

/**
 * Builds the request context from HTTP headers: `Authorization: Bearer <token>`
 * and/or the `x-intlayer-client-id` + `x-intlayer-client-secret` pair.
 *
 * @param headers - Incoming request headers (lower-cased names).
 * @returns The authentication context, empty when no credential is sent.
 */
export const getRequestContextFromHeaders = (
  headers: Record<string, HeaderValue>
): McpRequestContext => {
  const accessToken = getFirstHeaderValue(headers.authorization)
    ?.match(/^Bearer\s+(.+)$/i)?.[1]
    ?.trim();
  const clientId = getFirstHeaderValue(headers[CLIENT_ID_HEADER]);
  const clientSecret = getFirstHeaderValue(headers[CLIENT_SECRET_HEADER]);

  return {
    ...(accessToken && { accessToken }),
    ...(clientId &&
      clientSecret && { credentials: { clientId, clientSecret } }),
  };
};
