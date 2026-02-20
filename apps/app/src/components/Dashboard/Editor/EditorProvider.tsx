'use client';

import { useSession } from '@intlayer/design-system/hooks';
import { EditorProvider as EditorProviderComponent } from '@intlayer/editor-react';
import type { IntlayerConfig } from '@intlayer/types';
import { useQuery } from '@tanstack/react-query';
import type { FC, PropsWithChildren, RefObject } from 'react';
import { ApplicationNotRunningView } from './ApplicationNotRunningView/ApplicationNotRunningView';
import { CheckingApplicationStatusView } from './CheckingApplicationStatusView/CheckingApplicationStatusView';
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

  // Health check for the application URL using react-query
  const { data: isApplicationRunning, isPending } = useQuery({
    queryKey: ['application-health', applicationURL],
    queryFn: async () => {
      if (!applicationURL) return false;
      try {
        const response = await fetch(applicationURL, {
          method: 'HEAD', // Use HEAD to avoid downloading the full page
        });
        return response.ok;
      } catch (error) {
        console.warn(
          'Application URL is not responding:',
          applicationURL,
          error
        );
        return false;
      }
    },
    enabled: Boolean(intlayerConfig && applicationURL),
    staleTime: 30 * 1000, // Cache for 30 seconds
    retry: 1,
  });

  if (!intlayerConfig) {
    return <NoApplicationURLView />;
  }

  // Show loading state while checking application health
  if (isPending) {
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
