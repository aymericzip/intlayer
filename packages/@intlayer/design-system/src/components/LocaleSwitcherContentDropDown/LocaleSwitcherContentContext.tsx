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

  // When availableLocales becomes non-empty (e.g. after session loads) and the
  // persisted selectedLocales contains no valid entry (e.g. was stored as []
  // when availableLocales was still empty), reset to sane defaults.
  useEffect(() => {
    if (!availableLocales.length) return;

    const hasValid = selectedLocales?.some((locales) =>
      availableLocales.includes(locales)
    );
    if (!hasValid) {
      const fallback = defaultSelectedLocales?.filter((locales) =>
        availableLocales.includes(locales)
      );
      setSelectedLocales(fallback?.length ? fallback : [locale]);
    }
  }, [availableLocales]);

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
