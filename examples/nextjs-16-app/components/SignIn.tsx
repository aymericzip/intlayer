// components/SignIn.tsx
'use client';

import Link from 'next/link';
import type { FC, ReactNode } from 'react';

export const SignIn: FC<{ children: ReactNode }> = ({ children }) => {
  return <Link href="/login">{children}</Link>;
};
