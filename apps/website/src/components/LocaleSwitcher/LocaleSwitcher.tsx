'use client';

import { Link } from '@components/Link/Link';
import { getHTMLTextDir, getLocaleName } from '@intlayer/core';
import {
  DropDown,
  Input,
  type PanelProps,
  Container,
} from '@intlayer/design-system';
import Fuse, { IFuseOptions } from 'fuse.js';
import { Locales } from 'intlayer';
import { MoveVertical } from 'lucide-react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { useCallback, useMemo, useRef, useState, type FC } from 'react';

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
  fullLocaleName = false,
  panelProps,
}) => {
  let localeName = 'Select a locale';
  const { switchTo, searchInput, localeSwitcherLabel, languageListLabel } =
    useIntlayer('locale-switcher');
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  const multilingualAvailableLocales: MultilingualAvailableLocales[] = useMemo(
    () =>
      availableLocales.map((localeEl) => {
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
    [locale, availableLocales]
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
      className="border-text text-text dark:border-text-dark dark:text-text-dark rounded-xl border transition-colors"
      aria-label={localeSwitcherLabel}
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
                placeholder={searchInput.placeholder.value}
                onChange={(e) => handleSearch(e.target.value)}
                ref={inputRef}
              />
            </div>
            <ol className="divide-text/20 dark:divide-text-dark/20 divide-y divide-dashed overflow-y-auto p-1">
              {results.map(
                ({ locale: localeItem, currentLocaleName, ownLocaleName }) => (
                  <li className="py-1 pr-1.5" key={localeItem}>
                    <Link
                      label={`${switchTo.value} ${currentLocaleName}`}
                      role="option"
                      href={pathWithoutLocale}
                      locale={localeItem}
                      isActive={locale === localeItem}
                      variant="hoverable"
                      color="text"
                      onClick={(e) => {
                        e.preventDefault();
                        setLocale(localeItem);
                      }}
                    >
                      <div
                        className="flex flex-row items-center justify-between gap-3 px-2 py-1"
                        key={locale}
                      >
                        <div className="flex flex-col text-nowrap">
                          <span
                            dir={getHTMLTextDir(localeItem)}
                            lang={localeItem}
                          >
                            {ownLocaleName}
                          </span>
                          <span className="text-neutral dark:text-neutral-dark text-xs">
                            {currentLocaleName}
                          </span>
                        </div>
                        <span className="text-neutral dark:text-neutral-dark text-sm">
                          {localeItem.toUpperCase()}
                        </span>
                      </div>
                    </Link>
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
