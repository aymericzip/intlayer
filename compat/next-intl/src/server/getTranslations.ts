import { getIntlayer } from '@intlayer/core/interpreter';
import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { getLocale } from './getLocale';

const navigatePath = (objectValue: unknown, path: string): unknown => {
  if (!path) return objectValue;
  const parts = path.split('.');
  let current: unknown = objectValue;
  for (const part of parts) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== 'object'
    ) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
};

/**
 * Drop-in for next-intl's server `getTranslations()`.
 *
 * The returned `t()` is typed against the intlayer dictionary for namespace N:
 * keys are autocompleted and dot-paths are validated at compile time.
 *
 * @example
 * ```ts
 * const t = await getTranslations('about');
 * return <h1>{t('counter.label')}</h1>; // ✓ typed
 * ```
 */
export const getTranslations = async <N extends DictionaryKeys>(
  namespace?: N
): Promise<
  <P extends ValidDotPathsFor<N>>(
    key: P,
    values?: Record<string, unknown>
  ) => string
> => {
  const locale = await getLocale();

  if (!namespace) {
    return <P extends ValidDotPathsFor<N>>(key: P) => String(key);
  }

  const dictionary = getIntlayer(namespace, locale as LocalesValues);

  return <P extends ValidDotPathsFor<N>>(
    key: P,
    values?: Record<string, unknown>
  ): string => {
    const raw = navigatePath(dictionary, String(key));
    if (raw == null) return String(key);

    const str = String(raw);
    if (!values) return str;

    return str.replace(/\{(\w+)\}/g, (_, k) =>
      values[k] != null ? String(values[k]) : `{${k}}`
    );
  };
};
