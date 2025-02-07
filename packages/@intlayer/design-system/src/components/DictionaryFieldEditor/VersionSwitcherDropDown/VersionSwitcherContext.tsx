'use client';

import {
  createContext,
  useContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  type FC,
} from 'react';
import { usePersistedStore } from '../../../hooks';

type VersionSwitcherContextProps = {
  availableVersions: string[];
  selectedVersion: string | null;
  setSelectedVersion: Dispatch<SetStateAction<string | null>>;
};

const VersionSwitcherContext = createContext<VersionSwitcherContextProps>({
  availableVersions: [],
  selectedVersion: null,
  setSelectedVersion: () => {},
});

export const useVersionSwitcher = () => useContext(VersionSwitcherContext);

type VersionSwitcherProviderProps = {
  availableVersions: string[];
  defaultSelectedVersion?: string;
};

export const VersionSwitcherProvider: FC<
  PropsWithChildren<VersionSwitcherProviderProps>
> = ({ availableVersions, defaultSelectedVersion, children }) => {
  const [selectedVersion, setSelectedVersion] = usePersistedStore<
    string | null
  >('version-selector', defaultSelectedVersion);

  return (
    <VersionSwitcherContext.Provider
      value={{
        availableVersions,
        selectedVersion,
        setSelectedVersion,
      }}
    >
      {children}
    </VersionSwitcherContext.Provider>
  );
};
