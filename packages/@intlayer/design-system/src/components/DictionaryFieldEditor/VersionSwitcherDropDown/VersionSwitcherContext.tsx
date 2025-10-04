'use client';

import {
  createContext,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
} from 'react';
import { usePersistedStore } from '../../../hooks';

type VersionSwitcherContextProps = {
  versions: string[];
  selectedVersion: string | null;
  setSelectedVersion: Dispatch<SetStateAction<string | null>>;
};

const VersionSwitcherContext = createContext<VersionSwitcherContextProps>({
  versions: [],
  selectedVersion: null,
  setSelectedVersion: () => {},
});

export const useVersionSwitcher = () => useContext(VersionSwitcherContext);

type VersionSwitcherProviderProps = {
  versions: string[];
  defaultSelectedVersion?: string;
};

export const VersionSwitcherProvider: FC<
  PropsWithChildren<VersionSwitcherProviderProps>
> = ({ versions, defaultSelectedVersion, children }) => {
  const [selectedVersion, setSelectedVersion] = usePersistedStore<
    string | null
  >('version-selector', defaultSelectedVersion);

  return (
    <VersionSwitcherContext
      value={{
        versions,
        selectedVersion,
        setSelectedVersion,
      }}
    >
      {children}
    </VersionSwitcherContext>
  );
};
