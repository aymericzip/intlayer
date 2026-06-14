import { type Dictionary, t } from 'intlayer';

const faq2 = {
  key: 'faq',
  item: 2,
  content: {
    question: t({
      en: 'How do I install Intlayer?',
      fr: 'Comment installer Intlayer ?',
      es: '¿Cómo instalo Intlayer?',
    }),
    answer: t({
      en: 'Run `npm install intlayer react-intlayer` in your project root, then add the Vite plugin to your config.',
      fr: 'Exécutez `npm install intlayer react-intlayer` à la racine de votre projet, puis ajoutez le plugin Vite à votre configuration.',
      es: 'Ejecuta `npm install intlayer react-intlayer` en la raíz de tu proyecto y luego añade el plugin de Vite a tu configuración.',
    }),
  },
} satisfies Dictionary;

export default faq2;
