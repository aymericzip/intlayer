'use client';

import { useSession } from '@intlayer/design-system/hooks';
import { EditorProvider as EditorProviderComponent } from '@intlayer/editor-react';
import type { IntlayerConfig } from '@intlayer/types';
import {
  type FC,
  type PropsWithChildren,
  type RefObject,
  useEffect,
  useState,
} from 'react';
import { ApplicationNotRunningView } from './ApplicationNotRunningView/ApplicationNotRunningView';
import { CheckingApplicationStatusView } from './ChekingApplicationStatutView/ChekingApplicationStatutView';
import { NoApplicationURLView } from './NoApplicationURLView/NoApplicationURLView';

type EditorProviderProps = {
  iframeRef: RefObject<HTMLIFrameElement | null>;
  configuration?: IntlayerConfig;
};

/**
 * Provider that store the current locale on the client side
 */
export const EditorProvider: FC<PropsWithChildren<EditorProviderProps>> = ({
  children,
  iframeRef,
  configuration,
}) => {
  const { session } = useSession();
  const intlayerConfig =
    configuration ?? (session?.project?.configuration as IntlayerConfig);
  const applicationURL = intlayerConfig?.editor.applicationURL;
  const [isApplicationRunning, setIsApplicationRunning] = useState<
    boolean | null
  >(null);

  // Health check for the application URL
  useEffect(() => {
    if (!intlayerConfig) {
      setIsApplicationRunning(false);
      return;
    }

    const checkApplicationHealth = async () => {
      try {
        const response = await fetch(applicationURL, {
          method: 'HEAD', // Use HEAD to avoid downloading the full page
        });

        setIsApplicationRunning(response.ok);
      } catch (error) {
        console.warn(
          'Application URL is not responding:',
          applicationURL,
          error
        );
        setIsApplicationRunning(false);
      }
    };

    checkApplicationHealth();
  }, [applicationURL, intlayerConfig]);

  if (!intlayerConfig) {
    return <NoApplicationURLView />;
  }

  // Show loading state while checking application health
  if (isApplicationRunning === null) {
    return <CheckingApplicationStatusView />;
  }

  // Show application not running view if the application is not responding
  if (!isApplicationRunning) {
    return <ApplicationNotRunningView />;
  }

  return (
    <EditorProviderComponent
      postMessage={(data) => {
        iframeRef.current?.contentWindow?.postMessage(
          data,
          // Use to restrict the origin of the editor for security reasons.
          // Correspond to the current editor URL.
          applicationURL
        );
      }}
      allowedOrigins={[applicationURL]}
      mode="editor"
      configuration={intlayerConfig}
    >
      {children}
    </EditorProviderComponent>
  );
};
