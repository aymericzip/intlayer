// ============================================================
// Origins
// ============================================================
// `VITE_CMS_URL` and `VITE_BACKEND_URL` are full URLs (`https://…`), so they
// are the origins themselves — never a host to prefix a scheme onto.

// `import.meta.env` is optional-chained: this module is also loaded by plain
// Node (a `vite.config.ts` importing it, the CLI), where `env` is undefined.
export const App_Origin = ((import.meta as any).env?.VITE_CMS_URL ||
  'https://app.intlayer.org') as 'https://app.intlayer.org';
export const Backend_Origin = ((import.meta as any).env?.VITE_BACKEND_URL ||
  'https://back.intlayer.org') as 'https://back.intlayer.org';
export const Showcase_Origin = 'https://showcase.intlayer.org' as const;
export const Mcp_Origin = 'https://mcp.intlayer.org' as const;

// ============================================================
// Domains
// ============================================================
export const Website_Domain = 'intlayer.org' as const;
export const Website_Origin = `https://${Website_Domain}` as const;

// ============================================================
// App paths — relative (app.intlayer.org)
// ============================================================
export const App_Home_Path = '/' as const;
export const App_NotFound_Path = '/404' as const;

export const App_Dashboard_Editor_Path = '/editor' as const;
export const App_Dashboard_Translate_Path = '/translate' as const;
export const App_Dashboard_Dictionaries_Path = '/dictionary' as const;
export const App_Dashboard_Projects_Path = '/projects' as const;
export const App_Dashboard_Tags_Path = '/tags' as const;
export const App_Dashboard_Organization_Path = '/organization' as const;
export const App_Dashboard_Profile_Path = '/profile' as const;
export const App_Dashboard_IDE_Path = '/ide' as const;
export const App_Dashboard_Scanner_Path = '/scanner' as const;
export const App_Dashboard_Assets_Path = '/assets' as const;
export const App_Dashboard_Analytics_Path = '/analytics' as const;

export const App_Pricing_Path = '/pricing' as const;
export const App_Affiliation_Path = '/affiliation' as const;

export const App_Demo_Path = '/demo' as const;
export const App_Init_Path = '/init' as const;

export const App_ReviewerMarketplace_Path = '/find-reviewer' as const;
export const App_ReviewerMarketplace_Dashboard_Path =
  '/find-reviewer/dashboard' as const;
export const App_ReviewerMarketplace_Reviewer_Path =
  '/find-reviewer/$reviewerId' as const;
export const App_ReviewerMarketplace_Dashboard_Mission_Path =
  '/find-reviewer/dashboard/mission/$missionId' as const;

export const getAppReviewerProfileRoute = (reviewerId: string) =>
  `/find-reviewer/${reviewerId}` as const;
export const getAppReviewerMissionRoute = (missionId: string) =>
  `/find-reviewer/dashboard/mission/${missionId}` as const;

/** Root of the authentication section, usable as a `Disallow` prefix. */
export const App_Auth_Path = '/auth' as const;
export const App_Auth_SignIn_Path = '/auth/login' as const;
export const App_Auth_SignUp_Path = '/auth/register' as const;
export const App_Auth_TwoFactor_Path = '/auth/2fa' as const;
export const App_Auth_Demo_Path = '/auth/demo' as const;
export const App_Auth_AskResetPassword_Path =
  '/auth/password/ask-reset' as const;
export const App_Auth_ResetPassword_Path = '/auth/password/reset' as const;
export const App_Auth_ChangePassword_Path = '/auth/password/change' as const;

export const App_Admin_Path = '/admin' as const;
export const App_Admin_Users_Path = '/admin/users' as const;
export const App_Admin_Organizations_Path = '/admin/organizations' as const;
export const App_Admin_Projects_Path = '/admin/projects' as const;
export const App_Admin_Dashboard_Path = '/admin/dashboard' as const;
export const App_Admin_Management_Path = '/admin/management' as const;
export const App_Admin_Discussions_Path = '/admin/discussions' as const;
export const App_Admin_Affiliate_Path = '/admin/affiliate' as const;
export const getAppAdminAffiliateRoute = (id: string) =>
  `${App_Admin_Affiliate_Path}/${id}` as const;
