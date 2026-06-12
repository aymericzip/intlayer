import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof import('@/locales/en/common.json');
      home: typeof import('@/locales/en/home.json');
      about: typeof import('@/locales/en/about.json');
      // ... add new namespaces here
    };
  }
}
