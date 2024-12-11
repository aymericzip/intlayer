import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-content-declaration-function-fetching-metadata',
  content: {
    title: t({
      en: 'Function Fetching',
      fr: 'Fonction Fetching',
      es: 'Función Fetching',
    }),

    description: t({
      en: 'Discover how to declare and use function fetching in your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: 'Découvrez comment déclarer et utiliser la récupération de fonction dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.',
      es: 'Descubra cómo declarar y usar la recuperación de función en su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),
    keywords: t({
      en: [
        'Function Fetching',
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        'Récupération de Fonction',
        'Internationalisation',
        'Documentation',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'Recuperación de Función',
        'Internacionalización',
        'Documentación',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default docContent;
