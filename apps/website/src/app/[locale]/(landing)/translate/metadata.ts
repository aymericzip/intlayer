import { Website_Translate } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer(
    'translate-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: getLocalizedUrl(Website_Translate, locale),
      languages: {
        ...getMultilingualUrls(Website_Translate),
        'x-default': Website_Translate,
      },
    },

    openGraph: {
      url: getLocalizedUrl(Website_Translate, locale),
      title,
      description,
    },
  };
};
