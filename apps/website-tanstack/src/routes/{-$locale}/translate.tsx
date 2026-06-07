import { Website_Translate, External_Github, Website_Home } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { AiTranslationLandingCore } from '~/components/TranslationLandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import { getTranslateSoftwareApplicationHeader } from '@intlayer/design-system/structured-data';
import { getTranslateProductHeader } from '@intlayer/design-system/structured-data';
import { getPricing } from '~/utils/stripe';

export const Route = createFileRoute('/{-$locale}/translate')({
  head: async ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_Translate;
    const { title, description, keywords } = getIntlayer(
      'translate-metadata',
      'translate-metadata',
      locale
    );

    const pricings = await getPricing();



    return {
      title,
      meta: [
        { name: 'description', content: description },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : keywords || '',
        },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(getTranslateSoftwareApplicationHeader({ locale })),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(getTranslateProductHeader({ pricings, locale })),
        },
      ],
    };
  },
  component: TranslatePage,
});

function TranslatePage() {
  return (
    <PageLayout>
      <AiTranslationLandingCore />
    </PageLayout>
  );
}
