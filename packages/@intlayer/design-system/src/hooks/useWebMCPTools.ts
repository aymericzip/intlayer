'use client';

import { useEffect, useRef } from 'react';
import { registerWebMCPTools } from '../webmcp/registerWebMCPTools';
import type { WebMCPTool, WebMCPToolExecuteOptions } from '../webmcp/types';

/**
 * A tool of any input type. `never` is assignable from every input, so tools
 * declared with a precise input type fit in one list; the browser hands each
 * `execute` the object it parsed from the agent's JSON.
 */
export type AnyWebMCPTool = WebMCPTool<never>;

/** Identifies the tool set the browser currently sees. */
const getToolsSignature = (tools: AnyWebMCPTool[]): string =>
  JSON.stringify(
    tools.map((tool) => [
      tool.name,
      tool.description,
      tool.inputSchema ?? null,
      tool.annotations ?? null,
    ])
  );

/**
 * Exposes tools to browser agents for as long as the calling component is
 * mounted, which scopes page-specific tools (a formatter, a scanner) to the
 * page they belong to.
 *
 * Registration happens once per distinct tool set; `execute` handlers are
 * read through a ref, so tools may close over fresh React state without being
 * re-registered on every render. Renders nothing on the server.
 *
 * @param tools - Tools to expose while mounted.
 */
export const useWebMCPTools = (tools: AnyWebMCPTool[]): void => {
  const toolsRef = useRef<AnyWebMCPTool[]>(tools);
  const signature = getToolsSignature(tools);

  useEffect(() => {
    toolsRef.current = tools;
  });

  useEffect(() => {
    const proxies: AnyWebMCPTool[] = toolsRef.current.map((tool) => ({
      ...tool,
      execute: (input: unknown, options?: WebMCPToolExecuteOptions) => {
        const latest =
          toolsRef.current.find((candidate) => candidate.name === tool.name) ??
          tool;
        return latest.execute(input as never, options);
      },
    }));

    return registerWebMCPTools(proxies);
  }, [signature]);
};
