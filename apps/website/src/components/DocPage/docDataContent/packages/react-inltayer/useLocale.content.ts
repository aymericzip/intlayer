import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-useLocale-react-intlayer-metadata',
  content: {
    title: t({
      en: 'useLocale Hook Documentation | react-intlayer',
      fr: 'Documentation du hook useLocale | react-intlayer',
      es: 'Documentación del hook useLocale | react-intlayer',
    }),

    description: t({
      en: 'See how to use the useLocale hook for next-intlayer package',
      fr: 'Découvrez comment utiliser le hook useLocale pour le package next-intlayer',
      es: 'Descubre cómo usar el hook useLocale para el paquete next-intlayer',
    }),
    keywords: t({
      en: [
        'useLocale',
        'dictionary',
        'key',
        'Intlayer',
        'Internationalization',
        'Documentation',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        'useLocale',
        'dictionnaire',
        'clé',
        'Intlayer',
        'Internationalisation',
        'Documentation',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'useLocale',
        'diccionario',
        'clave',
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
