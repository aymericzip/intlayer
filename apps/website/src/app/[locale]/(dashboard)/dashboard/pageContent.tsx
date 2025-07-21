'use client';

import { PagesRoutes } from '@/Routes';
import { Loader } from '@intlayer/design-system';
import { useAuth, type Session } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, type FC } from 'react';

export const DashboardPageContent: FC<{ sessionServer?: Session }> = ({
  sessionServer,
}) => {
  const router = useRouter();
  const { session: sessionClient } = useAuth();

  const session = sessionServer ?? sessionClient;

  useEffect(() => {
    if (session?.organization && session?.project) {
      router.push(PagesRoutes.Dashboard_Content);
    } else if (session?.organization) {
      router.push(PagesRoutes.Dashboard_Projects);
    } else {
      router.push(PagesRoutes.Dashboard_Organization);
    }
  }, [router, session]);

  return <Loader />;
};
