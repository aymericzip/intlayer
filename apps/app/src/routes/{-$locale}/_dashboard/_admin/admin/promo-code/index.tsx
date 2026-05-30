import { App_Admin_PromoCodes } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl, localeMap } from 'intlayer';
import { PromoCodesAdminPage } from '#components/Dashboard/AdminPage/AdminPromoCodes/PromoCodesAdminPage';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/promo-code/'
)({
  component: PromoCodeAdminPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Admin_PromoCodes;

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
        { title: 'Promo Codes — Admin — Intlayer' },
        {
          name: 'description',
          content:
            'Manage Stripe Coupons, promotion codes, and affiliate mapping.',
        },
      ],
    };
  },
});

function PromoCodeAdminPage() {
  return <PromoCodesAdminPage />;
}
