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
      canonical: PagesRoutes.Onboarding,
      languages: {
        ...getMultilingualUrls(PagesRoutes.Onboarding),
        'x-default': PagesRoutes.Onboarding,
      },
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Onboarding}`,
        locale
      ),
      title,
      description,
    },
  };
};
