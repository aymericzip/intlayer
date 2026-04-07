import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useIntlayer, useLocale } from 'react-intlayer';
import { DashboardFooter } from '#components/Dashboard/DashboardFooter';
import { Navbar } from '#components/Navbar';

export const Route = createFileRoute('/{-$locale}/_other')({
  component: OtherLayout,
});

function OtherLayout() {
  const { locale } = useLocale();

  const { footerLinks } = useIntlayer('dashboard-navbar-content');

  const formattedFooterLinks = footerLinks.map(
    (el: {
      href: { value: string };
      label: { value: string };
      text: { value: string };
    }) => ({
      href: el.href.value,
      label: el.label.value,
      text: el.text.value,
    })
  );

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex w-full flex-1 flex-col">
        <Outlet />
      </main>
      <DashboardFooter locale={locale} links={formattedFooterLinks} />
    </div>
  );
}
