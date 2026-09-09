import { type Dictionary, t } from 'intlayer';

const aboutContent = {
  key: 'about',
  content: {
    title: t({
      en: 'About This Project',
      fr: 'À propos de ce projet',
      es: 'Acerca de este proyecto',
    }),
    description: t({
      en: 'This application demonstrates how to cleanly combine Remix 3 and Intlayer for internationalized full-stack web applications.',
      fr: 'Cette application montre comment combiner proprement Remix 3 et Intlayer pour des applications web full-stack internationalisées.',
      es: 'Esta aplicación demuestra cómo combinar limpiamente Remix 3 e Intlayer para aplicaciones web full-stack internacionalizadas.',
    }),
    philosophyTitle: t({
      en: 'Remix 3 Philosophy',
      fr: 'La philosophie de Remix 3',
      es: 'La filosofía de Remix 3',
    }),
    philosophyText: t({
      en: 'Remix 3 represents a fundamental shift towards composable, single-purpose packages that adhere to web standards. Paired with Intlayer, translation management becomes completely declarative, performant, and maintainable.',
      fr: 'Remix 3 représente un changement fondamental vers des packages composables et ciblés qui respectent les standards web. Associé à Intlayer, la gestion des traductions devient déclarative, performante et maintenable.',
      es: 'Remix 3 representa un cambio fundamental hacia paquetes componibles y especializados que respetan los estándares web. Combinado con Intlayer, la gestión de traducciones se vuelve declarativa, de alto rendimiento y fácil de mantener.',
    }),
    backToHome: t({
      en: 'Back to Home',
      fr: "Retour à l'accueil",
      es: 'Volver al Inicio',
    }),
  },
} satisfies Dictionary;

export default aboutContent;
