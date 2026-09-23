'use client';

import { getHTMLTextDir, getLocaleName } from '@intlayer/core/localization';
import type { Locale } from '@intlayer/types/allLocales';
import { ENGLISH } from '@intlayer/types/locales';
import { cn } from '@utils/cn';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { MoveVertical } from 'lucide-react';
import { type FC, useCallback, useMemo, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Button } from '../Button';
import { Container } from '../Container';
import { DropDown, type PanelProps } from '../DropDown';
import { Input } from '../Input';

export type LocaleSwitcherProps = {
  locale?: Locale;
  localeList: Locale[];
  availableLocales?: Locale[];
  fullLocaleName?: boolean;
  setLocale: (locale: Locale) => void;
  panelProps?: Omit<PanelProps, 'identifier'>;
  /** `sm` renders a compact pill, matching the `xs` `SwitchSelector`. */
  size?: LocaleSwitcherSize;
};

export type LocaleSwitcherSize = 'sm' | 'md';

const sizeClassNames: Record<
  LocaleSwitcherSize,
  { nav: string; trigger: string; label: string; icon: string }
> = {
  sm: {
    nav: 'rounded-full border-[1.3px] border-text',
    trigger: 'min-h-0 px-1.5 py-0.5 text-xs',
    label: 'px-1',
    icon: 'size-3',
  },
  md: {
    nav: 'rounded-xl border border-text',
    trigger: '',
    label: 'px-2',
    icon: 'w-5',
  },
};

const DROPDOWN_IDENTIFIER = 'locale-switcher';

type MultilingualAvailableLocales = {
  locale: Locale;
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
  size = 'md',
}) => {
  let localeName = 'Select a locale';
  const { switchTo, searchInput, languageListLabel, localeSwitcherLabel } =
    useIntlayer('locale-switcher');
  const inputRef = useRef<HTMLInputElement>(null);

  const multilingualAvailableLocales: MultilingualAvailableLocales[] = useMemo(
    () =>
      localeList.map((localeEl) => {
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
    <nav
      className={sizeClassNames[size].nav}
      aria-label={localeSwitcherLabel.value}
    >
      <DropDown identifier={DROPDOWN_IDENTIFIER}>
        <DropDown.Trigger
          identifier={DROPDOWN_IDENTIFIER}
          // `text` color paints children with `text-opposite`, unreadable on
          // the transparent `none` variant.
          color="custom"
          size={size === 'sm' ? 'custom' : 'md'}
          roundedSize={size === 'sm' ? 'full' : 'md'}
          className={cn('text-text', sizeClassNames[size].trigger)}
        >
          <div className="flex w-full items-center justify-between">
            <div className={cn('text-nowrap', sizeClassNames[size].label)}>
              {localeName}
            </div>
            <MoveVertical
              className={cn('self-center', sizeClassNames[size].icon)}
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
            className="max-h-[80vh] min-w-28"
            separator="y"
            role="listbox"
            transparency="xs"
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
            <ol className="divide-y divide-dashed divide-text/20 overflow-y-auto p-1">
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
                            suppressHydrationWarning
                          >
                            {ownLocaleName}
                          </span>
                          <span
                            className="text-neutral text-xs"
                            suppressHydrationWarning
                          >
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
    </nav>
  );
};
