import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-t-react-intlayer-metadata',
  content: {
    title: t({
      en: 't Function Documentation',
      fr: 'Documentation de la fonction t',
      es: 'Documentación de la función t',
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
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        't',
        'traduction',
        'Intlayer',
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
