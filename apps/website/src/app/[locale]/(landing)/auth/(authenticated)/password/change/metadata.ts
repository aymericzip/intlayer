import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import { getDictionary, type LocalParams } from 'next-intlayer';
import metadataContent from './metadata.content';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const { title, description, keywords } = getDictionary(
    metadataContent,
    locale
  );
  return {
    title,
    description,

    keywords,
    alternates: {
      canonical: PagesRoutes.Auth_ChangePassword,
      languages: {
        ...getMultilingualUrls(PagesRoutes.Auth_ChangePassword),
        'x-default': PagesRoutes.Auth_ChangePassword,
      },
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_ChangePassword}`,
        locale
      ),
      title,
      description,
    },
  };
};
