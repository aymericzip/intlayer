import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';
import { PageLayout } from '~/layouts/PageLayout';
import shikiCss from '~/shiki.css?url';

export const Route = createFileRoute('/{-$locale}/_docs')({
  head: () => ({
    links: [{ rel: 'stylesheet', href: shikiCss }],
  }),
  component: DocsLayout,
});

function DocsLayout() {
  return (
    <Suspense>
      <PageLayout className="bg-card" mobileRollable={false} footer={<></>}>
        <Outlet />
      </PageLayout>
    </Suspense>
  );
}
