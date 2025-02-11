import { getMultilingualUrls, getLocalizedUrl, getDictionary } from 'intlayer';
import { type Metadata } from 'next';
import { type LocalParams } from 'next-intlayer';
import metadataContent from './metadata.content';
import { PagesRoutes } from '@/Routes';

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
