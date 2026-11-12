import type { ResolvedTheme } from '@intlayer/design-system/providers';
import { MessageKey } from '@intlayer/editor-react';
import { useEffect, useState } from 'preact/hooks';
import { getTrustedHostOrigin } from './HostFrameBridge';

/** Query parameter carrying the host theme on the first paint. */
const THEME_QUERY_PARAMETER = 'theme';

const isResolvedTheme = (value: unknown): value is ResolvedTheme =>
  value === 'light' || value === 'dark';

const getInitialHostTheme = (): ResolvedTheme | undefined => {
  const theme = new URLSearchParams(window.location.search).get(
    THEME_QUERY_PARAMETER
  );

  return isResolvedTheme(theme) ? theme : undefined;
};

/**
 * Theme of the IDE embedding the editor: the `theme` query parameter, then
 * the changes the host posts. `undefined` outside an IDE (the editor then
 * follows the user preference).
 */
export const useHostTheme = (): ResolvedTheme | undefined => {
  const [hostTheme, setHostTheme] = useState(getInitialHostTheme);

  useEffect(() => {
    const hostOrigin = getTrustedHostOrigin();

    if (!hostOrigin) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== hostOrigin || event.source !== window.parent) return;
      if (event.data?.type !== MessageKey.INTLAYER_HOST_THEME_CHANGED) return;
      if (!isResolvedTheme(event.data.theme)) return;

      setHostTheme(event.data.theme);
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return hostTheme;
};