export const App_Admin_PromoCodes_Path = '/admin/promo-code' as const;
export const getAppAdminPromoCodeRoute = (id: string) =>
  `${App_Admin_PromoCodes_Path}/${id}` as const;

export const App_Admin_Reviewers_Path = '/admin/reviewers' as const;
export const getAppAdminReviewerRoute = (id: string) =>
  `${App_Admin_Reviewers_Path}/${id}` as const;

export const App_Onboarding_Path = '/onboarding' as const;

export const getAppAdminUserRoute = (id: string) =>
  `${App_Admin_Users_Path}/${id}` as const;
export const getAppAdminOrganizationRoute = (id: string) =>
  `${App_Admin_Organizations_Path}/${id}` as const;
export const getAppAdminProjectRoute = (id: string) =>
  `${App_Admin_Projects_Path}/${id}` as const;
export const getAppOnboardingFlowRoute = (step: string) =>
  `${App_Onboarding_Path}/${step}` as const;

// ============================================================
// App absolute URLs — https://app.intlayer.org
// ============================================================
export const App_Dashboard = App_Origin;
export const App_Dashboard_Editor =
  `${App_Origin}${App_Dashboard_Editor_Path}` as const;
export const App_Dashboard_Translate =
  `${App_Origin}${App_Dashboard_Translate_Path}` as const;
export const App_Dashboard_Dictionaries =
  `${App_Origin}${App_Dashboard_Dictionaries_Path}` as const;
export const App_Dashboard_Projects =
  `${App_Origin}${App_Dashboard_Projects_Path}` as const;
export const App_Dashboard_Tags =
  `${App_Origin}${App_Dashboard_Tags_Path}` as const;
export const App_Dashboard_Organization =
  `${App_Origin}${App_Dashboard_Organization_Path}` as const;
export const App_Dashboard_Profile =
  `${App_Origin}${App_Dashboard_Profile_Path}` as const;
export const App_Dashboard_IDE =
  `${App_Origin}${App_Dashboard_IDE_Path}` as const;
export const App_Dashboard_Scanner =
  `${App_Origin}${App_Dashboard_Scanner_Path}` as const;
export const App_Dashboard_Analytics =
  `${App_Origin}${App_Dashboard_Analytics_Path}` as const;

export const App_Pricing = `${App_Origin}${App_Pricing_Path}` as const;
export const App_Affiliation = `${App_Origin}${App_Affiliation_Path}` as const;
export const App_Demo = `${App_Origin}${App_Demo_Path}` as const;

export const App_ReviewerMarketplace =
  `${App_Origin}${App_ReviewerMarketplace_Path}` as const;
export const App_ReviewerMarketplace_Dashboard =
  `${App_Origin}${App_ReviewerMarketplace_Dashboard_Path}` as const;

export const App_Auth_SignIn = `${App_Origin}${App_Auth_SignIn_Path}` as const;
export const App_Auth_SignUp = `${App_Origin}${App_Auth_SignUp_Path}` as const;
export const App_Auth_TwoFactor =
  `${App_Origin}${App_Auth_TwoFactor_Path}` as const;
export const App_Auth_AskResetPassword =
  `${App_Origin}${App_Auth_AskResetPassword_Path}` as const;
export const App_Auth_ResetPassword =
  `${App_Origin}${App_Auth_ResetPassword_Path}` as const;
export const App_Auth_ChangePassword =
  `${App_Origin}${App_Auth_ChangePassword_Path}` as const;

export const App_Admin = `${App_Origin}${App_Admin_Path}` as const;
export const App_Admin_Users = `${App_Origin}${App_Admin_Users_Path}` as const;
export const App_Admin_Organizations =
  `${App_Origin}${App_Admin_Organizations_Path}` as const;
export const App_Admin_Projects =
  `${App_Origin}${App_Admin_Projects_Path}` as const;
export const App_Admin_Dashboard =
  `${App_Origin}${App_Admin_Dashboard_Path}` as const;
export const App_Admin_Management =
  `${App_Origin}${App_Admin_Management_Path}` as const;
export const App_Admin_Discussions =
  `${App_Origin}${App_Admin_Discussions_Path}` as const;
