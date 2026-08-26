import type { FC } from 'react';
import { useEffect } from 'react';

/**
 * A tool an agent can invoke through the WebMCP browser API.
 *
 * @see https://webmachinelearning.github.io/webmcp/
 */
type WebMCPTool<TInput extends Record<string, unknown>> = {
  name: string;
  description: string;
  /** JSON Schema describing {@link execute}'s argument. */
  inputSchema: Record<string, unknown>;
  execute: (
    input: TInput,
    signal?: AbortSignal
  ) => Promise<{ content: { type: 'text'; text: string }[] }>;
};

type ModelContext = {
  provideContext?: (context: {
    tools: WebMCPTool<Record<string, never>>[];
  }) => void;
  registerTool?: (tool: WebMCPTool<Record<string, never>>) => void;
};

/** Wraps a tool result in the content envelope WebMCP expects. */
const toToolResult = (text: string) => ({
  content: [{ type: 'text' as const, text }],
});

/**
 * Tools exposing the site's documentation to agents running in the browser.
 *
 * Both are same-origin reads that need no credentials, and they reuse the
 * markdown content negotiation the documentation routes already implement
 * rather than introducing a second retrieval path.
 */
const buildTools = (): WebMCPTool<never>[] =>
  [
    {
      name: 'list_intlayer_documentation',
      description:
        "List every page of Intlayer's documentation available to agents, as a markdown index of titles and URLs.",
      inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
      execute: async (_input: Record<string, never>, signal?: AbortSignal) => {
        const response = await fetch('/llms.txt', {
          headers: { Accept: 'text/plain' },
          signal,
        });

        if (!response.ok) {
          return toToolResult(
            `Could not load the documentation index (HTTP ${response.status}).`
          );
        }

        return toToolResult(await response.text());
      },
    },
    {
      name: 'get_intlayer_documentation_page',
      description:
        "Fetch a single page of Intlayer's documentation as markdown. Accepts a documentation path such as `/doc/why` or `/doc/concept/cms`.",
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description:
              'Documentation path beginning with /doc, /blog or /frequent-questions.',
          },
        },
        required: ['path'],
        additionalProperties: false,
      },
      execute: async (input: { path: string }, signal?: AbortSignal) => {
        // Same-origin only: the tool must not become a general-purpose fetcher
        // that an injected page could aim at another host.
        const target = new URL(input.path, window.location.origin);

        if (target.origin !== window.location.origin) {
          return toToolResult('Only Intlayer documentation paths can be read.');
        }

        const response = await fetch(target, {
          headers: { Accept: 'text/markdown' },
          signal,
        });

        if (!response.ok) {
          return toToolResult(
            `No documentation found at ${target.pathname} (HTTP ${response.status}).`
          );
        }

        return toToolResult(await response.text());
      },
    },
  ] as unknown as WebMCPTool<never>[];

/**
 * Registers Intlayer's WebMCP tools once the page has loaded.
 *
 * Supports both shapes of the evolving API: the declarative
 * `provideContext({ tools })` and the incremental `registerTool(tool)`. Absent
 * either, the component renders nothing and changes no behaviour, so browsers
 * without WebMCP are unaffected.
 */
export const WebMCPTools: FC = () => {
  useEffect(() => {
    const modelContext = (
      navigator as Navigator & { modelContext?: ModelContext }
    ).modelContext;

    if (!modelContext) return;

    const tools = buildTools();
    const abortController = new AbortController();

    if (typeof modelContext.provideContext === 'function') {
      modelContext.provideContext({
        tools: tools as WebMCPTool<Record<string, never>>[],
      });
    } else if (typeof modelContext.registerTool === 'function') {
      for (const tool of tools) {
        modelContext.registerTool(tool as WebMCPTool<Record<string, never>>);
      }
    }

    return () => abortController.abort();
  }, []);

  return null;
};
