import { Website_CMS } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer('cms-metadata', locale);

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: getLocalizedUrl(Website_CMS, locale),
      languages: {
        ...getMultilingualUrls(Website_CMS),
        'x-default': Website_CMS,
      },
    },

    openGraph: {
      url: getLocalizedUrl(Website_CMS, locale),
      title,
      description,
    },
  };
};
