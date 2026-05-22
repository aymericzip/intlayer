import { App_Admin_Affiliate } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl, localeMap } from 'intlayer';
import { AffiliatesAdminPage } from '#components/Dashboard/AdminPage/AdminAffiliates/AffiliatesAdminPage';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/affiliate/'
)({
  component: AffiliateAdminPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Admin_Affiliate;

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
        { title: 'Affiliate Program — Admin — Intlayer' },
        {
          name: 'description',
          content:
            'Manage affiliate accounts, referral codes, and commissions.',
        },
      ],
    };
  },
});

function AffiliateAdminPage() {
  return <AffiliatesAdminPage />;
}
