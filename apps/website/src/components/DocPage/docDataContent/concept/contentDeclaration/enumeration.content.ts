import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-content-declaration-enumeration-metadata',
  content: {
    title: t({
      en: 'Enumeration',
      fr: 'Énumération',
      es: 'Enumeración',
    }),

    description: t({
      en: 'Discover how to declare and use enumerations in your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: 'Découvrez comment déclarer et utiliser des énumérations dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.',
      es: 'Descubra cómo declarar y usar enumeraciones en su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),
    keywords: t({
      en: [
        'Enumeration',
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        'Énumération',
        'Internationalisation',
        'Documentation',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'Enumeración',
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
