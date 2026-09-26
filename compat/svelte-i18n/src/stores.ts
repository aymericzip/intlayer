import { derived, type Readable } from 'svelte/store';
import { runtimeOptions } from './configuration';
import { createMessageFormatter } from './createMessageFormatter';
import {
  getDateFormatter,
  getNumberFormatter,
  getTimeFormatter,
} from './formatters';
import { locale } from './locale';
import { lookupRegistryMessage } from './registryLookup';
import { dictionary, lookupRuntimeMessage } from './runtimeMessages';
import type {
  DateFormatter,
  JSONGetter,
  LocalesDictionary,
  MessageFormatter,
  NumberFormatter,
  TimeFormatter,
} from './types';

/** Runtime messages win over dictionaries, as `addMessages` overrides. */
const lookupMessage = (
  messages: LocalesDictionary,
  id: string,
  targetLocale: string
): unknown =>
  lookupRuntimeMessage(messages, targetLocale, id) ??
  lookupRegistryMessage(id, targetLocale);

/** `$format` / `$_` / `$t` — translates a message id. */
export const format: Readable<MessageFormatter> = derived(
  [locale, dictionary],
  ([$locale, $dictionary]) =>
    createMessageFormatter($locale, (id, targetLocale) =>
      lookupMessage($dictionary, id, targetLocale)
    )
);

export const _ = format;
export const t = format;

/** `$json` — the raw message or subtree of an id. */
export const json: Readable<JSONGetter> = derived(
  [locale, dictionary],
  ([$locale, $dictionary]) =>
    <T = unknown>(id: string, targetLocale?: string): T | undefined =>
      lookupMessage(
        $dictionary,
        id,
        targetLocale ?? $locale ?? runtimeOptions.fallbackLocale
      ) as T | undefined
);

/** `$date` — formats a date with the `date` named formats. */
export const date: Readable<DateFormatter> = derived(
  locale,
  ($locale) => (value, options) =>
    getDateFormatter({ locale: $locale ?? undefined, ...options }).format(value)
);

/** `$time` — formats a time with the `time` named formats. */
export const time: Readable<TimeFormatter> = derived(
  locale,
  ($locale) => (value, options) =>
    getTimeFormatter({ locale: $locale ?? undefined, ...options }).format(value)
);

/** `$number` — formats a number with the `number` named formats. */
export const number: Readable<NumberFormatter> = derived(
  locale,
  ($locale) => (value, options) =>
    getNumberFormatter({ locale: $locale ?? undefined, ...options }).format(
      value
    )
);
