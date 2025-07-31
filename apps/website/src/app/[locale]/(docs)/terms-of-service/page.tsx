import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { getLegal } from '@intlayer/docs';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const file = await getLegal('./legal/en/terms_of_service.md', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <div className="m-auto max-w-2xl">
        <DocumentationRender>{file}</DocumentationRender>
      </div>
    </IntlayerServerProvider>
  );
};

export default Page;
