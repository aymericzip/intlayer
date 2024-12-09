import {
  type IConfigLocales,
  getMultilingualUrls,
  getTranslationContent,
} from 'intlayer';
import type { Metadata, Viewport } from 'next';
import type { LocalParams } from 'next-intlayer';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const title = t<string>({
    en: 'Intlayer | Internationalization (i18n) nextjs made easy',
    fr: 'Intlayer | Internationalisation (i18n) nextjs simplifiée',
    es: 'Intlayer | Internacionalización (i18n) nextjs hecha fácil',
  });

  const description = t({
    en: 'i18n for nextjs & react. Easily build multilingual sites with AI-powered visual editor for your translations. TypeScript internationalization.',
    fr: "i18n pour nextjs & react. Créez des sites multilingues grâce à un éditeur visuel boosté par l'IA pour vos traductions. Internationalisation basée sur TypeScript.",
    es: 'i18n para nextjs & react. Crea sitios multilingües con un editor visual impulsado por IA para tus traducciones. Internacionalización con TypeScript.',
  });

  return {
    title,
    description,
    applicationName:
      'Intlayer | Internationalization made easy with nextjs and React',
    authors: [
      {
        name: 'Intlayer',
        url: process.env.NEXT_PUBLIC_URL,
      },
      { name: 'Aymeric PINEAU', url: 'https://github.com/aymericzip' },
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
        'nextjs',
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
        'nextjs',
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
        'nextjs',
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
      languages: getMultilingualUrls('/'),
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
