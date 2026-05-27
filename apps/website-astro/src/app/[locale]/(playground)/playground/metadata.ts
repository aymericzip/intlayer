import { Website_Playground } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from '@/types/next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer(
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
