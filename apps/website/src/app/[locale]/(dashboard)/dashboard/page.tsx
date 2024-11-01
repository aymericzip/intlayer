'use client';

import { Loader, type Session } from '@intlayer/design-system';
import { useRouter } from 'next/navigation';
import type { NextPageIntlayer } from 'next-intlayer';
import { useEffect } from 'react';
import { PagesRoutes } from '@/Routes';

const DashboardPage: NextPageIntlayer<{ session?: Session }> = ({
  params: { session },
}) => {
  const router = useRouter();

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

export default DashboardPage;
