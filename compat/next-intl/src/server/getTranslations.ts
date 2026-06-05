import { getIntlayer } from '@intlayer/core/interpreter';
import { getLocale } from './getLocale';

const navigatePath = (objectValue: any, path: string): any => {
  if (!path) return objectValue;
  const parts = path.split('.');
  let current = objectValue;
  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }
  return current;
};

/**
 * Drop-in replacement for next-intl's `getTranslations()` server function.
 *
 * Returns a translation function `t(key)` scoped to the given namespace
 * that can be used inside Server Components, Server Actions, or Metadata.
 *
 * @param namespace - Dictionary key to scope translations to.
 *
 * @example
 * ```ts
 * const t = await getTranslations('HomePage');
 * return <h1>{t('title')}</h1>;
 * ```
 */
export const getTranslations = async (
  namespace?: string
): Promise<(key: string, values?: Record<string, any>) => string> => {
  const locale = await getLocale();

  if (!namespace) {
    return (key) => key;
  }

  const dictionary = getIntlayer(namespace as any, locale as any);

  return (key: string, values?: Record<string, any>): string => {
    const raw = navigatePath(dictionary, key);
    if (raw == null) return key;

    const stringValue = String(raw);
    if (!values) return stringValue;

    return stringValue.replace(/\{(\w+)\}/g, (_, interpolationKey) =>
      values[interpolationKey] != null
        ? String(values[interpolationKey])
        : `{${interpolationKey}}`
    );
  };
};
