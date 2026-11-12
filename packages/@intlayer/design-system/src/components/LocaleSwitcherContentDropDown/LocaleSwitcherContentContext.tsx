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
  useEffect,
  useMemo,
} from 'react';
import { useLocale } from 'react-intlayer';
import { resolveSelectedLocales } from './resolveSelectedLocales';

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

  const [storedLocales, setSelectedLocales] = usePersistedStore<
    LocalesValues[]
  >(
    'locale-content-selector-selected-locales',
    defaultSelectedLocales ?? [locale]
  );

  // A stored `[]` (written while the available locales were still loading, or
  // by another provider sharing the key) rendered every translation empty
  const selectedLocales = useMemo(
    () =>
      resolveSelectedLocales(
        storedLocales,
        availableLocales,
        defaultSelectedLocales,
        locale
      ),
    [storedLocales, availableLocales, defaultSelectedLocales, locale]
  );

  // Heal the store so updaters (toggle, reorder) start from the visible list
  useEffect(() => {
    if (!availableLocales.length) return;
    if (JSON.stringify(selectedLocales) === JSON.stringify(storedLocales)) {
      return;
    }

    setSelectedLocales(selectedLocales);
  }, [availableLocales, selectedLocales, storedLocales, setSelectedLocales]);

  const contextValue = useMemo(
    () => ({ availableLocales, selectedLocales, setSelectedLocales }),
    [availableLocales, selectedLocales, setSelectedLocales]
  );

  return (
    <LocaleSwitcherContentContext value={contextValue}>
      {children}
    </LocaleSwitcherContentContext>
  );
};
