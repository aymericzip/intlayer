import { Outlet } from 'react-router';
import { PageLayout } from '~/layouts/PageLayout';

export default function DocsLayout() {
  return (
    <PageLayout className="bg-card" mobileRollable={false} footer={<></>}>
      <Outlet />
    </PageLayout>
  );
}
