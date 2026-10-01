import { getHTMLTextDir } from '@intlayer/core/localization';
import { Checkbox, Input } from '@intlayer/design-system/input';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { type FC, useMemo, useState } from 'react';
import { useLocale } from 'react-intlayer';
import { useLocaleSearch } from '../LocaleSwitcher/useLocaleSearch';

type LocaleCheckboxListProps = {
  locales: string[];
  selectedLocales: string[];
  onChange: (locale: string) => void;
};

const SEARCH_THRESHOLD = 6;

export const LocaleCheckboxList: FC<LocaleCheckboxListProps> = ({
  locales,
  selectedLocales,
  onChange,
}) => {
  const { locale: uiLocale } = useLocale();
  const [search, setSearch] = useState('');

  const { searchResults } = useLocaleSearch(
    locales as LocalesValues[],
    uiLocale as LocalesValues
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return searchResults;
    const q = search.toLowerCase();
    return searchResults.filter(
      ({ locale, currentLocaleName, ownLocaleName, englishName }) =>
        locale.toLowerCase().includes(q) ||
        currentLocaleName.toLowerCase().includes(q) ||
        ownLocaleName.toLowerCase().includes(q) ||
        englishName.toLowerCase().includes(q)
    );
  }, [search, searchResults]);

  return (
    <div className="flex flex-col gap-2">
      {locales.length > SEARCH_THRESHOLD && (
        <Input
          type="search"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-1"
        />
      )}
      {filtered.map(({ locale, currentLocaleName, ownLocaleName }) => (
        <Checkbox
          key={locale}
          checked={selectedLocales.includes(locale)}
          onChange={() => onChange(locale)}
          name={`locale-${locale}`}
          color="text"
          size="sm"
          label={
            <div className="flex w-full items-center justify-between gap-3">
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
              <span className="font-mono text-neutral text-xs">
                {locale.toUpperCase()}
              </span>
            </div>
          }
        />
      ))}
    </div>
  );
};
