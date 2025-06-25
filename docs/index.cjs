const { Locales } = require('@intlayer/config');
const { localeRecord: localeRecordCore } = require('@intlayer/core');
const fg = require('fast-glob');
const { join } = require('path');

/**
 * This condition is a hack to import markdown files either in node or in the browser
 */
if (require.extensions) {
  require.extensions['.md'] = (module, filename) => {
    module.exports = require('fs').readFileSync(filename, 'utf8');
  };
}

const localeList = [
  Locales.ENGLISH,
  Locales.FRENCH,
  Locales.SPANISH,
  Locales.GERMAN,
  Locales.ARABIC,
  Locales.ITALIAN,
  Locales.ENGLISH_UNITED_KINGDOM,
  Locales.PORTUGUESE,
  Locales.HINDI,
  Locales.JAPANESE,
  Locales.KOREAN,
  Locales.CHINESE,
];
const defaultLocale = Locales.ENGLISH;

const localeRecord = (mapper) =>
  localeRecordCore(mapper, localeList, defaultLocale);

const docs = {
  introduction: localeRecord(({ locale }) =>
    require(`./${locale}/introduction.md`)
  ),
  roadmap: localeRecord(({ locale }) => require(`./${locale}/roadmap.md`)),

  how_works_intlayer: localeRecord(({ locale }) =>
    require(`./${locale}/how_works_intlayer.md`)
  ),
  configuration: localeRecord(({ locale }) =>
    require(`./${locale}/configuration.md`)
  ),
  interest_of_intlayer: localeRecord(({ locale }) =>
    require(`./${locale}/interest_of_intlayer.md`)
  ),
  intlayer_cli: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_cli.md`)
  ),
  intlayer_visual_editor: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_visual_editor.md`)
  ),
  intlayer_CMS: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_CMS.md`)
  ),
  intlayer_with_create_react_app: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_create_react_app.md`)
  ),
  intlayer_with_nextjs_15: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_nextjs_15.md`)
  ),
  intlayer_with_nextjs_14: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_nextjs_14.md`)
  ),
  intlayer_with_nextjs_page_router: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_nextjs_page_router.md`)
  ),
  intlayer_with_vite_react: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_vite+react.md`)
  ),
  intlayer_with_vite_vue: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_vite+vue.md`)
  ),
  intlayer_with_nuxt: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_nuxt.md`)
  ),
  intlayer_with_vite_svelte: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_vite+svelte.md`)
  ),
  intlayer_with_vite_solid: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_vite+solid.md`)
  ),
  intlayer_with_vite_preact: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_vite+preact.md`)
  ),
  intlayer_with_angular: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_angular.md`)
  ),
  intlayer_with_react_native_and_expo: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_react_native+expo.md`)
  ),
  intlayer_with_lynx_react: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_lynx+react.md`)
  ),
  intlayer_with_express: localeRecord(({ locale }) =>
    require(`./${locale}/intlayer_with_express.md`)
  ),
  dictionary__translation: localeRecord(({ locale }) =>
    require(`./${locale}/dictionary/translation.md`)
  ),
  dictionary__enumeration: localeRecord(({ locale }) =>
    require(`./${locale}/dictionary/enumeration.md`)
  ),
  dictionary__condition: localeRecord(({ locale }) =>
    require(`./${locale}/dictionary/condition.md`)
  ),
  dictionary__markdown: localeRecord(({ locale }) =>
    require(`./${locale}/dictionary/markdown.md`)
  ),
  dictionary__insertion: localeRecord(({ locale }) =>
    require(`./${locale}/dictionary/insertion.md`)
  ),
  dictionary__file: localeRecord(({ locale }) =>
    require(`./${locale}/dictionary/file.md`)
  ),
  dictionary__nesting: localeRecord(({ locale }) =>
    require(`./${locale}/dictionary/nesting.md`)
  ),
  dictionary__function_fetching: localeRecord(({ locale }) =>
    require(`./${locale}/dictionary/function_fetching.md`)
  ),
  dictionary__get_started: localeRecord(({ locale }) =>
    require(`./${locale}/dictionary/get_started.md`)
  ),
  dictionary__content_extention_customization: localeRecord(({ locale }) =>
    require(`./${locale}/dictionary/content_extention_customization.md`)
  ),
  dictionary__per_locale_file: localeRecord(({ locale }) =>
    require(`./${locale}/per_locale_file.md`)
  ),
  terms_of_service: localeRecord(({ locale }) =>
    require(`./${locale}/terms_of_service.md`)
  ),
  privacy_notice: localeRecord(({ locale }) =>
    require(`./${locale}/privacy_notice.md`)
  ),
  package__intlayer: localeRecord(({ locale }) =>
    require(`./${locale}/packages/intlayer/index.md`)
  ),
  package__intlayer__getConfiguration: localeRecord(({ locale }) =>
    require(`./${locale}/packages/intlayer/getConfiguration.md`)
  ),
  package__intlayer__getEnumeration: localeRecord(({ locale }) =>
    require(`./${locale}/packages/intlayer/getEnumeration.md`)
  ),
  package__intlayer__getHTMLTextDir: localeRecord(({ locale }) =>
    require(`./${locale}/packages/intlayer/getHTMLTextDir.md`)
  ),
  package__intlayer__getLocaleLang: localeRecord(({ locale }) =>
    require(`./${locale}/packages/intlayer/getLocaleLang.md`)
  ),
  package__intlayer__getLocaleName: localeRecord(({ locale }) =>
    require(`./${locale}/packages/intlayer/getLocaleName.md`)
  ),
  package__intlayer__getLocalizedUrl: localeRecord(({ locale }) =>
    require(`./${locale}/packages/intlayer/getLocalizedUrl.md`)
  ),
  package__intlayer__getMultilingualUrls: localeRecord(({ locale }) =>
    require(`./${locale}/packages/intlayer/getMultilingualUrls.md`)
  ),
  package__intlayer__getPathWithoutLocale: localeRecord(({ locale }) =>
    require(`./${locale}/packages/intlayer/getPathWithoutLocale.md`)
  ),
  package__intlayer__getTranslation: localeRecord(({ locale }) =>
    require(`./${locale}/packages/intlayer/getTranslation.md`)
  ),
  'package__express-intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/express-intlayer/index.md`)
  ),
  'package__express-intlayer__t': localeRecord(({ locale }) =>
    require(`./${locale}/packages/express-intlayer/t.md`)
  ),
  'package__next-intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/next-intlayer/index.md`)
  ),
  'package__next-intlayer__t': localeRecord(({ locale }) =>
    require(`./${locale}/packages/next-intlayer/t.md`)
  ),
  'package__next-intlayer__useDictionary': localeRecord(({ locale }) =>
    require(`./${locale}/packages/next-intlayer/useDictionary.md`)
  ),
  'package__next-intlayer__useIntlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/next-intlayer/useIntlayer.md`)
  ),
  'package__next-intlayer__useIntlayerAsync': localeRecord(({ locale }) =>
    require(`./${locale}/packages/next-intlayer/useIntlayerAsync.md`)
  ),
  'package__next-intlayer__useLocale': localeRecord(({ locale }) =>
    require(`./${locale}/packages/next-intlayer/useLocale.md`)
  ),
  'package__react-intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/react-intlayer/index.md`)
  ),
  'package__react-intlayer__t': localeRecord(({ locale }) =>
    require(`./${locale}/packages/react-intlayer/t.md`)
  ),
  'package__react-intlayer__useDictionary': localeRecord(({ locale }) =>
    require(`./${locale}/packages/react-intlayer/useDictionary.md`)
  ),
  'package__react-intlayer__useIntlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/react-intlayer/useIntlayer.md`)
  ),
  'package__react-intlayer__useIntlayerAsync': localeRecord(({ locale }) =>
    require(`./${locale}/packages/react-intlayer/useIntlayerAsync.md`)
  ),
  'package__react-intlayer__useLocale': localeRecord(({ locale }) =>
    require(`./${locale}/packages/react-intlayer/useLocale.md`)
  ),
  'package__vite-intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/vite-intlayer/index.md`)
  ),
  'package__vue-intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/vue-intlayer/index.md`)
  ),
  'package__nuxt-intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/nuxt-intlayer/index.md`)
  ),
  'package__svelte-intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/svelte-intlayer/index.md`)
  ),
  'package__solid-intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/solid-intlayer/index.md`)
  ),
  'package__preact-intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/preact-intlayer/index.md`)
  ),
  'package__angular-intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/angular-intlayer/index.md`)
  ),
  'package__react-native-intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/react-native-intlayer/index.md`)
  ),
  'package__lynx-intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/lynx-intlayer/index.md`)
  ),
  'package__react-scripts-intlayer': localeRecord(({ locale }) =>
    require(`./${locale}/packages/react-scripts-intlayer/index.md`)
  ),
  'package__intlayer-editor': localeRecord(({ locale }) =>
    require(`./${locale}/packages/intlayer-editor/index.md`)
  ),
  'package__@intlayer_api': localeRecord(({ locale }) =>
    require(`./${locale}/packages/@intlayer/api/index.md`)
  ),
  'package__@intlayer_chokidar': localeRecord(({ locale }) =>
    require(`./${locale}/packages/@intlayer/chokidar/index.md`)
  ),
  'package__@intlayer_cli': localeRecord(({ locale }) =>
    require(`./${locale}/packages/@intlayer/cli/index.md`)
  ),
  'package__@intlayer_config': localeRecord(({ locale }) =>
    require(`./${locale}/packages/@intlayer/config/index.md`)
  ),
  'package__@intlayer_core': localeRecord(({ locale }) =>
    require(`./${locale}/packages/@intlayer/core/index.md`)
  ),
  'package__@intlayer_design-system': localeRecord(({ locale }) =>
    require(`./${locale}/packages/@intlayer/design-system/index.md`)
  ),
  'package__@intlayer_dictionary-entry': localeRecord(({ locale }) =>
    require(`./${locale}/packages/@intlayer/dictionary-entry/index.md`)
  ),
  'package__@intlayer_webpack': localeRecord(({ locale }) =>
    require(`./${locale}/packages/@intlayer/webpack/index.md`)
  ),
  'package__@intlayer_editor': localeRecord(({ locale }) =>
    require(`./${locale}/packages/@intlayer/editor/index.md`)
  ),
  'package__@intlayer_editor-react': localeRecord(({ locale }) =>
    require(`./${locale}/packages/@intlayer/editor-react/index.md`)
  ),
  vscode_extension: localeRecord(({ locale }) =>
    require(`./${locale}/vs_code_extension.md`)
  ),
  ci_cd: localeRecord(({ locale }) => require(`./${locale}/CI_CD.md`)),
  autoFill: localeRecord(({ locale }) => require(`./${locale}/autoFill.md`)),
  mcp_server: localeRecord(({ locale }) =>
    require(`./${locale}/mcp_server.md`)
  ),
};

