import type { Dictionary } from 'intlayer';

import { t } from 'intlayer';

const appContent = {
  content: {
    label: t({
      en: 'Select Language',
      es: 'Seleccionar idioma',
      fr: 'Choisir la langue',
    }),
  },
  key: 'locale-switcher',
} satisfies Dictionary;

export default appContent;
