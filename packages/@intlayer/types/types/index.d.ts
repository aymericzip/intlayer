import { Locales } from '@intlayer/types';

declare module 'intlayer' {
  interface __DictionaryRegistry {
    test: {};
  }

  interface __DeclaredLocalesRegistry {
    [Locales.ENGLISH]: 1;
  }

  interface __RequiredLocalesRegistry {
    [Locales.ENGLISH]: 1;
  }

  interface __StrictModeRegistry {
    mode: 'inclusive';
  }
}
