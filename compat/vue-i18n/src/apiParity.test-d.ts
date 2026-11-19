import type {
  ExpectNoIncompatibleMembers,
  IncompatibleMembers,
} from '@utils/compat-api-parity';
import { describe, expectTypeOf, it } from 'vitest';
import type * as upstream from 'vue-i18n';
import type * as compat from './index';

/** `vue-i18n` exports typed differently from upstream, and why. */
type TypeGaps =
  /** Not implemented by the compat yet. */
  | 'DatetimeFormat'
  /** Not implemented by the compat yet. */
  | 'I18nD'
  /** Not implemented by the compat yet. */
  | 'I18nN'
  /** Not implemented by the compat yet. */
  | 'I18nT'
  /** Not implemented by the compat yet. */
  | 'NumberFormat'
  /** Not implemented by the compat yet. */
  | 'Translation'
  /** Typed from the intlayer dictionaries: only declared keys are accepted. */
  | 'useI18n'
  /** Not implemented by the compat yet. */
  | 'vTDirective';

describe('vue-i18n compat type parity', () => {
  it('types every vue-i18n export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<typeof compat, typeof upstream, TypeGaps>
      >
    >().toBeNever();
  });

  it('keeps no stale vue-i18n type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<TypeGaps, IncompatibleMembers<typeof compat, typeof upstream>>
      >
    >().toBeNever();
  });
});
