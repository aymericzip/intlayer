import { getLocalizedUrl, getMultilingualUrls, getDictionary } from 'intlayer';
import type { Metadata, Viewport } from 'next';
import { type LocalParams } from 'next-intlayer';
import metadataContent from './metadata.content';

export const generateMetadata = async ({
  params,
}: LocalParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getDictionary(
    metadataContent,
    locale
  );

  return {
    title,
    description,
    applicationName: 'Internationalization (i18n) Next.js made easy | Intlayer',
    authors: [
      {
        name: 'Intlayer',
        url: process.env.NEXT_PUBLIC_URL,
      },
      { name: 'Aymeric PINEAU', url: 'https://github.com/aymericzip' },
    ],
    generator: 'Next.js',
    keywords,
    referrer: 'origin',
    creator: 'Aymeric PINEAU',
    publisher: '/',
    robots: 'index, follow',
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
    alternates: {
      canonical: '/',
      languages: { ...getMultilingualUrls('/'), 'x-default': '/' },
    },

    icons: {
      icon: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}/favicon.ico`,
          type: 'image/x-icon',
        },
        {
          url: `${process.env.NEXT_PUBLIC_URL}/favicon-16x16.png`,
          type: 'image/png',
          sizes: '16x16',
        },
        {
          url: `${process.env.NEXT_PUBLIC_URL}/favicon-32x32.png`,
          type: 'image/png',
          sizes: '32x32',
        },
      ],
      apple: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}/apple-touch-icon.png`,
          sizes: '180x180',
          type: 'image/png',
        },
      ],
      other: [],
    },
    openGraph: {
      type: 'website',
      url: getLocalizedUrl(process.env.NEXT_PUBLIC_URL!, locale),
      title,
      description,
      siteName: 'Intlayer',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}/android-chrome-512x512.png`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@Intlayer183096',
      creator: '@aymericzip',
      images: `${process.env.NEXT_PUBLIC_URL}/cover.png`,
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
