import { PagesRoutes } from '@/Routes';
import { getDictionary, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
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
    keywords,
    alternates: {
      canonical: getLocalizedUrl(PagesRoutes.NotFound, locale),
      languages: {
        ...getMultilingualUrls(PagesRoutes.NotFound),
        'x-default': PagesRoutes.NotFound,
      },
    },
    robots: 'noindex, follow', // Avoid indexing error pages
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.NotFound}`,
        locale
      ),
      title,
      description,
    },
  };
};
