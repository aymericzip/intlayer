import { type Dictionary, t } from 'intlayer';

const aboutPageContent = {
  key: 'about-page',
  content: {
    title: t({
      en: 'About Us',
      fr: 'À propos de nous',
      es: 'Sobre nosotros',
    }),
    metaTitle: t({
      en: 'About Us | My Application',
      fr: 'À propos de nous | Mon Application',
      es: 'Sobre nosotros | Mi Aplicación',
    }),
    metaDescription: t({
      en: 'Learn more about our team, our mission, and our history.',
      fr: 'En savoir plus sur notre équipe, notre mission et notre histoire.',
      es: 'Conozca más sobre nuestro equipo, nuestra misión y nuestra historia.',
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
