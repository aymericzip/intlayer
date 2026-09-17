import type {
  WebMCPJsonSchema,
  WebMCPTool,
  WebMCPToolAnnotations,
} from './types';

/** A tool as described by an MCP server's `tools/list` response. */
export type RemoteMcpToolDescriptor = {
  name: string;
  title?: string;
  description?: string;
  inputSchema?: WebMCPJsonSchema;
  annotations?: WebMCPToolAnnotations;
};

/** Text-bearing entry of an MCP `tools/call` result. */
type RemoteMcpContent = { type: string; text?: string };

type RemoteMcpToolCallResult = {
  content?: RemoteMcpContent[];
  isError?: boolean;
};

type JsonRpcResponse<TResult> = {
  jsonrpc: '2.0';
  id: number;
  result?: TResult;
  error?: { code: number; message: string };
};

export type CreateRemoteMcpToolsOptions = {
  /** Streamable-HTTP endpoint of the MCP server (`https://mcp.intlayer.org`). */
  serverUrl: string;
  /**
   * Keeps only the tools worth exposing to a browser agent. Defaults to
   * read-only tools, which excludes anything needing credentials.
   */
  filter?: (tool: RemoteMcpToolDescriptor) => boolean;
  /** Prepended to every tool name to avoid collisions with page tools. */
  namePrefix?: string;
  /** Aborts the discovery request. */
  signal?: AbortSignal;
  /** Injectable for tests. Defaults to the global `fetch`. */
  fetch?: typeof globalThis.fetch;
};

const isReadOnly = (tool: RemoteMcpToolDescriptor): boolean =>
  tool.annotations?.readOnlyHint === true;

/**
 * Sends one JSON-RPC request to a streamable-HTTP MCP server.
 *
 * Each call opens its own session: the browser cannot read the
 * `mcp-session-id` response header (it is not CORS-exposed), and the server
 * answers stateless `tools/list` / `tools/call` requests without one.
 */
const callJsonRpc = async <TResult>(
  serverUrl: string,
  method: string,
  params: Record<string, unknown> | undefined,
  fetchImplementation: typeof globalThis.fetch,
  signal?: AbortSignal
): Promise<TResult> => {
  const response = await fetchImplementation(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
    },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`MCP server answered HTTP ${response.status}`);
  }

  const payload = (await response.json()) as JsonRpcResponse<TResult>;

  if (payload.error) {
    throw new Error(payload.error.message);
  }

  if (payload.result === undefined) {
    throw new Error('MCP server returned an empty result');
  }

  return payload.result;
};

/** Flattens an MCP tool result into the text an agent can read. */
export const formatRemoteMcpResult = (
  result: RemoteMcpToolCallResult
): string => {
  const text = (result.content ?? [])
    .map((entry) => entry.text)
    .filter((entry): entry is string => typeof entry === 'string')
    .join('\n\n');

  if (result.isError) {
    return text ? `Error: ${text}` : 'The tool reported an error.';
  }

  return text || 'The tool returned no text content.';
};

/**
 * Discovers the tools of a remote MCP server and wraps each as a WebMCP tool
 * forwarding its calls, so a page can expose an existing MCP server (the
 * Intlayer documentation server, for instance) to browser agents without
 * re-implementing its tools.
 *
 * @returns The wrapped tools, ready for `registerWebMCPTools`.
 */
export const createRemoteMcpTools = async ({
  serverUrl,
  filter = isReadOnly,
  namePrefix = '',
  signal,
  fetch: fetchImplementation = globalThis.fetch,
}: CreateRemoteMcpToolsOptions): Promise<WebMCPTool[]> => {
  const { tools } = await callJsonRpc<{ tools: RemoteMcpToolDescriptor[] }>(
    serverUrl,
    'tools/list',
    undefined,
    fetchImplementation,
    signal
  );

  return tools.filter(filter).map((tool) => ({
    name: `${namePrefix}${tool.name}`,
    title: tool.title,
    description: tool.description ?? tool.name,
    inputSchema: tool.inputSchema ?? { type: 'object', properties: {} },
    annotations: tool.annotations,
    execute: async (input, options) =>
      formatRemoteMcpResult(
        await callJsonRpc<RemoteMcpToolCallResult>(
          serverUrl,
          'tools/call',
          { name: tool.name, arguments: input ?? {} },
          fetchImplementation,
          options?.signal
        )
      ),
  }));
};
