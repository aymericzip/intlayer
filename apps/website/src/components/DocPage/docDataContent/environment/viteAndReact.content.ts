import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-intlayer-with-vite-react-metadata',
  content: {
    title: t({
      en: 'Intlayer with Vite and React',
      fr: 'Intlayer avec Vite et React',
      es: 'Intlayer con Vite y React',
    }),

    description: t({
      en: 'Discover how to set up Intlayer with Vite and React to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: 'Découvrez comment configurer Intlayer avec Vite et React pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour mettre en place votre projet en quelques minutes.',
      es: 'Descubra cómo configurar Intlayer con Vite y React para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),
    keywords: t({
      en: [
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Vite',
        'React',
        'JavaScript',
      ],
      fr: [
        'Internationalisation',
        'Documentation',
        'Intlayer',
        'Vite',
        'React',
        'JavaScript',
      ],
      es: [
        'Internacionalización',
        'Documentación',
        'Intlayer',
        'Vite',
        'React',
        'JavaScript',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default docContent;
