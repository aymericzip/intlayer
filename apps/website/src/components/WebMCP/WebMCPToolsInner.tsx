import {
  useRemoteMcpTools,
  useWebMCPTools,
} from '@intlayer/design-system/hooks';
import type { FC } from 'react';
import { useWebsiteWebMCPTools } from './useWebsiteWebMCPTools';

export const WebMCPToolsInner: FC = () => {
  const siteTools = useWebsiteWebMCPTools();
  const remoteTools = useRemoteMcpTools();

  useWebMCPTools([...siteTools, ...remoteTools]);

  return null;
};
