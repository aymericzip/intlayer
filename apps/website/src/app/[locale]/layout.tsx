import type { FC, PropsWithChildren } from 'react';

export { generateMetadata } from './metadata';

export const revalidate = 60; // revalidate at most every 60s

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
