'use client';

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

type FrameworkContextValue = {
  framework: Framework;
  setFramework: (framework: Framework) => void;
};

const FrameworkContext = createContext<FrameworkContextValue>({
  framework: 'next',
  setFramework: () => {},
});

export const FrameworkProvider: FC<PropsWithChildren> = ({ children }) => {
  const [framework, setFramework] = usePersistedStore<Framework>(
    'landing-framework',
    'next'
  );

  return (
    <FrameworkContext.Provider
      value={{ framework: framework ?? 'next', setFramework }}
    >
      {children}
    </FrameworkContext.Provider>
  );
};

export const useFramework = () => useContext(FrameworkContext);
