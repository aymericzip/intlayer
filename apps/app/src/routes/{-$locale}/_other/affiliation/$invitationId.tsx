import { App_Affiliation } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useLocale } from 'react-intlayer';
import { AffiliateInvitationPage } from '#components/AffiliateInvitationPage';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { redirectIfSelfHosted } from '#utils/selfHosted';

type AffiliationSearch = {
  stripe_return?: string;
};

export const Route = createFileRoute(
  '/{-$locale}/_other/affiliation/$invitationId'
)({
  beforeLoad: ({ params }) => redirectIfSelfHosted(params.locale),
  validateSearch: (search: Record<string, unknown>): AffiliationSearch => ({
    stripe_return:
      typeof search.stripe_return === 'string'
        ? search.stripe_return
        : undefined,
  }),
  component: AffiliationPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Affiliation;
    const content = getIntlayer('affiliation-invitation-page', locale);

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

function AffiliationPage() {
  const { invitationId } = Route.useParams();
  const { stripe_return } = Route.useSearch();
  const { locale } = useLocale();

  return (
    <AuthenticationBarrier accessRule="authenticated" locale={locale}>
      <AffiliateInvitationPage
        token={invitationId}
        stripeReturn={stripe_return === '1'}
      />
    </AuthenticationBarrier>
  );
}
