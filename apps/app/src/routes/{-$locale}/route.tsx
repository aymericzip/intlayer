import { createFileRoute, Outlet } from '@tanstack/react-router';
import type { FC } from 'react';
import { useHotDataLoading } from '#hooks/useHotDataLoading.tsx';
import { useSessionRouterListener } from '#hooks/useSessionRouterListener.ts';

const LocaleLayout: FC = () => {
  useHotDataLoading();
  useSessionRouterListener();

  return <Outlet />;
};

export const Route = createFileRoute('/{-$locale}')({
  component: LocaleLayout,
});
