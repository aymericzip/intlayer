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
      canonical: PagesRoutes.TermsOfService,
      languages: {
        ...getMultilingualUrls(PagesRoutes.TermsOfService),
        'x-default': PagesRoutes.TermsOfService,
      },
    },

    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.TermsOfService}`,
        locale
      ),
      title,
      description,
    },
  };
};
