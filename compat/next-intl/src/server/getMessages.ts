import { getDictionary } from '@intlayer/core/interpreter';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import { getLocale } from './getLocale';

/**
 * Drop-in replacement for next-intl's `getMessages()` server function.
 *
 * Returns all compiled dictionary content for the current locale as a flat
 * record keyed by dictionary name. Useful when you need to pass messages
 * to a `NextIntlClientProvider`.
 *
 * @example
 * ```ts
 * const messages = await getMessages();
 * ```
 */
export const getMessages = async (): Promise<Record<string, any>> => {
  const locale = await getLocale();
  const dictionaries = getDictionaries();

  const result: Record<string, any> = {};
  for (const [key, dictionary] of Object.entries(dictionaries)) {
    try {
      result[key] = getDictionary(dictionary as any, locale as any);
    } catch {
      result[key] = {};
    }
  }
  return result;
};
