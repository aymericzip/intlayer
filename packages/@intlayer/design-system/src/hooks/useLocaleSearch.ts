import Fuse, { type IFuseOptions } from 'fuse.js';
import {
  defaultLocale,
  getLocaleName,
  type LocalesValues,
  locales,
} from 'intlayer';
import { useCallback, useMemo, useState } from 'react';
import { useListKeyboardNavigation } from './useListKeyboardNavigation';

type MultilingualAvailableLocales = {
  locale: LocalesValues;
  englishName: string;
  currentLocaleName: string;
  ownLocaleName: string;
};

export const useLocaleSearch = (
  availableLocales: LocalesValues[] = locales,
  locale: LocalesValues = defaultLocale
) => {
  const multilingualAvailableLocales: MultilingualAvailableLocales[] = useMemo(
    () =>
      availableLocales.map((localeEl) => {
        const englishName = getLocaleName(localeEl, defaultLocale);
        const currentLocaleName = getLocaleName(localeEl, locale);
        const ownLocaleName = getLocaleName(localeEl, localeEl);
        return {
          locale: localeEl,
          englishName,
          currentLocaleName,
          ownLocaleName,
        };
      }),
    [locale, availableLocales]
  );

  const [searchQuery, setSearchQuery] = useState('');

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

  const searchResults = useMemo(
    () =>
      searchQuery
        ? fuse.search(searchQuery).map((result) => result.item)
        : multilingualAvailableLocales,
    [fuse, multilingualAvailableLocales, searchQuery]
  );

  // Arrow keys move the highlight while the search input keeps the focus, so
  // the user can keep typing, and Enter follows the highlighted locale link.
  const { highlightedIndex, resetHighlight, setItemElement, handleKeyDown } =
    useListKeyboardNavigation<HTMLLIElement>({
      itemCount: searchResults.length,
    });

  const handleSearch = useCallback(
    (query: string) => {
      resetHighlight();
      setSearchQuery(query);
    },
    [resetHighlight]
  );

  return {
    searchResults,
    handleSearch,
    highlightedIndex,
    highlightedLocale: searchResults[highlightedIndex]?.locale,
    setItemElement,
    handleKeyDown,
  };
};
