import { useSession } from '@intlayer/design-system/api';
import { EditorProvider as EditorProviderComponent } from '@intlayer/editor-react';
import type { IntlayerConfig } from '@intlayer/types/config';
import { useQuery } from '@tanstack/react-query';
import type { FC, PropsWithChildren, RefObject } from 'react';
import { ApplicationNotRunningView } from './ApplicationNotRunningView/ApplicationNotRunningView';
import { CheckingApplicationStatusView } from './CheckingApplicationStatusView/CheckingApplicationStatusView';
import { NoApplicationURLView } from './NoApplicationURLView/NoApplicationURLView';

type EditorProviderProps = {
  iframeRef: RefObject<HTMLIFrameElement | null>;
  configuration?: Pick<IntlayerConfig, 'editor' | 'internationalization'>;
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
  const applicationURL = intlayerConfig?.editor?.applicationURL;

  // Health check for the application URL using react-query
  const { data, isPending } = useQuery({
    queryKey: ['application-health', applicationURL],
    queryFn: async () => {
      if (!applicationURL) {
        return {
          isRunning: false,
          error: {
            type: 'connect' as const,
            message: 'No application URL configured',
          },
        };
      }
      try {
        const response = await fetch(applicationURL, {
          method: 'HEAD', // Use HEAD to avoid downloading the full page
        });
        if (!response.ok) {
          return {
            isRunning: false,
            error: {
              type: 'fetch' as const,
              status: response.status,
              statusText: response.statusText,
            },
          };
        }
        return { isRunning: true, error: undefined };
      } catch (error) {
        console.warn(
          'Application URL is not responding:',
          applicationURL,
          error
        );
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        return {
          isRunning: false,
          error: {
            type: 'connect' as const,
            message: errorMessage,
          },
        };
      }
    },
    enabled: Boolean(intlayerConfig && applicationURL),
    retry: 1,
  });

  const isApplicationRunning = data?.isRunning;
  const connectionError = data?.error;

  if (!intlayerConfig || !applicationURL) {
    return <NoApplicationURLView />;
  }

  // Show loading state while checking application health
  if (isPending) {
    return <CheckingApplicationStatusView />;
  }

  // Show application not running view if the application is not responding
  if (!isApplicationRunning) {
    return (
      <ApplicationNotRunningView
        applicationUrl={applicationURL}
        editorUrl={intlayerConfig.editor?.cmsURL}
        errors={connectionError ? [connectionError] : undefined}
      />
    );
  }

  return (
    <EditorProviderComponent
      postMessage={(data) => {
        iframeRef.current?.contentWindow?.postMessage(
          data,
          // Use to restrict the origin of the editor for security reasons.
          // Correspond to the current editor URL.
          applicationURL!
        );
      }}
      allowedOrigins={[applicationURL!]}
      configuration={intlayerConfig}
    >
      {children}
    </EditorProviderComponent>
  );
};
