import { PagesRoutes } from '@/Routes';
import { getDictionary, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import { type LocalPromiseParams } from 'next-intlayer';
import metadataContent from './metadata.content';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getDictionary(
    metadataContent,
    locale
  );

  return {
    title: title as string,
    description: description as string,
    keywords: keywords as string[],
    alternates: {
      canonical: getLocalizedUrl(PagesRoutes.Admin, locale),
      languages: {
        ...getMultilingualUrls(PagesRoutes.Admin),
        'x-default': PagesRoutes.Admin,
      },
    },
    openGraph: {
      title: title as string,
      description: description as string,
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL!}${PagesRoutes.Admin}`,
        locale
      ),
    },
  };
};
