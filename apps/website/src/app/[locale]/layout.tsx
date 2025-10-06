import type { FC, PropsWithChildren } from 'react';

export { generateStaticParams } from 'next-intlayer';
export { generateMetadata } from './metadata';

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
