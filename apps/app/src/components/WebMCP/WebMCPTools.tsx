import {
  useRemoteMcpTools,
  useWebMCPTools,
} from '@intlayer/design-system/hooks';
import type { FC } from 'react';
import { useAppWebMCPTools } from './useAppWebMCPTools';
import { useConfigurationWebMCPTools } from './useConfigurationWebMCPTools';

/**
 * Registers the dashboard's WebMCP tools for the whole app, alongside the
 * configuration / AI credit tools and the documentation tools of the Intlayer MCP server. Renders nothing and
 * changes no behaviour in browsers without WebMCP.
 */
export const WebMCPTools: FC = () => {
  const appTools = useAppWebMCPTools();
  const configurationTools = useConfigurationWebMCPTools();
  const remoteTools = useRemoteMcpTools();

  useWebMCPTools([...appTools, ...configurationTools, ...remoteTools]);

  return null;
};
