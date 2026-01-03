import { type Dictionary, t } from 'intlayer';

const cmsLandingContent = {
  key: 'cms-landing',
  title: 'CMS landing page content',
  description:
    'Content declarations for the CMS landing page sections, including hero copy, feature summaries, and call-to-action labels.',
  content: {
    heroTag: 'Intlayer CMS',
    heroTitle: t({
      en: 'Your Code. Your Content. Unified.',
      fr: 'Votre Code. Votre Contenu. Unifié.',
      es: 'Tu Código. Tu Contenido. Unificado.',
      de: 'Ihr Code. Ihr Inhalt. Vereint.',
    }),
    heroSubtitle: t({
      en: 'The headless CMS that lives inside your codebase',
      fr: 'Le CMS headless qui vit dans votre codebase',
      es: 'El CMS headless que vive en tu código',
      de: 'Das Headless-CMS, das in Ihrer Codebasis lebt',
    }),
    heroDescription: t({
      en: 'Bridge local content declarations with remote editing. Ship multilingual updates instantly. Let your whole team contribute, without breaking production.',
      fr: "Reliez les déclarations de contenu locales à l'édition distante. Publiez des mises à jour multilingues instantanément. Permettez à toute votre équipe de contribuer, sans casser la production.",
      es: 'Conecta las declaraciones de contenido locales con la edición remota. Publica actualizaciones multilingües al instante. Deja que todo tu equipo contribuya, sin romper producción.',
      de: 'Verbinden Sie lokale Content-Deklarationen mit Remote-Bearbeitung. Veröffentlichen Sie mehrsprachige Updates sofort. Lassen Sie Ihr gesamtes Team beitragen, ohne die Produktion zu stören.',
    }),
    primaryCta: t({
      en: 'Start editing now',
      fr: 'Commencer à éditer',
      es: 'Empezar a editar',
      de: 'Jetzt bearbeiten',
    }),
    secondaryCta: t({
      en: 'Read the docs',
      fr: 'Lire la documentation',
      es: 'Leer la documentación',
      de: 'Dokumentation lesen',
    }),

    // Value proposition section
    valuePropsTitle: t({
      en: 'Why teams choose Intlayer CMS',
      fr: 'Pourquoi les équipes choisissent Intlayer CMS',
      es: 'Por qué los equipos eligen Intlayer CMS',
      de: 'Warum Teams Intlayer CMS wählen',
    }),
    valueProps: [
      {
        id: 'code-first',
        icon: 'code',
        title: t({
          en: 'Code-first, not code-only',
          fr: 'Code-first, pas code-only',
          es: 'Code-first, no solo código',
          de: 'Code-first, nicht nur Code',
        }),
        description: t({
          en: 'Content lives in your repo as source of truth. The CMS syncs and extends, never replaces.',
          fr: 'Le contenu vit dans votre repo comme source de vérité. Le CMS synchronise et étend, ne remplace jamais.',
          es: 'El contenido vive en tu repo como fuente de verdad. El CMS sincroniza y extiende, nunca reemplaza.',
          de: 'Inhalte leben in Ihrem Repo als Single Source of Truth. Das CMS synchronisiert und erweitert, ersetzt nie.',
        }),
      },
      {
        id: 'no-plugins',
        icon: 'puzzle',
        title: t({
          en: 'Zero plugins, zero surprise costs',
          fr: 'Zéro plugins, zéro coûts surprises',
          es: 'Cero plugins, cero costos sorpresa',
          de: 'Keine Plugins, keine versteckten Kosten',
        }),
        description: t({
          en: 'Multilingual content management is built-in. No add-ons needed for localization, versioning, or collaboration.',
          fr: 'La gestion de contenu multilingue est intégrée. Pas de modules complémentaires nécessaires pour la localisation, le versioning ou la collaboration.',
          es: 'La gestión de contenido multilingüe está integrada. Sin complementos necesarios para localización, versionado o colaboración.',
          de: 'Mehrsprachiges Content-Management ist integriert. Keine Add-ons für Lokalisierung, Versionierung oder Zusammenarbeit nötig.',
        }),
      },
      {
        id: 'ship-faster',
        icon: 'rocket',
        title: t({
          en: 'Ship content 10× faster',
          fr: 'Publiez du contenu 10× plus vite',
          es: 'Publica contenido 10× más rápido',
          de: 'Content 10× schneller veröffentlichen',
        }),
        description: t({
          en: 'Live sync pushes changes instantly. No rebuild required. Update copy in production while users browse.',
          fr: 'La synchronisation en direct pousse les changements instantanément. Aucune reconstruction requise. Mettez à jour le contenu en production pendant que les utilisateurs naviguent.',
          es: 'La sincronización en vivo envía cambios al instante. Sin reconstrucción necesaria. Actualiza el contenido en producción mientras los usuarios navegan.',
          de: 'Live-Sync pusht Änderungen sofort. Kein Rebuild erforderlich. Aktualisieren Sie Inhalte in der Produktion, während Benutzer browsen.',
        }),
      },
    ],

    // Content delivery section
    deliveryTitle: t({
      en: 'Deliver content your way',
      fr: 'Livrez le contenu à votre façon',
      es: 'Entrega contenido a tu manera',
      de: 'Inhalte nach Ihren Wünschen bereitstellen',
    }),
    deliveryDescription: t({
      en: 'Choose the delivery mode that fits your architecture, or mix them.',
      fr: 'Choisissez le mode de livraison qui correspond à votre architecture, ou mélangez-les.',
      es: 'Elige el modo de entrega que se adapte a tu arquitectura, o mézclalos.',
      de: 'Wählen Sie den Bereitstellungsmodus, der zu Ihrer Architektur passt, oder kombinieren Sie sie.',
    }),
    deliveryModes: [
      {
        id: 'static',
        icon: 'server',
        title: t({
          en: 'Static',
          fr: 'Statique',
          es: 'Estático',
          de: 'Statisch',
        }),
        description: t({
          en: 'Prebuild at compile time for maximum performance & SEO. Perfect for marketing sites.',
          fr: 'Pré-construisez au moment de la compilation pour des performances et un SEO maximum. Parfait pour les sites marketing.',
          es: 'Pre-construye en tiempo de compilación para máximo rendimiento y SEO. Perfecto para sitios de marketing.',
          de: 'Vorkompilieren für maximale Performance & SEO. Perfekt für Marketing-Sites.',
        }),
        badge: t({
          en: 'Best for SEO',
          fr: 'Meilleur pour le SEO',
          es: 'Mejor para SEO',
          de: 'Optimal für SEO',
        }),
      },
      {
        id: 'dynamic',
        icon: 'refresh',
        title: t({
          en: 'Dynamic',
          fr: 'Dynamique',
          es: 'Dinámico',
          de: 'Dynamisch',
        }),
        description: t({
          en: 'Fetch fresh content per request or on a schedule. Ideal for frequently updated content.',
          fr: 'Récupérez du contenu frais par requête ou selon un calendrier. Idéal pour le contenu fréquemment mis à jour.',
          es: 'Obtén contenido fresco por solicitud o programado. Ideal para contenido actualizado frecuentemente.',
          de: 'Frischen Content pro Request oder nach Zeitplan abrufen. Ideal für häufig aktualisierten Content.',
        }),
        badge: t({
          en: 'Flexible',
          fr: 'Flexible',
          es: 'Flexible',
          de: 'Flexibel',
        }),
      },
      {
        id: 'live-sync',
        icon: 'zap',
        title: t({
          en: 'Live Sync',
          fr: 'Sync en direct',
          es: 'Sync en vivo',
          de: 'Live-Sync',
        }),
        description: t({
          en: 'Hot-update content without rebuilding. Changes appear instantly across all connected apps.',
          fr: 'Mettez à jour le contenu à chaud sans reconstruire. Les changements apparaissent instantanément dans toutes les apps connectées.',
          es: 'Actualiza contenido en caliente sin reconstruir. Los cambios aparecen instantáneamente en todas las apps conectadas.',
          de: 'Content hot-updaten ohne Rebuild. Änderungen erscheinen sofort in allen verbundenen Apps.',
        }),
        badge: t({
          en: 'Instant updates',
          fr: 'Mises à jour instantanées',
          es: 'Actualizaciones instantáneas',
          de: 'Sofortige Updates',
        }),
      },
    ],

    // Features section
    featuresTitle: t({
      en: 'Everything you need to manage content at scale',
      fr: 'Tout ce dont vous avez besoin pour gérer le contenu à grande échelle',
      es: 'Todo lo que necesitas para gestionar contenido a escala',
      de: 'Alles, was Sie brauchen, um Content im großen Maßstab zu verwalten',
    }),
    features: [
      {
        id: 'local-remote',
        icon: 'git-merge',
        title: t({
          en: 'Local ↔ Remote sync',
          fr: 'Synchronisation Local ↔ Distant',
          es: 'Sincronización Local ↔ Remoto',
          de: 'Lokal ↔ Remote Sync',
        }),
        description: t({
          en: 'Push and pull content between your codebase and the CMS. Git remains your source of truth.',
          fr: 'Poussez et tirez le contenu entre votre codebase et le CMS. Git reste votre source de vérité.',
          es: 'Empuja y extrae contenido entre tu código y el CMS. Git sigue siendo tu fuente de verdad.',
          de: 'Content zwischen Codebase und CMS pushen und pullen. Git bleibt Ihre Single Source of Truth.',
        }),
      },
      {
        id: 'multilingual',
        icon: 'globe',
        title: t({
          en: 'Native multilingual',
          fr: 'Multilingue natif',
          es: 'Multilingüe nativo',
          de: 'Nativ mehrsprachig',
        }),
        description: t({
          en: 'Every field supports multiple locales out of the box. No plugins, no per-locale pricing.',
          fr: 'Chaque champ supporte plusieurs locales nativement. Pas de plugins, pas de tarification par locale.',
          es: 'Cada campo soporta múltiples idiomas de serie. Sin plugins, sin precios por idioma.',
          de: 'Jedes Feld unterstützt mehrere Sprachen out-of-the-box. Keine Plugins, keine Preise pro Sprache.',
        }),
      },
      {
        id: 'webhooks',
        icon: 'webhook',
        title: t({
          en: 'CI/CD webhooks',
          fr: 'Webhooks CI/CD',
          es: 'Webhooks CI/CD',
          de: 'CI/CD Webhooks',
        }),
        description: t({
          en: 'Trigger rebuilds automatically when content changes. Integrate with Vercel, Netlify, GitHub Actions, and more.',
          fr: 'Déclenchez des reconstructions automatiquement lorsque le contenu change. Intégrez avec Vercel, Netlify, GitHub Actions, et plus.',
          es: 'Activa reconstrucciones automáticamente cuando el contenido cambia. Integra con Vercel, Netlify, GitHub Actions, y más.',
          de: 'Rebuilds automatisch auslösen, wenn sich Content ändert. Integration mit Vercel, Netlify, GitHub Actions und mehr.',
        }),
      },
      {
        id: 'blocks',
        icon: 'layout',
        title: t({
          en: 'Blocks & page builder',
          fr: 'Blocs & constructeur de pages',
          es: 'Bloques & constructor de páginas',
          de: 'Blöcke & Page Builder',
        }),
        description: t({
          en: 'Manage reusable content blocks, full pages, and SEO metadata from a single interface.',
          fr: 'Gérez des blocs de contenu réutilisables, des pages complètes et des métadonnées SEO depuis une seule interface.',
          es: 'Gestiona bloques de contenido reutilizables, páginas completas y metadatos SEO desde una sola interfaz.',
          de: 'Wiederverwendbare Content-Blöcke, komplette Seiten und SEO-Metadaten von einer Oberfläche aus verwalten.',
        }),
      },
      {
        id: 'feature-flags',
        icon: 'toggle',
        title: t({
          en: 'Feature flags',
          fr: 'Feature flags',
          es: 'Feature flags',
          de: 'Feature Flags',
        }),
        description: t({
          en: 'Gate content variations per locale, audience, or experiment. Roll out progressively.',
          fr: 'Contrôlez les variations de contenu par locale, audience ou expérience. Déployez progressivement.',
          es: 'Controla variaciones de contenido por idioma, audiencia o experimento. Despliega progresivamente.',
          de: 'Content-Variationen pro Sprache, Zielgruppe oder Experiment steuern. Progressiv ausrollen.',
        }),
      },
      {
        id: 'collaboration',
        icon: 'users',
        title: t({
          en: 'Dev & non-dev collaboration',
          fr: 'Collaboration dev & non-dev',
          es: 'Colaboración dev & no-dev',
          de: 'Dev & Non-Dev Zusammenarbeit',
        }),
        description: t({
          en: 'Developers own the schema. Editors update content safely. Approval workflows keep everyone aligned.',
          fr: "Les développeurs possèdent le schéma. Les éditeurs mettent à jour le contenu en toute sécurité. Les workflows d'approbation maintiennent tout le monde aligné.",
          es: 'Los desarrolladores controlan el schema. Los editores actualizan contenido de forma segura. Los flujos de aprobación mantienen a todos alineados.',
          de: 'Entwickler besitzen das Schema. Redakteure aktualisieren Content sicher. Approval-Workflows halten alle synchron.',
        }),
      },
    ],

    // Coming soon section
    comingSoonTitle: t({
      en: 'Coming soon',
      fr: 'Bientôt disponible',
      es: 'Próximamente',
      de: 'Demnächst verfügbar',
    }),
    comingSoonFeatures: [
      {
        id: 'auto-translate',
        icon: 'sparkles',
        title: t({
          en: 'AI auto-translation',
          fr: 'Traduction automatique IA',
          es: 'Traducción automática con IA',
          de: 'KI-Auto-Übersetzung',
        }),
        description: t({
          en: 'Push content in one language, get AI-powered translations instantly, like Reddit does with posts.',
          fr: "Poussez du contenu dans une langue, obtenez des traductions alimentées par l'IA instantanément, comme Reddit le fait avec ses posts.",
          es: 'Sube contenido en un idioma, obtén traducciones con IA al instante, como Reddit hace con sus publicaciones.',
          de: 'Content in einer Sprache pushen, sofort KI-gestützte Übersetzungen erhalten, wie Reddit es mit Posts macht.',
        }),
        badge: t({
          en: 'WIP',
          fr: 'En cours',
          es: 'En desarrollo',
          de: 'In Arbeit',
        }),
      },
      {
        id: 'self-hosted',
        icon: 'building',
        title: t({
          en: 'Self-hosted option',
          fr: 'Option auto-hébergée',
          es: 'Opción auto-hospedada',
          de: 'Self-hosted Option',
        }),
        description: t({
          en: 'Run Intlayer CMS on your own infrastructure when compliance or control requires it.',
          fr: "Exécutez Intlayer CMS sur votre propre infrastructure lorsque la conformité ou le contrôle l'exigent.",
          es: 'Ejecuta Intlayer CMS en tu propia infraestructura cuando la conformidad o el control lo requieran.',
          de: 'Intlayer CMS auf eigener Infrastruktur betreiben, wenn Compliance oder Kontrolle es erfordern.',
        }),
        badge: t({
          en: 'WIP',
          fr: 'En cours',
          es: 'En desarrollo',
          de: 'In Arbeit',
        }),
      },
    ],

    // Integration section
    integrationTitle: t({
      en: 'Seamlessly connected to Intlayer i18n',
      fr: 'Connecté de manière transparente à Intlayer i18n',
      es: 'Conectado perfectamente con Intlayer i18n',
      de: 'Nahtlos verbunden mit Intlayer i18n',
    }),
    integrationDescription: t({
      en: 'Already using the Intlayer i18n library? Your dictionaries, routing, and type-safe hooks work exactly the same with the CMS, zero migration, zero friction.',
      fr: 'Vous utilisez déjà la bibliothèque Intlayer i18n ? Vos dictionnaires, routing et hooks type-safe fonctionnent exactement de la même manière avec le CMS, zéro migration, zéro friction.',
      es: '¿Ya usas la biblioteca Intlayer i18n? Tus diccionarios, enrutamiento y hooks type-safe funcionan exactamente igual con el CMS, cero migración, cero fricción.',
      de: 'Nutzen Sie bereits die Intlayer i18n Library? Ihre Dictionaries, Routing und type-safe Hooks funktionieren mit dem CMS genauso, keine Migration, keine Reibung.',
    }),
    integrationCta: t({
      en: 'Explore the i18n library',
      fr: 'Explorer la bibliothèque i18n',
      es: 'Explorar la biblioteca i18n',
      de: 'Die i18n Library erkunden',
    }),

    // Final CTA section
    finalCtaTitle: t({
      en: 'Ready to unify your content workflow?',
      fr: 'Prêt à unifier votre workflow de contenu ?',
      es: '¿Listo para unificar tu flujo de contenido?',
      de: 'Bereit, Ihren Content-Workflow zu vereinheitlichen?',
    }),
    finalCtaDescription: t({
      en: 'Start for free. Scale as you grow. No credit card required.',
      fr: 'Commencez gratuitement. Évoluez selon vos besoins. Aucune carte de crédit requise.',
      es: 'Empieza gratis. Escala según crezcas. Sin tarjeta de crédito.',
      de: 'Kostenlos starten. Skalieren Sie mit Ihrem Wachstum. Keine Kreditkarte erforderlich.',
    }),
    finalCtaPrimary: t({
      en: 'Get started free',
      fr: 'Commencer gratuitement',
      es: 'Empezar gratis',
      de: 'Kostenlos starten',
    }),
    finalCtaSecondary: t({
      en: 'View pricing',
      fr: 'Voir les tarifs',
      es: 'Ver precios',
      de: 'Preise ansehen',
    }),
  },
} satisfies Dictionary;

export default cmsLandingContent;
