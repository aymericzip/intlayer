export enum PagesRoutes {
  Home = '/',
  Demo = '/demo',
  Playground = '/playground',
  NotFound = '/404',

  Dashboard = '/dashboard',
  Dashboard_Editor = '/dashboard/editor',
  Dashboard_Content = '/dashboard/content',
  Dashboard_Projects = '/dashboard/projects',
  Dashboard_Tags = '/dashboard/tags',
  Dashboard_Organization = '/dashboard/organization',
  Dashboard_Profile = '/dashboard/profile',

  Doc = '/doc/get-started',
  Doc_Roadmap = '/doc/roadmap',
  Doc_Search = '/doc/search',
  Doc_Chat = '/doc/chat',
  Doc_HowWorksIntlayer = '/doc/concept/how-works-intlayer',
  Doc_Configuration = '/doc/concept/configuration',
  Doc_Interest = '/doc/concept/interest',
  Doc_IntlayerVisualEditor = '/doc/concept/editor',
  Doc_IntlayerCMS = '/doc/concept/cms',
  Doc_CLI = '/doc/concept/cli',
  Doc_CI_CD = '/doc/concept/ci-cd',

  Doc_ContentDeclaration = '/doc/concept/content',
  Doc_Dictionary_Translation = '/doc/concept/content/translation',
  Doc_Dictionary_Enumeration = '/doc/concept/content/enumeration',
  Doc_Dictionary_Insertion = '/doc/concept/content/insertion',
  Doc_Dictionary_Markdown = '/doc/concept/content/markdown',
  Doc_Dictionary_Nesting = '/doc/concept/content/nesting',
  Doc_Dictionary_Condition = '/doc/concept/content/condition',
  Doc_Dictionary_File = '/doc/concept/content/file',
  Doc_Dictionary_FunctionFetching = '/doc/concept/content/function-fetching',
  Doc_Dictionary_PerLocaleFile = '/doc/concept/per-locale-file',
  Doc_Dictionary_AutoFill = '/doc/concept/auto-fill',
  Doc_Environment_NextJS_15 = '/doc/environment/nextjs',
  Doc_Environment_NextJS_14 = '/doc/environment/nextjs/14',
  Doc_Intlayer_with_NextJS_using_Page_Router = '/doc/environment/nextjs/next-with-Page-Router',
  Doc_Environment_CRA = '/doc/environment/create-react-app',
  Doc_Environment_ViteAndReact = '/doc/environment/vite-and-react',
  Doc_Environment_ViteAndVue = '/doc/environment/vite-and-vue',
  Doc_Environment_ViteAndSolid = '/doc/environment/vite-and-solid',
  Doc_Environment_ViteAndSvelte = '/doc/environment/vite-and-svelte',
  Doc_Environment_ViteAndPreact = '/doc/environment/vite-and-preact',
  Doc_Environment_Angular = '/doc/environment/angular',
  Doc_Environment_ReactNativeAndExpo = '/doc/environment/react-native-and-expo',
  Doc_Environment_Lynx = '/doc/environment/lynx-and-react',
  Doc_Environment_Express = '/doc/environment/express',
  'Doc_Packages_intlayer' = '/doc/packages/intlayer',
  'Doc_Packages_intlayer_getConfiguration' = '/doc/packages/intlayer/getConfiguration',
  'Doc_Packages_intlayer_getHTMLTextDir' = '/doc/packages/intlayer/getHTMLTextDir',
  'Doc_Packages_intlayer_getDictionary' = '/doc/packages/intlayer/getDictionary',
  'Doc_Packages_intlayer_getLocaleLang' = '/doc/packages/intlayer/getLocaleLang',
  'Doc_Packages_intlayer_getLocaleName' = '/doc/packages/intlayer/getLocaleName',
  'Doc_Packages_intlayer_getLocalizedUrl' = '/doc/packages/intlayer/getLocalizedUrl',
  'Doc_Packages_intlayer_getMultilingualUrls' = '/doc/packages/intlayer/getMultilingualUrls',
  'Doc_Packages_intlayer_getPathWithoutLocale' = '/doc/packages/intlayer/getPathWithoutLocale',
  'Doc_Packages_intlayer_getEnumeration' = '/doc/packages/intlayer/getEnumeration',
  'Doc_Packages_intlayer_getTranslation' = '/doc/packages/intlayer/getTranslation',
  'Doc_Packages_intlayer_removeLocaleFromUrl' = '/doc/packages/intlayer/removeLocaleFromUrl',
  'Doc_Packages_express-intlayer' = '/doc/packages/express-intlayer',
  'Doc_Packages_express-intlayer_t' = '/doc/packages/express-intlayer/t',
  'Doc_Packages_react-intlayer' = '/doc/packages/react-intlayer',
  'Doc_Packages_react-intlayer_t' = '/doc/packages/react-intlayer/t',
  'Doc_Packages_react-intlayer_useIntlayer' = '/doc/packages/react-intlayer/useIntlayer',
  'Doc_Packages_react-intlayer_useIntlayerAsync' = '/doc/packages/react-intlayer/useIntlayerAsync',
  'Doc_Packages_react-intlayer_useDictionary' = '/doc/packages/react-intlayer/useDictionary',
  'Doc_Packages_react-intlayer_useLocale' = '/doc/packages/react-intlayer/useLocale',
  'Doc_Packages_next-intlayer' = '/doc/packages/next-intlayer',
  'Doc_Packages_next-intlayer_t' = '/doc/packages/next-intlayer/t',
  'Doc_Packages_next-intlayer_useIntlayer' = '/doc/packages/next-intlayer/useIntlayer',
  'Doc_Packages_next-intlayer_useIntlayerAsync' = '/doc/packages/next-intlayer/useIntlayerAsync',
  'Doc_Packages_next-intlayer_useDictionary' = '/doc/packages/next-intlayer/useDictionary',
  'Doc_Packages_next-intlayer_useLocale' = '/doc/packages/next-intlayer/useLocale',
  'Doc_Packages_vite-intlayer' = '/doc/packages/vite-intlayer',
  'Doc_Packages_vue-intlayer' = '/doc/packages/vue-intlayer',
  'Doc_Packages_svelte-intlayer' = '/doc/packages/svelte-intlayer',
  'Doc_Packages_solid-intlayer' = '/doc/packages/solid-intlayer',
  'Doc_Packages_preact-intlayer' = '/doc/packages/preact-intlayer',
  'Doc_Packages_angular-intlayer' = '/doc/packages/angular-intlayer',
  'Doc_Packages_lynx-intlayer' = '/doc/packages/lynx-intlayer',
  'Doc_Packages_react-native-intlayer' = '/doc/packages/react-native-intlayer',
  'Doc_Packages_react-scripts-intlayer' = '/doc/packages/react-scripts-intlayer',
  'VS_Code_Extension' = '/doc/vs-code-extension',
  'MCP_Server' = '/doc/mcp-server',

  Blog = '/blog/search/',
  Blog_Search = '/blog/search',
  Blog_SEO_and_i18n = '/blog/SEO-and-i18n',
  'Blog_What_is_i18n' = '/blog/what-is-internationalization',
  'Blog_Intlayer_with_Next-i18next' = '/blog/intlayer-with-next-i18next',
  'Blog_Intlayer_with_React-i18next' = '/blog/intlayer-with-react-i18next',
  'Blog_Intlayer_with_Next-intl' = '/blog/intlayer-with-next-intl',
  'Blog_Intlayer_with_React-intl' = '/blog/intlayer-with-react-intl',
  'Blog_Next-i18next_vs_Next-intl_vs_Intlayer' = '/blog/next-i18next-vs-next-intl-vs-intlayer',
  'Blog_React-i18next_vs_React-intl_vs_Intlayer' = '/blog/react-i18next-vs-react-intl-vs-intlayer',
  'Blog_i18n-technologies__frameworks__angular' = '/blog/i18n-technologies/frameworks/angular',
  'Blog_i18n-technologies__frameworks__react' = '/blog/i18n-technologies/frameworks/react',
  'Blog_i18n-technologies__frameworks__vue' = '/blog/i18n-technologies/frameworks/vue',
  'Blog_i18n-technologies__frameworks__svelte' = '/blog/i18n-technologies/frameworks/svelte',
  'Blog_i18n-technologies__frameworks__flutter' = '/blog/i18n-technologies/frameworks/flutter',
  'Blog_i18n-technologies__frameworks__react-native' = '/blog/i18n-technologies/frameworks/react-native',
  'Blog_i18n-technologies__CMS__wordpress' = '/blog/i18n-technologies/CMS/wordpress',
  'Blog_i18n-technologies__CMS__drupal' = '/blog/i18n-technologies/CMS/drupal',
  'Blog_i18n-technologies__CMS__wix' = '/blog/i18n-technologies/CMS/wix',

  PrivacyPolicy = '/privacy-notice',
  TermsOfService = '/terms-of-service',

  Pricing = '/pricing',

  Onboarding = '/onboarding',
  Onboarding_Flow = '/onboarding/{{step}}/{{plan}}/{{period}}',

  Auth_SignIn = '/auth/login',
  Auth_SignUp = '/auth/register',
  Auth_ResetPassword = '/auth/password/reset',
  Auth_ChangePassword = '/auth/password/change',
}

