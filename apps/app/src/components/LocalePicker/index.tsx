import { getHTMLTextDir, getLocaleName } from '@intlayer/core/localization';
import { Container } from '@intlayer/design-system/container';
import { DropDown } from '@intlayer/design-system/drop-down';
import { Input } from '@intlayer/design-system/input';
import { ALL_LOCALES } from '@intlayer/types/allLocales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { MoveVertical } from 'lucide-react';
import { type FC, useRef } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { useLocaleSearch } from '../LocaleSwitcher/useLocaleSearch';

type LocalePickerProps = {
  value: string;
  onChange: (locale: string) => void;
  identifier: string;
  placeholder?: string;
};

export const LocalePicker: FC<LocalePickerProps> = ({
  value,
  onChange,
  identifier,
  placeholder = '—',
}) => {
  const content = useIntlayer('locale-picker');

  const inputRef = useRef<HTMLInputElement>(null);
  const { locale: uiLocale } = useLocale();
  const { searchResults, handleSearch } = useLocaleSearch(
    Object.values(ALL_LOCALES),
    uiLocale
  );

  const displayName = value
    ? getLocaleName(value as LocalesValues, uiLocale)
    : placeholder;

  return (
    <DropDown identifier={identifier}>
      <DropDown.Trigger
        identifier={identifier}
        size="xs"
        variant="outline"
        color="text"
        roundedSize="xl"
        aria-label={content.selectLocaleDisplayname({
          displayName: displayName,
        })}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center justify-between gap-2 px-2">
          <span className="text-sm">
            {value ? value.toUpperCase() : placeholder}
          </span>
          <MoveVertical size={10} className="shrink-0" />
        </div>
      </DropDown.Trigger>

      <DropDown.Panel
        identifier={identifier}
        isOverable
        isFocusable
        align="start"
        className="z-50"
      >
        <Container
          className="max-h-64 min-w-52 border border-text/5"
          separator="y"
          roundedSize="2xl"
          transparency="xs"
        >
          <div className="p-2">
            <Input
              ref={inputRef}
              type="search"
              placeholder={content.search.value}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <ul
            className="divide-y divide-dashed divide-text/20 overflow-y-auto p-1"
            aria-label={content.localeList.value}
          >
            {searchResults.map(
              ({ locale, currentLocaleName, ownLocaleName }) => (
                <li key={locale} className="py-0.5">
                  <button
                    type="button"
                    className="w-full rounded-lg px-3 py-1.5 text-left transition-colors hover:bg-text/5 focus:bg-text/5 focus:outline-none"
                    onClick={(e) => {
                      onChange(locale);
                      (e.currentTarget as HTMLButtonElement).blur();
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span
                          dir={getHTMLTextDir(locale)}
                          lang={locale}
                          className="text-sm"
                        >
                          {ownLocaleName}
                        </span>
                        <span className="text-neutral text-xs">
                          {currentLocaleName}
                        </span>
                      </div>
                      <span className="text-neutral text-xs">
                        {locale.toUpperCase()}
                      </span>
                    </div>
                  </button>
                </li>
              )
            )}
          </ul>
        </Container>
      </DropDown.Panel>
    </DropDown>
  );
};
