import { type Dictionary, t } from 'intlayer';

const aboutPageContent = {
  key: 'about-page',
  content: {
    metaDescription: t({
      en: 'Learn more about our team, our mission, and our history.',
      es: 'Conozca más sobre nuestro equipo, nuestra misión y nuestra historia.',
      fr: 'En savoir plus sur notre équipe, notre mission et notre histoire.',
    }),
    metaTitle: t({
      en: 'About Us | My Application',
      es: 'Sobre nosotros | Mi Aplicación',
      fr: 'À propos de nous | Mon Application',
    }),
    title: t({
      en: 'About Us',
      es: 'Sobre nosotros',
      fr: 'À propos de nous',
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
