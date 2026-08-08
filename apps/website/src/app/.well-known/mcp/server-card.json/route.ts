import { Mcp_Root, Website_Doc_MCP } from '@intlayer/design-system/routes';

/** Re-probe the MCP server at most once an hour. */
export const revalidate = 3600;

type McpServerInfo = {
  readonly name: string;
  readonly version: string;
};

type McpInitializeResult = {
  readonly result?: {
    readonly capabilities?: Readonly<Record<string, unknown>>;
    readonly serverInfo?: Partial<McpServerInfo>;
  };
};

type McpServerCard = {
  readonly serverInfo: McpServerInfo;
  readonly transport: {
    readonly type: string;
    readonly endpoint: string;
  };
  readonly capabilities: readonly string[];
  readonly documentation: string;
};

/**
 * Used when the MCP server cannot be reached, so the card always resolves.
 * Mirrors the capabilities registered in `@intlayer/mcp`, which exposes tools
 * only — no resources or prompts.
 */
const FALLBACK_SERVER_INFO: McpServerInfo = {
  name: 'intlayer',
  version: '0.0.0',
};
const FALLBACK_CAPABILITIES: readonly string[] = ['tools'];

/** Capability keys the MCP specification defines for a server. */
const ADVERTISABLE_CAPABILITIES = ['tools', 'resources', 'prompts'] as const;

/**
 * Asks the deployed MCP server to describe itself.
 *
 * The card is served from the website, which cannot know which build of
 * `@intlayer/mcp` is live on the MCP origin. Reading the answer from the server
 * keeps the advertised name, version and capabilities true after either side is
 * redeployed, instead of pinning a value that silently drifts.
 *
 * @returns The server's own `initialize` result, or `undefined` when unreachable.
 */
const fetchMcpServerDescription = async (): Promise<
  McpInitializeResult['result'] | undefined
> => {
  try {
    const response = await fetch(Mcp_Root, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: {
            name: 'intlayer-website-server-card',
            version: '1.0.0',
          },
        },
      }),
      signal: AbortSignal.timeout(5000),
      next: { revalidate },
    });

    if (!response.ok) return undefined;

    return ((await response.json()) as McpInitializeResult).result;
  } catch {
    // An unreachable MCP server must not take the discovery document down.
    return undefined;
  }
};

/**
 * Serves the MCP Server Card (SEP-1649) describing the hosted Intlayer MCP
 * server, so agents can connect without reading the documentation first.
 *
 * @returns `application/json` MCP server card.
 */
export const GET = async (): Promise<Response> => {
  const description = await fetchMcpServerDescription();

  const advertisedCapabilities = description?.capabilities
    ? ADVERTISABLE_CAPABILITIES.filter(
        (capability) => capability in (description.capabilities ?? {})
      )
    : [];

  const serverCard: McpServerCard = {
    serverInfo: {
      name: description?.serverInfo?.name ?? FALLBACK_SERVER_INFO.name,
      version: description?.serverInfo?.version ?? FALLBACK_SERVER_INFO.version,
    },
    transport: {
      // Streamable HTTP is served on the origin root, not on a `/mcp` sub-path.
      type: 'streamable-http',
      endpoint: Mcp_Root,
    },
    capabilities:
      advertisedCapabilities.length > 0
        ? advertisedCapabilities
        : FALLBACK_CAPABILITIES,
    documentation: Website_Doc_MCP,
  };

  return new Response(JSON.stringify(serverCard, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
