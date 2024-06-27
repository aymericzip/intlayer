export enum PagesRoutes {
  Home = '/',
  Demo = '/demo',
  Doc = '/doc',
  Doc_GetStarted = '/doc/get_started',
  Doc_HowWorksIntlayer = '/doc/concept/how_works_intlayer',
  Doc_Configuration = '/doc/concept/configuration',
  Doc_Interest = '/doc/concept/interest_of_intlayer',
  Doc_IntlayerEditor = '/doc/concept/intlayer_editor',
  Doc_IntlayerWithI18n = '/doc/concept/intlayer_with_i18n',
  Doc_ContentDeclaration_Translation = '/doc/concept/content_declaration/translation',
  Doc_ContentDeclaration_Enumeration = '/doc/concept/content_declaration/enumeration',
  Doc_ContentDeclaration_FunctionFetching = '/doc/concept/content_declaration/function_fetching',
  Doc_ContentDeclaration_NestedId = '/doc/concept/content_declaration/nested_id',
  Doc_ContentDeclaration_DeclarationWatching = '/doc/concept/content_declaration/declaration_watching',
  Doc_Environment_NextJS = '/doc/environment/intlayer_with_nextjs',
  Doc_Environment_CRA = '/doc/environment/intlayer_with_create_react_app',
  Doc_Environment_ViteAndReact = '/doc/environment/intlayer_with_vite_and_react',

  LogIn = '/auth/sign_in',
  SignUp = '/auth/sign_up',
  ForgotPassword = '/auth/password/reset',
  ChangePassword = '/auth/password/change',

  PrivacyPolicy = '/privacy_notice',
  TermsOfService = '/terms_of_services',

  ChatWithUs = '/chat_with_us',
  Pricing = '/pricing',
  AboutUs = '/about_us',

  // Post
  CreatePost = '/create_post',
}

export enum APIRoutes {
  // Auth
  SignUp = '/api/auth/proxy/sign_up',
  SignIn = '/api/auth/proxy/sign_in',
  DeleteUser = '/api/auth/proxy/delete_user',
  UpdatePassword = '/api/auth/proxy/password/update',
  SendPasswordResetEmail = '/api/auth/proxy/password/reset',
  ConfirmPassword = '/api/auth/proxy/password/reset/confirm',
  VerifyEmail = '/api/auth/proxy/email_verification',
}

export enum ExternalLinks {
  Github = 'https://github.com/aypineau/intlayer',
  LinkedIn = 'https://www.linkedin.com/company/intlayerorg/',
  ExampleIntlayerWithNextjs = 'https://github.com/aypineau/intlayer/tree/3c64451e85648f8a354a54d84216a27b68f4cb2d/examples/nextjs-app',
  ExampleIntlayerWithReactJS = 'https://github.com/aypineau/intlayer/tree/3c64451e85648f8a354a54d84216a27b68f4cb2d/examples/react-app',
  ExampleIntlayerWithViteAndReact = 'https://github.com/aypineau/intlayer/tree/3c64451e85648f8a354a54d84216a27b68f4cb2d/examples/vite-app',
}
