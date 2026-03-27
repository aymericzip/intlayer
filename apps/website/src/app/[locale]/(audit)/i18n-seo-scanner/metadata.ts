import { Website_Scanner_Path } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
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
      canonical: getLocalizedUrl(Website_Scanner_Path, locale),
      languages: {
        ...getMultilingualUrls(Website_Scanner_Path),
        'x-default': Website_Scanner_Path,
      },
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL!}${Website_Scanner_Path}`,
        locale
      ),
    },
  };
};
