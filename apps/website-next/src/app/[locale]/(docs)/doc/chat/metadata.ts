import { Website_Doc_Chat } from '@intlayer/design-system/routes';
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
    'doc-chat-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: getLocalizedUrl(Website_Doc_Chat, locale),
      languages: {
        ...getMultilingualUrls(Website_Doc_Chat),
        'x-default': Website_Doc_Chat,
      },
    },
    openGraph: {
      url: getLocalizedUrl(Website_Doc_Chat, locale),
      title,
      description,
    },
  };
};
