import type * as upstream from '@ngx-translate/core';
import type {
  ExpectNoIncompatibleMembers,
  IncompatibleMembers,
} from '@utils/compat-api-parity';
import { describe, expectTypeOf, it } from 'vitest';
import type * as compat from './index';

/** `@ngx-translate/core` exports typed differently from upstream, and why. */
type TypeGaps =
  /** Rich translation slots are not implemented yet. */
  | 'TranslateSlotDirective'
  /** Rich translation slots are not implemented yet. */
  | 'TranslateSlotsComponent'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'DefaultMissingTranslationHandler'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'isDict'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'ITranslateService'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'MissingTranslationHandler'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'provideChildTranslateService'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'provideMissingTranslationHandler'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'provideTranslateCompiler'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'provideTranslateLoader'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'provideTranslateParser'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'provideTranslateService'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'TranslateCompiler'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'TranslateDirective'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'TranslateNoOpCompiler'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'TranslateService'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'TranslateStore';

describe('ngx-translate compat type parity', () => {
  it('types every @ngx-translate/core export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<typeof compat, typeof upstream, TypeGaps>
      >
    >().toBeNever();
  });

  it('keeps no stale @ngx-translate/core type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<TypeGaps, IncompatibleMembers<typeof compat, typeof upstream>>
      >
    >().toBeNever();
  });
});
