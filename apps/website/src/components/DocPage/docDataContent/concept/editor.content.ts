import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-editor-metadata',
  content: {
    title: t({
      en: 'Editor',
      fr: 'Éditeur',
      es: 'Editor',
    }),

    description: t({
      en: 'Discover how to use the Intlayer Editor to manage your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.',
      fr: "Découvrez comment utiliser l'Éditeur Intlayer pour gérer votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.",
      es: 'Descubra cómo usar el Editor Intlayer para gestionar su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
    }),
    keywords: t({
      en: [
        'Editor',
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        'Éditeur',
        'Internationalisation',
        'Documentation',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'Editor',
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