export const App_Admin_Affiliate =
  `${App_Origin}${App_Admin_Affiliate_Path}` as const;
export const App_Admin_PromoCodes =
  `${App_Origin}${App_Admin_PromoCodes_Path}` as const;
export const App_Admin_Reviewers =
  `${App_Origin}${App_Admin_Reviewers_Path}` as const;

export const App_Onboarding = `${App_Origin}${App_Onboarding_Path}` as const;

export const getAppAdminUserAbsoluteRoute = (id: string) =>
  `${App_Origin}${App_Admin_Users_Path}/${id}` as const;
export const getAppAdminOrganizationAbsoluteRoute = (id: string) =>
  `${App_Origin}${App_Admin_Organizations_Path}/${id}` as const;
export const getAppAdminProjectAbsoluteRoute = (id: string) =>
  `${App_Origin}${App_Admin_Projects_Path}/${id}` as const;
export const getAppOnboardingFlowAbsoluteRoute = (
  step: string,
  plan: string,
  period?: string
) =>
  period
    ? `${App_Origin}${App_Onboarding_Path}/${step}/${plan}/${period}`
    : (`${App_Origin}${App_Onboarding_Path}/${step}/${plan}` as const);

// ============================================================
// Website paths — relative (intlayer.org)
// ============================================================
export const Website_Home_Path = '/' as const;
export const Website_CMS_Path = '/cms' as const;
export const Website_TMS_Path = '/tms' as const;
export const Website_Translate_Path = '/translate' as const;
export const Website_Markdown_Path = '/markdown' as const;
export const Website_Demo_Path = '/demo' as const;
export const Website_Playground_Path = '/playground' as const;
export const Website_NotFound_Path = '/404' as const;
export const Website_Changelog_Path = '/changelog' as const;
export const Website_Scanner_Path = '/i18n-seo-scanner' as const;
export const Website_MessageConverter_Path = '/i18n-message-converter' as const;
export const Website_IntlayerFormatter_Path =
  '/intlayer-message-formatter' as const;
export const Website_ICUFormatter_Path = '/icu-message-formatter' as const;
export const Website_I18nextFormatter_Path =
  '/i18next-message-formatter' as const;
export const Website_VueI18nFormatter_Path =
  '/vue-i18n-message-formatter' as const;
export const Website_POFormatter_Path = '/po-file-message-formatter' as const;

export const Website_Doc_Root_Path = '/doc' as const;
export const Website_Doc_Path = '/doc/get-started' as const;
export const Website_Doc_Why_Path = '/doc/why' as const;
export const Website_Doc_Search_Path = '/doc/search' as const;
export const Website_Doc_Chat_Path = '/doc/chat' as const;
export const Website_Doc_IntlayerVisualEditor_Path =
  '/doc/concept/editor' as const;
export const Website_Doc_IntlayerCMS_Path = '/doc/concept/cms' as const;
export const Website_Doc_SelfHosting_Path = '/doc/self-hosting' as const;
export const Website_Doc_Markdown_Path =
  '/doc/concept/content/markdown' as const;
export const Website_Doc_HTML_Path = '/doc/concept/content/html' as const;

export const Website_ReleasesV6_Path = '/doc/releases/v6' as const;
export const Website_ReleasesV7_Path = '/doc/releases/v7' as const;
export const Website_ReleasesV8_Path = '/doc/releases/v8' as const;
export const Website_ReleasesV9_Path = '/doc/releases/v9' as const;
export const Website_Doc_Environment_NextJS_Path =
  '/doc/environment/nextjs' as const;
export const Website_Doc_Environment_NextJS_16_Path =
  '/doc/environment/nextjs' as const;
export const Website_Doc_Environment_NextJS_15_Path =
  '/doc/environment/nextjs/15' as const;
export const Website_Doc_Environment_NextJS_14_Path =
  '/doc/environment/nextjs/14' as const;
export const Website_Doc_Environment_CRA_Path =
  '/doc/environment/create-react-app' as const;
export const Website_Doc_Environment_Astro_Path =
  '/doc/environment/astro' as const;
export const Website_Doc_Environment_ViteAndReact_Path =
  '/doc/environment/vite-and-react' as const;
