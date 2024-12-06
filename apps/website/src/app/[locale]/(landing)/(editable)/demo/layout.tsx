import { PageLayout } from '@layouts/PageLayout';
import { IntlayerEditorProvider } from 'intlayer-editor';
import type { Next14LayoutIntlayer } from 'next-intlayer';

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <PageLayout locale={locale}>
    <IntlayerEditorProvider>{children}</IntlayerEditorProvider>
  </PageLayout>
);
export default LocaleLayout;
