// @vitest-environment node
import {
  getExportDifferences,
  getMemberDifferences,
  getMemberNames,
  getResolvedGaps,
  type KnownGaps,
} from '@utils/compat-api-parity';
import { describe, expect, it } from 'vitest';
import * as upstream from 'vue-i18n';
import * as compat from './index';

/** `vue-i18n` exports the compat does not match yet, and why. */
const KNOWN_GAPS: KnownGaps = {
  DatetimeFormat: 'Not implemented by the compat yet.',
  I18nD: 'Not implemented by the compat yet.',
  I18nN: 'Not implemented by the compat yet.',
  I18nT: 'Not implemented by the compat yet.',
  NumberFormat: 'Not implemented by the compat yet.',
  Translation: 'Not implemented by the compat yet.',
  vTDirective: 'Not implemented by the compat yet.',
};

/** Instance members the compat does not match yet, and why. */
const INSTANCE_0_KNOWN_GAPS: KnownGaps = {
  dispose: 'Not implemented by the compat yet.',
};

/** Instance members the compat does not match yet, and why. */
const INSTANCE_1_KNOWN_GAPS: KnownGaps = {
  datetimeFormats: 'Not implemented by the compat yet.',
  escapeParameter: 'Not implemented by the compat yet.',
  fallbackFormat: 'Not implemented by the compat yet.',
  fallbackLocale:
    'A plain locale string instead of a ref: the fallback is the intlayer default locale.',
  fallbackRoot: 'Not implemented by the compat yet.',
  fallbackWarn: 'Not implemented by the compat yet.',
  getDateTimeFormat: 'Not implemented by the compat yet.',
  getMissingHandler: 'Not implemented by the compat yet.',
  getNumberFormat: 'Not implemented by the compat yet.',
  getPostTranslationHandler: 'Not implemented by the compat yet.',
  id: 'Not implemented by the compat yet.',
  inheritLocale: 'Not implemented by the compat yet.',
  isGlobal: 'Not implemented by the compat yet.',
  mergeDateTimeFormat: 'Not implemented by the compat yet.',
  mergeNumberFormat: 'Not implemented by the compat yet.',
  messages: 'Not implemented by the compat yet.',
  missingWarn: 'Not implemented by the compat yet.',
  modifiers: 'Not implemented by the compat yet.',
  numberFormats: 'Not implemented by the compat yet.',
  pluralRules: 'Not implemented by the compat yet.',
  setDateTimeFormat: 'Not implemented by the compat yet.',
  setMissingHandler: 'Not implemented by the compat yet.',
  setNumberFormat: 'Not implemented by the compat yet.',
  setPostTranslationHandler: 'Not implemented by the compat yet.',
  warnHtmlMessage: 'Not implemented by the compat yet.',
};

describe('vue-i18n compat API parity', () => {
  it('exposes every vue-i18n export', () => {
    expect(getExportDifferences(upstream, compat, KNOWN_GAPS)).toEqual([]);
  });

  it('gives createI18n() every upstream I18n member', () => {
    expect(
      getMemberDifferences(
        upstream.createI18n({ legacy: false, locale: 'en' }),
        compat.createI18n({ legacy: false, locale: 'en' }) as object,
        INSTANCE_0_KNOWN_GAPS
      )
    ).toEqual([]);
  });

  it('gives the global composer every upstream Composer member', () => {
    expect(
      getMemberDifferences(
        upstream.createI18n({ legacy: false, locale: 'en' }).global,
        compat.createI18n({ legacy: false, locale: 'en' }).global as object,
        INSTANCE_1_KNOWN_GAPS
      )
    ).toEqual([]);
  });

  it('keeps no stale known gap', () => {
    expect([
      ...getResolvedGaps(upstream, compat, KNOWN_GAPS),
      ...getResolvedGaps(
        upstream.createI18n({ legacy: false, locale: 'en' }),
        compat.createI18n({ legacy: false, locale: 'en' }) as object,
        INSTANCE_0_KNOWN_GAPS,
        getMemberNames
      ),
      ...getResolvedGaps(
        upstream.createI18n({ legacy: false, locale: 'en' }).global,
        compat.createI18n({ legacy: false, locale: 'en' }).global as object,
        INSTANCE_1_KNOWN_GAPS,
        getMemberNames
      ),
    ]).toEqual([]);
  });
});
