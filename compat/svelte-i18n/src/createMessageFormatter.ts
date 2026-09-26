import {
  interpolateMessage,
  resolveMessageNodeToString,
} from '@intlayer/core/messageFormat';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { configDefaultLocale, runtimeOptions } from './configuration';
import type { MessageFormatter, MessageObject } from './types';

/** Reads the raw message (string, node or subtree) of an id for a locale. */
export type MessageLookup = (id: string, locale: string) => unknown;

/**
 * Whether a looked-up value can be rendered as a message: a string, an
 * interpreted callable, or an intlayer node (compiled runtime ICU) — not a
 * plain subtree.
 */
const isRenderableMessage = (message: unknown): boolean =>
  typeof message === 'string' ||
  typeof message === 'function' ||
  Array.isArray(message) ||
  (typeof message === 'object' && message !== null && 'nodeType' in message);

/**
 * Builds the `$_` function for the active locale on top of a lookup.
 *
 * Resolution follows svelte-i18n: the requested locale, then the
 * `fallbackLocale` from `init()`, then `handleMissingMessage`, then the
 * `default` message, then the id itself. Intlayer dictionaries arrive already
 * converted to nodes, so no message parser is involved here.
 *
 * @param activeLocale - The current `$locale` value.
 * @param lookup - Where messages are read from (registry, bound dictionary…).
 */
export const createMessageFormatter =
  (
    activeLocale: string | null | undefined,
    lookup: MessageLookup
  ): MessageFormatter =>
  (
    idOrMessage: string | MessageObject,
    options?: Omit<MessageObject, 'id'>
  ) => {
    const message: MessageObject =
      typeof idOrMessage === 'string'
        ? { ...options, id: idOrMessage }
        : { ...options, ...idOrMessage };

    const { id, values = {}, default: defaultMessage } = message;
    const targetLocale = message.locale ?? activeLocale ?? configDefaultLocale;
    const { fallbackLocale } = runtimeOptions;

    const candidateLocales =
      fallbackLocale && fallbackLocale !== targetLocale
        ? [targetLocale, fallbackLocale]
        : [targetLocale];

    for (const candidateLocale of candidateLocales) {
      const content = lookup(id, candidateLocale);

      if (isRenderableMessage(content)) {
        return resolveMessageNodeToString(
          content,
          values,
          candidateLocale as LocalesValues
        );
      }
    }

    const handledMessage = runtimeOptions.handleMissingMessage?.({
      locale: targetLocale,
      id,
      defaultValue: defaultMessage,
    });
    if (typeof handledMessage === 'string') return handledMessage;

    return defaultMessage === undefined
      ? id
      : interpolateMessage(
          defaultMessage,
          values,
          targetLocale as LocalesValues
        );
  };