export const Website_Doc_Environment_ViteAndReact_ReactRouterV7_Path =
  '/doc/environment/vite-and-react/react-router-v7' as const;
export const Website_Doc_Environment_ViteAndReact_ReactRouterV7_FSRoutes_Path =
  '/doc/environment/vite-and-react/react-router-v7-fs-routes' as const;
export const Website_Doc_Environment_Tanstack_Path =
  '/doc/environment/tanstack-start' as const;
export const Website_Doc_Environment_Lit_Path =
  '/doc/environment/vite-and-lit' as const;
export const Website_Doc_Environment_Nodejs_Path = '/doc/concept/cli' as const;
export const Website_Doc_Environment_Adonis_Path =
  '/doc/environment/adonisjs' as const;
export const Website_Doc_Environment_ViteAndVue_Path =
  '/doc/environment/vite-and-vue' as const;
export const Website_Doc_Environment_ViteAndSolid_Path =
  '/doc/environment/vite-and-solid' as const;
export const Website_Doc_Environment_ViteAndSvelte_Path =
  '/doc/environment/vite-and-svelte' as const;
export const Website_Doc_Environment_ViteAndPreact_Path =
  '/doc/environment/vite-and-preact' as const;
export const Website_Doc_Environment_NuxtAndVue_Path =
  '/doc/environment/nuxt-and-vue' as const;
export const Website_Doc_Intlayer_with_Lynx_and_React_Path =
  '/doc/environment/lynx-and-react' as const;
export const Website_Doc_Environment_Angular_Path =
  '/doc/environment/angular' as const;
export const Website_Doc_Environment_ReactNativeAndExpo_Path =
  '/doc/environment/react-native-and-expo' as const;
export const Website_Doc_Environment_Lynx_Path =
  '/doc/environment/lynx-and-react' as const;
export const Website_Doc_Environment_Express_Path =
  '/doc/environment/express' as const;
export const Website_Doc_Environment_NestJS_Path =
  '/doc/environment/nest' as const;
export const Website_Doc_Environment_Fastify_Path =
  '/doc/environment/fastify' as const;
export const Website_Doc_Environment_Hono_Path =
  '/doc/environment/hono' as const;
export const Website_Doc_Environment_Htmx_Path =
  '/doc/environment/htmx' as const;
export const Website_Doc_Environment_Remix_3_Path =
  '/doc/environment/remix-3' as const;

export const Website_Doc_CLI_Fill_Path = '/doc/concept/cli/fill' as const;
export const Website_Doc_CLI_Translate_Path =
  '/doc/concept/cli/doc-translate' as const;
export const Website_Doc_CLI_Review_Path =
  '/doc/concept/cli/doc-review' as const;

export const Website_Benchmark_Path = '/doc/benchmark' as const;
export const Website_Benchmark_NextJS_Path = '/doc/benchmark/nextjs' as const;
export const Website_Benchmark_Tanstack_Path =
  '/doc/benchmark/tanstack' as const;

export const Website_Doc_MCP_Path = '/doc/mcp-server' as const;

export const Website_Blog_Root_Path = '/blog' as const;
export const Website_Blog_Path = '/blog' as const;
export const Website_Blog_Search_Path = '/blog' as const;
export const Website_Blog_What_is_i18n_Path =
  '/blog/what-is-internationalization' as const;

export const Website_FrequentQuestions_Path = '/frequent-questions' as const;
export const Website_PrivacyPolicy_Path = '/privacy-notice' as const;
export const Website_TermsOfService_Path = '/terms-of-service' as const;
export const Website_Contributors_Path = '/contributors' as const;

// ============================================================
// Website absolute URLs — https://intlayer.org
// ============================================================
export const Website_Home = `${Website_Origin}${Website_Home_Path}` as const;
export const Website_CMS = `${Website_Origin}${Website_CMS_Path}` as const;
export const Website_TMS = `${Website_Origin}${Website_TMS_Path}` as const;
export const Website_Translate =
  `${Website_Origin}${Website_Translate_Path}` as const;
export const Website_Markdown =
  `${Website_Origin}${Website_Markdown_Path}` as const;
export const Website_Demo = `${Website_Origin}${Website_Demo_Path}` as const;
export const Website_Playground =
  `${Website_Origin}${Website_Playground_Path}` as const;
