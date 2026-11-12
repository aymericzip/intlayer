import type {
  Dictionary,
  DictionaryLocation,
} from '@intlayer/types/dictionary';

/**
 * Keeps the dictionaries `intlayer push` sends: `remote`, `hybrid` and custom
 * locations. `local` dictionaries are never synced with the CMS.
 *
 * @param defaultLocation - `dictionary.location` of the configuration, used
 * when a dictionary declares none.
 */
export const getPushableDictionaries = <T extends Pick<Dictionary, 'location'>>(
  dictionaries: T[],
  defaultLocation: DictionaryLocation = 'local'
): T[] =>
  dictionaries.filter(
    (dictionary) => (dictionary.location ?? defaultLocation) !== 'local'
  );
