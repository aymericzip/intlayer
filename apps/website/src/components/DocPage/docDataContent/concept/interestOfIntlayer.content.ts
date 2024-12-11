import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-interest-of-intlayer-metadata',
  content: {
    title: t({
      en: 'Interest of Intlayer',
      fr: "Intérêt d'Intlayer",
      es: 'Interés de Intlayer',
    }),

    description: t({
      en: 'Discover the benefits and advantages of using Intlayer in your projects. Understand why Intlayer stands out among other frameworks.',
      fr: "Découvrez les avantages et bénéfices d'utiliser Intlayer dans vos projets. Comprenez pourquoi Intlayer se démarque parmi les autres frameworks.",
      es: 'Descubra los beneficios y ventajas de usar Intlayer en sus proyectos. Comprenda por qué Intlayer se destaca entre otros frameworks.',
    }),
    keywords: t({
      en: ['Benefits', 'Advantages', 'Intlayer', 'Framework', 'Comparison'],
      fr: ['Avantages', 'Intérêt', 'Intlayer', 'Framework', 'Comparaison'],
      es: ['Beneficios', 'Ventajas', 'Intlayer', 'Framework', 'Comparación'],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default docContent;
