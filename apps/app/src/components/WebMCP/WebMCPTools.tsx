import { useWebMCPTools } from '@intlayer/design-system/hooks';
import type { FC } from 'react';
import { useAppWebMCPTools } from './useAppWebMCPTools';

/**
 * Registers the dashboard's WebMCP tools for the whole app. Renders nothing
 * and changes no behaviour in browsers without WebMCP.
 */
export const WebMCPTools: FC = () => {
  useWebMCPTools(useAppWebMCPTools());

  return null;
};
