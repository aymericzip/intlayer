import { Website_Markdown_Preview } from '@intlayer/design-system/routes';
import {
  getIntlayerAsync,
  getLocalizedUrl,
  getMultilingualUrls,
} from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = await getIntlayerAsync(
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
