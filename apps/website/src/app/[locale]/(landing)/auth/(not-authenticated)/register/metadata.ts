import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer(
    'register-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: getLocalizedUrl(PagesRoutes.Auth_SignUp, locale),
      languages: {
        ...getMultilingualUrls(PagesRoutes.Auth_SignUp),
        'x-default': PagesRoutes.Auth_SignUp,
      },
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Auth_SignUp}`,
        locale
      ),
      title,
      description,
    },
  };
};
