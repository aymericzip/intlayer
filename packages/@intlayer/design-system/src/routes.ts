// ============================================================
// Domains
// ============================================================
export const App_Domain = 'app.intlayer.org' as const;
export const Website_Domain = 'intlayer.org' as const;
export const Showcase_Domain = 'showcase.intlayer.org' as const;

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

export const App_Pricing_Path = '/pricing' as const;

export const App_Auth_SignIn_Path = '/auth/login' as const;
export const App_Auth_SignUp_Path = '/auth/register' as const;
export const App_Auth_TwoFactor_Path = '/auth/2fa' as const;
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
export const App_Dashboard = `https://${App_Domain}` as const;
export const App_Dashboard_Editor =
  `https://${App_Domain}${App_Dashboard_Editor_Path}` as const;
export const App_Dashboard_Translate =
  `https://${App_Domain}${App_Dashboard_Translate_Path}` as const;
export const App_Dashboard_Dictionaries =
  `https://${App_Domain}${App_Dashboard_Dictionaries_Path}` as const;
export const App_Dashboard_Projects =
  `https://${App_Domain}${App_Dashboard_Projects_Path}` as const;
export const App_Dashboard_Tags =
  `https://${App_Domain}${App_Dashboard_Tags_Path}` as const;
export const App_Dashboard_Organization =
  `https://${App_Domain}${App_Dashboard_Organization_Path}` as const;
export const App_Dashboard_Profile =
  `https://${App_Domain}${App_Dashboard_Profile_Path}` as const;

export const App_Pricing = `https://${App_Domain}${App_Pricing_Path}` as const;

export const App_Auth_SignIn =
  `https://${App_Domain}${App_Auth_SignIn_Path}` as const;
export const App_Auth_SignUp =
  `https://${App_Domain}${App_Auth_SignUp_Path}` as const;
export const App_Auth_TwoFactor =
  `https://${App_Domain}${App_Auth_TwoFactor_Path}` as const;
export const App_Auth_AskResetPassword =
  `https://${App_Domain}${App_Auth_AskResetPassword_Path}` as const;
export const App_Auth_ResetPassword =
  `https://${App_Domain}${App_Auth_ResetPassword_Path}` as const;
export const App_Auth_ChangePassword =
  `https://${App_Domain}${App_Auth_ChangePassword_Path}` as const;

export const App_Admin = `https://${App_Domain}${App_Admin_Path}` as const;
export const App_Admin_Users =
  `https://${App_Domain}${App_Admin_Users_Path}` as const;
export const App_Admin_Organizations =
  `https://${App_Domain}${App_Admin_Organizations_Path}` as const;
export const App_Admin_Projects =
  `https://${App_Domain}${App_Admin_Projects_Path}` as const;
export const App_Admin_Dashboard =
  `https://${App_Domain}${App_Admin_Dashboard_Path}` as const;
export const App_Admin_Management =
  `https://${App_Domain}${App_Admin_Management_Path}` as const;
export const App_Admin_Discussions =
  `https://${App_Domain}${App_Admin_Discussions_Path}` as const;

export const App_Onboarding =
  `https://${App_Domain}${App_Onboarding_Path}` as const;

export const getAppAdminUserAbsoluteRoute = (id: string) =>
  `https://${App_Domain}${App_Admin_Users_Path}/${id}` as const;
export const getAppAdminOrganizationAbsoluteRoute = (id: string) =>
  `https://${App_Domain}${App_Admin_Organizations_Path}/${id}` as const;
export const getAppAdminProjectAbsoluteRoute = (id: string) =>
  `https://${App_Domain}${App_Admin_Projects_Path}/${id}` as const;
export const getAppOnboardingFlowAbsoluteRoute = (
  step: string,
  plan: string,
  period?: string
) =>
  period
    ? `https://${App_Domain}${App_Onboarding_Path}/${step}/${plan}/${period}`
    : (`https://${App_Domain}${App_Onboarding_Path}/${step}/${plan}` as const);

