import { getLocalizedUrl, getMultilingualUrls, getDictionary } from 'intlayer';
import type { Metadata } from 'next';
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
      canonical: PagesRoutes.Demo,
      languages: {
        ...getMultilingualUrls(PagesRoutes.Demo),
        'x-default': PagesRoutes.Demo,
      },
    },

    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Demo}`,
        locale
      ),
      title,
      description,
    },
  };
};
