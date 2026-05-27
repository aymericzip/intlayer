import { Website_Doc_Search } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from '@/types/next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer(
    'doc-search-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: getLocalizedUrl(Website_Doc_Search, locale),
      languages: {
        ...getMultilingualUrls(Website_Doc_Search),
        'x-default': Website_Doc_Search,
      },
    },
    openGraph: {
      url: getLocalizedUrl(Website_Doc_Search, locale),
      title,
      description,
    },
  };
};
