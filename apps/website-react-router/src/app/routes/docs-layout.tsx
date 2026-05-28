import { EmailRegistrationToast } from '@components/EmailRegistrationToast';
import { PageLayout } from '@layouts/PageLayout';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

export default function DocsLayout() {
  return (
    <Suspense>
      <PageLayout className="bg-card" mobileRollable={false} footer={<></>}>
        <EmailRegistrationToast />
        <Outlet />
      </PageLayout>
    </Suspense>
  );
}
