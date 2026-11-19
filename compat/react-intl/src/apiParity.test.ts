// @vitest-environment node
import {
  getExportDifferences,
  getMemberDifferences,
  getMemberNames,
  getResolvedGaps,
  type KnownGaps,
} from '@utils/compat-api-parity';
import * as upstream from 'react-intl';
import { describe, expect, it } from 'vitest';
import * as compat from './index';

/** `react-intl` exports the compat does not match yet, and why. */
const KNOWN_GAPS: KnownGaps = {
  FormattedDuration: 'Not implemented by the compat yet.',
  FormattedDurationParts: 'Not implemented by the compat yet.',
  FormattedMessage:
    'Upstream wraps it in React.memo (an object); the compat exports a plain component, used the same way in JSX.',
};

/** Instance members the compat does not match yet, and why. */
const INSTANCE_KNOWN_GAPS: KnownGaps = {
  defaultRichTextElements: 'Not implemented by the compat yet.',
  formatDuration: 'Not implemented by the compat yet.',
  formatDurationToParts: 'Not implemented by the compat yet.',
};

describe('react-intl compat API parity', () => {
  it('exposes every react-intl export', () => {
    expect(getExportDifferences(upstream, compat, KNOWN_GAPS)).toEqual([]);
  });

  it('gives createIntl() every upstream IntlShape member', () => {
    expect(
      getMemberDifferences(
        upstream.createIntl({ locale: 'en', messages: {} }),
        compat.createIntl({ locale: 'en', messages: {} }) as object,
        INSTANCE_KNOWN_GAPS
      )
    ).toEqual([]);
  });

  it('keeps no stale known gap', () => {
    expect([
      ...getResolvedGaps(upstream, compat, KNOWN_GAPS),
      ...getResolvedGaps(
        upstream.createIntl({ locale: 'en', messages: {} }),
        compat.createIntl({ locale: 'en', messages: {} }) as object,
        INSTANCE_KNOWN_GAPS,
        getMemberNames
      ),
    ]).toEqual([]);
  });
});
