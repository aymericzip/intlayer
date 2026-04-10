import { Loader } from '@intlayer/design-system/loader';
import { createFileRoute, useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate';

export const Route = createFileRoute('/{-$locale}/_dashboard/_admin/admin')({
  component: AdminRedirectPage,
});

function AdminRedirectPage() {
  const navigate = useLocalizedNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.endsWith('/admin')) {
      void navigate({ to: '/admin/users' });
    }
  }, [pathname, navigate]);

  return <Loader />;
}
