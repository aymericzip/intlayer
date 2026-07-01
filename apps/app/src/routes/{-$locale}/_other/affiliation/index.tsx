import { Container } from '@intlayer/design-system/container';
import { App_Affiliation } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useLocale } from 'react-intlayer';
import { AffiliatePage } from '#components/AffiliatePage';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { redirectIfSelfHosted } from '#utils/selfHosted';

export const Route = createFileRoute('/{-$locale}/_other/affiliation/')({
  beforeLoad: ({ params }) => redirectIfSelfHosted(params.locale),
  component: AffiliateDashboardPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Affiliation;
    const content = getIntlayer('affiliation-page', locale);

    return {
      links: [
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: content.metadata.title },
        {
          name: 'description',
          content: content.metadata.description,
        },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    };
  },
});

function AffiliateDashboardPage() {
  const { locale } = useLocale();

  return (
    <AuthenticationBarrier accessRule="authenticated" locale={locale}>
      <BackgroundLayout>
        <div className="flex flex-1 flex-col items-center justify-center p-6 py-16">
          <Container
            className="w-full max-w-2xl"
            roundedSize="4xl"
            padding="xl"
            border
            borderColor="neutral"
            transparency="md"
          >
            <AffiliatePage />
          </Container>
        </div>
      </BackgroundLayout>
    </AuthenticationBarrier>
  );
}
