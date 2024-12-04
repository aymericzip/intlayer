import { Locales, type IntlayerConfig } from 'intlayer';

/** @type {import('intlayer').IntlayerConfig} */

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
  editor: {
    enabled: true,
    backendURL: 'localhost:3100',
    clientId: 'ec98ac93750bf8a3d45eb6012dfbeb23',
    clientSecret:
      '30cf6b8dcbd0ee7c3c0ab9b95ee43542d8b33fa3eba8e02ee0dd08255fc091da',
  },
};

export default config;
