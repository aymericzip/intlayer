import { createFileRoute, Outlet } from '@tanstack/react-router';
import type { FC } from 'react';
import { useHotDataLoading } from '#hooks/useHotDataLoading.tsx';

const LocaleLayout: FC = () => {
  useHotDataLoading();

  return <Outlet />;
};

export const Route = createFileRoute('/{-$locale}')({
  component: LocaleLayout,
});