export const Website_NotFound =
  `${Website_Origin}${Website_NotFound_Path}` as const;
export const Website_Changelog =
  `${Website_Origin}${Website_Changelog_Path}` as const;
export const Website_Scanner =
  `${Website_Origin}${Website_Scanner_Path}` as const;
export const Website_MessageConverter =
  `${Website_Origin}${Website_MessageConverter_Path}` as const;
export const Website_IntlayerFormatter =
  `${Website_Origin}${Website_IntlayerFormatter_Path}` as const;
export const Website_ICUFormatter =
  `${Website_Origin}${Website_ICUFormatter_Path}` as const;
export const Website_I18nextFormatter =
  `${Website_Origin}${Website_I18nextFormatter_Path}` as const;
export const Website_VueI18nFormatter =
  `${Website_Origin}${Website_VueI18nFormatter_Path}` as const;
export const Website_POFormatter =
  `${Website_Origin}${Website_POFormatter_Path}` as const;
export const Website_Benchmark =
  `${Website_Origin}${Website_Benchmark_Path}` as const;
export const Website_Benchmark_NextJS =
  `${Website_Origin}${Website_Benchmark_NextJS_Path}` as const;
export const Website_Benchmark_Tanstack =
  `${Website_Origin}${Website_Benchmark_Tanstack_Path}` as const;

export const Website_Doc_Root =
  `${Website_Origin}${Website_Doc_Root_Path}` as const;
export const Website_Doc = `${Website_Origin}${Website_Doc_Path}` as const;
export const Website_Doc_Why =
  `${Website_Origin}${Website_Doc_Why_Path}` as const;
export const Website_Doc_Search =
  `${Website_Origin}${Website_Doc_Search_Path}` as const;
export const Website_Doc_Chat =
  `${Website_Origin}${Website_Doc_Chat_Path}` as const;
export const Website_Doc_IntlayerVisualEditor =
  `${Website_Origin}${Website_Doc_IntlayerVisualEditor_Path}` as const;
export const Website_Doc_IntlayerCMS =
  `${Website_Origin}${Website_Doc_IntlayerCMS_Path}` as const;
export const Website_Doc_SelfHosting =
  `${Website_Origin}${Website_Doc_SelfHosting_Path}` as const;
export const Website_Doc_Markdown =
  `${Website_Origin}${Website_Doc_Markdown_Path}` as const;
export const Website_Doc_HTML =
  `${Website_Origin}${Website_Doc_HTML_Path}` as const;

export const Website_ReleasesV6 =
  `${Website_Origin}${Website_ReleasesV6_Path}` as const;
export const Website_ReleasesV7 =
  `${Website_Origin}${Website_ReleasesV7_Path}` as const;
export const Website_ReleasesV8 =
  `${Website_Origin}${Website_ReleasesV8_Path}` as const;
export const Website_Doc_Environment_NextJS =
  `${Website_Origin}${Website_Doc_Environment_NextJS_Path}` as const;
export const Website_Doc_Environment_NextJS_16 =
  `${Website_Origin}${Website_Doc_Environment_NextJS_16_Path}` as const;
export const Website_Doc_Environment_NextJS_15 =
  `${Website_Origin}${Website_Doc_Environment_NextJS_15_Path}` as const;
export const Website_Doc_Environment_NextJS_14 =
  `${Website_Origin}${Website_Doc_Environment_NextJS_14_Path}` as const;
export const Website_Doc_Environment_CRA =
  `${Website_Origin}${Website_Doc_Environment_CRA_Path}` as const;
export const Website_Doc_Environment_Astro =
  `${Website_Origin}${Website_Doc_Environment_Astro_Path}` as const;
export const Website_Doc_Environment_ViteAndReact =
  `${Website_Origin}${Website_Doc_Environment_ViteAndReact_Path}` as const;
export const Website_Doc_Environment_ViteAndReact_ReactRouterV7 =
  `${Website_Origin}${Website_Doc_Environment_ViteAndReact_ReactRouterV7_Path}` as const;
export const Website_Doc_Environment_ViteAndReact_ReactRouterV7_FSRoutes =
  `${Website_Origin}${Website_Doc_Environment_ViteAndReact_ReactRouterV7_FSRoutes_Path}` as const;