// ============================================================
// Website paths — relative (intlayer.org)
// ============================================================
export const Website_Home_Path = '/' as const;
export const Website_CMS_Path = '/cms' as const;
export const Website_TMS_Path = '/tms' as const;
export const Website_Translate_Path = '/translate' as const;
export const Website_Demo_Path = '/demo' as const;
export const Website_Playground_Path = '/playground' as const;
export const Website_NotFound_Path = '/404' as const;
export const Website_Changelog_Path = '/changelog' as const;
export const Website_Scanner_Path = '/i18n-seo-scanner' as const;
export const Website_Benchmark_Path = '/benchmark' as const;

export const Website_Doc_Root_Path = '/doc' as const;
export const Website_Doc_Path = '/doc/get-started' as const;
export const Website_Doc_Why_Path = '/doc/why' as const;
export const Website_Doc_Search_Path = '/doc/search' as const;
export const Website_Doc_Chat_Path = '/doc/chat' as const;
export const Website_Doc_IntlayerVisualEditor_Path =
  '/doc/concept/editor' as const;
export const Website_Doc_IntlayerCMS_Path = '/doc/concept/cms' as const;

export const Website_ReleasesV6_Path = '/doc/releases/v6' as const;
export const Website_ReleasesV7_Path = '/doc/releases/v7' as const;
export const Website_ReleasesV8_Path = '/doc/releases/v8' as const;
export const Website_Doc_Environment_NextJS_Path =
  '/doc/environment/nextjs' as const;
export const Website_Doc_Environment_NextJS_16_Path =
  '/doc/environment/nextjs/16' as const;
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
  '/doc/environment/tanstack' as const;
export const Website_Doc_Environment_Lit_Path = '/doc/environment/lit' as const;
export const Website_Doc_Environment_Nodejs_Path = '/doc/concept/cli' as const;
export const Website_Doc_Environment_Adonis_Path =
  '/doc/environment/adonis' as const;
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
  '/doc/environment/nestjs' as const;
export const Website_Doc_Environment_Fastify_Path =
  '/doc/environment/fastify' as const;
export const Website_Doc_Environment_Hono_Path =
  '/doc/environment/hono' as const;

export const Website_Doc_CLI_Fill_Path = '/doc/concept/cli/fill' as const;
export const Website_Doc_CLI_Translate_Path =
  '/doc/concept/cli/doc-translate' as const;
export const Website_Doc_CLI_Review_Path =
  '/doc/concept/cli/doc-review' as const;
export const Website_Benchmark_NextJS_Path = '/doc/benchmark/nextjs' as const;
export const Website_Benchmark_Tanstack_Path =
  '/doc/benchmark/tanstack' as const;

export const Website_Doc_MCP_Path = '/doc/mcp-server' as const;

export const Website_Blog_Root_Path = '/blog' as const;
export const Website_Blog_Path = '/blog/search' as const;
export const Website_Blog_Search_Path = '/blog/search' as const;
export const Website_Blog_What_is_i18n_Path =
  '/blog/what-is-internationalization' as const;

export const Website_FrequentQuestions_Path = '/frequent-questions' as const;
export const Website_PrivacyPolicy_Path = '/privacy-notice' as const;
export const Website_TermsOfService_Path = '/terms-of-service' as const;
export const Website_Contributors_Path = '/contributors' as const;

// ============================================================
// Website absolute URLs — https://intlayer.org
// ============================================================
export const Website_Home =
  `https://${Website_Domain}${Website_Home_Path}` as const;
export const Website_CMS =
  `https://${Website_Domain}${Website_CMS_Path}` as const;
export const Website_TMS =
  `https://${Website_Domain}${Website_TMS_Path}` as const;
export const Website_Translate =
  `https://${Website_Domain}${Website_Translate_Path}` as const;
export const Website_Demo =
  `https://${Website_Domain}${Website_Demo_Path}` as const;
export const Website_Playground =
  `https://${Website_Domain}${Website_Playground_Path}` as const;
export const Website_NotFound =
  `https://${Website_Domain}${Website_NotFound_Path}` as const;
export const Website_Changelog =
  `https://${Website_Domain}${Website_Changelog_Path}` as const;
export const Website_Scanner =
  `https://${Website_Domain}${Website_Scanner_Path}` as const;
export const Website_Benchmark =
  `https://${Website_Domain}${Website_Benchmark_Path}` as const;
export const Website_Benchmark_NextJS =
  `https://${Website_Domain}${Website_Benchmark_NextJS_Path}` as const;
