import { getLegalMetadata } from '@intlayer/docs';
import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const { title, description, keywords } = await getLegalMetadata(
    './legal/en/terms_of_service.md',
    locale
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: getLocalizedUrl(PagesRoutes.TermsOfService, locale),
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
