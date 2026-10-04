'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Mcp_Root } from '../routes';
import {
  type CreateRemoteMcpToolsOptions,
  createRemoteMcpTools,
  type RemoteMcpToolDescriptor,
  wrapRemoteMcpTools,
} from '../webmcp/createRemoteMcpTools';
import { isWebMCPAvailable } from '../webmcp/getModelContext';
import type { WebMCPTool } from '../webmcp/types';

/**
 * Tools of the hosted `@intlayer/mcp` server worth mirroring in the browser.
 * The rest either needs API credentials or duplicates a page tool.
 */
const INTLAYER_DOC_TOOL_NAMES = new Set([
  'fetch-doc-chunks',
  'get-doc-by-slug',
]);

/**
 * `tools/list` snapshot of those tools, so the page exposes them without a
 * discovery request: `mcp.intlayer.org` is only reached when an agent calls
 * one. Mirrors `packages/@intlayer/mcp/src/tools/docs.ts`.
 */
const INTLAYER_DOC_TOOLS: RemoteMcpToolDescriptor[] = [
  {
    name: 'fetch-doc-chunks',
    title: 'Fetch Doc Chunks',
    description:
      'Fetch related doc chunks using keywords or questions. This tool will return the most relevant chunks of documentation based on the input query, best first. Relevance is weighted by the doc `priority` (1 to 10, higher is more important).',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The keywords or question to search for',
        },
        limit: {
          type: 'number',
          description: 'The number of chunks to retrieve (default: 10)',
        },
      },
      required: ['query'],
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: 'get-doc-by-slug',
    title: 'Get Doc by Slug',
    description:
      'Get an array of docs by their slugs, most important (highest `priority`) first. If not slug is provided, return all docs (1.2Mb). List all docs metadata first to get more details about what doc to retrieve.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          anyOf: [
            { type: 'string' },
            { type: 'array', items: { type: 'string' } },
          ],
          description: 'Slug of the docs. If not provided, return all docs.',
        },
        strict: {
          type: 'boolean',
          description:
            'Strict mode - only return docs that match all slugs, by excluding additional slugs',
        },
      },
    },
    annotations: { readOnlyHint: true },
  },
];

const isIntlayerDocTool: NonNullable<CreateRemoteMcpToolsOptions['filter']> = (
  tool
) => INTLAYER_DOC_TOOL_NAMES.has(tool.name);

/** `fetch-doc-chunks` → `fetchDocChunks`, matching the page's own tool names. */
const toCamelCase = (name: string): string =>
  name.replace(/-(\w)/g, (_match, character: string) =>
    character.toUpperCase()
  );

export type UseRemoteMcpToolsOptions = Partial<
  Omit<CreateRemoteMcpToolsOptions, 'signal'>
> & {
  /**
   * Declared descriptors of the server tools, skipping discovery. Defaults to
   * the Intlayer doc tools when `serverUrl` is not overridden.
   */
  tools?: RemoteMcpToolDescriptor[];
};

/**
 * Bridges the tools of a remote MCP server into the page, so an agent in the
 * browser gets the same retrieval an IDE agent has, without the page
 * re-implementing them.
 *
 * Defaults to the documentation tools of the Intlayer MCP server, declared
 * statically. Without declared `tools`, discovery runs once per `serverUrl`;
 * the other options are read at that moment.
 *
 * @returns The wrapped tools, empty until discovery completes or when no
 *   browser agent could use them.
 */
export const useRemoteMcpTools = (
  options: UseRemoteMcpToolsOptions = {}
): WebMCPTool[] => {
  const [discoveredTools, setDiscoveredTools] = useState<WebMCPTool[]>([]);
  const optionsRef = useRef(options);
  const serverUrl = options.serverUrl ?? Mcp_Root;
  const declaredTools =
    options.tools ??
    (options.serverUrl === undefined ? INTLAYER_DOC_TOOLS : undefined);

  useEffect(() => {
    optionsRef.current = options;
  });

  const wrappedDeclaredTools = useMemo(() => {
    if (!declaredTools || !isWebMCPAvailable()) return undefined;

    const {
      filter = isIntlayerDocTool,
      renameTool = toCamelCase,
      tools: _tools,
      ...wrapOptions
    } = optionsRef.current;

    return wrapRemoteMcpTools(declaredTools, {
      ...wrapOptions,
      serverUrl,
      filter,
      renameTool,
    });
  }, [declaredTools, serverUrl]);

  useEffect(() => {
    // Skip the discovery request when tools are declared or no agent could
    // use its result.
    if (declaredTools || !isWebMCPAvailable()) return;

    const abortController = new AbortController();
    const {
      filter = isIntlayerDocTool,
      renameTool = toCamelCase,
      tools: _tools,
      ...discoveryOptions
    } = optionsRef.current;

    createRemoteMcpTools({
      ...discoveryOptions,
      serverUrl,
      filter,
      renameTool,
      signal: abortController.signal,
    })
      .then(setDiscoveredTools)
      .catch((error: unknown) => {
        if (abortController.signal.aborted) return;
        console.warn(`[WebMCP] MCP server unreachable: ${serverUrl}`, error);
      });

    return () => abortController.abort();
  }, [declaredTools, serverUrl]);

  return wrappedDeclaredTools ?? discoveredTools;
};
