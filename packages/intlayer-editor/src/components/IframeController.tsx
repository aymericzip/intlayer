import { FC, ReactEventHandler, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EditorProvider } from '@intlayer/editor-react';

export const IframeController: FC<{
  iframeRef: React.RefObject<HTMLIFrameElement>;
}> = ({ iframeRef }) => {
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook to get the current URL
  const [iframeUrl, setIframeUrl] = useState('http://localhost:3000');

  // Update iframe URL when the application URL changes
  useEffect(() => {
    const appPath = location.pathname + location.search;
    const iframePath = new URL(iframeUrl).pathname + new URL(iframeUrl).search;

    if (appPath !== iframePath) {
      const newUrl = new URL(iframeUrl);
      newUrl.pathname = location.pathname;
      newUrl.search = location.search;
      setIframeUrl(newUrl.toString());
    }
  }, [location, iframeUrl]);

  // Handle iframe load and sync its URL with the application URL
  const handleIframeLoad: ReactEventHandler<HTMLIFrameElement> = (event) => {
    const iframeWindow = (event.target as HTMLIFrameElement).contentWindow;

    if (iframeWindow) {
      const newIframeUrl = iframeWindow.location.href;
      const appPath = location.pathname + location.search;
      const iframePath =
        new URL(newIframeUrl).pathname + new URL(newIframeUrl).search;

      if (iframePath !== appPath) {
        navigate(iframePath);
      }
    }
  };

  return (
    <EditorProvider targetWindow={iframeRef.current?.contentWindow!}>
      <div className="size-full p-2">
        <iframe
          src={iframeUrl}
          title="Intlayer Application"
          className="size-full rounded-lg"
          onLoad={handleIframeLoad}
        />
      </div>
    </EditorProvider>
  );
};
