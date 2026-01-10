'use client';

import { getHTMLTextDir, getLocaleName } from 'intlayer';
import { useIntlayer, useLocale } from 'next-intlayer';
import { type FC, useRef, useState } from 'react';
import { useLocaleSearch } from './useLocaleSearch';

export const LocaleSwitcher: FC = () => {
  const { searchInput, localeSwitcherLabel } = useIntlayer('locale-switcher');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => {
      window.location.reload(); // Reload to refresh server components
    },
  });
  const { searchResults, handleSearch } = useLocaleSearch(
    availableLocales,
    locale
  );

  return (
    <div className="relative w-auto rounded-xl p-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between"
        aria-label={localeSwitcherLabel.value}
        aria-expanded={isOpen}
      >
        <span className="px-2">{getLocaleName(locale)}</span>
        <span className="text-sm">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-10 mt-1 min-w-60 rounded-xl bg-neutral-900 shadow-lg">
          <div className="p-3">
            <input
              type="search"
              aria-label={searchInput.ariaLabel.value}
              placeholder={searchInput.placeholder.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearch(e.target.value)
              }
              ref={inputRef}
              className="w-full rounded border p-2"
            />
          </div>
          <ul className="max-h-[80vh] divide-y overflow-y-auto opacity-80 backdrop-blur">
            {searchResults.map(
              ({ locale: localeItem, currentLocaleName, ownLocaleName }) => (
                <li key={localeItem} className="p-1">
                  <button
                    type="button"
                    className={`flex w-full flex-row items-center justify-between gap-3 rounded-xl p-2 text-left ${
                      locale === localeItem
                        ? 'bg-neutral-800'
                        : 'cursor-pointer hover:bg-neutral-800'
                    }`}
                    onClick={() => {
                      setLocale(localeItem);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
                        {ownLocaleName}
                      </span>
                      <span className="text-gray-600 text-xs">
                        {currentLocaleName}
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm">
                      {localeItem.toUpperCase()}
                    </span>
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
