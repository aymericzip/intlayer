import { type IConfigLocales, getTranslationContent } from 'intlayer';
import type { Metadata, Viewport } from 'next';
import type { LocalParams } from 'next-intlayer';
import { locales } from '../../../intlayer.config';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const title = t<string>({
    en: 'Intlayer | Internationalization made easy',
    fr: 'Intlayer | Internationalisation simplifiée',
    es: 'Intlayer | Internacionalización hecha fácil',
  });

  const description = t({
    en: 'Intlayer offers a flexible, modern approach to internationalization, integrating seamlessly with Next.js and React. It supports various content formats, making it a powerful choice.',
    fr: "Intlayer propose une approche moderne et flexible de l'internationalisation. Son intégration parfaite avec Next.js et React et son support de divers formats de contenu en font un choix puissant.",
    es: 'Intlayer propone un enfoque moderno y flexible para la internacionalización, integrándose perfectamente con Next.js y React. Admite varios formatos de contenido, siendo una opción potente.',
  });

  return {
    title,
    description,
    applicationName:
      'Intlayer | Internationalization made easy with Next.js and React',
    authors: [
      {
        name: 'Intlayer',
        url: process.env.NEXT_PUBLIC_URL,
      },
      { name: 'Aymeric PINEAU', url: 'https://github.com/aypineau' },
    ],
    generator: 'Next.js',
    keywords: t<string[]>({
      en: [
        'translation',
        'localization',
        'multilingual',
        'Internationalization',
        'i18n',
        'Web Development',
        'Next.js',
        'JavaScript',
        'Vite',
        'React',
        'CMS',
        'Content Management System',
      ],
      fr: [
        'Traduction',
        'Localisation',
        'Multilingue',
        'SEO',
        'Internationalisation',
        'i18n',
        'Développement Web',
        'JavaScript',
        'Vite',
        'React',
        'CMS',
        'Content Management System',
      ],
      es: [
        'Traducción',
        'Localización',
        'Multilingüe',
        'SEO',
        'Internacionalización',
        'i18n',
        'Next.js',
        'Desarrollo Web',
        'JavaScript',
        'Vite',
        'React',
        'CMS',
        'Content Management System',
      ],
    }),
    referrer: 'origin',
    creator: 'Aymeric PINEAU',
    publisher: '/',
    robots: 'index, follow',
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
    alternates: {
      canonical: '/',
      languages: locales.reduce(
        (acc, locale) => ({ ...acc, [locale]: `/${locale}` }),
        {}
      ),
    },
    icons: {
      icon: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}/assets/favicon.ico`,
          type: 'image/x-icon',
        },
        {
          url: `${process.env.NEXT_PUBLIC_URL}/assets/favicon-16x16.png`,
          type: 'image/png',
          sizes: '16x16',
        },
        {
          url: `${process.env.NEXT_PUBLIC_URL}/assets/favicon-32x32.png`,
          type: 'image/png',
          sizes: '32x32',
        },
      ],
      apple: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}/assets/apple-touch-icon.png`,
          sizes: '180x180',
          type: 'image/png',
        },
      ],
      other: [],
    },
    openGraph: {
      type: 'website',
      url: new URL(process.env.NEXT_PUBLIC_URL!),
      title,
      description,
      siteName: 'Intlayer',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}/assets/android-chrome-512x512.png`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@Intlayer183096',
      creator: '@aymericzip',
      images: `${process.env.NEXT_PUBLIC_URL}/assets/cover.png`,
    },
    verification: undefined,
    appleWebApp: {
      capable: true,
      title: 'Intlayer',
      statusBarStyle: 'black-translucent',
    },
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
    category: 'Development Tools',
    classification: 'Developers',
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
