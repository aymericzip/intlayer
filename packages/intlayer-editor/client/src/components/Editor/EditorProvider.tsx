import { Loader } from '@intlayer/design-system/loader';
import { EditorProvider as EditorProviderComponent } from '@intlayer/editor-react';
import type { FunctionComponent, RefObject } from 'preact';
import { useCallback, useMemo } from 'preact/hooks';
import { IntlayerProviderContent } from 'preact-intlayer';
import { useApplicationStatus } from '../../hooks/useApplicationStatus';
import { useIntlayerConfig } from '../../hooks/useIntlayerConfig';
import { ApplicationNotRunningView } from './ApplicationNotRunningView/ApplicationNotRunningView';

/**
 * Provider that store the current locale on the client side
 */
export const EditorProvider: FunctionComponent<{
  iframeRef: RefObject<HTMLIFrameElement | null>;
}> = ({ children, iframeRef }) => {
  const intlayerConfig = useIntlayerConfig();
  const applicationURL = intlayerConfig?.editor.applicationURL;
  const { isChecking, isRunning, errorMessage, retry } =
    useApplicationStatus(applicationURL);

  const postMessage = useCallback(
    (data: unknown) => {
      iframeRef.current?.contentWindow?.postMessage(
        data,
        // Use to restrict the origin of the editor for security reasons.
        // Correspond to the current editor URL.
        applicationURL!
      );
    },
    [iframeRef, applicationURL]
  );

  const allowedOrigins = useMemo(() => [applicationURL!], [applicationURL]);

  if (!intlayerConfig) return <Loader />;

  // Without an application URL, the iframe controller renders its own guidance
  if (applicationURL && isChecking) return <Loader />;

  // The editor is not mounted: no frame to load, no handshake to post
  if (applicationURL && !isRunning) {
    return (
      <IntlayerProviderContent>
        <ApplicationNotRunningView
          applicationURL={applicationURL}
          errorMessage={errorMessage}
          onRetry={() => retry()}
        />
      </IntlayerProviderContent>
    );
  }

  return (
    <EditorProviderComponent
      postMessage={postMessage}
      allowedOrigins={allowedOrigins}
      configuration={intlayerConfig}
    >
      {children}
    </EditorProviderComponent>
  );
};
