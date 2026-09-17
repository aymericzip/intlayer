import type { ModelContext, ModelContextHost } from './types';

/**
 * Resolves the WebMCP entry point exposed by the current browser, if any.
 *
 * Candidates are probed in order: `navigator.modelContextTesting` (Chrome with
 * the `#enable-webmcp-testing` flag), `navigator.modelContext` (Chrome early
 * preview / origin trial) and `document.modelContext` (W3C draft). Only an
 * object able to register tools is returned, so callers can rely on
 * `registerTool` being present.
 *
 * @returns The model context, or `null` outside a supporting browser.
 */
export const getModelContext = (): ModelContext | null => {
  if (typeof navigator === 'undefined') return null;

  const navigatorHost = navigator as Navigator & ModelContextHost;
  const documentHost =
    typeof document === 'undefined'
      ? undefined
      : (document as Document & ModelContextHost);

  const candidates: (ModelContext | undefined)[] = [
    navigatorHost.modelContextTesting,
    navigatorHost.modelContext,
    documentHost?.modelContext,
  ];

  return (
    candidates.find(
      (candidate) => typeof candidate?.registerTool === 'function'
    ) ?? null
  );
};

/** Whether the current browser exposes a usable WebMCP entry point. */
export const isWebMCPAvailable = (): boolean => getModelContext() !== null;
