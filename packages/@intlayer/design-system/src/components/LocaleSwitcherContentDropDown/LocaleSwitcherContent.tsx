'use client';

import { Locales } from '@intlayer/config/client';
import { getHTMLTextDir, getLocaleName } from '@intlayer/core';
import Fuse, { IFuseOptions } from 'fuse.js';
import { Check, Globe, MoveVertical } from 'lucide-react';
import { useCallback, useMemo, useRef, useState, type FC } from 'react';
import { useDictionary, useLocale } from 'react-intlayer';
import { usePersistedStore } from '../../hooks';
import { Button } from '../Button';
import { Container } from '../Container';
import { DropDown, type PanelProps } from '../DropDown';
import { Input } from '../Input';
import { SwitchSelector } from '../SwitchSelector';
import localeSwitcherContent from './localeSwitcher.content';
import { useLocaleSwitcherContent } from './LocaleSwitcherContentContext';

export type LocaleSwitcherContentProps = {
  panelProps?: Omit<PanelProps, 'identifier'>;
  isMultilingual?: boolean;
};

const DROPDOWN_IDENTIFIER = 'locale-switcher-content';

type MultilingualAvailableLocales = {
  locale: Locales;
  englishName: string;
  currentLocaleName: string;
  ownLocaleName: string;
};

export const LocaleSwitcherContent: FC<LocaleSwitcherContentProps> = ({
  panelProps,
  isMultilingual = true,
}) => {
  const {
    switchTo,
    searchInput,
    localeSwitcherLabel,
    languageListLabel,
    seeAllLocalesSwitch,
  } = useDictionary(localeSwitcherContent);
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale } = useLocale();
  const { availableLocales, selectedLocales, setSelectedLocales } =
    useLocaleSwitcherContent();

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
    [availableLocales, locale]
  );

  const [results, setResults] = useState<MultilingualAvailableLocales[]>(
    multilingualAvailableLocales
  );
  const [seeAllLocales, setSeeAllLocales] = usePersistedStore(
    'locale-content-selector-see-all-locales',
    false
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

  const handleClickLocale = (localeItem: Locales) => {
    if (isMultilingual) {
      if (selectedLocales.includes(localeItem)) {
        if (selectedLocales.length > 1) {
          setSelectedLocales((prev) => prev.filter((el) => el !== localeItem));
        }
      } else {
        setSelectedLocales((prev) => [...prev, localeItem]);
      }
    } else {
      setSelectedLocales([localeItem]);
    }
  };

  const handleSeeAllLocales = (value: boolean) => {
    setSeeAllLocales(value);
    if (value) {
      setSelectedLocales(availableLocales);
    } else {
      setSelectedLocales([locale]);
    }
  };

  return (
    <div
      className="border-text text-text dark:border-text-dark dark:text-text-dark rounded-xl border transition-colors"
      aria-label={localeSwitcherLabel}
    >
      <DropDown identifier={DROPDOWN_IDENTIFIER}>
        <DropDown.Trigger identifier={DROPDOWN_IDENTIFIER}>
          <div className="flex w-full items-center justify-between">
            <div className="px-2 py-1">
              <Globe size={18} />
            </div>
            <MoveVertical className="self-center" size={18} />
          </div>
        </DropDown.Trigger>

        <DropDown.Panel
          identifier={DROPDOWN_IDENTIFIER}
          isOverable
          isFocusable
          className="left-auto right-0"
          {...panelProps}
        >
          <Container
            className="max-h-[80vh] min-w-28"
            separator="y"
            role="listbox"
            transparency="sm"
            border
            roundedSize="2xl"
            borderColor="text"
            aria-label={languageListLabel}
          >
            {isMultilingual && (
              <div className="m-auto p-2">
                <SwitchSelector
                  defaultValue={false}
                  onChange={handleSeeAllLocales}
                  color="text"
                  size="sm"
                  className="!w-60"
                  choices={[
                    {
                      content: seeAllLocalesSwitch.true,
                      value: true,
                    },
                    {
                      content: seeAllLocalesSwitch.false,
                      value: false,
                    },
                  ]}
                />
              </div>
            )}

            {!(isMultilingual && seeAllLocales) && (
              <>
                <div className="p-3">
                  <Input
                    type="search"
                    placeholder={searchInput.placeholder}
                    onChange={(e) => handleSearch(e.target.value)}
                    ref={inputRef}
                  />
                </div>
                <ol className="divide-text/20 dark:divide-text-dark/20 divide-y divide-dashed overflow-y-auto p-1">
                  {results.map(
                    ({
                      locale: localeItem,
                      currentLocaleName,
                      ownLocaleName,
                    }) => (
                      <li className="px-1.5 py-1" key={localeItem}>
                        <Button
                          onClick={() => handleClickLocale(localeItem)}
                          label={`${switchTo} ${currentLocaleName}`}
                          disabled={
                            !(availableLocales ?? availableLocales).includes(
                              localeItem
                            )
                          }
                          isActive={selectedLocales.includes(localeItem)}
                          variant="hoverable"
                          color="text"
                          isFullWidth
                          textAlign="left"
                          size="sm"
                        >
                          <div className="flex flex-row items-center justify-between gap-3 px-2 py-1">
                            {isMultilingual && (
                              <div className="w-4">
                                {selectedLocales.includes(localeItem) && (
                                  <Check className="size-full" />
                                )}
                              </div>
                            )}
                            <div className="flex flex-1 flex-row items-center justify-between gap-3 px-2 py-1">
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
                          </div>
                        </Button>
                      </li>
                    )
                  )}
                </ol>
              </>
            )}
          </Container>
        </DropDown.Panel>
      </DropDown>
    </div>
  );
};
