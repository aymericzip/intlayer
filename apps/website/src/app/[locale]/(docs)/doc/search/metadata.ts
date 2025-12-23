import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
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
      canonical: getLocalizedUrl(PagesRoutes.Doc_Search, locale),
      languages: {
        ...getMultilingualUrls(PagesRoutes.Doc_Search),
        'x-default': PagesRoutes.Doc_Search,
      },
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Search}`,
        locale
      ),
      title,
      description,
    },
  };
};
