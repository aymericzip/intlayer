import { App_Affiliation } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl, localeMap } from 'intlayer';
import { useLocale } from 'react-intlayer';
import { AffiliateInvitationPage } from '#components/AffiliateInvitationPage';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';

export const Route = createFileRoute(
  '/{-$locale}/_other/affiliation/$invitationId'
)({
  component: AffiliationPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Affiliation;

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
        { title: 'Affiliate Invitation — Intlayer' },
        {
          name: 'description',
          content: 'Accept your Intlayer affiliate program invitation.',
        },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    };
  },
});

function AffiliationPage() {
  const { invitationId } = Route.useParams();
  const { locale } = useLocale();

  return (
    <AuthenticationBarrier accessRule="authenticated" locale={locale}>
      <AffiliateInvitationPage token={invitationId} />
    </AuthenticationBarrier>
  );
}
