import { createFileRoute, Outlet } from '@tanstack/react-router';
import { PageLayout } from '~/layouts/PageLayout';

export const Route = createFileRoute('/{-$locale}/_docs')({
  component: DocsLayout,
});

function DocsLayout() {
  return (
    <PageLayout className="bg-card" mobileRollable={false} footer={<></>}>
      <Outlet />
    </PageLayout>
  );
}
