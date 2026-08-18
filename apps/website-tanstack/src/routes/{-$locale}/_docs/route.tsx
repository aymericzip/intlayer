import { createFileRoute, Outlet } from '@tanstack/react-router';
import { PageLayout } from '~/layouts/PageLayout';

export const Route = createFileRoute('/{-$locale}/_docs')({
  head: () => ({
    links: [{ rel: 'preconnect', href: 'https://i.ytimg.com' }],
  }),
  component: DocsLayout,
});

function DocsLayout() {
  return (
    <PageLayout
      className="min-h-0 bg-card"
      mobileRollable={false}
      footer={<></>}
    >
      <Outlet />
    </PageLayout>
  );
}
