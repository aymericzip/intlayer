'use client';

import { usePersistedStore } from '@hooks/usePersistedStore';
import { getHTMLTextDir, getLocaleName } from '@intlayer/core/localization';
import { ENGLISH } from '@intlayer/types/locales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { cn } from '@utils/cn';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { Check, Globe, GripVertical, MoveVertical } from 'lucide-react';
import { type FC, useMemo, useRef, useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { Button, type ButtonColor, type ButtonVariant } from '../Button';
import { Container, type ContainerProps } from '../Container';
import { DropDown, type PanelProps } from '../DropDown';
import { Input } from '../Input';
import {
  type LocaleSwitcherSize,
  sizeClassNames,
} from '../LocaleSwitcherDropDown/LocaleSwitcher';
import { SwitchSelector } from '../SwitchSelector';
import { useLocaleSwitcherContent } from './LocaleSwitcherContentContext';
import {
  LOCALE_VERTICAL_DROP_ZONE_CLASS_NAME,
  useLocaleReorder,
} from './useLocaleReorder';

export type LocaleSwitcherContentProps = {
  panelProps?: Omit<PanelProps, 'identifier'>;
  isMultilingual?: boolean;
  /** Border of the locale list container. */
  border?: ContainerProps['border'];
  borderColor?: ContainerProps['borderColor'];
  /** Trigger style. When set, the trigger draws its own border. */
  variant?: ButtonVariant;
  color?: ButtonColor;
  /** Corner rounding of the locale list container. */
  roundedSize?: ContainerProps['roundedSize'];
  /** `sm` renders a compact pill, matching the `xs` `SwitchSelector`. */
  size?: LocaleSwitcherSize;
  /** Classes of the bordered trigger wrapper, e.g. to match sibling buttons. */
  className?: string;
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
  className,
  size = 'md',
  border,
  borderColor,
  roundedSize,
  variant,
  color,
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
  const { getDragHandleProps, getDropZoneProps } = useLocaleReorder(
    selectedLocales,
    'vertical'
  );

  // 1. Memoize the list construction so it doesn't rebuild every render
  const multilingualAvailableLocales: MultilingualAvailableLocales[] = useMemo(
    () =>
      availableLocales.map((localeEl) => {
        const englishName = getLocaleName(localeEl, ENGLISH);
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

  // 4. Derive results from Search Query; without one, selected locales come
  // first in their display order (the order they are reordered in)
  const results = useMemo(() => {
    if (searchQuery) {
      return fuse.search(searchQuery).map((result) => result.item);
    }

    const selectedItems = selectedLocales.flatMap((selectedLocale) =>
      multilingualAvailableLocales.filter(
        (item) => item.locale === selectedLocale
      )
    );
    const unselectedItems = multilingualAvailableLocales.filter(
      (item) => !selectedLocales.includes(item.locale)
    );

    return [...selectedItems, ...unselectedItems];
  }, [searchQuery, multilingualAvailableLocales, fuse, selectedLocales]);

  /** Selected locales are reordered by drag; disabled while searching. */
  const getIsReorderable = (localeItem: LocalesValues) =>
    isMultilingual &&
    !searchQuery &&
    selectedLocales.length > 1 &&
    selectedLocales.includes(localeItem);

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
    setSearchQuery('');

    if (value) {
      setSelectedLocales(availableLocales);
    } else {
      setSelectedLocales([locale]);
    }
  };

  return (
    <nav
      // A trigger variant draws its own border
      className={cn(variant ? undefined : sizeClassNames[size].nav, className)}
      aria-label={localeSwitcherLabel.value}
    >
      <DropDown identifier={DROPDOWN_IDENTIFIER}>
        <DropDown.Trigger
          identifier={DROPDOWN_IDENTIFIER}
          label={localeSwitcherLabel.value}
          // Unset, the trigger keeps its transparent `none` variant
          roundedSize="3xl"
          variant="hoverable"
          color="text"
          size="md"
          className={cn(
            !variant && !color && 'text-text',
            !variant && sizeClassNames[size].trigger
          )}
        >
          <div className="flex items-center justify-between gap-1.5">
            <Globe
              className={cn('shrink-0', size === 'sm' ? 'size-3.5' : 'size-4')}
            />
            <MoveVertical
              className={cn(
                'shrink-0 self-center',
                size === 'sm' ? 'size-3' : 'size-3.5'
              )}
            />
          </div>
        </DropDown.Trigger>

        <DropDown.Panel
          identifier={DROPDOWN_IDENTIFIER}
          isOverable
          isFocusable
          align="end"
          {...panelProps}
        >
          <Container
            className="max-h-[60vh] min-w-28"
            separator="y"
            role="listbox"
            transparency="xs"
            border={border ?? true}
            roundedSize={roundedSize ?? '3xl'}
            borderColor={borderColor ?? 'text'}
            aria-label={languageListLabel.value}
          >
            {isMultilingual && (
              <div className="m-auto p-2">
                <SwitchSelector
                  defaultValue={seeAllLocales} // Ensure this uses the persisted state
                  onChange={handleSeeAllLocales}
                  color="text"
                  size="sm"
                  className="!w-60 mx-3"
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
            )}
            {/* Kept in "see all" mode too, where it only reorders */}
            <ol className="divide-y divide-dashed divide-text/20 overflow-y-auto p-1">
              {results.map(
                ({ locale: localeItem, currentLocaleName, ownLocaleName }) => (
                  <li
                    key={localeItem}
                    {...(getIsReorderable(localeItem)
                      ? getDropZoneProps(localeItem)
                      : {})}
                    className={cn(
                      'px-1.5 py-1',
                      getIsReorderable(localeItem) &&
                        LOCALE_VERTICAL_DROP_ZONE_CLASS_NAME
                    )}
                  >
                    <Button
                      {...(getIsReorderable(localeItem)
                        ? getDragHandleProps(localeItem)
                        : {})}
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
                        {getIsReorderable(localeItem) && (
                          <GripVertical
                            aria-hidden
                            className="size-3.5 shrink-0 cursor-grab text-neutral"
                          />
                        )}
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
          </Container>
        </DropDown.Panel>
      </DropDown>
    </nav>
  );
};
