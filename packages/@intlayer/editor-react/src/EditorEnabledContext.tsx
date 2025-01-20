'use client';

import {
  createContext,
  useContext,
  type FC,
  type PropsWithChildren,
} from 'react';
import {
  CrossFrameStateOptions,
  useCrossFrameState,
} from './useCrossFrameState';

export type EditorEnabledStateProps = {
  enabled: boolean;
};

const EditorEnabledContext = createContext<EditorEnabledStateProps | undefined>(
  undefined
);

export const useEditorEnabledState = (options?: CrossFrameStateOptions) =>
  useCrossFrameState('INTLAYER_EDITOR_ENABLED', false, options);

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

export const useEditorEnabled = () => {
  const context = useContext(EditorEnabledContext);

  if (!context) {
    throw new Error('useEditorEnabled must be used within a EnabledProvider');
  }
  return context;
};
