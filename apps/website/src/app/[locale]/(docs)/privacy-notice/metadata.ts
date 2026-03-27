import { Website_PrivacyPolicy_Path } from '@intlayer/design-system/routes';
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
      canonical: getLocalizedUrl(Website_PrivacyPolicy_Path, locale),
      languages: {
        ...getMultilingualUrls(Website_PrivacyPolicy_Path),
        'x-default': Website_PrivacyPolicy_Path,
      },
    },

    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${Website_PrivacyPolicy_Path}`,
        locale
      ),
      title,
      description,
    },
  };
};
