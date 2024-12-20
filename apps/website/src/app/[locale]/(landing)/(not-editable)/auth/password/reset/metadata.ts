import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import { getIntlayer, type LocalParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const { title, description, keywords } = getIntlayer(
    'reset-password-metadata',
    locale
  );

  return {
    title,
    description,

    keywords,

    alternates: {
      canonical: PagesRoutes.Auth_ResetPassword,
      languages: {
        ...getMultilingualUrls(PagesRoutes.Auth_ResetPassword),
        'x-default': PagesRoutes.Auth_ResetPassword,
      },
    },

    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_ResetPassword}`,
        locale
      ),
      title,
      description,
    },
  };
};
