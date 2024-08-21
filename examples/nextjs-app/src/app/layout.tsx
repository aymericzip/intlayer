import type { ReactNode } from 'react';
import './globals.css';

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
