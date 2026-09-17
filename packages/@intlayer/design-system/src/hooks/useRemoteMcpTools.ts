'use client';

import { useEffect, useRef, useState } from 'react';
import { Mcp_Root } from '../routes';
import {
  type CreateRemoteMcpToolsOptions,
  createRemoteMcpTools,
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
>;

/**
 * Bridges the tools of a remote MCP server into the page, so an agent in the
 * browser gets the same retrieval an IDE agent has, without the page
 * re-implementing them.
 *
 * Defaults to the documentation tools of the Intlayer MCP server. Discovery
 * runs once per `serverUrl`; the other options are read at that moment.
 *
 * @returns The wrapped tools, empty until discovery completes or when no
 *   browser agent could use them.
 */
export const useRemoteMcpTools = (
  options: UseRemoteMcpToolsOptions = {}
): WebMCPTool[] => {
  const [remoteTools, setRemoteTools] = useState<WebMCPTool[]>([]);
  const optionsRef = useRef(options);
  const serverUrl = options.serverUrl ?? Mcp_Root;

  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => {
    // Skip the discovery request when no agent could use its result.
    if (!isWebMCPAvailable()) return;

    const abortController = new AbortController();
    const {
      filter = isIntlayerDocTool,
      renameTool = toCamelCase,
      ...discoveryOptions
    } = optionsRef.current;

    createRemoteMcpTools({
      ...discoveryOptions,
      serverUrl,
      filter,
      renameTool,
      signal: abortController.signal,
    })
      .then(setRemoteTools)
      .catch((error: unknown) => {
        if (abortController.signal.aborted) return;
        console.warn(`[WebMCP] MCP server unreachable: ${serverUrl}`, error);
      });

    return () => abortController.abort();
  }, [serverUrl]);

  return remoteTools;
};
