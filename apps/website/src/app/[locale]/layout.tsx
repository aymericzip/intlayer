import type { FC, PropsWithChildren } from 'react';

export { generateMetadata } from './metadata';

export const dynamic = 'force-static';

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
