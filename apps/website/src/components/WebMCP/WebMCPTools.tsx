import { isWebMCPAvailable } from '@intlayer/design-system/webmcp';
import { type FC, lazy, Suspense, useEffect, useState } from 'react';

const WebMCPToolsInner = lazy(() =>
  import('./WebMCPToolsInner').then((mod) => ({
    default: mod.WebMCPToolsInner,
  }))
);

/**
 * Registers Intlayer's WebMCP tools for the whole site, alongside the
 * documentation tools of the Intlayer MCP server.
 *
 * Registers right after hydration: agents (and readiness scanners) inspect
 * `modelContext` shortly after load, and tools deferred to an idle callback
 * were missed entirely. Registration itself is cheap — search indices load
 * inside `execute` and remote tools are declared statically.
 *
 * Browsers without WebMCP never fetch the tools chunk.
 */
export const WebMCPTools: FC = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    setShouldLoad(isWebMCPAvailable());
  }, []);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <WebMCPToolsInner />
    </Suspense>
  );
};
