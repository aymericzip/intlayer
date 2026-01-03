import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer(
    'not-found-metadata',
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
