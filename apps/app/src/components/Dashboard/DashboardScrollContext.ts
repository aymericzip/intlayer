import { createContext, useContext } from 'react';

export const DashboardScrollContext = createContext<
  (scrollTop: number) => void
>(() => {});

export const useDashboardScroll = () => useContext(DashboardScrollContext);
