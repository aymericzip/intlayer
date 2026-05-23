import { App_Admin_Reviewers } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { AdminReviewersPage } from '#components/Dashboard/AdminPage/AdminReviewers/AdminReviewersPage';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/reviewers/'
)({
  component: ReviewersAdminPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Admin_Reviewers;
    const content = getIntlayer('admin-metadata', locale);

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
        {
          name: 'keywords',
          content: content.metadata.keywords.join(', '),
        },
      ],
    };
  },
});

function ReviewersAdminPage() {
  return <AdminReviewersPage />;
}
