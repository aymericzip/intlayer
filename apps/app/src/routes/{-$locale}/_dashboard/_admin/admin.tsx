import { Loader } from '@intlayer/design-system/loader';
import { createFileRoute, useNavigate, useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/{-$locale}/_dashboard/_admin/admin')({
  component: AdminRedirectPage,
});

function AdminRedirectPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.endsWith('/admin')) {
      void navigate({ to: `${pathname}/users` });
    }
  }, []);

  return <Loader />;
}
