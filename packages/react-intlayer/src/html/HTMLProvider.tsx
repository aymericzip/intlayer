'use client';

import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
} from 'react';
import type { HTMLComponents } from './HTMLComponentTypes';

type HTMLContextValue = {
  components?: HTMLComponents<'permissive', {}>;
};

type HTMLProviderProps = PropsWithChildren<{
  /**
   * Component overrides for HTML tags.
   */
  components?: HTMLComponents<'permissive', {}>;
}>;

const HTMLContext = createContext<HTMLContextValue | undefined>(undefined);

export const useHTMLContext = () => useContext(HTMLContext);

export const HTMLProvider: FC<HTMLProviderProps> = ({
  children,
  components,
}) => (
  <HTMLContext.Provider value={{ components }}>{children}</HTMLContext.Provider>
);
