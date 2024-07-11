import { Loader } from '@intlayer/design-system';
import dynamic from 'next/dynamic';
import type { NextPageIntlayer } from 'next-intlayer';
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

const Page: NextPageIntlayer = ({ params: { locale } }) => (
  <IntlayerServerProvider locale={locale}>
    <div className="m-auto max-w-2xl">
      <DynamicDocumentationRender docName="terms_of_service" />
    </div>
  </IntlayerServerProvider>
);
export default Page;
