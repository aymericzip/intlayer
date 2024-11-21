import { PageLayout } from '@layouts/PageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';

const LocaleLayout: NextLayoutIntlayer = ({ children, params: { locale } }) => (
  <PageLayout locale={locale}>{children}</PageLayout>
);

export default LocaleLayout;
