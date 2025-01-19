import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import { getIntlayer, type LocalParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const { title, description, keywords } = getIntlayer(
    'privacy-notice-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: PagesRoutes.PrivacyPolicy,
      languages: {
        ...getMultilingualUrls(PagesRoutes.PrivacyPolicy),
        'x-default': PagesRoutes.PrivacyPolicy,
      },
    },

    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.PrivacyPolicy}`,
        locale
      ),
      title,
      description,
    },
  };
};
