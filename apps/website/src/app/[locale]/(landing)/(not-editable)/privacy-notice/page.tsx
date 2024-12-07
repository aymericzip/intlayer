import { Loader } from '@intlayer/design-system';
import dynamic from 'next/dynamic';
import type { Next14PageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const DynamicDocumentationRender = dynamic(
  () =>
    import('@components/DocPage/DocumentationRender').then(
      (mod) => mod.DocumentationRender
    ),
  {
    loading: () => <Loader />,
  }
);

const PrivacyNoticePage: Next14PageIntlayer = ({ params: { locale } }) => (
  <IntlayerServerProvider locale={locale}>
    <div className="m-auto max-w-2xl">
      <DynamicDocumentationRender docName="privacy_notice" />
    </div>
  </IntlayerServerProvider>
);
export default PrivacyNoticePage;
