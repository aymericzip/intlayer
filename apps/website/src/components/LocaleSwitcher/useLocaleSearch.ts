import Fuse, { type IFuseOptions } from 'fuse.js';
import { getLocaleName, Locales, type LocalesValues } from 'intlayer';
import { useCallback, useMemo, useState } from 'react';

type MultilingualAvailableLocales = {
  locale: LocalesValues;
  englishName: string;
  currentLocaleName: string;
  ownLocaleName: string;
};

export const useLocaleSearch = (
  availableLocales: LocalesValues[] = Object.values(Locales.ALL_LOCALES),
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
        setSearchResults(searchResults);
      } else {
        setSearchResults(multilingualAvailableLocales);
      }
    },
    [fuse, multilingualAvailableLocales]
  );

  return { searchResults, handleSearch };
};
