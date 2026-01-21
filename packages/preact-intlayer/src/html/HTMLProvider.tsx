'use client';

import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
} from 'preact/compat';

type HTMLContextValue = {
  components?: Record<string, any>;
};

type HTMLProviderProps = PropsWithChildren<{
  /**
   * Component overrides for HTML tags.
   */
  components?: Record<string, any>;
}>;

const HTMLContext = createContext<HTMLContextValue | undefined>(undefined);

export const useHTMLContext = () => useContext(HTMLContext);

export const HTMLProvider: FC<HTMLProviderProps> = ({
  children,
  components,
}) => (
  <HTMLContext.Provider value={{ components }}>{children}</HTMLContext.Provider>
);
