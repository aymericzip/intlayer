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
 * Defers loading and registration until after page load (and idle) so that
 * search indices and remote MCP connections do not compete with critical rendering.
 * Renders nothing and avoids loading when WebMCP is not available.
 */
export const WebMCPTools: FC = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!isWebMCPAvailable()) return;

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const scheduleLoad = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(() => setShouldLoad(true), {
          timeout: 3000,
        });
      } else {
        timeoutId = setTimeout(() => setShouldLoad(true), 1500);
      }
    };

    if (document.readyState === 'complete') {
      scheduleLoad();
    } else {
      window.addEventListener('load', scheduleLoad, { once: true });
    }

    return () => {
      window.removeEventListener('load', scheduleLoad);
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <WebMCPToolsInner />
    </Suspense>
  );
};
