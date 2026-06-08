import { Website_TermsOfService } from '@intlayer/design-system/routes';
import { getLegalMetadata } from '@intlayer/docs';
import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';

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
      canonical: getLocalizedUrl(Website_TermsOfService, locale),
      languages: {
        ...getMultilingualUrls(Website_TermsOfService),
        'x-default': Website_TermsOfService,
      },
    },

    openGraph: {
      url: getLocalizedUrl(Website_TermsOfService, locale),
      title,
      description,
    },
  };
};
