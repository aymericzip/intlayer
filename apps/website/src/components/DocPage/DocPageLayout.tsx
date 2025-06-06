import { AsideNavigation } from '@components/AsideNavigation/AsideNavigation';
import { BackgroundLayout } from '@components/BackgroundLayout';
import { EmailRegistrationToast } from '@components/EmailRegistrationToast';
import { type Locales } from 'intlayer';
import { type FC, type ReactNode } from 'react';
import { DocBreadCrumb } from './DocBreadCrumb';
import { getDocData } from './docData';
import { DocNavList } from './DocNavList';

type DocPageLayoutProps = {
  children?: ReactNode;
  activeSections?: string[];
  locale: Locales;
  displayAsideNavigation?: boolean;
  displayBreadCrumb?: boolean;
};

export const DocPageLayout: FC<DocPageLayoutProps> = ({
  children,
  locale,
  activeSections = ['get-started'],
  displayAsideNavigation = true,
  displayBreadCrumb = true,
}) => {
  const docData = getDocData(locale);

  return (
    <div className="max-w-screen flex flex-1 border-b-[0.5px] max-md:flex-col">
      <BackgroundLayout>
        <aside className="flex-none">
          <DocNavList docData={docData} activeSections={activeSections} />
        </aside>
        <div className="flex flex-1 flex-row">
          <article
            className="relative m-auto mb-24 h-full w-auto max-w-3xl flex-1 grow max-md:pl-12"
            id="content"
          >
            {displayBreadCrumb && (
              <DocBreadCrumb
                className="ml-10 mt-12"
                activeSections={activeSections}
                docData={docData}
                locale={locale}
              />
            )}
            {children}
          </article>
          <aside className="flex-none max-lg:hidden">
            {displayAsideNavigation && <AsideNavigation />}
          </aside>
        </div>
      </BackgroundLayout>
      <EmailRegistrationToast />
    </div>
  );
};
