import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { getLegal } from '@intlayer/docs';
import { generateMetadata } from './metadata';

export { generateMetadata };

const Page = async ({ params }) => {
  const { locale } = await params;
  const file = await getLegal('./legal/en/terms_of_service.md', locale);

  return (
    <div className="m-auto max-w-2xl">
      <DocumentationRender>{file}</DocumentationRender>
    </div>
  );
};

export default Page;
