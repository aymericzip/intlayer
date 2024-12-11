import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-intlayer-with-create-react-app-metadata',
  content: {
    title: t({
      en: 'Intlayer with Create React App',
      fr: 'Intlayer avec Create React App',
      es: 'Intlayer con Create React App',
    }),

    description: t({
      en: 'Discover how to set up Intlayer with Create React App to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: 'Découvrez comment configurer Intlayer avec Create React App pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour mettre en place votre projet en quelques minutes.',
      es: 'Descubra cómo configurar Intlayer con Create React App para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),
    keywords: t({
      en: [
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Create React App',
        'CRA',
        'JavaScript',
        'React',
      ],
      fr: [
        'Internationalisation',
        'Documentation',
        'Intlayer',
        'Create React App',
        'CRA',
        'JavaScript',
        'React',
      ],
      es: [
        'Internacionalización',
        'Documentación',
        'Intlayer',
        'Create React App',
        'CRA',
        'JavaScript',
        'React',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default docContent;
