import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-t-next-intlayer-metadata',
  content: {
    title: t({
      en: 't Function Documentation | next-intlayer',
      fr: 'Documentation de la fonction t | next-intlayer',
      es: 'Documentación de la función t | next-intlayer',
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
        'next-intlayer',
        'Internationalization',
        'Documentation',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        't',
        'traduction',
        'Intlayer',
        'next-intlayer',
        'Internationalisation',
        'Documentation',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        't',
        'traducción',
        'Intlayer',
        'next-intlayer',
        'Internacionalización',
        'Documentación',
        'Next.js',
        'JavaScript',
        'React',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default docContent;
