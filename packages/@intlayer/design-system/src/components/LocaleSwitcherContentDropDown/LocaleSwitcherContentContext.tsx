'use client';

import type { LocalesValues } from 'intlayer';
import {
  createContext,
  useContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  type FC,
} from 'react';
import { useLocale } from 'react-intlayer';
import { usePersistedStore } from '../../hooks';

type LocaleSwitcherContentContextProps = {
  availableLocales: LocalesValues[];
  selectedLocales: LocalesValues[];
  setSelectedLocales: Dispatch<SetStateAction<LocalesValues[]>>;
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
  availableLocales: LocalesValues[];
  defaultSelectedLocales?: LocalesValues[];
};

export const LocaleSwitcherContentProvider: FC<
  PropsWithChildren<LocaleSwitcherContentProviderProps>
> = ({ availableLocales, defaultSelectedLocales, children }) => {
  const { locale } = useLocale();

  const [selectedLocales, setSelectedLocales] = usePersistedStore<
    LocalesValues[]
  >(
    'locale-content-selector-selected-locales',
    defaultSelectedLocales ?? [locale]
  );

  return (
    <LocaleSwitcherContentContext
      value={{
        availableLocales,
        selectedLocales,
        setSelectedLocales,
      }}
    >
      {children}
    </LocaleSwitcherContentContext>
  );
};
