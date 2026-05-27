import { Website_Blog_Search } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from '@/types/next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer(
    'blog-search-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: getLocalizedUrl(Website_Blog_Search, locale),
      languages: {
        ...getMultilingualUrls(Website_Blog_Search),
        'x-default': Website_Blog_Search,
      },
    },
    openGraph: {
      url: getLocalizedUrl(Website_Blog_Search, locale),
      title,
      description,
    },
  };
};
