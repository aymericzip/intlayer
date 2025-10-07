import type { FC, PropsWithChildren } from 'react';
import { AppProviders } from '@/providers/AppProviders';

export { generateStaticParams } from 'next-intlayer';
export { generateMetadata } from './metadata';

const RootLayout: FC<PropsWithChildren> = AppProviders;

export default RootLayout;
