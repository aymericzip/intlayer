import { getMultilingualUrls, getLocalizedUrl } from 'intlayer';
import { Metadata } from 'next';
import { LocalParams, getIntlayer } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const { title, description, keywords } = getIntlayer(
    'doc-search-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: PagesRoutes.Doc_Search,
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
