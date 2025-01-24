/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { getConfiguration } from '@intlayer/config/client';
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import dictionaries from '@intlayer/dictionaries-entry';
import {
  EditorProvider,
  useCrossURLPathState,
  useDictionariesRecordActions,
  useConfigurationState,
  useIframeClickInterceptor,
  useEditorEnabled,
} from '@intlayer/editor-react';
import { useEffect, type FC, type PropsWithChildren } from 'react';

const IntlayerEditorHooksEnabled: FC = () => {
  /**
   * URL Messages
   */
  useCrossURLPathState(undefined, {
    receive: false,
    emit: true,
  });

  /**
   * Configuration Messages
   */
  const [, setConfiguration] = useConfigurationState();

  useEffect(() => {
    const config = getConfiguration();
    setConfiguration(config);
  }, [setConfiguration]);

  /**
   * Locale Dictionaries Messages
   */
  const { setLocaleDictionaries } = useDictionariesRecordActions();

  useEffect(() => {
    setLocaleDictionaries(dictionaries);
  }, [setLocaleDictionaries]);

  /**
   * Click Messages
   */
  useIframeClickInterceptor();

  return <></>;
};

const IntlayerEditorHook: FC = () => {
  const { enabled } = useEditorEnabled();

  return enabled ? <IntlayerEditorHooksEnabled /> : <></>;
};

export const IntlayerEditorProvider: FC<PropsWithChildren> = ({ children }) => {
  const { editor } = getConfiguration();

  return (
    <EditorProvider
      postMessage={(data: any) => {
        if (typeof window === 'undefined') return;

        window?.postMessage(
          data,
          // Use to restrict the origin of the editor for security reasons.
          // Correspond to the current application URL to synchronize the locales states.
          editor.applicationURL
        );
        window.parent?.postMessage(
          data,
          // Use to restrict the origin of the editor for security reasons.
          // Correspond to the current editor URL.
          editor.editorURL
        );
      }}
      allowedOrigins={[editor.editorURL, editor.applicationURL]}
      mode="client"
    >
      <IntlayerEditorHook />
      {children}
    </EditorProvider>
  );
};
