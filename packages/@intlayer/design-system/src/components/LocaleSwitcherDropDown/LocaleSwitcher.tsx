'use client';

import { Locales } from '@intlayer/config/client';
import { getHTMLTextDir, getLocaleName } from '@intlayer/core';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { MoveVertical } from 'lucide-react';
import { useCallback, useMemo, useRef, useState, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { Button } from '../Button';
import { Container } from '../Container';
import { DropDown, type PanelProps } from '../DropDown';
import { Input } from '../Input';
import localeSwitcherContent from './localeSwitcher.content';

export type LocaleSwitcherProps = {
  locale?: Locales;
  localeList: Locales[];
  availableLocales?: Locales[];
  fullLocaleName?: boolean;
  setLocale: (locale: Locales) => void;
  panelProps?: Omit<PanelProps, 'identifier'>;
};

const DROPDOWN_IDENTIFIER = 'locale-switcher';

type MultilingualAvailableLocales = {
  locale: Locales;
  englishName: string;
  currentLocaleName: string;
  ownLocaleName: string;
};

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({
  locale,
  localeList,
  availableLocales,
  fullLocaleName = true,
  setLocale,
  panelProps,
}) => {
  let localeName = 'Select a locale';
  const { switchTo, searchInput, localeSwitcherLabel, languageListLabel } =
    useDictionary(localeSwitcherContent);
  const inputRef = useRef<HTMLInputElement>(null);

  const multilingualAvailableLocales: MultilingualAvailableLocales[] = useMemo(
    () =>
      localeList.map((localeEl) => {
        const englishName = getLocaleName(localeEl, Locales.ENGLISH);
        const currentLocaleName = getLocaleName(localeEl, locale);
        const ownLocaleName = getLocaleName(localeEl);
        return {
          locale: localeEl,
          englishName,
          currentLocaleName,
          ownLocaleName,
        };
      }),
    [localeList, locale]
  );

  const [results, setResults] = useState<MultilingualAvailableLocales[]>(
    multilingualAvailableLocales
  );

  // Create a new Fuse instance with the options and documentation data
  const fuse = useMemo(() => {
    const fuseOptions: IFuseOptions<MultilingualAvailableLocales> = {
      keys: [
        { name: 'ownLocaleName', weight: 0.4 },
        { name: 'englishName', weight: 0.2 },
        { name: 'currentLocaleName', weight: 0.2 },
        { name: 'locale', weight: 0.2 },
      ],
      threshold: 0.02, // Defines how fuzzy the matching should be (lower is more strict)
    };

    return new Fuse(multilingualAvailableLocales, fuseOptions);
  }, [multilingualAvailableLocales]);

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (searchQuery) {
        // Perform search on every input change
        const searchResults = fuse
          .search(searchQuery)
          .map((result) => result.item);
        setResults(searchResults);
      } else {
        setResults(multilingualAvailableLocales);
      }
    },
    [fuse, multilingualAvailableLocales]
  );

  if (locale) {
    localeName = fullLocaleName ? getLocaleName(locale) : locale.toUpperCase();
  }

  return (
    <div
      className="border-text text-text rounded-xl border transition-colors"
      aria-label={localeSwitcherLabel.value}
    >
      <DropDown identifier={DROPDOWN_IDENTIFIER}>
        <DropDown.Trigger identifier={DROPDOWN_IDENTIFIER}>
          <div className="flex w-full items-center justify-between">
            <div className="text-nowrap px-2">{localeName}</div>
            <MoveVertical className="w-5 self-center" />
          </div>
        </DropDown.Trigger>

        <DropDown.Panel
          identifier={DROPDOWN_IDENTIFIER}
          isOverable
          isFocusable
          {...panelProps}
        >
          <Container
            className="max-h-[80vh] min-w-28"
            separator="y"
            role="listbox"
            transparency="sm"
            aria-label={languageListLabel.value}
          >
            <div className="p-3">
              <Input
                type="search"
                aria-label={searchInput.ariaLabel.value}
                placeholder={searchInput.placeholder.value}
                onChange={(e) => handleSearch(e.target.value)}
                ref={inputRef}
              />
            </div>
            <ol className="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
              {results.map(
                ({ locale: localeItem, currentLocaleName, ownLocaleName }) => (
                  <li className="px-1.5 py-1" key={localeItem}>
                    <Button
                      onClick={() => setLocale(localeItem)}
                      label={`${switchTo} ${currentLocaleName}`}
                      disabled={
                        !(availableLocales ?? localeList).includes(localeItem)
                      }
                      isActive={locale === localeItem}
                      variant="hoverable"
                      color="text"
                      isFullWidth
                      textAlign="left"
                    >
                      <div className="flex flex-row items-center justify-between gap-3 px-2 py-1">
                        <div className="flex flex-col text-nowrap">
                          <span
                            dir={getHTMLTextDir(localeItem)}
                            lang={localeItem}
                          >
                            {ownLocaleName}
                          </span>
                          <span className="text-neutral text-xs">
                            {currentLocaleName}
                          </span>
                        </div>
                        <span className="text-neutral text-sm">
                          {localeItem.toUpperCase()}
                        </span>
                      </div>
                    </Button>
                  </li>
                )
              )}
            </ol>
          </Container>
        </DropDown.Panel>
      </DropDown>
    </div>
  );
};
