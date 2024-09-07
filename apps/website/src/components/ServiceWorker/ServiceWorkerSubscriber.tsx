'use client';

import type { FC } from 'react';
import { useServiceWorker } from './useServiceWorker';

export const ServiceWorkerSubscriber: FC = () => {
  useServiceWorker();

  return <></>;
};
