'use client';

import { getConfiguration } from '@intlayer/config/client';
import {
  type PropsWithChildren,
  createContext,
  useContext,
  type FC,
  useMemo,
} from 'react';

type IntlayerEditorValue = {
  editorEnabled: boolean;
};

/**
 * Context that store the current locale on the client side
 */
export const IntlayerEditorContext = createContext<IntlayerEditorValue>({
  editorEnabled: false,
});

/**
 * Hook that provides the current locale
 */
export const useIntlayerEditorContext = () => useContext(IntlayerEditorContext);

export type IntlayerEditorProviderProps = PropsWithChildren<{
  editorEnabled?: boolean;
}>;

const {
  editor: { enabled },
} = getConfiguration();

/**
 * Provider that store the current locale on the client side
 */
export const IntlayerEditorProvider: FC<IntlayerEditorProviderProps> = ({
  children,
  editorEnabled = enabled,
}) => {
  const memoValue = useMemo(
    () => ({
      editorEnabled,
    }),
    [editorEnabled]
  );

  return (
    <IntlayerEditorContext.Provider value={memoValue}>
      {children}
    </IntlayerEditorContext.Provider>
  );
};
