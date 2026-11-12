import { type Dictionary, t } from 'intlayer';

const homeContent = {
  key: 'home',
  content: {
    description: t({
      en: 'Intlayer works seamlessly with every major UI framework inside Astro islands. Pick a framework to see it in action.',
      es: 'Intlayer funciona perfectamente con todos los principales frameworks UI dentro de las islas de Astro. Elige un framework para verlo en acción.',
      fr: 'Intlayer fonctionne parfaitement avec tous les principaux frameworks UI dans les îles Astro. Choisissez un framework pour le voir en action.',
    }),
    exploreFrameworks: t({
      en: 'Explore frameworks',
      es: 'Explorar frameworks',
      fr: 'Explorer les frameworks',
    }),
    metadata: {
      description: t({
        en: 'Experience the power of Astro combined with Intlayer for effortless internationalization.',
        es: 'Experimenta el poder de Astro combinado con Intlayer para una internacionalización sin esfuerzo.',
        fr: "Découvrez la puissance d'Astro combinée à Intlayer pour une internationalisation sans effort.",
      }),
      keywords: ['Astro', 'Intlayer', 'i18n', 'React', 'Vue', 'Svelte'],
      title: t({
        en: 'Astro + Intlayer | Home',
        es: 'Astro + Intlayer | Inicio',
        fr: 'Astro + Intlayer | Accueil',
      }),
    },
    subtitle: t({
      en: 'Framework compatibility showcase',
      es: 'Exhibición de compatibilidad de frameworks',
      fr: 'Vitrine de compatibilité des frameworks',
    }),
    title: 'Astro + Intlayer',
  },
} satisfies Dictionary;

export default homeContent;