export const Website_Benchmark_Tanstack =
  `https://${Website_Domain}${Website_Benchmark_Tanstack_Path}` as const;

export const Website_Doc_Root =
  `https://${Website_Domain}${Website_Doc_Root_Path}` as const;
export const Website_Doc =
  `https://${Website_Domain}${Website_Doc_Path}` as const;
export const Website_Doc_Why =
  `https://${Website_Domain}${Website_Doc_Why_Path}` as const;
export const Website_Doc_Search =
  `https://${Website_Domain}${Website_Doc_Search_Path}` as const;
export const Website_Doc_Chat =
  `https://${Website_Domain}${Website_Doc_Chat_Path}` as const;
export const Website_Doc_IntlayerVisualEditor =
  `https://${Website_Domain}${Website_Doc_IntlayerVisualEditor_Path}` as const;
export const Website_Doc_IntlayerCMS =
  `https://${Website_Domain}${Website_Doc_IntlayerCMS_Path}` as const;

export const Website_ReleasesV6 =
  `https://${Website_Domain}${Website_ReleasesV6_Path}` as const;
export const Website_ReleasesV7 =
  `https://${Website_Domain}${Website_ReleasesV7_Path}` as const;
export const Website_ReleasesV8 =
  `https://${Website_Domain}${Website_ReleasesV8_Path}` as const;
export const Website_Doc_Environment_NextJS =
  `https://${Website_Domain}${Website_Doc_Environment_NextJS_Path}` as const;
export const Website_Doc_Environment_NextJS_16 =
  `https://${Website_Domain}${Website_Doc_Environment_NextJS_16_Path}` as const;
export const Website_Doc_Environment_NextJS_15 =
  `https://${Website_Domain}${Website_Doc_Environment_NextJS_15_Path}` as const;
export const Website_Doc_Environment_NextJS_14 =
  `https://${Website_Domain}${Website_Doc_Environment_NextJS_14_Path}` as const;
export const Website_Doc_Environment_CRA =
  `https://${Website_Domain}${Website_Doc_Environment_CRA_Path}` as const;
export const Website_Doc_Environment_Astro =
  `https://${Website_Domain}${Website_Doc_Environment_Astro_Path}` as const;
export const Website_Doc_Environment_ViteAndReact =
  `https://${Website_Domain}${Website_Doc_Environment_ViteAndReact_Path}` as const;
export const Website_Doc_Environment_ViteAndReact_ReactRouterV7 =
  `https://${Website_Domain}${Website_Doc_Environment_ViteAndReact_ReactRouterV7_Path}` as const;
export const Website_Doc_Environment_ViteAndReact_ReactRouterV7_FSRoutes =
  `https://${Website_Domain}${Website_Doc_Environment_ViteAndReact_ReactRouterV7_FSRoutes_Path}` as const;
export const Website_Doc_Environment_Tanstack =
  `https://${Website_Domain}${Website_Doc_Environment_Tanstack_Path}` as const;
export const Website_Doc_Environment_Lit =
  `https://${Website_Domain}${Website_Doc_Environment_Lit_Path}` as const;
export const Website_Doc_Environment_Nodejs =
  `https://${Website_Domain}${Website_Doc_Environment_Nodejs_Path}` as const;
export const Website_Doc_Environment_Adonis =
  `https://${Website_Domain}${Website_Doc_Environment_Adonis_Path}` as const;
export const Website_Doc_Environment_ViteAndVue =
  `https://${Website_Domain}${Website_Doc_Environment_ViteAndVue_Path}` as const;
export const Website_Doc_Environment_ViteAndSolid =
  `https://${Website_Domain}${Website_Doc_Environment_ViteAndSolid_Path}` as const;
export const Website_Doc_Environment_ViteAndSvelte =
  `https://${Website_Domain}${Website_Doc_Environment_ViteAndSvelte_Path}` as const;
export const Website_Doc_Environment_ViteAndPreact =
  `https://${Website_Domain}${Website_Doc_Environment_ViteAndPreact_Path}` as const;
export const Website_Doc_Environment_NuxtAndVue =
  `https://${Website_Domain}${Website_Doc_Environment_NuxtAndVue_Path}` as const;
export const Website_Doc_Intlayer_with_Lynx_and_React =
  `https://${Website_Domain}${Website_Doc_Intlayer_with_Lynx_and_React_Path}` as const;
