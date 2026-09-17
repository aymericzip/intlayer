import {
  useRemoteMcpTools,
  useWebMCPTools,
} from '@intlayer/design-system/hooks';
import type { FC } from 'react';
import { useWebsiteWebMCPTools } from './useWebsiteWebMCPTools';

/**
 * Registers Intlayer's WebMCP tools for the whole site, alongside the
 * documentation tools of the Intlayer MCP server. Renders nothing and
 * changes no behaviour in browsers without WebMCP.
 */
export const WebMCPTools: FC = () => {
  const siteTools = useWebsiteWebMCPTools();
  const remoteTools = useRemoteMcpTools();

  useWebMCPTools([...siteTools, ...remoteTools]);

  return null;
};
