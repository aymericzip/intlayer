import { t, type Dictionary } from 'intlayer';

const appContent = {
  key: 'root',
  content: {
    nuxtLogo: t({
      en: 'Nuxt logo',
      fr: 'Logo Nuxt',
      es: 'Logo Nuxt',
    }),
    intlayerLogo: t({
      en: 'Intlayer logo',
      fr: 'Logo Intlayer',
      es: 'Logo Intlayer',
    }),
    title: 'Nuxt + Intlayer',
  },
} satisfies Dictionary;

export default appContent;
