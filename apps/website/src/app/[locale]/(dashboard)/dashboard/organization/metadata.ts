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
      canonical: PagesRoutes.Dashboard_Organization,
      languages: {
        ...getMultilingualUrls(PagesRoutes.Dashboard_Organization),
        'x-default': PagesRoutes.Dashboard_Organization,
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL!}${PagesRoutes.Dashboard_Organization}`,
        locale
      ),
    },
  };
};
