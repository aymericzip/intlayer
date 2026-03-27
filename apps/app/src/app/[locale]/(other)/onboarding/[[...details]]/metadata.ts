import { App_Onboarding_Path } from '@intlayer/design-system/routes';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams } from 'next-intlayer';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer(
    'onboarding-metadata',
    locale
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: getLocalizedUrl(App_Onboarding_Path, locale),
      languages: {
        ...getMultilingualUrls(App_Onboarding_Path),
        'x-default': App_Onboarding_Path,
      },
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${App_Onboarding_Path}`,
        locale
      ),
      title,
      description,
    },
  };
};
