import { type Dictionary, t } from 'intlayer';

const faq1 = {
  key: 'faq',
  item: 1,
  content: {
    question: t({
      en: 'What is Intlayer?',
      fr: "Qu'est-ce qu'Intlayer ?",
      es: '¿Qué es Intlayer?',
    }),
    answer: t({
      en: 'Intlayer is an open-source internationalisation framework for JavaScript and TypeScript projects.',
      fr: "Intlayer est un framework d'internationalisation open-source pour les projets JavaScript et TypeScript.",
      es: 'Intlayer es un framework de internacionalización de código abierto para proyectos JavaScript y TypeScript.',
    }),
  },
} satisfies Dictionary;

export default faq1;
