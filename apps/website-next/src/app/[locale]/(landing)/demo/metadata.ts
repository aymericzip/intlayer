import { Website_Demo } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer('demo-metadata', locale);

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: getLocalizedUrl(Website_Demo, locale),
      languages: {
        ...getMultilingualUrls(Website_Demo),
        'x-default': Website_Demo,
      },
    },

    openGraph: {
      url: getLocalizedUrl(Website_Demo, locale),
      title,
      description,
    },
  };
};
