import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-intlayer-with-nextjs-page-router-metadata',
  content: {
    title: t({
      en: 'Intlayer with Next.js using Page Router',
      fr: 'Intlayer avec Next.js en utilisant le Page Router',
      es: 'Intlayer con Next.js usando el Page Router',
    }),

    description: t({
      en: 'Discover how to set up Intlayer with Next.js using Page Router to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: 'Découvrez comment configurer Intlayer avec Next.js en utilisant le Page Router pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour mettre en place votre projet en quelques minutes.',
      es: 'Descubra cómo configurar Intlayer con Next.js usando el Page Router para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),
    keywords: t({
      en: [
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Page Router',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        'Internationalisation',
        'Documentation',
        'Page Router',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'Internationalization',
        'Documentación',
        'Page Router',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default docContent;