export const Website_Doc_Environment_Tanstack =
  `${Website_Origin}${Website_Doc_Environment_Tanstack_Path}` as const;
export const Website_Doc_Environment_Lit =
  `${Website_Origin}${Website_Doc_Environment_Lit_Path}` as const;
export const Website_Doc_Environment_Nodejs =
  `${Website_Origin}${Website_Doc_Environment_Nodejs_Path}` as const;
export const Website_Doc_Environment_Adonis =
  `${Website_Origin}${Website_Doc_Environment_Adonis_Path}` as const;
export const Website_Doc_Environment_ViteAndVue =
  `${Website_Origin}${Website_Doc_Environment_ViteAndVue_Path}` as const;
export const Website_Doc_Environment_ViteAndSolid =
  `${Website_Origin}${Website_Doc_Environment_ViteAndSolid_Path}` as const;
export const Website_Doc_Environment_ViteAndSvelte =
  `${Website_Origin}${Website_Doc_Environment_ViteAndSvelte_Path}` as const;
export const Website_Doc_Environment_ViteAndPreact =
  `${Website_Origin}${Website_Doc_Environment_ViteAndPreact_Path}` as const;
export const Website_Doc_Environment_NuxtAndVue =
  `${Website_Origin}${Website_Doc_Environment_NuxtAndVue_Path}` as const;
export const Website_Doc_Intlayer_with_Lynx_and_React =
  `${Website_Origin}${Website_Doc_Intlayer_with_Lynx_and_React_Path}` as const;
export const Website_Doc_Environment_Angular =
  `${Website_Origin}${Website_Doc_Environment_Angular_Path}` as const;
export const Website_Doc_Environment_ReactNativeAndExpo =
  `${Website_Origin}${Website_Doc_Environment_ReactNativeAndExpo_Path}` as const;
export const Website_Doc_Environment_Lynx =
  `${Website_Origin}${Website_Doc_Environment_Lynx_Path}` as const;
export const Website_Doc_Environment_Express =
  `${Website_Origin}${Website_Doc_Environment_Express_Path}` as const;
export const Website_Doc_Environment_NestJS =
  `${Website_Origin}${Website_Doc_Environment_NestJS_Path}` as const;
export const Website_Doc_Environment_Fastify =
  `${Website_Origin}${Website_Doc_Environment_Fastify_Path}` as const;
export const Website_Doc_Environment_Hono =
  `${Website_Origin}${Website_Doc_Environment_Hono_Path}` as const;
export const Website_Doc_Environment_Htmx =
  `${Website_Origin}${Website_Doc_Environment_Htmx_Path}` as const;
export const Website_Doc_Environment_Remix_3 =
  `${Website_Origin}${Website_Doc_Environment_Remix_3_Path}` as const;

export const Website_Doc_CLI_Fill =
  `${Website_Origin}${Website_Doc_CLI_Fill_Path}` as const;
export const Website_Doc_CLI_Translate =
  `${Website_Origin}${Website_Doc_CLI_Translate_Path}` as const;
export const Website_Doc_CLI_Review =
  `${Website_Origin}${Website_Doc_CLI_Review_Path}` as const;

export const Website_Doc_MCP =
  `${Website_Origin}${Website_Doc_MCP_Path}` as const;

export const Website_Blog_Root =
  `${Website_Origin}${Website_Blog_Root_Path}` as const;
export const Website_Blog = `${Website_Origin}${Website_Blog_Path}` as const;
export const Website_Blog_Search =
  `${Website_Origin}${Website_Blog_Search_Path}` as const;
export const Website_Blog_What_is_i18n =
  `${Website_Origin}${Website_Blog_What_is_i18n_Path}` as const;

export const Website_FrequentQuestions =
  `${Website_Origin}${Website_FrequentQuestions_Path}` as const;
export const Website_PrivacyPolicy =
  `${Website_Origin}${Website_PrivacyPolicy_Path}` as const;
export const Website_TermsOfService =
  `${Website_Origin}${Website_TermsOfService_Path}` as const;
export const Website_Contributors =
  `${Website_Origin}${Website_Contributors_Path}` as const;

