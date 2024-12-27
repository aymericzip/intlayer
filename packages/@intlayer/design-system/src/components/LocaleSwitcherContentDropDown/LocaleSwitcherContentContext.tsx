'use client';

import { Locales } from 'intlayer';
import {
  createContext,
  useContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  type FC,
} from 'react';
// @ts-ignore react-intlayer not build yet
import { useLocale } from 'react-intlayer';
import { usePersistedStore } from '../../hooks';

type LocaleSwitcherContentContextProps = {
  availableLocales: Locales[];
  selectedLocales: Locales[];
  setSelectedLocales: Dispatch<SetStateAction<Locales[]>>;
};

const LocaleSwitcherContentContext =
  createContext<LocaleSwitcherContentContextProps>({
    availableLocales: [],
    selectedLocales: [],
    setSelectedLocales: () => {},
  });

export const useLocaleSwitcherContent = () =>
  useContext(LocaleSwitcherContentContext);

type LocaleSwitcherContentProviderProps = {
  availableLocales: Locales[];
  defaultSelectedLocales?: Locales[];
};

export const LocaleSwitcherContentProvider: FC<
  PropsWithChildren<LocaleSwitcherContentProviderProps>
> = ({ availableLocales, defaultSelectedLocales, children }) => {
  const { locale } = useLocale();

  const [selectedLocales, setSelectedLocales] = usePersistedStore<Locales[]>(
    'locale-content-selector-selected-locales',
    defaultSelectedLocales ?? [locale]
  );

  return (
    <LocaleSwitcherContentContext.Provider
      value={{
        availableLocales,
        selectedLocales,
        setSelectedLocales,
      }}
    >
      {children}
    </LocaleSwitcherContentContext.Provider>
  );
};
