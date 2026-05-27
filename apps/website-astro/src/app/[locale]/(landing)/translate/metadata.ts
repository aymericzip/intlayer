import { Website_Translate } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from '@/types/next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
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
