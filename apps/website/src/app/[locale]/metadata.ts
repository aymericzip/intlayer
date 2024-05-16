import { type IConfigLocales, getTranslationContent } from 'intlayer';
import type { Metadata, Viewport } from 'next';
import type { LocalParams } from 'next-intlayer';
import { locales } from '../../../intlayer.config';

const PUBLIC_URL = 'https://intlayer.org';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  return {
    title: t<string>({
      en: 'Intlayer | Internationalization made easy',
      fr: 'Intlayer | Internationalisation simplifiée',
      es: 'Intlayer | Internacionalización hecha fácil',
    }),
    description: t({
      en: 'Intlayer offers a more flexible and modern approach to internationalization. Its seamless integration with Next.js and React, customizable configuration, and support for various content declaration formats make it a powerful choice for internationalization.',
      es: 'Intlayer ofrece un enfoque más flexible y moderno para la internacionalización. Su integración perfecta con Next.js y React, su configuración personalizable y su soporte para varios formatos de declaración de contenido lo convierten en una opción potente para la internacionalización.',
      fr: 'Intlayer offre une approche plus flexible et moderne de l’internationalisation. Son intégration transparente avec Next.js et React, sa configuration personnalisable et son support pour divers formats de déclaration de contenu en font un choix puissant pour l’internationalisation.',
    }),
    applicationName:
      'Intlayer | Internationalization made easy with Next.js and React',
    authors: [
      {
        name: 'Intlayer',
        url: PUBLIC_URL,
      },
      { name: 'Aymeric PINEAU', url: 'https://github.com/aypineau' },
    ],
    generator: undefined,
    keywords: t<string[]>({
      en: [
        'translation',
        'localization',
        'multilingual',
        'SEO',
        'Internationalization',
        'i18n',
        'Next.js',
        'Web Development',
        'JavaScript',
        'React',
      ],
      fr: [
        'traduction',
        'localisation',
        'multilingue',
        'SEO',
        'Internationalisation',
        'i18n',
        'Next.js',
        'Développement Web',
        'JavaScript',
        'React',
      ],
      es: [
        'traducción',
        'localización',
        'multilingüe',
        'SEO',
        'Internacionalización',
        'i18n',
        'Next.js',
        'Desarrollo Web',
        'JavaScript',
        'React',
      ],
    }),
    referrer: 'origin',
    creator: 'Aymeric PINEAU',
    publisher: '/',
    robots: 'index, follow',
    metadataBase: new URL(PUBLIC_URL),
    alternates: {
      canonical: '/',
      languages: locales.reduce(
        (acc, locale) => ({ ...acc, [locale]: `/${locale}` }),
        {}
      ),
    },
    icons: {
      icon: [{ url: '/assets/favicon.ico', type: 'image/x-icon' }],
      shortcut: ['/assets/apple-icon-180.png'],
      apple: [
        {
          url: '/assets/apple-icon-180.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
      other: [],
    },
    manifest: `${PUBLIC_URL}/manifest.json`,
    openGraph: null,
    twitter: null,
    verification: undefined,
    appleWebApp: null,
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    itunes: null,
    abstract: null,
    appLinks: null,
    archives: null,
    assets: null,
    bookmarks: null,
    category: null,
    classification: null,
    other: undefined,
  };
};

export const viewport: Viewport = {
  themeColor: [
    {
      color: '#FFFFFF',
      media: '(prefers-color-scheme: light)',
    },
    {
      color: '#000000',
      media: '(prefers-color-scheme: dark)',
    },
  ],
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  // minimumScale: 3,
  // maximumScale: 3,
  // userScalable: true,
  // viewportFit: "auto",
  // interactiveWidget: undefined,
  colorScheme: 'light dark',
};
