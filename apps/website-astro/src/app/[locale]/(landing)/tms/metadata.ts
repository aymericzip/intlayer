import { Website_TMS } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from '@/types/next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer('tms-metadata', locale);

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: getLocalizedUrl(Website_TMS, locale),
      languages: {
        ...getMultilingualUrls(Website_TMS),
        'x-default': Website_TMS,
      },
    },

    openGraph: {
      url: getLocalizedUrl(Website_TMS, locale),
      title,
      description,
    },
  };
};
