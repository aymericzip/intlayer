export enum PagesRoutes {
  Home = '/',

  NotFound = '/404',

  Dashboard_Editor = '/editor',
  Dashboard_Translate = '/translate',
  Dashboard_Dictionaries = '/dictionary',
  Dashboard_Projects = '/projects',
  Dashboard_Tags = '/tags',
  Dashboard_Organization = '/organization',
  Dashboard_Profile = '/profile',

  Pricing = '/pricing',

  Auth_SignIn = '/auth/login',
  Auth_SignUp = '/auth/register',
  Auth_TwoFactor = '/auth/2fa',
  Auth_AskResetPassword = '/auth/password/ask-reset',
  Auth_ResetPassword = '/auth/password/reset',
  Auth_ChangePassword = '/auth/password/change',

  Admin = '/admin',
  Admin_Users = '/admin/users',
  Admin_Users_Id = '/admin/users/:id',
  Admin_Organizations = '/admin/organizations',
  Admin_Organizations_Id = '/admin/organizations/:id',
  Admin_Projects = '/admin/projects',
  Admin_Projects_Id = '/admin/projects/:id',
  Admin_Dashboard = '/admin/dashboard',
  Admin_Management = '/admin/management',
  Admin_Discussions = '/admin/discussions',

  Onboarding = '/onboarding',
  Onboarding_Flow = '/onboarding/{{step}}/{{plan}}/{{period}}',
}

export enum LandingRoutes {
  Demo = 'https://intlayer.org/demo',
  Playground = 'https://intlayer.org/playground',
  Changelog = 'https://intlayer.org/changelog',

  Scanner = 'https://intlayer.org/i18n-seo-scanner',

  Doc_Root = 'https://intlayer.org/doc',
  Doc = 'https://intlayer.org/doc/get-started',
  Doc_Why = 'https://intlayer.org/doc/why',
  Doc_Search = 'https://intlayer.org/doc/search',
  Doc_Chat = 'https://intlayer.org/doc/chat',
  Doc_IntlayerVisualEditor = 'https://intlayer.org/doc/concept/editor',
  Doc_IntlayerCMS = 'https://intlayer.org/doc/concept/cms',

  ReleasesV6 = 'https://intlayer.org/doc/releases/v6',
  ReleasesV7 = 'https://intlayer.org/doc/releases/v7',
  Doc_Environment_NextJS_15 = 'https://intlayer.org/doc/environment/nextjs',
  Doc_Environment_NextJS_14 = 'https://intlayer.org/doc/environment/nextjs/14',
  Doc_Environment_CRA = 'https://intlayer.org/doc/environment/create-react-app',
  Doc_Environment_Astro = 'https://intlayer.org/doc/environment/astro',
  Doc_Environment_ViteAndReact = 'https://intlayer.org/doc/environment/vite-and-react',
  Doc_Environment_Tanstack = 'https://intlayer.org/doc/environment/tanstack',
  Doc_Environment_ViteAndVue = 'https://intlayer.org/doc/environment/vite-and-vue',
  Doc_Environment_ViteAndSolid = 'https://intlayer.org/doc/environment/vite-and-solid',
  Doc_Environment_ViteAndSvelte = 'https://intlayer.org/doc/environment/vite-and-svelte',
  Doc_Environment_ViteAndPreact = 'https://intlayer.org/doc/environment/vite-and-preact',
  Doc_Environment_NuxtAndVue = 'https://intlayer.org/doc/environment/nuxt-and-vue',
  Doc_Intlayer_with_Lynx_and_React = 'https://intlayer.org/doc/environment/lynx-and-react',
  Doc_Environment_Angular = 'https://intlayer.org/doc/environment/angular',
  Doc_Environment_ReactNativeAndExpo = 'https://intlayer.org/doc/environment/react-native-and-expo',
  Doc_Environment_Lynx = 'https://intlayer.org/doc/environment/lynx-and-react',
  Doc_Environment_Express = 'https://intlayer.org/doc/environment/express',
  Doc_Environment_NestJS = 'https://intlayer.org/doc/environment/nestjs',

  Doc_MCP = 'https://intlayer.org/doc/mcp-server',

  Blog_Root = 'https://intlayer.org/blog',
  Blog = 'https://intlayer.org/blog/search',
  Blog_Search = 'https://intlayer.org/blog/search',
  Blog_What_is_i18n = 'https://intlayer.org/blog/what-is-internationalization',

  FrequentQuestions = 'https://intlayer.org/frequent-questions',

  PrivacyPolicy = 'https://intlayer.org/privacy-notice',
  TermsOfService = 'https://intlayer.org/terms-of-service',

  Contributors = 'https://intlayer.org/contributors',
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
