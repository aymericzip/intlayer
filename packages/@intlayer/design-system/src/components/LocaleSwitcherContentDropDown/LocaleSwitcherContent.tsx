'use client';

import { usePersistedStore } from '@hooks/usePersistedStore';
import { getHTMLTextDir, getLocaleName } from '@intlayer/core';
import { Locales, type LocalesValues } from '@intlayer/types';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { Check, Globe, MoveVertical } from 'lucide-react';
import { type FC, useMemo, useRef, useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
} from '../Button';
import { Container } from '../Container';
import { DropDown, type PanelProps } from '../DropDown';
import { Input } from '../Input';
import {
  SwitchSelector,
  SwitchSelectorColor,
  SwitchSelectorSize,
} from '../SwitchSelector';
import { useLocaleSwitcherContent } from './LocaleSwitcherContentContext';

export type LocaleSwitcherContentProps = {
  panelProps?: Omit<PanelProps, 'identifier'>;
  isMultilingual?: boolean;
};

const DROPDOWN_IDENTIFIER = 'locale-switcher-content';

type MultilingualAvailableLocales = {
  locale: LocalesValues;
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
  } = useIntlayer('locale-switcher-content');
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale } = useLocale();
  const { availableLocales, selectedLocales, setSelectedLocales } =
    useLocaleSwitcherContent();

  // 1. Memoize the list construction so it doesn't rebuild every render
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

  // 2. State for Search Query only (Source of Truth)
  const [searchQuery, setSearchQuery] = useState('');

  const [seeAllLocales, setSeeAllLocales] = usePersistedStore(
    'locale-content-selector-see-all-locales',
    false
  );

  // 3. Memoize Fuse instance
  const fuse = useMemo(() => {
    const fuseOptions: IFuseOptions<MultilingualAvailableLocales> = {
      keys: [
        { name: 'ownLocaleName', weight: 0.4 },
        { name: 'englishName', weight: 0.2 },
        { name: 'currentLocaleName', weight: 0.2 },
        { name: 'locale', weight: 0.2 },
      ],
      threshold: 0.02,
    };
    return new Fuse(multilingualAvailableLocales, fuseOptions);
  }, [multilingualAvailableLocales]);

  // 4. Derive results from Search Query
  const results = useMemo(() => {
    if (!searchQuery) {
      return multilingualAvailableLocales;
    }
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery, multilingualAvailableLocales, fuse]);

  const handleClickLocale = (localeItem: LocalesValues) => {
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
    <div className="rounded-xl border border-text text-text transition-colors">
      <DropDown identifier={DROPDOWN_IDENTIFIER}>
        <DropDown.Trigger
          identifier={DROPDOWN_IDENTIFIER}
          label={localeSwitcherLabel.value}
          className="p-0!"
          roundedSize="3xl"
        >
          <div className="flex w-full items-center justify-between">
            <div className="px-2 py-1">
              <Globe size={16} />
            </div>
            <MoveVertical className="self-center" size={16} />
          </div>
        </DropDown.Trigger>

        <DropDown.Panel
          identifier={DROPDOWN_IDENTIFIER}
          isOverable
          isFocusable
          className="right-0 left-auto"
          {...panelProps}
        >
          <Container
            className="max-h-[60vh] min-w-28"
            separator="y"
            role="listbox"
            transparency="sm"
            border
            roundedSize="2xl"
            borderColor="text"
            aria-label={languageListLabel.value}
          >
            {isMultilingual && (
              <div className="m-auto p-2">
                <SwitchSelector
                  defaultValue={seeAllLocales} // Ensure this uses the persisted state
                  onChange={handleSeeAllLocales}
                  color={SwitchSelectorColor.TEXT}
                  size={SwitchSelectorSize.SM}
                  className="!w-60"
                  choices={[
                    {
                      content: seeAllLocalesSwitch.true.value,
                      value: true,
                    },
                    {
                      content: seeAllLocalesSwitch.false.value,
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
                    aria-label={searchInput.ariaLabel.value}
                    placeholder={searchInput.placeholder.value}
                    // Update search query state directly
                    onChange={(e) => setSearchQuery(e.target.value)}
                    ref={inputRef}
                  />
                </div>
                <ol className="divide-y divide-dashed divide-text/20 overflow-y-auto p-1">
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
                          variant={ButtonVariant.HOVERABLE}
                          color={ButtonColor.TEXT}
                          isFullWidth
                          textAlign={ButtonTextAlign.LEFT}
                          size={ButtonSize.SM}
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
                                <span className="text-neutral text-xs">
                                  {currentLocaleName}
                                </span>
                              </div>
                              <span className="text-neutral text-sm">
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
