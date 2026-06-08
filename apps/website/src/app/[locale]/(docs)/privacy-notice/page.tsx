import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { getLegal, getLegalMetadata } from '@intlayer/docs';
import { CreativeWorkHeader } from '@structuredData/CreativeWorkHeader';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const PrivacyNoticePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const file = await getLegal('./legal/en/privacy_notice.md', locale);
  const { title, description, keywords, updatedAt, createdAt } =
    await getLegalMetadata('./legal/en/privacy_notice.md', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <CreativeWorkHeader
        type="WebPage"
        creativeWorkName={title}
        creativeWorkDescription={description}
        creativeWorkContent={file}
        keywords={keywords.join(', ')}
        dateModified={new Date(updatedAt)}
        datePublished={new Date(createdAt)}
      />
      <div className="m-auto max-w-2xl">
        <DocumentationRender>{file}</DocumentationRender>
      </div>
    </IntlayerServerProvider>
  );
};

export default PrivacyNoticePage;
