'use client';

import { Link } from '@components/Link/Link';
import { getHTMLTextDir, getLocaleName } from '@intlayer/core';
import {
  DropDown,
  Input,
  type PanelProps,
  Container,
} from '@intlayer/design-system';
import { MoveVertical } from 'lucide-react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { useRef, type FC } from 'react';
import { useLocaleSearch } from './useLocaleSearch';

export type LocaleSwitcherProps = {
  fullLocaleName?: boolean;
  panelProps?: Omit<PanelProps, 'identifier'>;
};

const DROPDOWN_IDENTIFIER = 'locale-switcher';

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({
  fullLocaleName = false,
  panelProps,
}) => {
  const {
    switchTo,
    searchInput,
    localeSwitcherLabel,
    languageListLabel,
    defaultLocaleName,
  } = useIntlayer('locale-switcher');
  let localeName = defaultLocaleName.value as string;
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();
  const { searchResults, handleSearch } = useLocaleSearch(
    availableLocales,
    locale
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
              {searchResults.map(
                ({ locale: localeItem, currentLocaleName, ownLocaleName }) => (
                  <li className="py-1 pr-1.5" key={localeItem}>
                    <Link
                      label={`${switchTo.value} ${currentLocaleName}`}
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
