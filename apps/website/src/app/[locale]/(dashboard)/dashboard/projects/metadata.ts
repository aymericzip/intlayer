import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import { getDictionary, type LocalParams } from 'next-intlayer';
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
      canonical: PagesRoutes.Dashboard_Projects,
      languages: {
        ...getMultilingualUrls(PagesRoutes.Dashboard_Projects),
        'x-default': PagesRoutes.Dashboard_Projects,
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL!}${PagesRoutes.Dashboard_Projects}`,
        locale
      ),
    },
  };
};
