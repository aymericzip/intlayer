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
    <div className="flex max-w-screen flex-1 border-b-[0.5px] bg-card max-md:flex-col">
      <aside className="flex-none">
        <DocNavList docData={docData} activeSections={activeSections} />
      </aside>
      <div className="flex flex-1 flex-row">
        <article
          className="relative m-auto mb-24 h-full w-auto max-w-6xl flex-1 grow rounded-xl bg-background px-4 max-md:pl-16 md:px-10"
          id="content"
        >
          <BackgroundLayout className="z-0" />
          {displayBreadCrumb && (
            <DocBreadCrumb
              className="mt-12 ml-10"
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
      <EmailRegistrationToast />
    </div>
  );
};