export enum ExternalLinks {
  Github = 'https://github.com/aymericzip/intlayer',
  LinkedIn = 'https://www.linkedin.com/company/intlayerorg/',
  ExampleIntlayerWithNextjs = 'https://github.com/aymericzip/intlayer/tree/main/examples/nextjs-15-app',
  ExampleIntlayerWithReactJS = 'https://github.com/aymericzip/intlayer/tree/main/examples/react-app',
  ExampleIntlayerWithViteAndReact = 'https://github.com/aymericzip/intlayer/tree/main/examples/vite-react-app',
  ExampleIntlayerWithViteAndVue = 'https://github.com/aymericzip/intlayer/tree/main/examples/vite-vue-app',
  ExampleIntlayerWithViteAndSvelte = 'https://github.com/aymericzip/intlayer/tree/main/examples/vite-svelte-app',
  ExampleIntlayerWithViteAndSolid = 'https://github.com/aymericzip/intlayer/tree/main/examples/vite-solid-app',
  ExampleIntlayerWithViteAndPreact = 'https://github.com/aymericzip/intlayer/tree/main/examples/vite-preact-app',
  ExampleIntlayerWithReactNative = 'https://github.com/aymericzip/intlayer/tree/main/examples/react-native-app',
  ExampleIntlayerWithExpress = 'https://github.com/aymericzip/intlayer/tree/main/examples/express-app',
}

