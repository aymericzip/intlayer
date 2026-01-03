export enum PagesRoutes {
  Home = '/',
  CMS = '/cms',
  TMS = '/tms',
  Demo = '/demo',
  Playground = '/playground',
  NotFound = '/404',
  Changelog = '/changelog',
  Scanner = '/i18n-seo-scanner',

  Doc_Root = '/doc',
  Doc = '/doc/get-started',
  Doc_Why = '/doc/why',
  Doc_Search = '/doc/search',
  Doc_Chat = '/doc/chat',
  Doc_IntlayerVisualEditor = '/doc/concept/editor',
  Doc_IntlayerCMS = '/doc/concept/cms',

  ReleasesV6 = '/doc/releases/v6',
  ReleasesV7 = '/doc/releases/v7',
  Doc_Environment_NextJS_15 = '/doc/environment/nextjs',
  Doc_Environment_NextJS_14 = '/doc/environment/nextjs/14',
  Doc_Environment_CRA = '/doc/environment/create-react-app',
  Doc_Environment_Astro = '/doc/environment/astro',
  Doc_Environment_ViteAndReact = '/doc/environment/vite-and-react',
  Doc_Environment_Tanstack = '/doc/environment/tanstack',
  Doc_Environment_ViteAndVue = '/doc/environment/vite-and-vue',
  Doc_Environment_ViteAndSolid = '/doc/environment/vite-and-solid',
  Doc_Environment_ViteAndSvelte = '/doc/environment/vite-and-svelte',
  Doc_Environment_ViteAndPreact = '/doc/environment/vite-and-preact',
  Doc_Environment_NuxtAndVue = '/doc/environment/nuxt-and-vue',
  Doc_Intlayer_with_Lynx_and_React = '/doc/environment/lynx-and-react',
  Doc_Environment_Angular = '/doc/environment/angular',
  Doc_Environment_ReactNativeAndExpo = '/doc/environment/react-native-and-expo',
  Doc_Environment_Lynx = '/doc/environment/lynx-and-react',
  Doc_Environment_Express = '/doc/environment/express',
  Doc_Environment_NestJS = '/doc/environment/nestjs',

  Doc_MCP = '/doc/mcp-server',

  Blog_Root = '/blog',
  Blog = '/blog/search',
  Blog_Search = '/blog/search',
  Blog_What_is_i18n = '/blog/what-is-internationalization',

  FrequentQuestions = '/frequent-questions',

  PrivacyPolicy = '/privacy-notice',
  TermsOfService = '/terms-of-service',

  Contributors = '/contributors',
}

export enum AppRoutes {
  Dashboard = 'https://app.intlayer.org',
  Dashboard_Editor = 'https://app.intlayer.org/editor',
  Dashboard_Translate = 'https://app.intlayer.org/translate',
  Dashboard_Dictionaries = 'https://app.intlayer.org/dictionary',
  Dashboard_Projects = 'https://app.intlayer.org/projects',
  Dashboard_Tags = 'https://app.intlayer.org/tags',
  Dashboard_Organization = 'https://app.intlayer.org/organization',
  Dashboard_Profile = 'https://app.intlayer.org/profile',

  Pricing = 'https://app.intlayer.org/pricing',

  Onboarding = 'https://app.intlayer.org/onboarding',
  Onboarding_Flow = 'https://app.intlayer.org/onboarding/{{step}}/{{plan}}/{{period}}',

  Auth_SignIn = 'https://app.intlayer.org/auth/login',
  Auth_SignUp = 'https://app.intlayer.org/auth/register',
  Auth_TwoFactor = 'https://app.intlayer.org/auth/2fa',
  Auth_AskResetPassword = 'https://app.intlayer.org/auth/password/ask-reset',
  Auth_ResetPassword = 'https://app.intlayer.org/auth/password/reset',
  Auth_ChangePassword = 'https://app.intlayer.org/auth/password/change',

  Admin = 'https://app.intlayer.org/admin',
  Admin_Users = 'https://app.intlayer.org/admin/users',
  Admin_Users_Id = 'https://app.intlayer.org/admin/users/:id',
  Admin_Organizations = 'https://app.intlayer.org/admin/organizations',
  Admin_Organizations_Id = 'https://app.intlayer.org/admin/organizations/:id',
  Admin_Projects = 'https://app.intlayer.org/admin/projects',
  Admin_Projects_Id = 'https://app.intlayer.org/admin/projects/:id',
  Admin_Dashboard = 'https://app.intlayer.org/admin/dashboard',
  Admin_Management = 'https://app.intlayer.org/admin/management',
  Admin_Discussions = 'https://app.intlayer.org/admin/discussions',
}

export enum ExternalLinks {
  Github = 'https://github.com/aymericzip/intlayer',
  Discord = 'https://discord.gg/7uxamYVeCk',
  LinkedIn = 'https://www.linkedin.com/company/intlayerorg/',

  AI_Landing_Page = 'https://ai.intlayer.org',

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
