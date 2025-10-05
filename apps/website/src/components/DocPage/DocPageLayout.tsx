import { AsideNavigation } from '@components/AsideNavigation/AsideNavigation';
import { BackgroundLayout } from '@components/BackgroundLayout';
import { EmailRegistrationToast } from '@components/EmailRegistrationToast';
import { getIntlayer, type LocalesValues } from 'intlayer';
import type { FC, ReactNode } from 'react';
import { DocBreadCrumb } from './DocBreadCrumb';
import { DocNavList } from './DocNavList';
import type { Section } from './types';

type DocPageLayoutProps = {
  children?: ReactNode;
  activeSections?: string[];
  locale: LocalesValues;
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
  const docData: Section = getIntlayer('doc-data', locale);

  return (
    <div className="max-w-screen flex flex-1 border-b-[0.5px] max-md:flex-col">
      <BackgroundLayout>
        <aside className="flex-none">
          <DocNavList docData={docData} activeSections={activeSections} />
        </aside>
        <div className="flex flex-1 flex-row">
          <article
            className="relative m-auto mb-24 h-full w-auto max-w-6xl flex-1 grow px-4 md:px-10 max-md:pl-16"
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