// ============================================================
// Doc app paths — relative (served under intlayer.org/doc/*)
// ============================================================
export const Doc_Root_Path = '/doc' as const;
export const Doc_Path = '/get-started' as const;
export const Doc_Why_Path = '/why' as const;
export const Doc_Search_Path = '/search' as const;
export const Doc_Chat_Path = '/chat' as const;
export const Doc_IntlayerVisualEditor_Path = '/concept/editor' as const;
export const Doc_IntlayerCMS_Path = '/concept/cms' as const;

export const Doc_ReleasesV6_Path = '/releases/v6' as const;
export const Doc_ReleasesV7_Path = '/releases/v7' as const;
export const Doc_ReleasesV8_Path = '/releases/v8' as const;
export const Doc_Environment_NextJS_Path = '/environment/nextjs' as const;
export const Doc_Environment_NextJS_16_Path = '/environment/nextjs' as const;
export const Doc_Environment_NextJS_15_Path = '/environment/nextjs/15' as const;
export const Doc_Environment_NextJS_14_Path = '/environment/nextjs/14' as const;
export const Doc_Environment_CRA_Path =
  '/environment/create-react-app' as const;
export const Doc_Environment_Astro_Path = '/environment/astro' as const;
export const Doc_Environment_ViteAndReact_Path =
  '/environment/vite-and-react' as const;
export const Doc_Environment_ViteAndReact_ReactRouterV7_Path =
  '/environment/vite-and-react/react-router-v7' as const;
export const Doc_Environment_ViteAndReact_ReactRouterV7_FSRoutes_Path =
  '/environment/vite-and-react/react-router-v7-fs-routes' as const;
export const Doc_Environment_Tanstack_Path =
  '/environment/tanstack-start' as const;
export const Doc_Environment_Lit_Path = '/environment/vite-and-lit' as const;
export const Doc_Environment_Nodejs_Path = '/concept/cli' as const;
export const Doc_Environment_Adonis_Path = '/environment/adonisjs' as const;
export const Doc_Environment_ViteAndVue_Path =
  '/environment/vite-and-vue' as const;
export const Doc_Environment_ViteAndSolid_Path =
  '/environment/vite-and-solid' as const;
export const Doc_Environment_ViteAndSvelte_Path =
  '/environment/vite-and-svelte' as const;
export const Doc_Environment_ViteAndPreact_Path =
  '/environment/vite-and-preact' as const;
export const Doc_Environment_NuxtAndVue_Path =
  '/environment/nuxt-and-vue' as const;
export const Doc_Intlayer_with_Lynx_and_React_Path =
  '/environment/lynx-and-react' as const;
export const Doc_Environment_Angular_Path = '/environment/angular' as const;
export const Doc_Environment_ReactNativeAndExpo_Path =
  '/environment/react-native-and-expo' as const;
export const Doc_Environment_Lynx_Path = '/environment/lynx-and-react' as const;
export const Doc_Environment_Express_Path = '/environment/express' as const;
export const Doc_Environment_NestJS_Path = '/environment/nest' as const;
export const Doc_Environment_Fastify_Path = '/environment/fastify' as const;
export const Doc_Environment_Hono_Path = '/environment/hono' as const;

export const Doc_CLI_Fill_Path = '/concept/cli/fill' as const;
export const Doc_CLI_Translate_Path = '/concept/cli/doc-translate' as const;
export const Doc_CLI_Review_Path = '/concept/cli/doc-review' as const;

export const Doc_MCP_Path = '/mcp-server' as const;

export const Doc_Blog_Root_Path = '/blog' as const;
export const Doc_Blog_Path = '/blog' as const;
export const Doc_Blog_Search_Path = '/blog' as const;
export const Doc_Blog_What_is_i18n_Path =
  '/blog/what-is-internationalization' as const;

export const Doc_FrequentQuestions_Path = '/frequent-questions' as const;
export const Doc_PrivacyPolicy_Path = '/privacy-notice' as const;
export const Doc_TermsOfService_Path = '/terms-of-service' as const;
export const Doc_Contributors_Path = '/contributors' as const;
export const Doc_Showcase_Path = '/' as const;
export const Doc_ShowcaseSubmit_Path = '/submit' as const;

