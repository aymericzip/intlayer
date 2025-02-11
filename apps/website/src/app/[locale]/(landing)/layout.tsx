import { PageLayout } from '@layouts/PageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';

export { generateMetadata } from './metadata';

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return <PageLayout locale={locale}>{children}</PageLayout>;
};

export default LocaleLayout;
