import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import { getIntlayer, type LocalParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const { title, description, keywords } = getIntlayer(
    'not-found-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: PagesRoutes.NotFound,
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
