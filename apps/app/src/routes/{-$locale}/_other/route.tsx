import { cn } from '@intlayer/design-system/utils';
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { useIntlayer, useLocale } from 'react-intlayer';
import { DashboardFooter } from '#components/Dashboard/DashboardFooter';
import { Navbar } from '#components/Navbar';

export const Route = createFileRoute('/{-$locale}/_other')({
  component: OtherLayout,
});

function OtherLayout() {
  const { locale } = useLocale();
  const { pathname } = useLocation();

  const { footerLinks } = useIntlayer('dashboard-footer-content');

  const formattedFooterLinks = footerLinks.map((el) => ({
    href: el.href.value,
    label: el.label.value,
    text: el.text.value,
  }));

  const isFindReviewer =
    pathname.includes('/find-reviewer') &&
    !pathname.includes('/find-reviewer/dashboard');

  return (
    <div
      className={cn(
        'relative flex min-h-screen flex-col',
        isFindReviewer && 'lg:h-[100dvh] lg:overflow-hidden'
      )}
    >
      <Navbar />
      <main
        className={cn(
          'relative flex w-full flex-1 flex-col',
          isFindReviewer && 'lg:min-h-0'
        )}
      >
        <Outlet />
      </main>
      <DashboardFooter locale={locale} links={formattedFooterLinks} />
    </div>
  );
}
