import { Website_Markdown_Preview } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from '@/types/next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer(
    'markdown-preview-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: getLocalizedUrl(Website_Markdown_Preview, locale),
      languages: {
        ...getMultilingualUrls(Website_Markdown_Preview),
        'x-default': Website_Markdown_Preview,
      },
    },
    openGraph: {
      url: getLocalizedUrl(Website_Markdown_Preview, locale),
      title,
      description,
    },
  };
};
