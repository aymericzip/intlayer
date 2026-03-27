import { Website_FrequentQuestions_Path } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const { title, description, keywords } = getIntlayer(
    'frequent-questions-page',
    locale
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: getLocalizedUrl(Website_FrequentQuestions_Path, locale),
      languages: {
        ...getMultilingualUrls(Website_FrequentQuestions_Path),
        'x-default': Website_FrequentQuestions_Path,
      },
    },

    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${Website_FrequentQuestions_Path}`,
        locale
      ),
      title,
      description,
    },
  };
};
