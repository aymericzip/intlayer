import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer(
    'content-dashboard-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: getLocalizedUrl(PagesRoutes.Dashboard_Dictionaries, locale),
      languages: {
        ...getMultilingualUrls(PagesRoutes.Dashboard_Dictionaries),
        'x-default': PagesRoutes.Dashboard_Dictionaries,
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL!}${PagesRoutes.Dashboard_Dictionaries}`,
        locale
      ),
    },
  };
};
