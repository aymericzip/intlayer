import { Website_Playground } from '@intlayer/design-system/routes';
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
    'playground-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: getLocalizedUrl(Website_Playground, locale),
      languages: {
        ...getMultilingualUrls(Website_Playground),
        'x-default': Website_Playground,
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(Website_Playground, locale),
    },
  };
};