export enum GithubRoutes {
  Introduction = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/introduction.md',
  Roadmap = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/roadmap.md',
  HowWorksIntlayer = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/how_works_intlayer.md',
  Configuration = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/configuration.md',
  InterestOfIntlayer = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/interest_of_intlayer.md',
  IntlayerCLI = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_cli.md',
  IntlayerVisualEditor = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_visual_editor.md',
  IntlayerCMS = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_CMS.md',
  IntlayerWithNextJS15 = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nextjs_15.md',
  IntlayerWithNextJS14 = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nextjs_14.md',
  IntlayerWithNextJSUsingPageRouter = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nextjs_page_router.md',
  IntlayerWithReactCRA = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_create_react_app.md',
  IntlayerWithViteReact = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+react.md',
  IntlayerWithVitePreact = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+preact.md',
  IntlayerWithViteVue = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+vue.md',
  IntlayerWithViteSvelte = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+svelte.md',
  IntlayerWithViteSolid = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+solid.md',
  IntlayerWithAngular = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_angular.md',
  IntlayerWithReactNativeAndExpo = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react_native+expo.md',
  IntlayerWithLynxReact = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_lynx+react.md',
  IntlayerWithExpress = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_express.md',
  Dictionary_GetStarted = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/get_started.md',
  Dictionary_ContentExtensionCustomization = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/content_extention_customization.md',
  Dictionary_Enumeration = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/enumeration.md',
  Dictionary_FunctionFetching = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/function_fetching.md',
  Dictionary_Translation = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/translation.md',
  Dictionary_Insertion = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/insertion.md',
  Dictionary_Markdown = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/markdown.md',
  Dictionary_Nesting = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/nesting.md',
  Dictionary_Condition = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/condition.md',
  Dictionary_File = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/file.md',
  Dictionary_PerLocaleFile = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/per-locale-file.md',
  Dictionary_AutoFill = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/autoFill.md',
  'Packages_intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/index.md',
  'Packages_intlayer_getConfiguration' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getConfiguration.md',
  'Packages_intlayer_getHTMLTextDir' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getHTMLTextDir.md',
  'Packages_intlayer_getDictionary' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getDictionary.md',
  'Packages_intlayer_getLocaleLang' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocaleLang.md',
  'Packages_intlayer_getLocaleName' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocaleName.md',
  'Packages_intlayer_getLocalizedUrl' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocalizedUrl.md',
  'Packages_intlayer_getMultilingualUrls' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getMultilingualUrls.md',
  'Packages_intlayer_getPathWithoutLocale' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getPathWithoutLocale.md',
  'Packages_intlayer_getTranslation' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getTranslation.md',
  'Packages_intlayer_getEnumeration' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getEnumeration.md',
  'Packages_intlayer_removeLocaleFromUrl' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/removeLocaleFromUrl.md',
  'Packages_express-intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/express-intlayer/index.md',
  'Packages_express-intlayer_t' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/express-intlayer/t.md',
  'Packages_react-intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/index.md',
  'Packages_react-intlayer_t' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/t.md',
  'Packages_react-intlayer_useIntlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/useIntlayer.md',
  'Packages_react-intlayer_useIntlayerAsync' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/useIntlayerAsync.md',
  'Packages_react-intlayer_useDictionary' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/useDictionary.md',
  'Packages_react-intlayer_useLocale' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/useLocale.md',
  'Packages_next-intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/index.md',
  'Packages_next-intlayer_t' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/t.md',
  'Packages_next-intlayer_useIntlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useIntlayer.md',
  'Packages_next-intlayer_useIntlayerAsync' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useIntlayerAsync.md',
  'Packages_next-intlayer_useDictionary' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useDictionary.md',
  'Packages_next-intlayer_useLocale' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useLocale.md',
  'Packages_vite-intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/vite-intlayer/index.md',
  'Packages_vue-intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/vue-intlayer/index.md',
  'Packages_svelte-intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/svelte-intlayer/index.md',
  'Packages_preact-intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/preact-intlayer/index.md',
  'Packages_angular-intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/angular-intlayer/index.md',
  'Packages_solid-intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/solid-intlayer/index.md',
  'Packages_lynx-intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/lynx-intlayer/index.md',
  'Packages_react-native-intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-native-intlayer/index.md',
  'Packages_react-scripts-intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-scripts-intlayer/index.md',
  'VS_Code_extension_intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/vs_code_extension.md',
  'MCP_Server' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/mcp_server.md',
  'Doc_CI_CD' = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/CI_CD.md',

