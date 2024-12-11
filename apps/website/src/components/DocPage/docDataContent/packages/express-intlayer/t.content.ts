import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-t-express-intlayer-metadata',
  content: {
    title: t({
      en: 't Function Documentation | express-intlayer',
      fr: 'Documentation de la fonction t | express-intlayer',
      es: 'Documentación de la función t | express-intlayer',
    }),

    description: t({
      en: 'See how to use the t function for next-intlayer package',
      fr: 'Découvrez comment utiliser la fonction t pour le package next-intlayer',
      es: 'Descubre cómo usar la función t para el paquete next-intlayer',
    }),
    keywords: t({
      en: [
        't',
        'translation',
        'Intlayer',
        'Internationalization',
        'Documentation',
        'Express',
        'JavaScript',
        'React',
      ],
      fr: [
        't',
        'translation',
        'Intlayer',
        'Internationalisation',
        'Documentation',
        'Express',
        'JavaScript',
        'React',
      ],
      es: [
        't',
        'traducción',
        'Intlayer',
        'Internacionalización',
        'Documentación',
        'Express',
        'JavaScript',
        'React',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default docContent;
