import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { getDoc } from '@intlayer/docs';
import type { Next14PageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const file = getDoc('privacy_notice', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <div className="m-auto max-w-2xl">
        <DocumentationRender>{file}</DocumentationRender>
      </div>
    </IntlayerServerProvider>
  );
};

export default Page;
