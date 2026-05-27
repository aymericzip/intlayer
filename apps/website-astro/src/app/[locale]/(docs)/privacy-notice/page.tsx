import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { getLegal } from '@intlayer/docs';
import { generateMetadata } from './metadata';

export { generateMetadata };

const PrivacyNoticePage = async ({ params }) => {
  const { locale } = await params;
  const file = await getLegal('./legal/en/privacy_notice.md', locale);

  return (
    <div className="m-auto max-w-2xl">
      <DocumentationRender>{file}</DocumentationRender>
    </div>
  );
};

export default PrivacyNoticePage;
