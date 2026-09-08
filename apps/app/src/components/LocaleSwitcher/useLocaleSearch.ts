import { useListKeyboardNavigation } from '@intlayer/design-system/hooks';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { getLocaleName, Locales, type LocalesValues, locales } from 'intlayer';
import { useCallback, useMemo, useState } from 'react';

type MultilingualAvailableLocales = {
  locale: LocalesValues;
  englishName: string;
  currentLocaleName: string;
  ownLocaleName: string;
};

export const useLocaleSearch = (
  availableLocales: LocalesValues[] = locales,
  locale: LocalesValues = Locales.ENGLISH
) => {
  const multilingualAvailableLocales: MultilingualAvailableLocales[] = useMemo(
    () =>
      availableLocales.map((localeEl) => {
        const englishName = getLocaleName(localeEl, Locales.ENGLISH);
        const currentLocaleName = getLocaleName(localeEl, locale);
        const ownLocaleName = getLocaleName(localeEl);
        return {
          locale: localeEl,
          englishName,
          currentLocaleName,
          ownLocaleName,
        };
      }),
    [locale, availableLocales]
  );

  const [searchResults, setSearchResults] = useState<
    MultilingualAvailableLocales[]
  >(multilingualAvailableLocales);

  // Arrow keys move the highlight while the search input keeps the focus, so
  // the user can keep typing, and Enter follows the highlighted locale link.
  const { highlightedIndex, resetHighlight, setItemElement, handleKeyDown } =
    useListKeyboardNavigation<HTMLLIElement>({
      itemCount: searchResults.length,
    });

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
      // The previous highlight points at a row the new results may not hold,
      // so typing always starts the keyboard selection over.
      resetHighlight();

      if (searchQuery) {
        // Perform search on every input change
        const searchResults = fuse
          .search(searchQuery)
          .map((result) => result.item);
        setSearchResults(searchResults);
      } else {
        setSearchResults(multilingualAvailableLocales);
      }
    },
    [fuse, multilingualAvailableLocales, resetHighlight]
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
