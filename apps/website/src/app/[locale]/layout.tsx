import type { ReactNode } from 'react';
import { generateMetadata } from './metadata';
export { generateMetadata };

const LocaleLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default LocaleLayout;
