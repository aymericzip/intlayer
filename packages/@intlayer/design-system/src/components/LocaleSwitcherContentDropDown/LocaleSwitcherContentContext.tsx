'use client';

import { usePersistedStore } from '@hooks/usePersistedStore';
import type { LocalesValues } from 'intlayer';
import {
  createContext,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
} from 'react';
import { useLocale } from 'react-intlayer';

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
