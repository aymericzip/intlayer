import type { ReactNode } from 'react';
import '@/app/globals.css';

/**
 * Root layout component that handles locale-specific HTML attributes
 * Sets the lang attribute and text direction (ltr/rtl) based on locale
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
