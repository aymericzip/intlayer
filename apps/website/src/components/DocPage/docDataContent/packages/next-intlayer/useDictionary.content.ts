import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-useDictionary-next-intlayer-metadata',
  content: {
    title: t({
      en: 'useDictionary Hook Documentation | next-intlayer',
      fr: 'Documentation du hook useDictionary | next-intlayer',
      es: 'Documentación del hook useDictionary | next-intlayer',
    }),

    description: t({
      en: 'See how to use the useDictionary hook for next-intlayer package',
      fr: 'Découvrez comment utiliser le hook useDictionary pour le package next-intlayer',
      es: 'Descubre cómo usar el hook useDictionary para el paquete next-intlayer',
    }),
    keywords: t({
      en: [
        'useDictionary',
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
        'useDictionary',
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
        'useDictionary',
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
