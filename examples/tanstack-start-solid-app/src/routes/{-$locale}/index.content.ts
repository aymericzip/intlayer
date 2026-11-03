import { type Dictionary, t } from 'intlayer';

const indexContent = {
  key: 'index-page',
  content: {
    aboutLink: t({
      en: 'About This Starter',
      es: 'Acerca de este starter',
      fr: 'À propos de ce modèle',
    }),
    features: {
      serverFunctions: {
        desc: t({
          en: 'Call server code from your UI without creating API boilerplate.',
          es: 'Llama código del servidor desde tu UI sin escribir código API repetitivo.',
          fr: 'Appelez du code serveur depuis votre interface sans boilerplate API.',
        }),
        title: t({
          en: 'Server Functions',
          es: 'Funciones del servidor',
          fr: 'Fonctions serveur',
        }),
      },
      streaming: {
        desc: t({
          en: 'Ship progressively rendered responses for faster experiences.',
          es: 'Envía respuestas renderizadas progresivamente para experiencias más rápidas.',
          fr: 'Envoyez des réponses progressives pour une expérience plus rapide.',
        }),
        title: t({
          en: 'Streaming by Default',
          es: 'Streaming por defecto',
          fr: 'Streaming par défaut',
        }),
      },
      tailwind: {
        desc: t({
          en: 'Design quickly with utility-first styling and reusable tokens.',
          es: 'Diseña rápido con clases utilitarias y tokens reutilizables.',
          fr: 'Concevez rapidement avec des classes utilitaires et des tokens réutilisables.',
        }),
        title: t({
          en: 'Tailwind Native',
          es: 'Tailwind nativo',
          fr: 'Tailwind intégré',
        }),
      },
      typeSafeRouting: {
        desc: t({
          en: 'Routes and links stay in sync across every page.',
          es: 'Las rutas y los enlaces se mantienen sincronizados en cada página.',
          fr: 'Les routes et les liens restent synchronisés sur chaque page.',
        }),
        title: t({
          en: 'Type-Safe Routing',
          es: 'Enrutamiento tipado',
          fr: 'Routage typé',
        }),
      },
    },
    heroDesc: t({
      en: 'This base starter intentionally keeps things light: two routes, clean structure, and the essentials you need to build from scratch.',
      es: 'Este starter base mantiene las cosas ligeras: dos rutas, estructura limpia y lo esencial para construir desde cero.',
      fr: "Ce modèle de démarrage reste volontairement simple : deux routes, une structure claire et l'essentiel pour construire depuis zéro.",
    }),
    heroTitle: t({
      en: 'Start simple, ship quickly.',
      es: 'Empieza simple, entrega rápido.',
      fr: 'Démarrez simplement, livrez rapidement.',
    }),
    kicker: t({
      en: 'TanStack Start Base Template',
      es: 'Plantilla base TanStack Start',
      fr: 'Modèle de base TanStack Start',
    }),
    quickStart: {
      editHeader: t({
        en: 'Update src/components/Header.tsx for navigation and product links.',
        es: 'Actualiza src/components/Header.tsx para navegación y enlaces del producto.',
        fr: 'Mettez à jour src/components/Header.tsx pour la navigation et les liens produit.',
      }),
      editIndex: t({
        en: 'Edit src/routes/index.tsx to customize the home page.',
        es: 'Edita src/routes/index.tsx para personalizar la página principal.',
        fr: "Modifiez src/routes/index.tsx pour personnaliser la page d'accueil.",
      }),
      editRoutes: t({
        en: 'Add routes in src/routes and tweak visual tokens in src/styles.css.',
        es: 'Añade rutas en src/routes y ajusta los tokens visuales en src/styles.css.',
        fr: 'Ajoutez des routes dans src/routes et ajustez les tokens visuels dans src/styles.css.',
      }),
      kicker: t({
        en: 'Quick Start',
        es: 'Inicio rápido',
        fr: 'Démarrage rapide',
      }),
    },
    routerGuide: t({
      en: 'Router Guide',
      es: 'Guía del router',
      fr: 'Guide du routeur',
    }),
  },
} satisfies Dictionary;

export default indexContent;
