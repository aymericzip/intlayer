import { createFileRoute, Outlet } from '@tanstack/react-router';
import { PageLayout } from '~/layouts/PageLayout';

export const Route = createFileRoute('/{-$locale}/_playground')({
  component: PlaygroundLayout,
});

function PlaygroundLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
