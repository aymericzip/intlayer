import type { ReactNode } from 'react';

export type ReactComponentProps = {
  children?: ReactNode;
  [key: string]: any;
};
