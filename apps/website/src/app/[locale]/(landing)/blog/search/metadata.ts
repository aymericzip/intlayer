import { getMultilingualUrls, getLocalizedUrl } from 'intlayer';
import { type Metadata } from 'next';
import { LocalParams, getDictionary } from 'next-intlayer';
import metadataContent from './metadata.content';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const { title, description, keywords } = getDictionary(
    metadataContent,
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
