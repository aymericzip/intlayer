import { t, type Dictionary } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    viteLogo: t({
      en: 'Vite logo',
      fr: 'Logo Vite',
      es: 'Logo Vite',
    }),
    vueLogo: t({
      en: 'Vue logo',
      fr: 'Logo Vue',
      es: 'Logo Vue',
    }),
    title: t({
      en: 'Vite + Vue',
      fr: 'Vite + Vue',
      es: 'Vite + Vue',
    }),
  },
} satisfies Dictionary;

export default appContent;
