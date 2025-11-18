import { type Dictionary, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    logoAlt: t({
      en: 'TanStack Logo',
      es: 'Logo de TanStack',
      fr: 'Logo de TanStack',
    }),
    heroSubtitle: t({
      en: 'The framework for next generation AI applications',
      es: 'El framework para aplicaciones de IA de próxima generación',
      fr: "Le framework pour les applications d'IA de prochaine génération",
    }),
    heroDescription: t({
      en: 'Full-stack framework powered by TanStack Router for React and Solid. Build modern applications with server functions, streaming, and type safety.',
      es: 'Framework de pila completa impulsado por TanStack Router para React y Solid. Construye aplicaciones modernas con funciones de servidor, streaming y seguridad de tipos.',
      fr: 'Framework full-stack propulsé par TanStack Router pour React et Solid. Créez des applications modernes avec des fonctions serveur, du streaming et une sécurité typée.',
    }),
    docButtonLabel: t({
      en: 'Documentation',
      es: 'Documentación',
      fr: 'Documentation',
    }),
    guideTextPrefix: t({
      en: 'Begin your TanStack Start journey by editing ',
      es: 'Comienza tu viaje con TanStack Start editando ',
      fr: 'Commencez votre parcours TanStack Start en modifiant ',
    }),
    features: [
      {
        title: t({
          en: 'Powerful Server Functions',
          es: 'Funciones de servidor potentes',
          fr: 'Fonctions serveur puissantes',
        }),
        description: t({
          en: 'Write server-side code that seamlessly integrates with your client components. Type-safe, secure, and simple.',
          es: 'Escribe código del lado del servidor que se integra perfectamente con tus componentes cliente. Tipado seguro, protegido y sencillo.',
          fr: "Écrivez du code côté serveur qui s'intègre parfaitement à vos composants client. Typé, sécurisé et simple.",
        }),
      },
      {
        title: t({
          en: 'Flexible Server Side Rendering',
          es: 'Renderizado del lado del servidor flexible',
          fr: 'Rendu côté serveur flexible',
        }),
        description: t({
          en: 'Full-document SSR, streaming, and progressive enhancement out of the box. Control exactly what renders where.',
          es: 'SSR de documento completo, streaming y mejora progresiva listos para usar. Controla exactamente qué se renderiza y dónde.',
          fr: "SSR de document complet, streaming et amélioration progressive prêts à l'emploi. Contrôlez précisément ce qui s'affiche et où.",
        }),
      },
      {
        title: t({
          en: 'API Routes',
          es: 'Rutas API',
          fr: 'Routes API',
        }),
        description: t({
          en: 'Build type-safe API endpoints alongside your application. No separate backend needed.',
          es: 'Construye endpoints API tipados junto a tu aplicación. No necesitas un backend separado.',
          fr: "Créez des endpoints API typés aux côtés de votre application. Aucun backend séparé n'est nécessaire.",
        }),
      },
      {
        title: t({
          en: 'Strongly Typed Everything',
          es: 'Todo fuertemente tipado',
          fr: 'Tout fortement typé',
        }),
        description: t({
          en: 'End-to-end type safety from server to client. Catch errors before they reach production.',
          es: 'Seguridad de tipos de extremo a extremo, del servidor al cliente. Atrapa errores antes de que lleguen a producción.',
          fr: 'Sécurité des types de bout en bout, du serveur au client. Attrapez les erreurs avant la production.',
        }),
      },
      {
        title: t({
          en: 'Full Streaming Support',
          es: 'Soporte completo de streaming',
          fr: 'Prise en charge complète du streaming',
        }),
        description: t({
          en: 'Stream data from server to client progressively. Perfect for AI applications and real-time updates.',
          es: 'Transmite datos del servidor al cliente de forma progresiva. Perfecto para aplicaciones de IA y actualizaciones en tiempo real.',
          fr: 'Diffusez des données du serveur au client de manière progressive. Parfait pour les applications IA et les mises à jour en temps réel.',
        }),
      },
      {
        title: t({
          en: 'Next Generation Ready',
          es: 'Listo para la próxima generación',
          fr: 'Prêt pour la prochaine génération',
        }),
        description: t({
          en: 'Built from the ground up for modern web applications. Deploy anywhere JavaScript runs.',
          es: 'Construido desde cero para aplicaciones web modernas. Despliega donde JavaScript se ejecute.',
          fr: 'Construit de A à Z pour les applications web modernes. Déployez partout où JavaScript fonctionne.',
        }),
      },
    ],
  },
} satisfies Dictionary;

export default appContent;
