'use client';

import { getHTMLTextDir, getLocaleName } from 'intlayer';
import { useIntlayer, useLocale } from 'next-intlayer';
import { useRef, useState, type FC } from 'react';
import { useLocaleSearch } from './useLocaleSearch';

export const LocaleSwitcher: FC = () => {
  const { searchInput, localeSwitcherLabel } = useIntlayer('locale-switcher');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { locale, availableLocales, setLocale } = useLocale();
  const { searchResults, handleSearch } = useLocaleSearch(
    availableLocales,
    locale
  );

  return (
    <div
      className="relative rounded-xl p-2 w-auto"
      aria-label={localeSwitcherLabel.value}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="px-2">{getLocaleName(locale)}</span>
        <span className="text-sm">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 min-w-60 rounded-xl bg-neutral-900 shadow-lg z-10">
          <div className="p-3">
            <input
              type="search"
              aria-label={searchInput.ariaLabel.value}
              placeholder={searchInput.placeholder.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearch(e.target.value)
              }
              ref={inputRef}
              className="w-full border rounded p-2"
            />
          </div>
          <ul className="divide-y max-h-[80vh] overflow-y-auto backdrop-blur opacity-80">
            {searchResults.map(
              ({ locale: localeItem, currentLocaleName, ownLocaleName }) => (
                <li key={localeItem} className="p-1">
                  <button
                    className={`w-full text-left p-2 rounded-xl ${
                      locale === localeItem
                        ? 'bg-neutral-800'
                        : 'cursor-pointer hover:bg-neutral-800'
                    }`}
                    onClick={() => {
                      setLocale(localeItem);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex flex-row items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span
                          dir={getHTMLTextDir(localeItem)}
                          lang={localeItem}
                        >
                          {ownLocaleName}
                        </span>
                        <span className="text-gray-600 text-xs">
                          {currentLocaleName}
                        </span>
                      </div>
                      <span className="text-gray-600 text-sm">
                        {localeItem.toUpperCase()}
                      </span>
                    </div>
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
