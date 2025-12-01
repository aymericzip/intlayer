import { getDictionary, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata, Viewport } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';
import metadataContent from './metadata.content';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords, openGraph } = getDictionary(
    metadataContent,
    locale
  );

  return {
    title,
    description,
    applicationName:
      'i18n Solution & CMS for React, Next.js, Vue, Svelte | Intlayer',
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
      canonical: getLocalizedUrl('/', locale),
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
        {
          url: `${process.env.NEXT_PUBLIC_URL}/logo.svg`,
          type: 'image/svg+xml',
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
      title: openGraph.title,
      description,
      siteName: 'Intlayer',
      images: [
        {
          url: '/github-social-preview.png',
          width: 1200,
          height: 630,
          alt: 'Intlayer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@Intlayer183096',
      creator: '@aymericzip',
      images: `/github-social-preview.png`,
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
  initialScale: 0.7,
  // minimumScale: 3,
  // maximumScale: 3,
  // userScalable: true,
  // viewportFit: "auto",
  // interactiveWidget: undefined,
  colorScheme: 'light dark',
};
