import { usePersistedStore } from '@intlayer/design-system/hooks';
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
} from 'react';

export type Framework =
  | 'next'
  | 'react'
  | 'vue'
  | 'svelte'
  | 'lit'
  | 'angular'
  | 'preact'
  | 'solid'
  | 'vanilla';

export type Mode = 'centralized' | 'per-component';

type FrameworkContextValue = {
  framework: Framework;
  setFramework: (framework: Framework) => void;
  mode: Mode;
  setMode: (framework: Mode) => void;
};

const FrameworkContext = createContext<FrameworkContextValue | null>(null);

export const FrameworkProvider: FC<PropsWithChildren> = ({ children }) => {
  const [framework, setFramework] = usePersistedStore<Framework>(
    'landing-framework',
    'next'
  );
  const [mode, setMode] = usePersistedStore<Mode>(
    'landing-mode',
    'centralized'
  );

  return (
    <FrameworkContext.Provider
      value={{ framework, setFramework, mode, setMode }}
    >
      {children}
    </FrameworkContext.Provider>
  );
};

export function useFramework() {
  const context = useContext(FrameworkContext);
  if (!context)
    throw new Error(
      'useFrameworkContext must be used within FrameworkProvider'
    );
  return context;
}
