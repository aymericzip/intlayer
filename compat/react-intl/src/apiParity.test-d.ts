import type {
  ExpectNoIncompatibleMembers,
  IncompatibleMembers,
} from '@utils/compat-api-parity';
import type * as upstream from 'react-intl';
import { describe, expectTypeOf, it } from 'vitest';
import type * as compat from './index';

/** `react-intl` exports typed differently from upstream, and why. */
type TypeGaps =
  /** Not implemented by the compat yet. */
  | 'FormattedDuration'
  /** Not implemented by the compat yet. */
  | 'FormattedDurationParts'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'InvalidConfigError'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'MessageFormatError'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'MissingDataError'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'MissingTranslationError'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'ReactIntlError'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'ReactIntlErrorCode'
  /** Reimplemented with its own types; signature not aligned with upstream yet. */
  | 'UnsupportedFormatterError';

describe('react-intl compat type parity', () => {
  it('types every react-intl export compatibly', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        IncompatibleMembers<typeof compat, typeof upstream, TypeGaps>
      >
    >().toBeNever();
  });

  it('keeps no stale react-intl type gap', () => {
    expectTypeOf<
      ExpectNoIncompatibleMembers<
        Exclude<TypeGaps, IncompatibleMembers<typeof compat, typeof upstream>>
      >
    >().toBeNever();
  });
});
