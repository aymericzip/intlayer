import { useGetDictionaries } from '@intlayer/design-system/api';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useDictionariesRecord } from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types/dictionary';
import { useMemo } from 'react';
import { getMatchesListKind } from '#components/Dashboard/DictionaryListDashboard/dictionaryFilterType';

const SETTINGS_STORAGE_KEY = 'intlayer:dynamic-dictionary-sections';

type DynamicSectionSettings = {
  collections: boolean;
  variants: boolean;
  tags: boolean;
};

const DEFAULT_SETTINGS: DynamicSectionSettings = {
  collections: false,
  variants: false,
  tags: false,
};

export type UseDynamicDictionarySectionsReturn = {
  /** Collections section is visible (enabled by the user, or already in use). */
  showCollections: boolean;
  /** Variants section is visible (enabled by the user, or already in use). */
  showVariants: boolean;
  /** Tags section is visible (enabled by the user, or already in use). */
  showTags: boolean;
  /** User toggles, independent of whether such dictionaries already exist. */
  settings: DynamicSectionSettings;
  setSetting: (section: keyof DynamicSectionSettings, value: boolean) => void;
};

/**
 * Decides whether the Collections / Variants sections are shown.
 *
 * They stay hidden until the project holds a dictionary of that kind (backend
 * or pushed from local files), or the user enables them to create some.
 */
export const useDynamicDictionarySections =
  (): UseDynamicDictionarySectionsReturn => {
    const [storedSettings, setSettings] =
      usePersistedStore<DynamicSectionSettings>(
        SETTINGS_STORAGE_KEY,
        DEFAULT_SETTINGS
      );
    // Settings saved before a section existed lack its key
    const settings = { ...DEFAULT_SETTINGS, ...storedSettings };
    const { data } = useGetDictionaries({ page: 1, pageSize: 200 });
    const { localeDictionaries } = useDictionariesRecord();

    const { hasCollections, hasVariants, hasTags } = useMemo(() => {
      const dictionaries: Dictionary[] = [
        ...((data?.data as Dictionary[] | undefined) ?? []),
        ...Object.values(localeDictionaries ?? {}),
      ];

      return {
        hasCollections: dictionaries.some((dictionary) =>
          getMatchesListKind(dictionary, 'collection')
        ),
        hasVariants: dictionaries.some((dictionary) =>
          getMatchesListKind(dictionary, 'variant')
        ),
        hasTags: dictionaries.some(
          (dictionary) => (dictionary.tags?.length ?? 0) > 0
        ),
      };
    }, [data?.data, localeDictionaries]);

    return {
      showCollections: settings.collections || hasCollections,
      showVariants: settings.variants || hasVariants,
      showTags: settings.tags || hasTags,
      settings,
      setSetting: (section, value) =>
        setSettings((previous) => ({ ...previous, [section]: value })),
    };
  };
