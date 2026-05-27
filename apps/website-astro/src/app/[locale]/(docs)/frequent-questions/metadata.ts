import { Website_FrequentQuestions } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from '@/types/next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
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
      canonical: getLocalizedUrl(Website_FrequentQuestions, locale),
      languages: {
        ...getMultilingualUrls(Website_FrequentQuestions),
        'x-default': Website_FrequentQuestions,
      },
    },

    openGraph: {
      url: getLocalizedUrl(Website_FrequentQuestions, locale),
      title,
      description,
    },
  };
};
