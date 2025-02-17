import type { FC, PropsWithChildren } from 'react';

export { generateMetadata } from './metadata';

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
