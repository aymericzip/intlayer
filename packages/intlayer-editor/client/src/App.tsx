import { ThemeProvider } from '@intlayer/design-system/providers';
import type { FunctionComponent } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { IntlayerProviderContent } from 'preact-intlayer';
import { AppProvider } from './components/AppProvider';
import { EditorLayout } from './components/Editor/EditorLayout';
import { EditorProvider } from './components/Editor/EditorProvider';
import { HostFrameBridge } from './components/Editor/HostFrameBridge';
import { IframeController } from './components/Editor/IframeController';
import { useHostTheme } from './components/Editor/useHostTheme';

/**
 * Query parameter showing the browser bar around the application frame, for
 * hosts without an address bar of their own (e.g. the VS Code extension panel).
 */
const BROWSER_QUERY_PARAMETER = 'browser';

const getIsBrowserVisible = (): boolean => {
  const value = new URLSearchParams(window.location.search).get(
    BROWSER_QUERY_PARAMETER
  );

  return value !== null && value !== 'false';
};

const AppContent: FunctionComponent = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /**
   * Path the application frame opens on. Read once: the frame navigates on its
   * own afterwards, and the editor URL is only mirrored with `replaceState`.
   */
  const [applicationPath] = useState(() => window.location.pathname);
  const [isBrowserVisible] = useState(getIsBrowserVisible);

  return (
    <EditorProvider iframeRef={iframeRef}>
      <HostFrameBridge />
      <IntlayerProviderContent>
        <EditorLayout>
          <IframeController
            iframeRef={iframeRef}
            applicationPath={applicationPath}
            isBrowserVisible={isBrowserVisible}
          />
        </EditorLayout>
      </IntlayerProviderContent>
    </EditorProvider>
  );
};

export const App: FunctionComponent = () => {
  const hostTheme = useHostTheme();

  return (
    // Client-only page: no pre-hydration bootstrap to render
    <ThemeProvider forcedTheme={hostTheme} hasBootstrapScript={false}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
};
