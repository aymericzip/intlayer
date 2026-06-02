import { Website_Translate } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { AiTranslationLandingCore } from '~/components/TranslationLandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import { OrganizationHeader } from '~/structuredData/OrganizationHeader';
import { TranslateSoftwareApplicationHeader } from '~/structuredData/TranslateSoftwareApplicationHeader';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';

export const Route = createFileRoute('/{-$locale}/translate')({
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_Translate;
    const { title, description, keywords } = getIntlayer(
      'translate-metadata',
      locale
    );

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
        { property: 'og:url', content: getLocalizedUrl(path, locale) },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },
        { rel: 'alternate', hrefLang: 'x-default', href: path },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),
      ],
    };
  },
  component: TranslatePage,
});

function TranslatePage() {
  return (
    <PageLayout>
      <WebsiteHeader />
      <OrganizationHeader />
      <TranslateSoftwareApplicationHeader />
      <AiTranslationLandingCore />
    </PageLayout>
  );
}
