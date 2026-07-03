import { log } from '@intlayer/config/built';
import { CYAN } from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { createNamespaceTranslator } from '../shared/namespaceTranslator';
import type {
  LooseTranslateFunction,
  TranslateFunction,
  TranslateFunctionForNamespace,
} from '../shared/translateFunctionTypes';

/**
 * Configuration accepted by {@link createTranslator}.
 *
 * Mirrors use-intl's `IntlConfig`, but `messages`, `formats`, `now`,
 * `timeZone`, `onError`, and `getMessageFallback` have no effect — Intlayer
 * resolves content from its own compiled dictionaries.
 */
export type CreateTranslatorConfig<N extends DictionaryKeys> = {
  /** The locale dictionaries are resolved for. */
  locale: LocalesValues;
  /** A bare dictionary key, or a nested `'dictionary.scope'` namespace. */
  namespace?: N | (string & {});
  /**
   * @deprecated has no use case with intlayer. Messages are loaded
   * automatically under the hood for bundle optimization reason.
   */
  messages?: never;
} & Record<string, unknown>;

/**
 * Overload set for {@link createTranslator}:
 *
 * 1. A bare dictionary key → fully-typed `t()` (autocompleted dot-paths).
 * 2. A nested namespace `'dictionary.sub.scope'` → `t()` accepts relative
 *    dot-paths under the scope, typed against the dictionary, matching
 *    use-intl's scoped-namespace behaviour.
 * 3. No namespace → root scope; the first segment of each key designates
 *    the dictionary (`t('about.title')`).
 */
type CreateTranslator = {
  <N extends DictionaryKeys>(
    config: CreateTranslatorConfig<N> & { namespace: N }
  ): TranslateFunction<N>;
  <N extends `${string}.${string}`>(
    config: CreateTranslatorConfig<DictionaryKeys> & { namespace: N }
  ): TranslateFunctionForNamespace<N>;
  (config: CreateTranslatorConfig<DictionaryKeys>): LooseTranslateFunction;
};

/**
 * Drop-in for use-intl's `createTranslator`.
 *
 * Returns a translate function (with `rich`, `markup`, `raw`, `has`) that
 * resolves messages from Intlayer's compiled dictionaries for the given
 * `locale`. Messages support ICU MessageFormat syntax.
 *
 * @example
 * ```ts
 * const t = createTranslator({ locale: 'en', namespace: 'about' });
 * t('counter.label'); // ✓ typed
 * t('items', { count: 3 }); // ICU plural
 * ```
 */
export const createTranslator = (({
  locale,
  namespace,
  messages: _messages,
}: CreateTranslatorConfig<DictionaryKeys>) => {
  if (process.env.NODE_ENV === 'development' && _messages !== undefined) {
    const appLogger = getAppLogger({ log });
    appLogger(
      `${colorize('createTranslator', CYAN)} do not pass the messages option with intlayer. Messages are loaded automatically under the hood for bundle optimization reason`
    );
  }

  return createNamespaceTranslator(locale, namespace);
}) as CreateTranslator;
