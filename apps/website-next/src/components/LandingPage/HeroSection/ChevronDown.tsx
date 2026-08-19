'use client';

import { ChevronDownIcon, type LucideProps } from 'lucide-react';
import type { FC } from 'react';

export const ChevronDown: FC<LucideProps> = (props) => (
  <ChevronDownIcon
    {...props}
    onClick={() => {
      window.scrollTo({
        top: window.innerHeight - 100,
        behavior: 'smooth',
      });
    }}
  />
);