  BlogIndex = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/index.md',
  WhatIsi18n = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/what_is_internationalization.md',
  IntlayerWithNextI18next = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/intlayer_with_next-i18next.md',
  IntlayerWithReactI18next = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/intlayer_with_react-i18next.md',
  IntlayerWithNextIntl = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/intlayer_with_next-intl.md',
  IntlayerWithReactIntl = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/intlayer_with_react-intl.md',
  'Next-i18next_vs_Next-intl_vs_Intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/next-i18next_vs_next-intl_vs_intlayer.md',
  'React-i18next_vs_React-intl_vs_Intlayer' = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/react-i18next_vs_react-intl_vs_intlayer.md',
  I18nAndSEO = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/internationalization_and_SEO.md',
  'i18n-technologies__frameworks__angular' = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/list_i18n_technologies/frameworks/angular.md',
  'i18n-technologies__frameworks__react' = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/list_i18n_technologies/frameworks/react.md',
  'i18n-technologies__frameworks__vue' = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/list_i18n_technologies/frameworks/vue.md',
  'i18n-technologies__frameworks__svelte' = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/list_i18n_technologies/frameworks/svelte.md',
  'i18n-technologies__frameworks__flutter' = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/list_i18n_technologies/frameworks/flutter.md',
  'i18n-technologies__frameworks__react-native' = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/list_i18n_technologies/frameworks/react-native.md',
  'i18n-technologies__CMS__wordpress' = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/list_i18n_technologies/CMS/wordpress.md',
  'i18n-technologies__CMS__drupal' = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/list_i18n_technologies/CMS/drupal.md',
  'i18n-technologies__CMS__wix' = 'https://github.com/aymericzip/intlayer/blob/main/blog/en/list_i18n_technologies/CMS/wix.md',

