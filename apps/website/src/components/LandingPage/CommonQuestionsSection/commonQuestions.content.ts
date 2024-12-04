import { type DeclarationContent, t } from 'intlayer';

const docNavTitlesContent = {
  key: 'common-questions',
  content: {
    title: t({
      fr: 'Questions fréquentes',
      en: 'Frequently asked questions',
      es: 'Preguntas frecuentes',
    }),
    accordionLabel: t({
      fr: 'Clicker pour dérouler',
      en: 'Click to expand',
      es: 'Haga clic para expandir',
    }),
    content: [
      {
        question: t({
          en: 'What is internationalization (i18n)?',
          fr: 'Qu’est-ce que l’internationalisation (i18n) ?',
          es: '¿Qué es la internacionalización (i18n)?',
        }),
        answer: t({
          en: 'Internationalization (i18n) is the process of designing and developing applications like nextjs, react, or express to support multiple languages easily. It enables you to create multilingual websites by simplifying the translation process. Tools like TypeScript make it easier to implement i18n, allowing for efficient and easy adaptation of your application to different languages and regions.',
          fr: "L'internationalisation (i18n) est le processus de conception et de développement d'applications comme nextjs, react ou express pour prendre en charge facilement plusieurs langues. Elle vous permet de créer des sites web multilingues en simplifiant le processus de traduction. Des outils comme TypeScript facilitent la mise en œuvre de l'i18n, permettant une adaptation efficace et facile de votre application à différentes langues et régions.",
          es: 'La internacionalización (i18n) es el proceso de diseñar y desarrollar aplicaciones como nextjs, react o express para admitir fácilmente múltiples idiomas. Te permite crear sitios web multilingües simplificando el proceso de traducción. Herramientas como TypeScript facilitan la implementación de i18n, permitiendo una adaptación eficiente y fácil de tu aplicación a diferentes idiomas y regiones.',
        }),
      },
      {
        question: t({
          en: 'What is Intlayer?',
          fr: 'Qu’est-ce que Intlayer ?',
          es: '¿Qué es Intlayer?',
        }),
        answer: t({
          en: 'Intlayer is a package that allows you to manage your multilingual website. It provides a set of tools and utilities that make it easy to set up your website for multilingual content and localization.',
          fr: 'Intlayer est un package qui vous permet de gérer votre site web multilingue. Il fournit un ensemble d’outils et d’utilitaires qui facilitent la mise en place de votre site web pour le contenu multilingue et la localisation.',
          es: 'Intlayer es un paquete que te permite gestionar tu sitio web multilingüe. Proporciona un conjunto de herramientas y utilidades que facilitan la configuración de tu sitio web para el contenido multilingüe y la localización.',
        }),
        callToAction: {
          label: t({
            en: 'Read more',
            fr: 'En savoir plus',
            es: 'Leer más',
          }),
          alt: t({
            fr: "Cliquez ici pour en savoir plus sur l'utilisation d'Intlayer",
            en: 'Click here to read more about Intlayer usage',
            es: 'Haga clic aquí para leer más sobre el uso de Intlayer',
          }),
          url: 'https://intlayer.org/doc/get-started',
        },
      },
      {
        question: t({
          en: 'What are the main features of Intlayer?',
          fr: 'Quelles sont les principales fonctionnalités d’Intlayer ?',
          es: '¿Cuáles son las principales características de Intlayer?',
        }),
        answer: t({
          en: 'Intlayer simplifies configuration management and enables internationalization for various types of JavaScript applications, including server components. It allows content declaration directly alongside components, improving codebase maintainability. Additionally, Intlayer leverages TypeScript to prevent missing declarations. Finally, Intlayer offers a visual editor, enabling non-developers to edit website content, translate automatically using AI, and optimize the application’s SEO.',
          fr: 'Intlayer simplifie la gestion des configurations et permet l’internationalisation de plusieurs types d’applications JavaScript, y compris les server components. Il permet de déclarer le contenu au même niveau que les composants, ce qui améliore la maintenabilité de la base de code. De plus, Intlayer utilise TypeScript pour prévenir les déclarations manquantes. Enfin, Intlayer offre un éditeur visuel, permettant aux non-développeurs de modifier le contenu du site web, de traduire automatiquement grâce à l’IA et d’optimiser le SEO de l’application.',
          es: 'Intlayer simplifica la gestión de configuraciones y habilita la internacionalización para varios tipos de aplicaciones JavaScript, incluidos los server components. Permite declarar el contenido directamente junto a los componentes, mejorando el mantenimiento del código. Además, Intlayer utiliza TypeScript para evitar declaraciones faltantes. Finalmente, Intlayer ofrece un editor visual que permite a los no desarrolladores editar el contenido del sitio web, traducir automáticamente con IA y optimizar el SEO de la aplicación.',
        }),
        callToAction: {
          label: t({
            en: 'Read more',
            fr: 'En savoir plus',
            es: 'Leer más',
          }),
          alt: t({
            fr: "Cliquez ici pour en savoir plus sur les interets d'Intlayer",
            en: 'Click here to read more about Intlayer interests',
            es: 'Haga clic aquí para leer más sobre los intereses de Intlayer',
          }),
          url: 'https://intlayer.org/doc/concept/interest',
        },
      },
      {
        question: t({
          en: 'How does Intlayer integrate with nextjs?',
          fr: 'Comment Intlayer s’intègre-t-il avec nextjs ?',
          es: '¿Cómo se integra Intlayer con nextjs?',
        }),
        answer: t({
          en: 'Intlayer integrates with nextjs to enable server-side rendering and static site generation, making multilingual content delivery more efficient.',
          fr: 'Intlayer s’intègre avec nextjs pour permettre le rendu côté serveur et la génération de sites statiques, rendant la diffusion de contenu multilingue plus efficace.',
          es: 'Intlayer se integra con nextjs para habilitar el renderizado del lado del servidor y la generación de sitios estáticos, haciendo más eficiente la entrega de contenido multilingüe.',
        }),
        callToAction: {
          label: t({
            en: 'Read more',
            fr: 'En savoir plus',
            es: 'Leer más',
          }),
          alt: t({
            fr: "Cliquez ici pour en savoir plus sur l'intégration d'Intlayer avec nextjs",
            en: 'Click here to read more about Intlayer integration with nextjs',
            es: 'Haga clic aquí para leer más sobre la integración de Intlayer con nextjs',
          }),
          url: 'https://intlayer.org/doc/environment/nextjs',
        },
      },
      {
        question: t({
          en: 'Is there a visual editor in Intlayer?',
          fr: 'Existe-t-il un éditeur visuel dans Intlayer ?',
          es: '¿Hay un editor visual en Intlayer?',
        }),
        answer: t({
          en: 'Yes, Intlayer provides an optional visual editor for managing content easily without diving into code.',
          fr: 'Oui, Intlayer propose un éditeur visuel optionnel pour gérer le contenu facilement sans plonger dans le code.',
          es: 'Sí, Intlayer proporciona un editor visual opcional para gestionar contenido fácilmente sin necesidad de entrar en el código.',
        }),
        callToAction: {
          label: t({
            en: 'Read more',
            fr: 'En savoir plus',
            es: 'Leer más',
          }),
          alt: t({
            fr: "Cliquez ici pour en savoir plus sur l'éditeur visuel d'Intlayer",
            en: 'Click here to read more about Intlayer visual editor',
            es: 'Haga clic aquí para leer más sobre el editor visual de Intlayer',
          }),
          url: 'https://intlayer.org/doc/concept/editor',
        },
      },
      {
        question: t({
          en: 'How can I contribute to Intlayer?',
          fr: 'Comment puis-je contribuer à Intlayer ?',
          es: '¿Cómo puedo contribuir a Intlayer?',
        }),
        answer: t({
          en: 'You can contribute by submitting pull requests or reporting issues on the GitHub repository.',
          fr: 'Vous pouvez contribuer en soumettant des pull requests ou en signalant des problèmes sur le dépôt GitHub.',
          es: 'Puedes contribuir enviando pull requests o reportando problemas en el repositorio de GitHub.',
        }),
        callToAction: {
          label: t({
            en: 'Read more',
            fr: 'En savoir plus',
            es: 'Leer más',
          }),
          alt: t({
            fr: 'Cliquez ici pour en savoir plus sur la façon de contribuer à Intlayer',
            en: 'Click here to read more about how to contribute to Intlayer',
            es: 'Haga clic aquí para leer más sobre cómo contribuir a Intlayer',
          }),
          url: 'https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md',
        },
      },
      {
        question: t({
          en: 'What is the cost of using Intlayer?',
          fr: 'Quel est le coût de l’utilisation d’Intlayer ?',
          es: '¿Cuál es el costo de usar Intlayer?',
        }),
        answer: t({
          en: 'Intlayer offers three plans: Free, Premium, and Enterprise. The Free plan is available at no cost and includes basic features. The Premium plan costs $18.99/month or $14.99/month (billed annually) and includes more advanced features for small to medium teams. The Enterprise plan is available for $34.99/month or $29.99/month (billed annually) with unlimited projects, storage, and advanced tools for large teams.',
          fr: 'Intlayer propose trois forfaits : Gratuit, Premium et Entreprise. Le forfait Gratuit est disponible sans frais et comprend des fonctionnalités de base. Le forfait Premium coûte 18,99 $/mois ou 14,99 $/mois (facturé annuellement) et comprend des fonctionnalités avancées pour les petites et moyennes équipes. Le forfait Entreprise est disponible pour 34,99 $/mois ou 29,99 $/mois (facturé annuellement) avec des projets, un stockage illimités et des outils avancés pour les grandes équipes.',
          es: 'Intlayer ofrece tres planes: Gratis, Premium y Empresa. El plan Gratis está disponible sin costo e incluye funciones básicas. El plan Premium cuesta $18.99/mes o $14.99/mes (facturado anualmente) e incluye funciones avanzadas para equipos pequeños y medianos. El plan Empresa está disponible por $34.99/mes o $29.99/mes (facturado anualmente) con proyectos ilimitados, almacenamiento y herramientas avanzadas para equipos grandes.',
        }),
        callToAction: {
          label: t({
            en: 'Read more',
            fr: 'En savoir plus',
            es: 'Leer más',
          }),
          alt: t({
            fr: "Cliquez ici pour en savoir plus sur les plans d'Intlayer",
            en: 'Click here to read more about Intlayer plans',
            es: 'Haga clic aquí para leer más sobre los planes de Intlayer',
          }),
          url: 'https://intlayer.org/pricing',
        },
      },
      {
        question: t({
          en: 'Which platforms does Intlayer support?',
          fr: 'Quelles plateformes sont prises en charge par Intlayer ?',
          es: '¿Qué plataformas son compatibles con Intlayer?',
        }),
        answer: t({
          en: 'Intlayer is available for React (including Create React App), Vite with React, nextjs, and Express. This ensures a seamless integration with modern JavaScript frameworks and server-side environments.',
          fr: 'Intlayer est disponible pour React (y compris Create React App), Vite avec React, nextjs et Express. Cela garantit une intégration fluide avec les frameworks JavaScript modernes et les environnements côté serveur.',
          es: 'Intlayer está disponible para React (incluido Create React App), Vite con React, nextjs y Express. Esto garantiza una integración fluida con marcos de JavaScript modernos y entornos del lado del servidor.',
        }),
        callToAction: {
          label: t({
            en: 'Read more',
            fr: 'En savoir plus',
            es: 'Leer más',
          }),
          alt: t({
            fr: 'Cliquez ici pour en savoir plus sur les plateformes prises en charge par Intlayer',
            en: 'Click here to read more about the platforms supported by Intlayer',
            es: 'Haga clic aquí para leer más sobre las plataformas compatibles con Intlayer',
          }),
          url: 'https://intlayer.org/doc/get-started#platforms-supported',
        },
      },
    ],
  },
} satisfies DeclarationContent;

export default docNavTitlesContent;
