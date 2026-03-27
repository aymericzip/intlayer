export enum LandingRoutes {
  Home = 'https://intlayer.org/',
  CMS = 'https://intlayer.org/cms',
  TMS = 'https://intlayer.org/tms',
  Translate = 'https://intlayer.org/translate',
  Demo = 'https://intlayer.org/demo',
  Playground = 'https://intlayer.org/playground',
  NotFound = 'https://intlayer.org/404',
  Changelog = 'https://intlayer.org/changelog',
  Scanner = 'https://intlayer.org/i18n-seo-scanner',
}

export enum PagesRoutes {
  Doc_Root = '/doc',
  Doc = '/get-started',
  Doc_Why = '/why',
  Doc_Search = '/search',
  Doc_Chat = '/chat',
  Doc_IntlayerVisualEditor = '/concept/editor',
  Doc_IntlayerCMS = '/concept/cms',

  ReleasesV6 = '/releases/v6',
  ReleasesV7 = '/releases/v7',
  ReleasesV8 = '/releases/v8',
  Doc_Environment_NextJS = '/environment/nextjs',
  Doc_Environment_NextJS_16 = '/environment/nextjs/16',
  Doc_Environment_NextJS_15 = '/environment/nextjs/15',
  Doc_Environment_NextJS_14 = '/environment/nextjs/14',
  Doc_Environment_CRA = '/environment/create-react-app',
  Doc_Environment_Astro = '/environment/astro',
  Doc_Environment_ViteAndReact = '/environment/vite-and-react',
  Doc_Environment_ViteAndReact_ReactRouterV7 = '/environment/vite-and-react/react-router-v7',
  Doc_Environment_ViteAndReact_ReactRouterV7_FSRoutes = '/environment/vite-and-react/react-router-v7-fs-routes',
  Doc_Environment_Tanstack = '/environment/tanstack',
  Doc_Environment_Lit = '/environment/lit',
  Doc_Environment_Nodejs = '/concept/cli',
  Doc_Environment_Adonis = '/environment/adonis',
  Doc_Environment_ViteAndVue = '/environment/vite-and-vue',
  Doc_Environment_ViteAndSolid = '/environment/vite-and-solid',
  Doc_Environment_ViteAndSvelte = '/environment/vite-and-svelte',
  Doc_Environment_ViteAndPreact = '/environment/vite-and-preact',
  Doc_Environment_NuxtAndVue = '/environment/nuxt-and-vue',
  Doc_Intlayer_with_Lynx_and_React = '/environment/lynx-and-react',
  Doc_Environment_Angular = '/environment/angular',
  Doc_Environment_ReactNativeAndExpo = '/environment/react-native-and-expo',
  Doc_Environment_Lynx = '/environment/lynx-and-react',
  Doc_Environment_Express = '/environment/express',
  Doc_Environment_NestJS = '/environment/nestjs',
  Doc_Environment_Fastify = '/environment/fastify',
  Doc_Environment_Hono = '/environment/hono',

  Doc_CLI_Fill = '/concept/cli/fill',
  Doc_CLI_Translate = '/concept/cli/doc-translate',
  Doc_CLI_Review = '/concept/cli/doc-review',

  Doc_MCP = '/mcp-server',

  Blog_Root = '/blog',
  Blog = '/blog/search',
  Blog_Search = '/blog/search',
  Blog_What_is_i18n = '/blog/what-is-internationalization',

  FrequentQuestions = '/frequent-question',

  PrivacyPolicy = '/privacy-notice',
  TermsOfService = '/terms-of-service',

  Contributors = '/contributors',
  Showcase = '/',
  ShowcaseSubmit = '/submit',
}

export enum ShowcaseRoutes {
  Showcase = 'https://showcase.intlayer.org',
  ShowcaseSubmit = 'https://showcase.intlayer.org/submit',
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

  ShowcaseApp = 'https://showcase.intlayer.org',

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

export enum WebsiteRoutes {
  Home = 'https://intlayer.org/',
  Doc = 'https://intlayer.org/docs',
  Doc_Environment_NextJS_15 = 'https://intlayer.org/docs/environment/nextjs-15',
  Doc_Environment_ViteAndReact = 'https://intlayer.org/docs/environment/vite-react',
  Doc_Environment_ViteAndVue = 'https://intlayer.org/docs/environment/vite-vue',
  Playground = 'https://intlayer.org/playground',
  Blog = 'https://intlayer.org/blog',
  Contributors = 'https://intlayer.org/contributors',
  TermsOfService = 'https://intlayer.org/terms-of-service',
  PrivacyPolicy = 'https://intlayer.org/privacy-policy',
  Showcase = 'https://intlayer.org/showcase',
  ShowcaseSubmit = 'https://intlayer.org/showcase/submit',
}
