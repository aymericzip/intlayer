'use client';

import { MessageKey } from '@intlayer/editor';
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
} from 'preact/compat';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';
import {
  type CrossFrameStateOptions,
  useCrossFrameState,
} from './useCrossFrameState';

export type EditorEnabledStateProps = {
  enabled: boolean;
};

const EditorEnabledContext = createContext<EditorEnabledStateProps>({
  enabled: false,
});

export const useEditorEnabledState = (options?: CrossFrameStateOptions) =>
  useCrossFrameState(MessageKey.INTLAYER_EDITOR_ENABLED, false, options);

export const usePostEditorEnabledState = <S,>(
  onEventTriggered?: (data: S) => void
) =>
  useCrossFrameMessageListener(
    `${MessageKey.INTLAYER_EDITOR_ENABLED}/post`,
    onEventTriggered
  );

export const useGetEditorEnabledState = <S,>(
  onEventTriggered?: (data: S) => void
) =>
  useCrossFrameMessageListener(
    `${MessageKey.INTLAYER_EDITOR_ENABLED}/get`,
    onEventTriggered
  );

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
