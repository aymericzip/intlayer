import { type Dictionary, t } from 'intlayer';

const homeContent = {
  key: 'home',
  content: {
    title: 'Astro + Intlayer',
    subtitle: t({
      en: 'Framework compatibility showcase',
      fr: 'Vitrine de compatibilité des frameworks',
      es: 'Exhibición de compatibilidad de frameworks',
    }),
    description: t({
      en: 'Intlayer works seamlessly with every major UI framework inside Astro islands. Pick a framework to see it in action.',
      fr: 'Intlayer fonctionne parfaitement avec tous les principaux frameworks UI dans les îles Astro. Choisissez un framework pour le voir en action.',
      es: 'Intlayer funciona perfectamente con todos los principales frameworks UI dentro de las islas de Astro. Elige un framework para verlo en acción.',
    }),
    exploreFrameworks: t({
      en: 'Explore frameworks',
      fr: 'Explorer les frameworks',
      es: 'Explorar frameworks',
    }),
    metadata: {
      title: t({
        en: 'Astro + Intlayer | Home',
        fr: 'Astro + Intlayer | Accueil',
        es: 'Astro + Intlayer | Inicio',
      }),
      description: t({
        en: 'Experience the power of Astro combined with Intlayer for effortless internationalization.',
        fr: "Découvrez la puissance d'Astro combinée à Intlayer pour une internationalisation sans effort.",
        es: 'Experimenta el poder de Astro combinado con Intlayer para una internacionalización sin esfuerzo.',
      }),
      keywords: ['Astro', 'Intlayer', 'i18n', 'React', 'Vue', 'Svelte'],
    },
  },
} satisfies Dictionary;

export default homeContent;
