import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

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
      canonical: getLocalizedUrl(PagesRoutes.Demo, locale),
      languages: {
        ...getMultilingualUrls(PagesRoutes.Demo),
        'x-default': PagesRoutes.Demo,
      },
    },

    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Demo}`,
        locale
      ),
      title,
      description,
    },
  };
};
