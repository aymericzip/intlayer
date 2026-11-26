'use client';

import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
} from '@intlayer/core/localization';
import { MoveVertical } from 'lucide-react';
import { type ComponentType, type FC, useId, useRef } from 'react';
import { setLocaleInStorage, useIntlayer, useLocale } from 'react-intlayer';
import { useLocaleSearch } from '../../hooks/useLocaleSearch';
import { Container } from '../Container';
import { DropDown, type PanelProps } from '../DropDown';
import { Input } from '../Input';
import { isModifiedClick, type LinkProps } from '../Link';

type LocaleLinkProps = Pick<
  LinkProps,
  | 'children'
  | 'id'
  | 'label'
  | 'locale'
  | 'isActive'
  | 'variant'
  | 'color'
  | 'className'
  | 'onClick'
> & {
  to: string;
  replace: boolean;
  preload: 'viewport';
};

export type LocaleNavigationSwitcherProps = {
  Link: ComponentType<LocaleLinkProps>;
  pathname: string;
  fullLocaleName?: boolean;
  panelProps?: Omit<PanelProps, 'identifier'>;
};

/** Switches the current route's locale using the application's localized links. */
export const LocaleNavigationSwitcher: FC<LocaleNavigationSwitcherProps> = ({
  Link,
  pathname,
  fullLocaleName = false,
  panelProps,
}) => {
  const {
    switchTo,
    searchInput,
    localeSwitcherLabel,
    languageListLabel,
    defaultLocaleName,
  } = useIntlayer('locale-navigation-switcher');
  const inputRef = useRef<HTMLInputElement>(null);

  const { locale, availableLocales } = useLocale();
  const identifier = useId();
  const getLocaleOptionId = (locale: string) => `${identifier}-${locale}`;

  // The current path in whatever locale's rewrite alias it is viewed under
  // (`/doc/リリース/v8`). Each `Link` re-localizes it for its target locale —
  // `getLocalizedUrl` resolves the alias to its canonical path first.
  const pathWithoutLocale = getPathWithoutLocale(pathname, availableLocales);
  const {
    searchResults,
    handleSearch,
    highlightedIndex,
    highlightedLocale,
    setItemElement,
    handleKeyDown,
  } = useLocaleSearch(availableLocales, locale);

  const localeName = locale
    ? fullLocaleName
      ? getLocaleName(locale)
      : locale.toUpperCase()
    : defaultLocaleName.value;

  return (
    <div className="flex rounded-lg text-foreground transition-colors">
      <DropDown identifier={identifier}>
        <DropDown.Trigger
          identifier={identifier}
          label={localeSwitcherLabel.value}
          size="sm"
          className="p-0!"
          variant="outline"
          color="text"
          roundedSize="5xl"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex w-full items-center justify-between">
            <div
              className="px-2 text-base text-nowrap"
              suppressHydrationWarning
            >
              {localeName}
            </div>
            <MoveVertical className="w-5 self-center" />
          </div>
        </DropDown.Trigger>

        <DropDown.Panel
          identifier={identifier}
          isOverable
          isFocusable
          align="end"
          {...panelProps}
        >
          <Container
            className="max-h-[80vh] min-w-42"
            border
            borderColor="neutral"
            separator="y"
            roundedSize="xl"
            transparency="xs"
          >
            <div className="p-3">
              <Input
                type="search"
                aria-label={searchInput.ariaLabel.value}
                placeholder={searchInput.placeholder.value}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-activedescendant={
                  highlightedLocale
                    ? getLocaleOptionId(highlightedLocale)
                    : undefined
                }
                ref={inputRef}
              />
            </div>
            <ul
              className="divide-y divide-dashed divide-text/20 overflow-y-auto p-1"
              aria-label={languageListLabel.value}
            >
              {searchResults.map(
                (
                  { locale: localeItem, currentLocaleName, ownLocaleName },
                  index
                ) => (
                  <li
                    className="py-1 pe-3"
                    key={localeItem}
                    ref={(element) => setItemElement(index, element)}
                  >
                    <Link
                      id={getLocaleOptionId(localeItem)}
                      label={switchTo({ locale: currentLocaleName }).value}
                      to={pathWithoutLocale}
                      locale={localeItem}
                      isActive={locale === localeItem}
                      variant="hoverable"
                      color="text"
                      // Mirrors the `hoverable` hover background so keyboard
                      // and pointer selection look the same
                      className={
                        index === highlightedIndex
                          ? 'bg-current/10!'
                          : undefined
                      }
                      preload="viewport"
                      replace
                      onClick={(event) => {
                        // Modified clicks open a new tab: keep this tab's locale
                        if (isModifiedClick(event)) return;

                        // The committed route supplies the locale to IntlayerProvider.
                        setLocaleInStorage(localeItem);
                      }}
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
                            className="text-xs text-muted-foreground"
                            suppressHydrationWarning
                          >
                            {currentLocaleName}
                          </span>
                        </div>
                        <span className="text-sm text-nowrap text-muted-foreground">
                          {localeItem.toUpperCase()}
                        </span>
                      </div>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </Container>
        </DropDown.Panel>
      </DropDown>
    </div>
  );
};
