import { Website_Markdown_Preview_Path } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
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
      canonical: getLocalizedUrl(Website_Markdown_Preview_Path, locale),
      languages: {
        ...getMultilingualUrls(Website_Markdown_Preview_Path),
        'x-default': Website_Markdown_Preview_Path,
      },
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${Website_Markdown_Preview_Path}`,
        locale
      ),
      title,
      description,
    },
  };
};
