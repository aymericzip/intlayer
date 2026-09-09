import { type Dictionary, t } from 'intlayer';

const homeContent = {
  key: 'home',
  content: {
    title: t({
      en: 'Welcome to Remix 3 with Intlayer',
      fr: 'Bienvenue sur Remix 3 avec Intlayer',
      es: 'Bienvenido a Remix 3 con Intlayer',
    }),
    subtitle: t({
      en: 'A modern, composable web application built on web standards with full internationalization.',
      fr: 'Une application web moderne et composable construite sur les standards web avec internationalisation complète.',
      es: 'Una aplicación web moderna y componible construida sobre estándares web con internacionalización completa.',
    }),
    badge: t({
      en: 'Composable Web Framework',
      fr: 'Framework Web Composable',
      es: 'Framework Web Componible',
    }),
    featuresTitle: t({
      en: 'Key Features',
      fr: 'Fonctionnalités Clés',
      es: 'Características Clave',
    }),
    features: [
      {
        title: t({
          en: 'Web Standards First',
          fr: 'Standards Web avant tout',
          es: 'Estándares Web Primero',
        }),
        description: t({
          en: 'Built on Fetch API, Web Streams, and Request/Response primitives without runtime lock-in.',
          fr: 'Construit sur l’API Fetch, les Web Streams et les primitives Request/Response sans verrouillage de runtime.',
          es: 'Construido sobre la API Fetch, Web Streams y primitivas Request/Response sin dependencia de runtime.',
        }),
      },
      {
        title: t({
          en: 'Type-Safe Content',
          fr: 'Contenu Sécurisé par Types',
          es: 'Contenido con Seguridad de Tipos',
        }),
        description: t({
          en: 'Co-located content declarations with auto-completion and compile-time validation.',
          fr: 'Déclarations de contenu colocalisées avec autocomplétion et validation à la compilation.',
          es: 'Declaraciones de contenido colocalizadas con autocompletado y validación en tiempo de compilación.',
        }),
      },
      {
        title: t({
          en: 'Safe HTML Templates',
          fr: 'Templates HTML Sécurisés',
          es: 'Plantillas HTML Seguras',
        }),
        description: t({
          en: 'Zero-overhead template literals with automatic XSS escaping and nesting support.',
          fr: 'Littéraux de gabarits sans surcoût avec échappement XSS automatique et imbrication.',
          es: 'Literales de plantilla sin sobrecarga con escape automático de XSS y soporte para anidamiento.',
        }),
      },
    ],
    apiPrompt: t({
      en: 'Explore the localized REST API endpoint:',
      fr: 'Explorez le point de terminaison API REST localisé :',
      es: 'Explore el punto final de la API REST localizada:',
    }),
  },
} satisfies Dictionary;

export default homeContent;
