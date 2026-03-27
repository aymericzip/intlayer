import { Website_NotFound_Path } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer(
    'not-found-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: getLocalizedUrl(Website_NotFound_Path, locale),
      languages: {
        ...getMultilingualUrls(Website_NotFound_Path),
        'x-default': Website_NotFound_Path,
      },
    },
    robots: 'noindex, follow', // Avoid indexing error pages

    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${Website_NotFound_Path}`,
        locale
      ),
      title,
      description,
    },
  };
};
