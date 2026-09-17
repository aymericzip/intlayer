import { useWebMCPTools } from '@intlayer/design-system/hooks';
import { Mcp_Root } from '@intlayer/design-system/routes';
import {
  createRemoteMcpTools,
  isWebMCPAvailable,
  type WebMCPTool,
} from '@intlayer/design-system/webmcp';
import { type FC, useEffect, useState } from 'react';
import { useWebsiteWebMCPTools } from './useWebsiteWebMCPTools';

/**
 * Tools of the hosted `@intlayer/mcp` server worth mirroring in the browser.
 * The rest either needs API credentials or duplicates a site-wide tool.
 */
const REMOTE_TOOL_NAMES = new Set(['fetch-doc-chunks', 'get-doc-by-slug']);

/**
 * Bridges the documentation tools of the Intlayer MCP server, so an agent in
 * the browser gets the same retrieval an IDE agent has, without the page
 * re-implementing them.
 */
const useRemoteMcpTools = (): WebMCPTool[] => {
  const [remoteTools, setRemoteTools] = useState<WebMCPTool[]>([]);

  useEffect(() => {
    // Skip the discovery request when no agent could use its result.
    if (!isWebMCPAvailable()) return;

    const abortController = new AbortController();

    createRemoteMcpTools({
      serverUrl: Mcp_Root,
      filter: (tool) => REMOTE_TOOL_NAMES.has(tool.name),
      signal: abortController.signal,
    })
      .then(setRemoteTools)
      .catch((error: unknown) => {
        if (abortController.signal.aborted) return;
        console.warn('[WebMCP] Intlayer MCP server unreachable', error);
      });

    return () => abortController.abort();
  }, []);

  return remoteTools;
};

/**
 * Registers Intlayer's WebMCP tools for the whole site. Renders nothing and
 * changes no behaviour in browsers without WebMCP.
 */
export const WebMCPTools: FC = () => {
  const siteTools = useWebsiteWebMCPTools();
  const remoteTools = useRemoteMcpTools();

  useWebMCPTools([...siteTools, ...remoteTools]);

  return null;
};
