import { PagesRoutes } from '@/Routes';
import { getDictionary, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import { type LocalPromiseParams } from 'next-intlayer';
import metadataContent from './metadata.content';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
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
      canonical: getLocalizedUrl(PagesRoutes.Pricing, locale),
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
