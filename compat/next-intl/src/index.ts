// Core, framework-agnostic API reused from @intlayer/use-intl (next-intl
// re-exports these from use-intl in the real library).
export {
  createFormatter,
  createTranslator,
  hasLocale,
  IntlError,
  IntlErrorCode,
  initializeConfig,
} from '@intlayer/use-intl';
export * from './client/index';
export { defineRouting, type Routing } from './routing';
