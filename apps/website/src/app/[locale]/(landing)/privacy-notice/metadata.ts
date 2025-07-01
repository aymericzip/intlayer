import { PagesRoutes } from '@/Routes';
import { getLegalMetadata } from '@intlayer/docs';
import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import { type LocalPromiseParams } from 'next-intlayer';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const { title, description, keywords } = await getLegalMetadata(
    'privacy_notice',
    locale
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: getLocalizedUrl(PagesRoutes.PrivacyPolicy, locale),
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
