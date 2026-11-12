import { type Dictionary, t } from 'intlayer';

const faq2 = {
  key: 'faq',
  item: 2,
  content: {
    answer: t({
      en: 'Run `npm install intlayer react-intlayer` in your project root, then add the Vite plugin to your config.',
      es: 'Ejecuta `npm install intlayer react-intlayer` en la raíz de tu proyecto y luego añade el plugin de Vite a tu configuración.',
      fr: 'Exécutez `npm install intlayer react-intlayer` à la racine de votre projet, puis ajoutez le plugin Vite à votre configuration.',
    }),
    question: t({
      en: 'How do I install Intlayer?',
      es: '¿Cómo instalo Intlayer?',
      fr: 'Comment installer Intlayer ?',
    }),
  },
} satisfies Dictionary;

export default faq2;
