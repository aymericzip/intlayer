import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { DictionaryKeys } from '@intlayer/types/module_augmentation';

/**
 * Every valid react-intl message id: `<dictionaryKey>.<dotPath>`, where the
 * first segment designates the intlayer dictionary. Falls back to `string`
 * when no dictionary registry is declared (e.g. before the first build).
 */
export type RootMessageIds = string extends DictionaryKeys
  ? string
  : {
      [K in DictionaryKeys]: `${K & string}.${ValidDotPathsFor<K> & string}`;
    }[DictionaryKeys];

declare global {
  namespace FormatjsIntl {
    interface Message {
      /**
       * Types every react-intl message id (`formatMessage`,
       * `<FormattedMessage>`, `defineMessages`, …) against the intlayer
       * dictionary registry — the same strength as the base `useIntlayer`
       * hook.
       */
      ids: RootMessageIds;
    }
  }
}
