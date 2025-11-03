'use client';

import LocalizationAnalyzer from '@components/AuditPage/LocalizationAnalyzer';
import type { FC } from 'react';

export const AuditSection: FC = () => {
  return (
    <section className="w-full">
      <LocalizationAnalyzer />
    </section>
  );
};

export default AuditSection;
