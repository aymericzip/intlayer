import { Locales } from '@intlayer/config';
import { localeRecord, readFileFunction } from './common';

const docs = {
  introduction: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/introduction.md`)
  ),
  roadmap: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/roadmap.md`)
  ),
  how_works_intlayer: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/how_works_intlayer.md`)
  ),
  configuration: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/configuration.md`)
  ),
  interest_of_intlayer: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/interest_of_intlayer.md`)
  ),
  intlayer_cli: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_cli.md`)
  ),
  intlayer_visual_editor: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_visual_editor.md`)
  ),
  intlayer_CMS: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_CMS.md`)
  ),
  intlayer_with_create_react_app: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_with_create_react_app.md`)
  ),
  intlayer_with_nextjs_15: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_with_nextjs_15.md`)
  ),
  intlayer_with_nextjs_14: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_with_nextjs_14.md`)
  ),
  intlayer_with_nextjs_page_router: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_with_nextjs_page_router.md`)
  ),
  intlayer_with_vite_react: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_with_vite+react.md`)
  ),
  intlayer_with_vite_vue: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_with_vite+vue.md`)
  ),
  intlayer_with_nuxt: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_with_nuxt.md`)
  ),
  intlayer_with_vite_svelte: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_with_vite+svelte.md`)
  ),
  intlayer_with_vite_solid: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_with_vite+solid.md`)
  ),
  intlayer_with_vite_preact: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_with_vite+preact.md`)
  ),
  intlayer_with_angular: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_with_angular.md`)
  ),
  intlayer_with_react_native_and_expo: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_with_react_native+expo.md`)
  ),
  intlayer_with_lynx_react: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_with_lynx+react.md`)
  ),
  intlayer_with_express: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/intlayer_with_express.md`)
  ),
  dictionary__translation: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/dictionary/translation.md`)
  ),
  dictionary__enumeration: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/dictionary/enumeration.md`)
  ),
  dictionary__condition: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/dictionary/condition.md`)
  ),
  dictionary__markdown: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/dictionary/markdown.md`)
  ),
  dictionary__insertion: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/dictionary/insertion.md`)
  ),
  dictionary__file: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/dictionary/file.md`)
  ),
  dictionary__nesting: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/dictionary/nesting.md`)
  ),
  dictionary__function_fetching: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/dictionary/function_fetching.md`)
  ),
  dictionary__get_started: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/dictionary/get_started.md`)
  ),
  dictionary__content_extention_customization: localeRecord(
    async ({ locale }) =>
      readFileFunction(
        `/docs/${locale}/dictionary/content_extention_customization.md`
      )
  ),
  dictionary__per_locale_file: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/per_locale_file.md`)
  ),
  terms_of_service: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/terms_of_service.md`)
  ),
  privacy_notice: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/privacy_notice.md`)
  ),
  package__intlayer: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/intlayer/index.md`)
  ),
  package__intlayer__getConfiguration: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/intlayer/getConfiguration.md`)
  ),
  package__intlayer__getEnumeration: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/intlayer/getEnumeration.md`)
  ),
  package__intlayer__getHTMLTextDir: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/intlayer/getHTMLTextDir.md`)
  ),
  package__intlayer__getLocaleLang: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/intlayer/getLocaleLang.md`)
  ),
  package__intlayer__getLocaleName: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/intlayer/getLocaleName.md`)
  ),
  package__intlayer__getLocalizedUrl: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/intlayer/getLocalizedUrl.md`)
  ),
  package__intlayer__getMultilingualUrls: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/intlayer/getMultilingualUrls.md`)
  ),
  package__intlayer__getPathWithoutLocale: localeRecord(({ locale }) =>
    readFileFunction(
      `/docs/${locale}/packages/intlayer/getPathWithoutLocale.md`
    )
  ),
  package__intlayer__getTranslation: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/intlayer/getTranslation.md`)
  ),
  'package__express-intlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/express-intlayer/index.md`)
  ),
  'package__express-intlayer__t': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/express-intlayer/t.md`)
  ),
  'package__next-intlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/next-intlayer/index.md`)
  ),
  'package__next-intlayer__t': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/next-intlayer/t.md`)
  ),
  'package__next-intlayer__useDictionary': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/next-intlayer/useDictionary.md`)
  ),
  'package__next-intlayer__useIntlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/next-intlayer/useIntlayer.md`)
  ),
  'package__next-intlayer__useIntlayerAsync': localeRecord(({ locale }) =>
    readFileFunction(
      `/docs/${locale}/packages/next-intlayer/useIntlayerAsync.md`
    )
  ),
  'package__next-intlayer__useLocale': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/next-intlayer/useLocale.md`)
  ),
  'package__react-intlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/react-intlayer/index.md`)
  ),
  'package__react-intlayer__t': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/react-intlayer/t.md`)
  ),
  'package__react-intlayer__useDictionary': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/react-intlayer/useDictionary.md`)
  ),
  'package__react-intlayer__useIntlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/react-intlayer/useIntlayer.md`)
  ),
  'package__react-intlayer__useIntlayerAsync': localeRecord(
    async ({ locale }) =>
      readFileFunction(
        `/docs/${locale}/packages/react-intlayer/useIntlayerAsync.md`
      )
  ),
  'package__react-intlayer__useLocale': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/react-intlayer/useLocale.md`)
  ),
  'package__vite-intlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/vite-intlayer/index.md`)
  ),
  'package__vue-intlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/vue-intlayer/index.md`)
  ),
  'package__nuxt-intlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/nuxt-intlayer/index.md`)
  ),
  'package__svelte-intlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/svelte-intlayer/index.md`)
  ),
  'package__solid-intlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/solid-intlayer/index.md`)
  ),
  'package__preact-intlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/preact-intlayer/index.md`)
  ),
  'package__angular-intlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/angular-intlayer/index.md`)
  ),
  'package__react-native-intlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/react-native-intlayer/index.md`)
  ),
  'package__lynx-intlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/lynx-intlayer/index.md`)
  ),
  'package__react-scripts-intlayer': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/react-scripts-intlayer/index.md`)
  ),
  'package__intlayer-editor': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/intlayer-editor/index.md`)
  ),
  'package__@intlayer_api': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/@intlayer/api/index.md`)
  ),
  'package__@intlayer_chokidar': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/@intlayer/chokidar/index.md`)
  ),
  'package__@intlayer_cli': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/@intlayer/cli/index.md`)
  ),
  'package__@intlayer_config': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/@intlayer/config/index.md`)
  ),
  'package__@intlayer_core': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/@intlayer/core/index.md`)
  ),
  'package__@intlayer_design-system': localeRecord(({ locale }) =>
    readFileFunction(
      `/docs/${locale}/packages/@intlayer/design-system/index.md`
    )
  ),
  'package__@intlayer_dictionary-entry': localeRecord(({ locale }) =>
    readFileFunction(
      `/docs/${locale}/packages/@intlayer/dictionary-entry/index.md`
    )
  ),
  'package__@intlayer_webpack': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/@intlayer/webpack/index.md`)
  ),
  'package__@intlayer_editor': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/@intlayer/editor/index.md`)
  ),
  'package__@intlayer_editor-react': localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/packages/@intlayer/editor-react/index.md`)
  ),
  vscode_extension: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/vs_code_extension.md`)
  ),
  ci_cd: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/CI_CD.md`)
  ),
  autoFill: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/autoFill.md`)
  ),
  mcp_server: localeRecord(({ locale }) =>
    readFileFunction(`/docs/${locale}/mcp_server.md`)
  ),
};

export const getDocs = async (lang = Locales.ENGLISH) => {
  const docsEntries = await Promise.all(
    Object.entries(docs)
      .map(([key, value]) => [key, value[lang]])
      .map(async ([key, value]) => [key, await value])
  );

  const docsResult = Object.fromEntries(docsEntries);

  return docsResult;
};

export const getDoc = async (
  docName: keyof typeof docs,
  lang = Locales.ENGLISH
) => await docs[docName]?.[lang];