  PrivacyPolicy = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/privacy_notice.md',
  TermsOfService = 'https://github.com/aymericzip/intlayer/blob/main/docs/en/terms_of_service.md',
}

export const urlMapper: Partial<Record<GithubRoutes, PagesRoutes>> = {
  [GithubRoutes.Introduction]: PagesRoutes.Doc,
  [GithubRoutes.HowWorksIntlayer]: PagesRoutes.Doc_HowWorksIntlayer,
  [GithubRoutes.Configuration]: PagesRoutes.Doc_Configuration,
  [GithubRoutes.InterestOfIntlayer]: PagesRoutes.Doc_Interest,
  [GithubRoutes.IntlayerCLI]: PagesRoutes.Doc_CLI,
  [GithubRoutes.IntlayerVisualEditor]: PagesRoutes.Doc_IntlayerVisualEditor,
  [GithubRoutes.IntlayerCMS]: PagesRoutes.Doc_IntlayerCMS,
  [GithubRoutes.IntlayerWithNextJS15]: PagesRoutes.Doc_Environment_NextJS_15,
  [GithubRoutes.IntlayerWithNextJS14]: PagesRoutes.Doc_Environment_NextJS_14,
  [GithubRoutes.IntlayerWithNextJSUsingPageRouter]:
    PagesRoutes.Doc_Intlayer_with_NextJS_using_Page_Router,
  [GithubRoutes.IntlayerWithReactCRA]: PagesRoutes.Doc_Environment_CRA,
  [GithubRoutes.IntlayerWithViteReact]:
    PagesRoutes.Doc_Environment_ViteAndReact,
  [GithubRoutes.IntlayerWithExpress]: PagesRoutes.Doc_Environment_Express,
  [GithubRoutes.Dictionary_GetStarted]: PagesRoutes.Doc_ContentDeclaration,
  [GithubRoutes.Dictionary_ContentExtensionCustomization]:
    PagesRoutes.Doc_ContentDeclaration,
  [GithubRoutes.Dictionary_Enumeration]: PagesRoutes.Doc_Dictionary_Enumeration,
  [GithubRoutes.Dictionary_FunctionFetching]:
    PagesRoutes.Doc_Dictionary_FunctionFetching,
  [GithubRoutes.Dictionary_Translation]: PagesRoutes.Doc_Dictionary_Translation,
  [GithubRoutes.Dictionary_Markdown]: PagesRoutes.Doc_Dictionary_Markdown,
  [GithubRoutes.Dictionary_Condition]: PagesRoutes.Doc_Dictionary_Condition,
  [GithubRoutes.Dictionary_Nesting]: PagesRoutes.Doc_Dictionary_Nesting,
  [GithubRoutes.Dictionary_File]: PagesRoutes.Doc_Dictionary_File,
  [GithubRoutes.Dictionary_Insertion]: PagesRoutes.Doc_Dictionary_Insertion,
  [GithubRoutes['Packages_intlayer']]: PagesRoutes['Doc_Packages_intlayer'],
  [GithubRoutes['Packages_intlayer_getConfiguration']]:
    PagesRoutes['Doc_Packages_intlayer_getConfiguration'],
  [GithubRoutes['Packages_intlayer_getDictionary']]:
    PagesRoutes['Doc_Packages_intlayer_getDictionary'],
  [GithubRoutes['Packages_intlayer_getLocaleLang']]:
    PagesRoutes['Doc_Packages_intlayer_getLocaleLang'],
  [GithubRoutes['Packages_intlayer_getLocaleName']]:
    PagesRoutes['Doc_Packages_intlayer_getLocaleName'],
  [GithubRoutes['Packages_intlayer_getHTMLTextDir']]:
    PagesRoutes['Doc_Packages_intlayer_getHTMLTextDir'],
  [GithubRoutes['Packages_intlayer_getLocalizedUrl']]:
    PagesRoutes['Doc_Packages_intlayer_getLocalizedUrl'],
  [GithubRoutes['Packages_intlayer_getMultilingualUrls']]:
    PagesRoutes['Doc_Packages_intlayer_getMultilingualUrls'],
  [GithubRoutes['Packages_intlayer_getPathWithoutLocale']]:
    PagesRoutes['Doc_Packages_intlayer_getPathWithoutLocale'],
  [GithubRoutes['Packages_intlayer_getTranslation']]:
    PagesRoutes['Doc_Packages_intlayer_getTranslation'],
  [GithubRoutes['Packages_intlayer_getEnumeration']]:
    PagesRoutes['Doc_Packages_intlayer_getEnumeration'],
  [GithubRoutes['Packages_intlayer_removeLocaleFromUrl']]:
    PagesRoutes['Doc_Packages_intlayer_removeLocaleFromUrl'],
  [GithubRoutes['Packages_express-intlayer']]:
    PagesRoutes['Doc_Packages_express-intlayer'],
  [GithubRoutes['Packages_express-intlayer_t']]:
    PagesRoutes['Doc_Packages_express-intlayer_t'],
  [GithubRoutes['Packages_react-intlayer']]:
    PagesRoutes['Doc_Packages_react-intlayer'],
  [GithubRoutes['Packages_react-intlayer_t']]:
    PagesRoutes['Doc_Packages_react-intlayer_t'],
  [GithubRoutes['Packages_react-intlayer_useIntlayer']]:
    PagesRoutes['Doc_Packages_react-intlayer_useIntlayer'],
  [GithubRoutes['Packages_react-intlayer_useIntlayerAsync']]:
    PagesRoutes['Doc_Packages_react-intlayer_useIntlayerAsync'],
  [GithubRoutes['Packages_react-intlayer_useDictionary']]:
    PagesRoutes['Doc_Packages_react-intlayer_useDictionary'],
  [GithubRoutes['Packages_react-intlayer_useLocale']]:
    PagesRoutes['Doc_Packages_react-intlayer_useLocale'],
  [GithubRoutes['Packages_next-intlayer']]:
    PagesRoutes['Doc_Packages_next-intlayer'],
  [GithubRoutes['Packages_next-intlayer_t']]:
    PagesRoutes['Doc_Packages_next-intlayer_t'],
  [GithubRoutes['Packages_next-intlayer_useIntlayer']]:
    PagesRoutes['Doc_Packages_next-intlayer_useIntlayer'],
  [GithubRoutes['Packages_next-intlayer_useIntlayerAsync']]:
    PagesRoutes['Doc_Packages_next-intlayer_useIntlayerAsync'],
  [GithubRoutes['Packages_next-intlayer_useDictionary']]:
    PagesRoutes['Doc_Packages_next-intlayer_useDictionary'],
  [GithubRoutes['Packages_next-intlayer_useLocale']]:
    PagesRoutes['Doc_Packages_next-intlayer_useLocale'],
  [GithubRoutes['Packages_react-scripts-intlayer']]:
    PagesRoutes['Doc_Packages_react-scripts-intlayer'],
  [GithubRoutes['Packages_vite-intlayer']]:
    PagesRoutes['Doc_Packages_vite-intlayer'],
  [GithubRoutes['Packages_lynx-intlayer']]:
    PagesRoutes['Doc_Packages_lynx-intlayer'],
  [GithubRoutes['Packages_react-native-intlayer']]:
    PagesRoutes['Doc_Packages_react-native-intlayer'],
  [GithubRoutes['VS_Code_extension_intlayer']]:
    PagesRoutes['VS_Code_Extension'],
  [GithubRoutes['MCP_Server']]: PagesRoutes['MCP_Server'],
  [GithubRoutes['Doc_CI_CD']]: PagesRoutes['Doc_CI_CD'],

  [GithubRoutes.BlogIndex]: PagesRoutes['Blog'],
  [GithubRoutes.IntlayerWithNextI18next]:
    PagesRoutes['Blog_Intlayer_with_Next-i18next'],
  [GithubRoutes.IntlayerWithReactI18next]:
    PagesRoutes['Blog_Intlayer_with_React-i18next'],
  [GithubRoutes.IntlayerWithNextIntl]:
    PagesRoutes['Blog_Intlayer_with_Next-intl'],
  [GithubRoutes.IntlayerWithReactIntl]:
    PagesRoutes['Blog_Intlayer_with_React-intl'],
  [GithubRoutes['Next-i18next_vs_Next-intl_vs_Intlayer']]:
    PagesRoutes['Blog_Next-i18next_vs_Next-intl_vs_Intlayer'],
  [GithubRoutes['React-i18next_vs_React-intl_vs_Intlayer']]:
    PagesRoutes['Blog_React-i18next_vs_React-intl_vs_Intlayer'],
  [GithubRoutes['I18nAndSEO']]: PagesRoutes.Blog_SEO_and_i18n,
  [GithubRoutes['i18n-technologies__frameworks__angular']]:
    PagesRoutes['Blog_i18n-technologies__frameworks__angular'],
  [GithubRoutes['i18n-technologies__frameworks__vue']]:
    PagesRoutes['Blog_i18n-technologies__frameworks__vue'],
  [GithubRoutes['i18n-technologies__frameworks__svelte']]:
    PagesRoutes['Blog_i18n-technologies__frameworks__svelte'],
  [GithubRoutes['i18n-technologies__frameworks__flutter']]:
    PagesRoutes['Blog_i18n-technologies__frameworks__flutter'],
  [GithubRoutes['i18n-technologies__frameworks__react']]:
    PagesRoutes['Blog_i18n-technologies__frameworks__react'],
  [GithubRoutes['i18n-technologies__frameworks__react-native']]:
    PagesRoutes['Blog_i18n-technologies__frameworks__react-native'],
  [GithubRoutes['i18n-technologies__CMS__wordpress']]:
    PagesRoutes['Blog_i18n-technologies__CMS__wordpress'],
  [GithubRoutes['i18n-technologies__CMS__drupal']]:
    PagesRoutes['Blog_i18n-technologies__CMS__drupal'],
  [GithubRoutes['i18n-technologies__CMS__wix']]:
    PagesRoutes['Blog_i18n-technologies__CMS__wix'],
  [GithubRoutes.PrivacyPolicy]: PagesRoutes.PrivacyPolicy,
  [GithubRoutes.TermsOfService]: PagesRoutes.TermsOfService,
};
