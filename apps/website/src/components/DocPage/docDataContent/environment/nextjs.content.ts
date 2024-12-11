import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-intlayer-with-nextjs-15-metadata',
  content: {
    title: t({
      en: 'Intlayer with Next.js 15',
      fr: 'Intlayer avec Next.js 15',
      es: 'Intlayer con Next.js 15',
    }),

    description: t({
      en: 'Discover how to set up Intlayer with Next.js 15 to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: 'Découvrez comment configurer Intlayer avec Next.js 15 pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour mettre en place votre projet en quelques minutes.',
      es: 'Descubra cómo configurar Intlayer con Next.js 15 para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),
    keywords: t({
      en: [
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Next.js 15',
        'JavaScript',
        'React',
      ],
      fr: [
        'Internationalisation',
        'Documentation',
        'Intlayer',
        'Next.js 15',
        'JavaScript',
        'React',
      ],
      es: [
        'Internacionalización',
        'Documentación',
        'Intlayer',
        'Next.js 15',
        'JavaScript',
        'React',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default docContent;
