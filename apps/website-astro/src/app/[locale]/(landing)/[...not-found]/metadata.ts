import { Website_NotFound } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from '@/types/next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
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
      canonical: getLocalizedUrl(Website_NotFound, locale),
      languages: {
        ...getMultilingualUrls(Website_NotFound),
        'x-default': Website_NotFound,
      },
    },
    robots: 'noindex, follow', // Avoid indexing error pages

    openGraph: {
      url: getLocalizedUrl(Website_NotFound, locale),
      title,
      description,
    },
  };
};
