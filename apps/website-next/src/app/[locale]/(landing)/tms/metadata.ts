import { Website_TMS } from '@intlayer/design-system/routes';
import {
  getIntlayerAsync,
  getLocalizedUrl,
  getMultilingualUrls,
} from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = await getIntlayerAsync(
    'tms-metadata',
    locale
  );

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
