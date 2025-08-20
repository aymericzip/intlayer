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
  Doc_Why = '/doc/why',
  Doc_Search = '/doc/search',
  Doc_Chat = '/doc/chat',
  Doc_IntlayerVisualEditor = '/doc/concept/editor',
  Doc_IntlayerCMS = '/doc/concept/cms',

  Doc_Environment_NextJS_15 = '/doc/environment/nextjs',
  Doc_Environment_NextJS_14 = '/doc/environment/nextjs/14',
  Doc_Environment_CRA = '/doc/environment/create-react-app',
  Doc_Environment_ViteAndReact = '/doc/environment/vite-and-react',
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

  Doc_MCP = '/doc/mcp-server',

  Blog = '/blog/search/',
  Blog_Search = '/blog/search',
  'Blog_What_is_i18n' = '/blog/what-is-internationalization',

  PrivacyPolicy = '/privacy-notice',
  TermsOfService = '/terms-of-service',

  Pricing = '/pricing',

  Onboarding = '/onboarding',
  Onboarding_Flow = '/onboarding/{{step}}/{{plan}}/{{period}}',

  Auth_SignIn = '/auth/login',
  Auth_SignUp = '/auth/register',
  Auth_AskResetPassword = '/auth/password/ask-reset',
  Auth_ResetPassword = '/auth/password/reset',
  Auth_ChangePassword = '/auth/password/change',
}

export enum ExternalLinks {
  Github = 'https://github.com/aymericzip/intlayer',
  Discord = 'https://discord.gg/528mBV4N',
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
