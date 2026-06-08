import { createFileRoute, Outlet } from '@tanstack/react-router';
import { PageLayout } from '~/layouts/PageLayout';
import monacoCss from '~/monaco.css?url';

export const Route = createFileRoute('/{-$locale}/_playground')({
  head: () => ({
    links: [{ rel: 'stylesheet', href: monacoCss }],
  }),
  component: PlaygroundLayout,
});

function PlaygroundLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
