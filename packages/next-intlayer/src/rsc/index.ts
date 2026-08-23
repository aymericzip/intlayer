/**
 * `next-intlayer` as loaded in React Server Components.
 *
 * Selected by the `react-server` export condition, which Next.js turns on only
 * in the RSC layer — never in the SSR pass of a client component, never in the
 * browser. That is what makes `next-intlayer` a single import path working on
 * both sides: this entry mirrors the default one name for name, but resolves
 * the content hooks and the provider to their server implementations. The same
 * `useIntlayer('key')` call reads the request-scoped ambient locale here, and
 * the client provider's context in the client layer.
 *
 * Client-only APIs stay re-exported as client references — usable as long as
 * they are not called during a server render.
 *
 * Every import here points at a leaf module rather than a barrel. Barrels put
 * their whole graph in front of the application bundler: `../server/index`
 * would drag `withIntlayer` — and with it `@intlayer/webpack` and
 * `node-loader` — into the module graph of every route that imports this
 * package from a server component.
 *
 * Server-only extras (`getLocale`, `setLocale`, `setVariant`,
 * `IntlayerServerProvider`…) are deliberately left out: this entry exposes the
 * same names in every layer, so moving a component between them cannot break
 * an import. They live on `next-intlayer/server`.
 *
 * The deprecated markdown aliases are the one part of the default entry that is
 * deliberately absent: re-exporting them pulls the whole `'use client'`
 * markdown renderer into the server graph, where Next.js turns it into a client
 * entry for the route. Import them from `next-intlayer/markdown`, as their
 * deprecation notice already asks.
 */
export {
  getDictionary,
  getIntlayer,
  IntlayerClientContext,
  type IntlayerNode,
  localeCookie,
  localeInStorage,
  setLocaleCookie,
  setLocaleInStorage,
  useLocaleCookie,
  useLocaleStorage,
} from 'react-intlayer';
export { useLoadDynamic } from 'react-intlayer/server';
export {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from '../client/IntlayerClientProvider';
export { useLocalePageRouter } from '../client/useLocalePageRouter';
export { usePathname } from '../client/usePathname';
export { useRewriteURL } from '../client/useRewriteURL';
export { generateStaticParams } from '../generateStaticParams';
export {
  IntlayerProvider,
  type IntlayerProviderProps,
} from '../server/IntlayerProvider';
export { t } from '../server/t';
export { useDictionary } from '../server/useDictionary';
export { useDictionaryAsync } from '../server/useDictionaryAsync';
export { useDictionaryDynamic } from '../server/useDictionaryDynamic';
export { useI18n } from '../server/useI18n';
export { useIntl } from '../server/useIntl';
export { useIntlayer } from '../server/useIntlayer';
export { useLocale } from '../server/useLocale';
export type {
  LocalParams,
  LocalPromiseParams,
  Next14LayoutIntlayer,
  Next14PageIntlayer,
  Next15LayoutIntlayer,
  Next15PageIntlayer,
  NextLayoutIntlayer,
  NextPageIntlayer,
} from '../types/index';
