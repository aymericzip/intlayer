import { PageLayout } from '@layouts/PageLayout';
import { IntlayerEditorProvider } from 'intlayer-editor';
import type { NextLayoutIntlayer } from 'next-intlayer';

const LocaleLayout: NextLayoutIntlayer = ({ children, params: { locale } }) => (
  <PageLayout locale={locale}>
    <IntlayerEditorProvider>{children}</IntlayerEditorProvider>
  </PageLayout>
);
export default LocaleLayout;
