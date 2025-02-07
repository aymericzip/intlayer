import { type FC, useRef } from 'react';
import { IntlayerProviderContent } from 'react-intlayer';
import { useLocation } from 'react-router-dom';
import { AppProvider } from './components/AppProvider';
import { AppRouter } from './components/AppRouter';
import { EditorLayout } from './components/Editor/EditorLayout';
import { EditorProvider } from './components/Editor/EditorProvider';
import { IframeController } from './components/Editor/IframeController';

const AppContent: FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const location = useLocation();

  return (
    <EditorProvider iframeRef={iframeRef}>
      <IntlayerProviderContent disableEditor>
        <EditorLayout>
          <IframeController
            iframeRef={iframeRef}
            applicationPath={location.pathname}
          />
        </EditorLayout>
      </IntlayerProviderContent>
    </EditorProvider>
  );
};

const App: FC = () => (
  <AppRouter>
    <AppProvider>
      <AppContent />
    </AppProvider>
  </AppRouter>
);

export default App;
