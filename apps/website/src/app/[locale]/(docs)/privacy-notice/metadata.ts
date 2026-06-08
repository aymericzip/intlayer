import { Website_PrivacyPolicy } from '@intlayer/design-system/routes';
import { getLegalMetadata } from '@intlayer/docs';
import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const { title, description, keywords } = await getLegalMetadata(
    './legal/en/privacy_notice.md',
    locale
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: getLocalizedUrl(Website_PrivacyPolicy, locale),
      languages: {
        ...getMultilingualUrls(Website_PrivacyPolicy),
        'x-default': Website_PrivacyPolicy,
      },
    },

    openGraph: {
      url: getLocalizedUrl(Website_PrivacyPolicy, locale),
      title,
      description,
    },
  };
};
