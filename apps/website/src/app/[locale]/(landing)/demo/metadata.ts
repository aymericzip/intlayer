import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import { getIntlayer, type LocalParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const { title, description, keywords } = getIntlayer('demo-metadata', locale);

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: PagesRoutes.Demo,
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
