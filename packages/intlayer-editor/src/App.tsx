import { useRef } from 'react';
import { AppLayout } from './components/AppLayout';
import { AppProvider } from './components/AppProvider';
import { AppRouter } from './components/AppRouter';
import { IframeController } from './components/IframeController';

const App = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <AppProvider iframeRef={iframeRef}>
      <AppRouter>
        <AppLayout>
          <IframeController iframeRef={iframeRef} />
        </AppLayout>
      </AppRouter>
    </AppProvider>
  );
};

export default App;
