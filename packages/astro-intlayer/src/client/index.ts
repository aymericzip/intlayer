/**
 * `astro-intlayer` as loaded in the browser — client `<script>` blocks and
 * framework islands.
 *
 * Selected by the `browser` export condition. It mirrors the server entry name
 * for name, resolved to the client implementations of `vanilla-intlayer`, so
 * `useIntlayer('key')` reads the request locale in the frontmatter and the
 * client store in a `<script>` through one import path.
 *
 * The integration and the middleware are server-only and deliberately absent.
 */
export type {
  DeepTransformContent,
  IntlayerNode,
  UseLocaleProps,
  UseLocaleResult,
  WithOnChange,
} from 'vanilla-intlayer';
export {
  getDictionary,
  getIntlayer,
  installIntlayer,
  localeCookie,
  localeInStorage,
  setLocaleCookie,
  setLocaleInStorage,
  useDictionary,
  useDictionaryDynamic,
  useIntlayer,
  useLocale,
  useLocaleCookie,
  useLocaleStorage,
} from 'vanilla-intlayer';
