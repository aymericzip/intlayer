'use client';

import { useFirstConsultation } from '@/hooks/useFirstConsultation';
import { FC, PropsWithChildren } from 'react';

export const FirstConsultationProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  useFirstConsultation();

  return children;
};
