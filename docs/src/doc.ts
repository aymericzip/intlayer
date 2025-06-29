import { Locales } from '@intlayer/config';
import { localeRecord } from 'intlayer';
import { readFileContent } from './readFileContent';

const docs = {
  introduction: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/introduction.md`)
  ),
  roadmap: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/roadmap.md`)
  ),
  how_works_intlayer: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/how_works_intlayer.md`)
  ),
  configuration: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/configuration.md`)
  ),
  interest_of_intlayer: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/interest_of_intlayer.md`)
  ),
  intlayer_cli: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_cli.md`)
  ),
  intlayer_visual_editor: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_visual_editor.md`)
  ),
  intlayer_CMS: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_CMS.md`)
  ),
  intlayer_with_create_react_app: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_with_create_react_app.md`)
  ),
  intlayer_with_nextjs_15: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_with_nextjs_15.md`)
  ),
  intlayer_with_nextjs_14: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_with_nextjs_14.md`)
  ),
  intlayer_with_nextjs_page_router: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_with_nextjs_page_router.md`)
  ),
  intlayer_with_vite_react: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_with_vite+react.md`)
  ),
  intlayer_with_vite_vue: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_with_vite+vue.md`)
  ),
  intlayer_with_nuxt: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_with_nuxt.md`)
  ),
  intlayer_with_vite_svelte: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_with_vite+svelte.md`)
  ),
  intlayer_with_vite_solid: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_with_vite+solid.md`)
  ),
  intlayer_with_vite_preact: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_with_vite+preact.md`)
  ),
  intlayer_with_angular: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_with_angular.md`)
  ),
  intlayer_with_react_native_and_expo: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_with_react_native+expo.md`)
  ),
  intlayer_with_lynx_react: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_with_lynx+react.md`)
  ),
  intlayer_with_express: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/intlayer_with_express.md`)
  ),
  dictionary__translation: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/dictionary/translation.md`)
  ),
  dictionary__enumeration: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/dictionary/enumeration.md`)
  ),
  dictionary__condition: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/dictionary/condition.md`)
  ),
  dictionary__markdown: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/dictionary/markdown.md`)
  ),
  dictionary__insertion: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/dictionary/insertion.md`)
  ),
  dictionary__file: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/dictionary/file.md`)
  ),
  dictionary__nesting: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/dictionary/nesting.md`)
  ),
  dictionary__function_fetching: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/dictionary/function_fetching.md`)
  ),
  dictionary__get_started: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/dictionary/get_started.md`)
  ),
  dictionary__content_extention_customization: localeRecord(
    async ({ locale }) =>
      readFileContent(
        `/docs/${locale}/dictionary/content_extention_customization.md`
      )
  ),
  dictionary__per_locale_file: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/per_locale_file.md`)
  ),
  terms_of_service: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/terms_of_service.md`)
  ),
  privacy_notice: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/privacy_notice.md`)
  ),
  package__intlayer: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/intlayer/index.md`)
  ),
  package__intlayer__getConfiguration: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/intlayer/getConfiguration.md`)
  ),
  package__intlayer__getEnumeration: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/intlayer/getEnumeration.md`)
  ),
  package__intlayer__getHTMLTextDir: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/intlayer/getHTMLTextDir.md`)
  ),
  package__intlayer__getLocaleLang: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/intlayer/getLocaleLang.md`)
  ),
  package__intlayer__getLocaleName: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/intlayer/getLocaleName.md`)
  ),
  package__intlayer__getLocalizedUrl: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/intlayer/getLocalizedUrl.md`)
  ),
  package__intlayer__getMultilingualUrls: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/intlayer/getMultilingualUrls.md`)
  ),
  package__intlayer__getPathWithoutLocale: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/intlayer/getPathWithoutLocale.md`)
  ),
  package__intlayer__getTranslation: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/intlayer/getTranslation.md`)
  ),
  'package__express-intlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/express-intlayer/index.md`)
  ),
  'package__express-intlayer__t': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/express-intlayer/t.md`)
  ),
  'package__next-intlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/next-intlayer/index.md`)
  ),
  'package__next-intlayer__t': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/next-intlayer/t.md`)
  ),
  'package__next-intlayer__useDictionary': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/next-intlayer/useDictionary.md`)
  ),
  'package__next-intlayer__useIntlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/next-intlayer/useIntlayer.md`)
  ),
  'package__next-intlayer__useIntlayerAsync': localeRecord(({ locale }) =>
    readFileContent(
      `/docs/${locale}/packages/next-intlayer/useIntlayerAsync.md`
    )
  ),
  'package__next-intlayer__useLocale': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/next-intlayer/useLocale.md`)
  ),
  'package__react-intlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/react-intlayer/index.md`)
  ),
  'package__react-intlayer__t': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/react-intlayer/t.md`)
  ),
  'package__react-intlayer__useDictionary': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/react-intlayer/useDictionary.md`)
  ),
  'package__react-intlayer__useIntlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/react-intlayer/useIntlayer.md`)
  ),
  'package__react-intlayer__useIntlayerAsync': localeRecord(
    async ({ locale }) =>
      readFileContent(
        `/docs/${locale}/packages/react-intlayer/useIntlayerAsync.md`
      )
  ),
  'package__react-intlayer__useLocale': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/react-intlayer/useLocale.md`)
  ),
  'package__vite-intlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/vite-intlayer/index.md`)
  ),
  'package__vue-intlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/vue-intlayer/index.md`)
  ),
  'package__nuxt-intlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/nuxt-intlayer/index.md`)
  ),
  'package__svelte-intlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/svelte-intlayer/index.md`)
  ),
  'package__solid-intlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/solid-intlayer/index.md`)
  ),
  'package__preact-intlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/preact-intlayer/index.md`)
  ),
  'package__angular-intlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/angular-intlayer/index.md`)
  ),
  'package__react-native-intlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/react-native-intlayer/index.md`)
  ),
  'package__lynx-intlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/lynx-intlayer/index.md`)
  ),
  'package__react-scripts-intlayer': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/react-scripts-intlayer/index.md`)
  ),
  'package__intlayer-editor': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/intlayer-editor/index.md`)
  ),
  'package__@intlayer_api': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/@intlayer/api/index.md`)
  ),
  'package__@intlayer_chokidar': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/@intlayer/chokidar/index.md`)
  ),
  'package__@intlayer_cli': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/@intlayer/cli/index.md`)
  ),
  'package__@intlayer_config': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/@intlayer/config/index.md`)
  ),
  'package__@intlayer_core': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/@intlayer/core/index.md`)
  ),
  'package__@intlayer_design-system': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/@intlayer/design-system/index.md`)
  ),
  'package__@intlayer_dictionary-entry': localeRecord(({ locale }) =>
    readFileContent(
      `/docs/${locale}/packages/@intlayer/dictionary-entry/index.md`
    )
  ),
  'package__@intlayer_webpack': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/@intlayer/webpack/index.md`)
  ),
  'package__@intlayer_editor': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/@intlayer/editor/index.md`)
  ),
  'package__@intlayer_editor-react': localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/packages/@intlayer/editor-react/index.md`)
  ),
  vscode_extension: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/vs_code_extension.md`)
  ),
  ci_cd: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/CI_CD.md`)
  ),
  autoFill: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/autoFill.md`)
  ),
  mcp_server: localeRecord(({ locale }) =>
    readFileContent(`/docs/${locale}/mcp_server.md`)
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
) => {
  const doc = await docs[docName][lang];

  if (!doc) {
    const englishDoc = await docs[docName][Locales.ENGLISH];

    if (!englishDoc) {
      throw new Error(`Doc ${docName} not found`);
    }

    return englishDoc;
  }

  return doc;
};
