import {
  Container,
  DropDown,
  Input,
  type PanelProps,
} from '@intlayer/design-system';
import { Link, useLocation } from '@tanstack/react-router';
import { getHTMLTextDir, getLocalizedUrl } from 'intlayer';
import { MoveVertical } from 'lucide-react';
import { type FC, useRef } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { useLocaleSearch } from './useLocaleSearch';

export type LocaleSwitcherProps = {
  panelProps?: Omit<PanelProps, 'identifier'>;
};

const DROPDOWN_IDENTIFIER = 'locale-switcher';

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ panelProps }) => {
  const { switchTo, searchInput, localeSwitcherLabel, languageListLabel } =
    useIntlayer('locale-switcher');
  const inputRef = useRef<HTMLInputElement>(null);

  const { locale, availableLocales, setLocale } = useLocale();
  const location = useLocation();

  const { searchResults, handleSearch } = useLocaleSearch(
    availableLocales,
    locale
  );

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex rounded-xl text-text transition-colors">
      <DropDown identifier={DROPDOWN_IDENTIFIER}>
        <DropDown.Trigger
          identifier={DROPDOWN_IDENTIFIER}
          aria-label={localeSwitcherLabel.value}
          size="sm"
          className="p-0!"
          variant="outline"
          color="text"
          roundedSize="5xl"
          onClick={handleFocusInput}
        >
          <div className="flex w-full items-center justify-between">
            <div
              className="text-nowrap px-2 text-base"
              suppressHydrationWarning
            >
              {locale.toUpperCase()}
            </div>
            <MoveVertical className="w-5 self-center" />
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
            className="max-h-[80vh] min-w-28 border border-text/5"
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
                ref={inputRef}
              />
            </div>
            <ul
              className="divide-y divide-dashed divide-text/20 overflow-y-auto p-1"
              aria-label={languageListLabel.value}
            >
              {searchResults.map(
                ({ locale: localeItem, currentLocaleName, ownLocaleName }) => (
                  <li className="py-1" key={localeItem}>
                    <Link
                      aria-label={switchTo({ locale: localeItem }).value}
                      to={getLocalizedUrl(location.pathname, localeItem)}
                      aria-current={locale === localeItem ? 'true' : undefined}
                      replace // Will ensure that the "go back" browser button will redirect to the previous page
                      onClick={() => setLocale(localeItem)}
                    >
                      <div className="rounded-xl pr-3 hover:bg-text/5!">
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
                          <span className="text-nowrap text-neutral text-sm">
                            {localeItem.toUpperCase()}
                          </span>
                        </div>
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
