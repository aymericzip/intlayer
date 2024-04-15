'use client';

import type { FC, ReactNode } from 'react';

type ClientWrapperProps = {
  children?: ReactNode;
};

export const ClientWrapper: FC<ClientWrapperProps> = ({ children }) => (
  <>{children}</>
);
