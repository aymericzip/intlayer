'use client';

import {
  createContext,
  useContext,
  type FC,
  type PropsWithChildren,
} from 'react';
import {
  type CrossFrameStateOptions,
  useCrossFrameState,
} from './useCrossFrameState';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';

export type EditorEnabledStateProps = {
  enabled: boolean;
};

const EditorEnabledContext = createContext<EditorEnabledStateProps>({
  enabled: false,
});

export const useEditorEnabledState = (options?: CrossFrameStateOptions) =>
  useCrossFrameState('INTLAYER_EDITOR_ENABLED', false, options);

export const usePostEditorEnabledState = <S,>(
  onEventTriggered?: (data: S) => void
) =>
  useCrossFrameMessageListener(
    'INTLAYER_EDITOR_ENABLED/post',
    onEventTriggered
  );

export const useGetEditorEnabledState = <S,>(
  onEventTriggered?: (data: S) => void
) =>
  useCrossFrameMessageListener('INTLAYER_EDITOR_ENABLED/get', onEventTriggered);

export const EditorEnabledProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isEnabled] = useEditorEnabledState({
    emit: false,
    receive: true,
  });

  return (
    <EditorEnabledContext.Provider value={{ enabled: isEnabled }}>
      {children}
    </EditorEnabledContext.Provider>
  );
};

export const useEditorEnabled = () => useContext(EditorEnabledContext);
