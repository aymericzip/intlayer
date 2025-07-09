import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { getLegal } from '@intlayer/docs';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const PrivacyNoticePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const file = await getLegal('./legal/en/privacy_notice.md', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <div className="m-auto max-w-2xl">
        <DocumentationRender>{file}</DocumentationRender>
      </div>
    </IntlayerServerProvider>
  );
};

export default PrivacyNoticePage;