export const Website_Doc_Environment_Angular =
  `https://${Website_Domain}${Website_Doc_Environment_Angular_Path}` as const;
export const Website_Doc_Environment_ReactNativeAndExpo =
  `https://${Website_Domain}${Website_Doc_Environment_ReactNativeAndExpo_Path}` as const;
export const Website_Doc_Environment_Lynx =
  `https://${Website_Domain}${Website_Doc_Environment_Lynx_Path}` as const;
export const Website_Doc_Environment_Express =
  `https://${Website_Domain}${Website_Doc_Environment_Express_Path}` as const;
export const Website_Doc_Environment_NestJS =
  `https://${Website_Domain}${Website_Doc_Environment_NestJS_Path}` as const;
export const Website_Doc_Environment_Fastify =
  `https://${Website_Domain}${Website_Doc_Environment_Fastify_Path}` as const;
export const Website_Doc_Environment_Hono =
  `https://${Website_Domain}${Website_Doc_Environment_Hono_Path}` as const;

export const Website_Doc_CLI_Fill =
  `https://${Website_Domain}${Website_Doc_CLI_Fill_Path}` as const;
export const Website_Doc_CLI_Translate =
  `https://${Website_Domain}${Website_Doc_CLI_Translate_Path}` as const;
export const Website_Doc_CLI_Review =
  `https://${Website_Domain}${Website_Doc_CLI_Review_Path}` as const;

export const Website_Doc_MCP =
  `https://${Website_Domain}${Website_Doc_MCP_Path}` as const;

export const Website_Blog_Root =
  `https://${Website_Domain}${Website_Blog_Root_Path}` as const;
export const Website_Blog =
  `https://${Website_Domain}${Website_Blog_Path}` as const;
export const Website_Blog_Search =
  `https://${Website_Domain}${Website_Blog_Search_Path}` as const;
export const Website_Blog_What_is_i18n =
  `https://${Website_Domain}${Website_Blog_What_is_i18n_Path}` as const;

export const Website_FrequentQuestions =
  `https://${Website_Domain}${Website_FrequentQuestions_Path}` as const;
export const Website_PrivacyPolicy =
  `https://${Website_Domain}${Website_PrivacyPolicy_Path}` as const;
export const Website_TermsOfService =
  `https://${Website_Domain}${Website_TermsOfService_Path}` as const;
export const Website_Contributors =
  `https://${Website_Domain}${Website_Contributors_Path}` as const;

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
export const Doc_Environment_NextJS_16_Path = '/environment/nextjs/16' as const;
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
export const Doc_Environment_Tanstack_Path = '/environment/tanstack' as const;
export const Doc_Environment_Lit_Path = '/environment/lit' as const;
export const Doc_Environment_Nodejs_Path = '/concept/cli' as const;
export const Doc_Environment_Adonis_Path = '/environment/adonis' as const;
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
export const Doc_Environment_NestJS_Path = '/environment/nestjs' as const;
export const Doc_Environment_Fastify_Path = '/environment/fastify' as const;
export const Doc_Environment_Hono_Path = '/environment/hono' as const;

export const Doc_CLI_Fill_Path = '/concept/cli/fill' as const;
export const Doc_CLI_Translate_Path = '/concept/cli/doc-translate' as const;
export const Doc_CLI_Review_Path = '/concept/cli/doc-review' as const;

export const Doc_MCP_Path = '/mcp-server' as const;

export const Doc_Blog_Root_Path = '/blog' as const;
export const Doc_Blog_Path = '/blog/search' as const;
export const Doc_Blog_Search_Path = '/blog/search' as const;
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
export const Showcase_Root = `https://${Showcase_Domain}` as const;
export const Showcase_Submit =
  `https://${Showcase_Domain}${Showcase_Submit_Path}` as const;

// ============================================================
// External links
// ============================================================
export const External_Github =
  'https://github.com/aymericzip/intlayer' as const;
export const External_Discord = 'https://discord.gg/7uxamYVeCk' as const;
export const External_LinkedIn =
  'https://www.linkedin.com/company/intlayerorg/' as const;
export const External_AI_Landing_Page = 'https://ai.intlayer.org' as const;
export const External_ShowcaseApp = `https://${Showcase_Domain}` as const;
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
