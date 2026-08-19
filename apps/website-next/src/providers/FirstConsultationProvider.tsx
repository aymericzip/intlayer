'use client';

import type { FC, PropsWithChildren } from 'react';
import { useFirstConsultation } from '@/hooks/useFirstConsultation';

export const FirstConsultationProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  useFirstConsultation();

  return children;
};
