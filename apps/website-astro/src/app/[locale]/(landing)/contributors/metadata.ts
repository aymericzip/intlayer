import { Website_Contributors } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from '@/types/next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer(
    'contributors-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: getLocalizedUrl(Website_Contributors, locale),
      languages: {
        ...getMultilingualUrls(Website_Contributors),
        'x-default': Website_Contributors,
      },
    },

    openGraph: {
      url: getLocalizedUrl(Website_Contributors, locale),
      title,
      description,
    },
  };
};
