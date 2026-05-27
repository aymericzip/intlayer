import { Website_Scanner } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from '@/types/next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer(
    'i18n-SEO-scanner',
    locale
  );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: getLocalizedUrl(Website_Scanner, locale),
      languages: {
        ...getMultilingualUrls(Website_Scanner),
        'x-default': Website_Scanner,
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(Website_Scanner, locale),
    },
  };
};