// ============================================================
// Showcase paths — relative (showcase.intlayer.org)
// ============================================================
export const Showcase_Root_Path = '/' as const;
export const Showcase_Submit_Path = '/submit' as const;

// ============================================================
// Showcase absolute URLs — https://showcase.intlayer.org
// ============================================================
export const Showcase_Root = Showcase_Origin;
export const Showcase_Submit =
  `${Showcase_Origin}${Showcase_Submit_Path}` as const;

// ============================================================
// Backend absolute URLs — https://back.intlayer.org
// ============================================================
export const Backend_Root = Backend_Origin;
export const Backend_Health = `${Backend_Origin}/health` as const;
export const Backend_OAuth2_Token = `${Backend_Origin}/oauth2/token` as const;

// ============================================================
// MCP absolute URLs — https://mcp.intlayer.org
// ============================================================
export const Mcp_Root = Mcp_Origin;
export const Mcp_Sse = `${Mcp_Origin}/sse` as const;

// ============================================================
// Agent discovery paths — relative
//
// Well-known documents that let AI agents discover the site's APIs,
// skills and authentication without scraping HTML.
// ============================================================
export const WellKnown_ApiCatalog_Path = '/.well-known/api-catalog' as const;
export const WellKnown_AiCatalog_Path = '/.well-known/ai-catalog.json' as const;
export const WellKnown_OAuthProtectedResource_Path =
  '/.well-known/oauth-protected-resource' as const;
export const WellKnown_OAuthAuthorizationServer_Path =
  '/.well-known/oauth-authorization-server' as const;
export const WellKnown_McpServerCard_Path =
  '/.well-known/mcp/server-card.json' as const;
export const WellKnown_AgentSkills_Path = '/.well-known/agent-skills' as const;
export const WellKnown_AgentSkillsIndex_Path =
  `${WellKnown_AgentSkills_Path}/index.json` as const;
export const AuthMd_Path = '/auth.md' as const;
export const LlmsTxt_Path = '/llms.txt' as const;

// ============================================================
// External links
// ============================================================
export const External_Github =
  'https://github.com/aymericzip/intlayer' as const;

export const External_DockerHub_SelfHost =
  'https://hub.docker.com/r/aymericzip/intlayer-selfhost' as const;

export const External_Github_i18n_benchmark =
  'https://github.com/intlayer-org/benchmark-i18n' as const;

export const External_Discord = 'https://discord.gg/7uxamYVeCk' as const;
export const External_LinkedIn =
  'https://www.linkedin.com/company/intlayerorg/' as const;
export const External_AI_Landing_Page = 'https://ai.intlayer.org' as const;
export const External_ShowcaseApp = Showcase_Origin;
export const External_Examples =
  'https://github.com/aymericzip/intlayer/tree/main/examples' as const;
export const External_ExampleIntlayerWithNextjs =
  'https://github.com/aymericzip/intlayer/tree/main/examples/nextjs-15-app' as const;
export const External_ExampleIntlayerWithReactJS =
  'https://github.com/aymericzip/intlayer/tree/main/examples/react-app' as const;
export const External_ExampleIntlayerWithViteAndReact =
  'https://github.com/aymericzip/intlayer/tree/main/examples/vite-react-app' as const;
export const External_ExampleIntlayerWithViteAndVue =
  'https://github.com/aymericzip/intlayer/tree/main/examples/vite-vue-app' as const;
export const External_ExampleIntlayerWithViteAndSvelte =
  'https://github.com/aymericzip/intlayer/tree/main/examples/vite-svelte-app' as const;
export const External_ExampleIntlayerWithViteAndSolid =
  'https://github.com/aymericzip/intlayer/tree/main/examples/vite-solid-app' as const;
export const External_ExampleIntlayerWithViteAndPreact =
  'https://github.com/aymericzip/intlayer/tree/main/examples/vite-preact-app' as const;
export const External_ExampleIntlayerWithReactNative =
  'https://github.com/aymericzip/intlayer/tree/main/examples/react-native-app' as const;
export const External_ExampleIntlayerWithExpress =
  'https://github.com/aymericzip/intlayer/tree/main/examples/express-app' as const;
