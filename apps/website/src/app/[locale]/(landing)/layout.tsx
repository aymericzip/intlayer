import { PageLayout } from '@layouts/PageLayout';
import type { Next14LayoutIntlayer } from 'next-intlayer';

export { generateMetadata } from './metadata';

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => <PageLayout locale={locale}>{children}</PageLayout>;

export default LocaleLayout;
