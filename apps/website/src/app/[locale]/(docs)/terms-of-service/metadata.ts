import { Website_TermsOfService_Path } from '@intlayer/design-system/routes';
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
      canonical: getLocalizedUrl(Website_TermsOfService_Path, locale),
      languages: {
        ...getMultilingualUrls(Website_TermsOfService_Path),
        'x-default': Website_TermsOfService_Path,
      },
    },

    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${Website_TermsOfService_Path}`,
        locale
      ),
      title,
      description,
    },
  };
};
