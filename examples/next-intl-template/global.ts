import type { locales } from '@/i18n';

type Messages = {
  common: typeof import('./locales/en/common.json');
  home: typeof import('./locales/en/home.json');
  about: typeof import('./locales/en/about.json');
  // ... Future JSON files should be added here too
};

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
