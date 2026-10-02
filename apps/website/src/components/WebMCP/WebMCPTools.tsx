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

    const startLoading = () => {
      cleanup();
      setShouldLoad(true);
    };

    const cleanup = () => {
      window.removeEventListener('load', scheduleLoad);
      window.removeEventListener('pointerdown', startLoading);
      window.removeEventListener('keydown', startLoading);
      window.removeEventListener('scroll', startLoading);
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };

    const scheduleLoad = () => {
      // Listen for early user interaction to load WebMCP immediately when needed
      window.addEventListener('pointerdown', startLoading, {
        once: true,
        passive: true,
      });
      window.addEventListener('keydown', startLoading, {
        once: true,
        passive: true,
      });
      window.addEventListener('scroll', startLoading, {
        once: true,
        passive: true,
      });

      // Otherwise defer until well after critical rendering/LCP settles
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(startLoading, {
          timeout: 10000,
        });
      } else {
        timeoutId = setTimeout(startLoading, 8000);
      }
    };

    if (document.readyState === 'complete') {
      scheduleLoad();
    } else {
      window.addEventListener('load', scheduleLoad, { once: true });
    }

    return cleanup;
  }, []);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <WebMCPToolsInner />
    </Suspense>
  );
};
