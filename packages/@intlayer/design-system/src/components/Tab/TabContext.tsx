'use client';

import {
  createContext,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useState,
} from 'react';

type TabContextValue = {
  tabsValues: Record<string, any>;
  setTabsValues: Dispatch<SetStateAction<Record<string, any>>>;
};

/**
 * Context that store the current locale on the client side
 */
export const TabContext = createContext<TabContextValue>({
  tabsValues: {},
  setTabsValues: (() => {}) as Dispatch<SetStateAction<Record<string, any>>>,
});

/**
 * Hook that provides the current locale
 */
export const useTabContext = () => useContext(TabContext);

/**
 * Provider that store the current locale on the client side
 */
export const TabProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tabsValues, setTabsValues] = useState<Record<string, any>>({});

  return (
    <TabContext
      value={{
        tabsValues,
        setTabsValues,
      }}
    >
      {children}
    </TabContext>
  );
};
