'use client';

/**
 * @intlayer/lingui — Drop-in replacement for `@lingui/core` and `@lingui/react`.
 *
 * Alias BOTH `@lingui/core` and `@lingui/react` to this package in your
 * bundler configuration (e.g. via the `linguiVitePlugin`).
 *
 * Messages are served from intlayer's `messages` dictionary rather than
 * lingui's compiled catalogs. ICU MessageFormat syntax is fully supported.
 *
 * @see https://intlayer.org/doc/compat/lingui
 */

// ── @lingui/core re-exports ────────────────────────────────────────────────

export type {
  AllMessages,
  Locale,
  Locales,
  MessageDescriptor,
  MessageId,
  MessageOptions,
  Messages,
  Register,
} from '@lingui/core';

export { formats } from './formats';
/**
 * Re-exported `I18n` class — provides the same shape as `@lingui/core`'s I18n.
 * Use `setupI18n()` or the `i18n` singleton rather than constructing directly.
 */
export { I18nClass as I18n } from './I18nClass';
export { i18n, setupI18n } from './setupI18n';

// ── @lingui/react re-exports ───────────────────────────────────────────────

export type {
  I18nContext,
  I18nProviderProps,
  TransProps,
  TransRenderCallbackOrComponent,
  TransRenderProps,
} from '@lingui/react';
export { I18nProvider } from './I18nProvider';
export { LinguiContext } from './LinguiContext';
export { Trans } from './Trans';
export { useLingui } from './useLingui';
