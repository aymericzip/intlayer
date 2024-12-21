import { BackgroundLayout } from '@components/BackgroundLayout';
import { type Locales } from 'intlayer';
import { type ReactNode, type FC } from 'react';
import { DocBreadCrumb } from './DocBreadCrumb';
import { getDocData } from './docData';
import { DocNavList } from './DocNavList';
import { DocNavTitles } from './DocNavTitles';

type DocPageLayoutProps = {
  children?: ReactNode;
  activeSections?: string[];
  locale: Locales;
  displayDocNavTitles?: boolean;
};

export const DocPageLayout: FC<DocPageLayoutProps> = ({
  children,
  locale,
  activeSections = ['get-started'],
  displayDocNavTitles = true,
}) => {
  const docData = getDocData(locale);

  return (
    <div className="max-w-screen flex flex-1 border-b-[0.5px] max-md:flex-col">
      <BackgroundLayout>
        <div className="flex-none">
          <DocNavList docData={docData} activeSections={activeSections} />
        </div>
        <div className="flex flex-1 flex-row">
          <div
            className="relative m-auto mb-24 h-full w-auto max-w-3xl flex-1 grow"
            id="doc-content"
          >
            <DocBreadCrumb
              className="ml-10 mt-12"
              activeSections={activeSections}
              docData={docData}
              locale={locale}
            />
            {children}
          </div>
          <div className="flex-none max-lg:hidden">
            {displayDocNavTitles && <DocNavTitles />}
          </div>
        </div>
      </BackgroundLayout>
    </div>
  );
};
