import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-introduction-metadata',
  content: {
    title: t({
      en: 'Introduction',
      fr: 'Introduction',
      es: 'Introducción',
    }),

    description: t({
      en: 'Discover how Intlayer works. See the steps used by Intlayer in your application. See what does the different packages do.',
      fr: 'Découvrez comment Intlayer fonctionne. Voir les étapes utilisées par Intlayer dans votre application. Voir ce qui fait les différents packages.',
      es: 'Descubra cómo funciona Intlayer. Vea las pasos utilizados por Intlayer en su aplicación. Vea lo que hace los diferentes paquetes.',
    }),
    keywords: t({
      en: [
        'Introduction',
        'Get started',
        'Intlayer',
        'Applifcation',
        'Packages',
      ],
      fr: ['Introduction', 'Commencer', 'Intlayer', 'Application', 'Packages'],
      es: ['Introducción', 'Empezar', 'Intlayer', 'Aplicación', 'Paquetes'],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default docContent;
