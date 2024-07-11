import { getDoc } from '@components/DocPage/docData';
import { Loader } from '@intlayer/design-system';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import type { DocProps } from './layout';
import { PagesRoutes } from '@/Routes';

const DynamicDocumentationRender = dynamic(
  () =>
    import('@components/DocPage/DocumentationRender').then(
      (mod) => mod.DocumentationRender
    ),
  {
    loading: () => <Loader />,
  }
);

const Page: NextPageIntlayer<DocProps> = ({ params: { locale, doc } }) => {
  const docData = getDoc(doc, locale);

  if (!docData) {
    return redirect(PagesRoutes.Doc_GetStarted);
  }

  return (
    <IntlayerServerProvider locale={locale}>
      <DynamicDocumentationRender docName={docData.docName} />
    </IntlayerServerProvider>
  );
};
export default Page;
