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
      canonical: PagesRoutes.Pricing,
      languages: {
        ...getMultilingualUrls(PagesRoutes.Pricing),
        'x-default': PagesRoutes.Pricing,
      },
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Pricing}`,
        locale
      ),
      title,
      description,
    },
  };
};
