import { type Dictionary, t } from 'intlayer';

const aboutContent = {
  content: {
    description: t({
      en: 'This is the about page using Intlayer for internationalization.',
      es: 'Esta es la página de información usando Intlayer para internacionalización.',
      fr: "Ceci est la page à propos utilisant Intlayer pour l'internationalisation.",
    }),
    title: t({
      en: 'About Us',
      es: 'Sobre Nosotros',
      fr: 'À Propos',
    }),
  },
  key: 'about',
} satisfies Dictionary;

export default aboutContent;
