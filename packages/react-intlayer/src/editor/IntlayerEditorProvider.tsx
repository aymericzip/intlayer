/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { getConfiguration } from '@intlayer/config/client';
import dictionaries from '@intlayer/dictionaries-entry';
import {
  EditorProvider,
  useCrossURLPathState,
  useDictionariesRecordActions,
  useConfigurationActions,
  useIframeClickInterceptor,
} from '@intlayer/editor-react';
import { useEffect, type FC, type PropsWithChildren } from 'react';

/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
const IntlayerEditorProviderEnabled: FC = () => {
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
  const { setConfiguration } = useConfigurationActions();
  const { setLocaleDictionaries } = useDictionariesRecordActions();

  useEffect(() => {
    setLocaleDictionaries(dictionaries);

    const config = getConfiguration();
    setConfiguration(config);
  }, [setLocaleDictionaries]);

  /**
   * Click Messages
   */
  useIframeClickInterceptor();

  return <></>;
};

export const IntlayerEditorProvider: FC<PropsWithChildren> = ({ children }) => {
  const postMessage = (data: any) => {
    window.parent?.postMessage(data, '*');
  };

  return (
    <EditorProvider postMessage={postMessage} allowedOrigins={['*']}>
      <IntlayerEditorProviderEnabled />
      {children}
    </EditorProvider>
  );
};
