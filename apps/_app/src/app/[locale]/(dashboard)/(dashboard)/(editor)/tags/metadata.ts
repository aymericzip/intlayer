import { App_Dashboard_Tags_Path } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer(
    'tags-dashboard-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: getLocalizedUrl(App_Dashboard_Tags_Path, locale),
      languages: {
        ...getMultilingualUrls(App_Dashboard_Tags_Path),
        'x-default': App_Dashboard_Tags_Path,
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL!}${App_Dashboard_Tags_Path}`,
        locale
      ),
    },
  };
};
