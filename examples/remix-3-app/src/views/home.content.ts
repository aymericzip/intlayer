import { type Dictionary, t } from 'intlayer';

const homeContent = {
  key: 'home',
  content: {
    apiPrompt: t({
      en: 'Explore the localized REST API endpoint:',
      es: 'Explore el punto final de la API REST localizada:',
      fr: 'Explorez le point de terminaison API REST localisé :',
    }),
    badge: t({
      en: 'Composable Web Framework',
      es: 'Framework Web Componible',
      fr: 'Framework Web Composable',
    }),
    features: [
      {
        description: t({
          en: 'Built on Fetch API, Web Streams, and Request/Response primitives without runtime lock-in.',
          es: 'Construido sobre la API Fetch, Web Streams y primitivas Request/Response sin dependencia de runtime.',
          fr: 'Construit sur l’API Fetch, les Web Streams et les primitives Request/Response sans verrouillage de runtime.',
        }),
        title: t({
          en: 'Web Standards First',
          es: 'Estándares Web Primero',
          fr: 'Standards Web avant tout',
        }),
      },
      {
        description: t({
          en: 'Co-located content declarations with auto-completion and compile-time validation.',
          es: 'Declaraciones de contenido colocalizadas con autocompletado y validación en tiempo de compilación.',
          fr: 'Déclarations de contenu colocalisées avec autocomplétion et validation à la compilation.',
        }),
        title: t({
          en: 'Type-Safe Content',
          es: 'Contenido con Seguridad de Tipos',
          fr: 'Contenu Sécurisé par Types',
        }),
      },
      {
        description: t({
          en: 'Zero-overhead template literals with automatic XSS escaping and nesting support.',
          es: 'Literales de plantilla sin sobrecarga con escape automático de XSS y soporte para anidamiento.',
          fr: 'Littéraux de gabarits sans surcoût avec échappement XSS automatique et imbrication.',
        }),
        title: t({
          en: 'Safe HTML Templates',
          es: 'Plantillas HTML Seguras',
          fr: 'Templates HTML Sécurisés',
        }),
      },
    ],
    featuresTitle: t({
      en: 'Key Features',
      es: 'Características Clave',
      fr: 'Fonctionnalités Clés',
    }),
    subtitle: t({
      en: 'A modern, composable web application built on web standards with full internationalization.',
      es: 'Una aplicación web moderna y componible construida sobre estándares web con internacionalización completa.',
      fr: 'Une application web moderne et composable construite sur les standards web avec internationalisation complète.',
    }),
    title: t({
      en: 'Welcome to Remix 3 with Intlayer',
      es: 'Bienvenido a Remix 3 con Intlayer',
      fr: 'Bienvenue sur Remix 3 avec Intlayer',
    }),
  },
} satisfies Dictionary;

export default homeContent;
