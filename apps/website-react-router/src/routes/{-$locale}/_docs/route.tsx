import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';
import { EmailRegistrationToast } from '~/components/EmailRegistrationToast';
import { PageLayout } from '~/layouts/PageLayout';

export const Route = createFileRoute('/{-$locale}/_docs')({
  component: DocsLayout,
});

function DocsLayout() {
  return (
    <Suspense>
      <PageLayout className="bg-card" mobileRollable={false} footer={<></>}>
        <EmailRegistrationToast />
        <Outlet />
      </PageLayout>
    </Suspense>
  );
}
