'use client';

import {
  createContext,
  type FunctionalComponent,
  type RenderableProps,
} from 'preact';
import { useContext } from 'preact/hooks';
import type { HTMLComponents } from './types';

type HTMLContextValue = {
  components?: HTMLComponents<'permissive', {}>;
};

type HTMLProviderProps = RenderableProps<{
  /**
   * Component overrides for HTML tags.
   */
  components?: HTMLComponents<'permissive', {}>;
}>;

const HTMLContext = createContext<HTMLContextValue | undefined>(undefined);

export const useHTMLContext = () => useContext(HTMLContext);

export const HTMLProvider: FunctionalComponent<HTMLProviderProps> = ({
  children,
  components,
}) => (
  <HTMLContext.Provider value={{ components }}>{children}</HTMLContext.Provider>
);
