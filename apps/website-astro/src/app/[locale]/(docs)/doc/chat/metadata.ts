import { Website_Doc_Chat } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from '@/types/next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer(
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
