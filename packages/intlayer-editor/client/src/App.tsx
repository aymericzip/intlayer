import type { FunctionComponent } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { IntlayerProviderContent } from 'preact-intlayer';
import { AppProvider } from './components/AppProvider';
import { EditorLayout } from './components/Editor/EditorLayout';
import { EditorProvider } from './components/Editor/EditorProvider';
import { HostFrameBridge } from './components/Editor/HostFrameBridge';
import { IframeController } from './components/Editor/IframeController';

const AppContent: FunctionComponent = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /**
   * Path the application frame opens on. Read once: the frame navigates on its
   * own afterwards, and the editor URL is only mirrored with `replaceState`.
   */
  const [applicationPath] = useState(() => window.location.pathname);

  return (
    <EditorProvider iframeRef={iframeRef}>
      <HostFrameBridge />
      <IntlayerProviderContent>
        <EditorLayout>
          <IframeController
            iframeRef={iframeRef}
            applicationPath={applicationPath}
          />
        </EditorLayout>
      </IntlayerProviderContent>
    </EditorProvider>
  );
};

export const App: FunctionComponent = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);
