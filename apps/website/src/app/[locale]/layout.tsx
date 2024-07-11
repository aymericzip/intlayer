import type { FC, PropsWithChildren } from 'react';
export { generateMetadata } from './metadata';
export { generateStaticParams } from 'next-intlayer';

const LocaleLayout: FC<PropsWithChildren> = ({ children }) => children;

export default LocaleLayout;
