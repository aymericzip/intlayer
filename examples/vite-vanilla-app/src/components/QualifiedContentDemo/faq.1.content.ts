import { type Dictionary, t } from 'intlayer';

const faq1 = {
  key: 'faq',
  item: 1,
  content: {
    answer: t({
      en: 'Intlayer is an open-source internationalisation framework for JavaScript and TypeScript projects.',
      es: 'Intlayer es un framework de internacionalización de código abierto para proyectos JavaScript y TypeScript.',
      fr: "Intlayer est un framework d'internationalisation open-source pour les projets JavaScript et TypeScript.",
    }),
    question: t({
      en: 'What is Intlayer?',
      es: '¿Qué es Intlayer?',
      fr: "Qu'est-ce qu'Intlayer ?",
    }),
  },
} satisfies Dictionary;

export default faq1;
