import { getDictionary } from '@intlayer/core/interpreter';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { Dictionary } from '@intlayer/types';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { getMessages as _getMessages } from 'next-intl/server';
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
const _getMessagesImpl = async (): Promise<Record<string, unknown>> => {
  const locale = await getLocale();
  const dictionaries = getDictionaries();

  const result: Record<string, unknown> = {};
  for (const [key, dictionary] of Object.entries(dictionaries)) {
    try {
      result[key] = getDictionary(
        dictionary as unknown as Dictionary,
        locale as LocalesValues
      );
    } catch {
      result[key] = {};
    }
  }
  return result;
};

export const getMessages = _getMessagesImpl as unknown as typeof _getMessages;