const getDocs = (lang = Locales.ENGLISH) =>
  Object.fromEntries(
    Object.entries(docs).map(([key, value]) => [key, value[lang]])
  );

const getDoc = (docName, lang = Locales.ENGLISH) => docs[docName]?.[lang];

const fequentQuestions = {
  build_dictionaries: require('./en/frequent_questions/build_dictionaries.md'),
  esbuild_error: require('./en/frequent_questions/esbuild_error.md'),
  static_rendering: require('./en/frequent_questions/static_rendering.md'),
  domain_routing: require('./en/frequent_questions/domain_routing.md'),
  intlayer_command_undefined: require('./en/frequent_questions/intlayer_command_undefined.md'),
  unknown_command: require('./en/frequent_questions/unknown_command.md'),
  locale_incorect_in_url: require('./en/frequent_questions/locale_incorect_in_url.md'),
  get_locale_cookie: require('./en/frequent_questions/get_locale_cookie.md'),
  ssr_next_no_locale: require('./en/frequent_questions/SSR_Next_no_[locale].md'),
  array_as_content_declaration: require('./en/frequent_questions/array_as_content_declaration.md'),
  translated_path_url: require('./en/frequent_questions/translated_path_url.md'),
  customized_locale_list: require('./en/frequent_questions/customized_locale_list.md'),
};

const getFequentQuestions = () =>
  Object.fromEntries(
    Object.entries(fequentQuestions).map(([key, value]) => [key, value])
  );

module.exports = { getDoc, getDocs, getFequentQuestions };
