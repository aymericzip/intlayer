import {
  useRemoteMcpTools,
  useWebMCPTools,
} from '@intlayer/design-system/hooks';
import type { FC } from 'react';
import { useAppWebMCPTools } from './useAppWebMCPTools';

/**
 * Registers the dashboard's WebMCP tools for the whole app, alongside the
 * documentation tools of the Intlayer MCP server. Renders nothing and
 * changes no behaviour in browsers without WebMCP.
 */
export const WebMCPTools: FC = () => {
  const appTools = useAppWebMCPTools();
  const remoteTools = useRemoteMcpTools();

  useWebMCPTools([...appTools, ...remoteTools]);

  return null;
};
