import { getMultilingualUrls, getLocalizedUrl } from 'intlayer';
import { Metadata } from 'next';
import { LocalParams, getIntlayer } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const { title, description, keywords } = getIntlayer(
    'blog-search-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: PagesRoutes.Blog_Search,
      languages: {
        ...getMultilingualUrls(PagesRoutes.Blog_Search),
        'x-default': PagesRoutes.Blog_Search,
      },
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Blog_Search}`,
        locale
      ),
      title,
      description,
    },
  };
};
