import type { Locales } from 'intlayer';
import type { ReactNode, FC } from 'react';
import { getDocData } from './docData';
import { DocNavList } from './DocNavList';
import { DocNavTitles } from './DocNavTitles';

type DocPageLayoutProps = {
  children?: ReactNode;
  activeSections?: string[];
  locale?: Locales;
};

export const DocPageLayout: FC<DocPageLayoutProps> = ({
  children,
  locale,
  activeSections = ['get-started'],
}) => {
  const docData = getDocData(locale);

  return (
    <div className="max-w-screen flex size-full flex-1 border-b-[0.5px] max-md:flex-col">
      <div className="flex-none">
        <DocNavList docData={docData} activeSections={activeSections} />
      </div>
      <div className="flex flex-1 flex-row">
        <div className="mb-24 h-full w-auto flex-1 grow" id="doc-content">
          {children}
        </div>
        <div className="flex-none max-lg:hidden">
          <DocNavTitles />
        </div>
      </div>
    </div>
  );
};
