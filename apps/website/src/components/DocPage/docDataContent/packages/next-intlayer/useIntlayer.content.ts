import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-useIntlayer-next-intlayer-metadata',
  content: {
    title: t({
      en: 'useIntlayer Hook Documentation | next-intlayer',
      fr: 'Documentation du hook useIntlayer | next-intlayer',
      es: 'Documentación del hook useIntlayer | next-intlayer',
    }),

    description: t({
      en: 'See how to use the useIntlayer hook for next-intlayer package',
      fr: 'Découvrez comment utiliser le hook useIntlayer pour le package next-intlayer',
      es: 'Descubre cómo usar el hook useIntlayer para el paquete next-intlayer',
    }),
    keywords: t({
      en: [
        'useIntlayer',
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
        'useIntlayer',
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
        'useIntlayer',
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
