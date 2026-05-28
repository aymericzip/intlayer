import { PageLayout } from '@layouts/PageLayout';
import { Outlet } from 'react-router';

export default function PlaygroundLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
