export enum PagesRoutes {
  Home = '/',
  Demo = '/demo',
  Doc = '/doc',
  Doc_GetStarted = '/doc/get_started',
  Doc_Configuration = '/doc/configuration',
  Doc_Interest = '/doc/interest-of-intlayer',
  Doc_IntlayerEditor = '/doc/intlayer-editor',
  Doc_ContentDeclaration = '/doc/content-declaration',
  Doc_ContentDeclaration_Translation = '/doc/content-declaration/translation',
  Doc_ContentDeclaration_Enumeration = '/doc/content-declaration/enumeration',
  Doc_ContentDeclaration_FunctionFetching = '/doc/content-declaration/function-fetching',
  Doc_ContentDeclaration_NestedId = '/doc/content-declaration/nested-id',
  Doc_Environment_NextJS = '/doc/environment/intlayer-with-nextjs',
  Doc_Environment_CRA = '/doc/environment/intlayer-with-create-react-app',
  Doc_Environment_ViteAndReact = '/doc/environment/intlayer-with-vite-and-react',

  LogIn = '/auth/sign-in',
  SignUp = '/auth/sign-up',
  ForgotPassword = '/auth/password/reset',
  ChangePassword = '/auth/password/change',

  PrivacyPolicy = '/privacy-notice',
  TermsOfService = '/terms-of-services',

  ChatWithUs = '/chat-with-us',
  Pricing = '/pricing',
  AboutUs = '/about-us',

  // Post
  CreatePost = '/create-post',
}

export enum APIRoutes {
  // Auth
  SignUp = '/api/auth/proxy/sign-up',
  SignIn = '/api/auth/proxy/sign-in',
  DeleteUser = '/api/auth/proxy/delete-user',
  UpdatePassword = '/api/auth/proxy/password/update',
  SendPasswordResetEmail = '/api/auth/proxy/password/reset',
  ConfirmPassword = '/api/auth/proxy/password/reset/confirm',
  VerifyEmail = '/api/auth/proxy/email-verification',
}

export enum ExternalLinks {
  Github = 'https://github.com/aypineau/intlayer',
  InterestOfIntlayer = 'https://github.com/aypineau/intlayer/blob/main/docs/interest_of_intlayer.md',
  IntlayerWithNextjs = 'https://github.com/aypineau/intlayer/blob/main/docs/intlayer_with_nextjs.md',
  IntlayerWithReact = 'https://github.com/aypineau/intlayer/blob/main/docs/intlayer_with_create_react_app.md',
  IntlayerWithVite = 'https://github.com/aypineau/intlayer/blob/main/docs/intlayer_with_vite%2Breact.md',
  ExampleIntlayerWithNextjs = 'https://github.com/aypineau/intlayer/tree/main/examples/nextjs-app',
  ExampleIntlayerWithReactJS = 'https://github.com/aypineau/intlayer/tree/main/examples/react-app',
  ExampleIntlayerWithViteAndReact = 'https://github.com/aypineau/intlayer/tree/main/examples/vite-app',
}
