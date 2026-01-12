import { EmailRegistrationToast } from '@components/EmailRegistrationToast';
import { getIntlayer, type LocalesValues } from 'intlayer';
import { type FC, type ReactNode, Suspense } from 'react';
import { AsideNavigation } from './AsideNavigation/AsideNavigation';
import { DocBreadCrumb } from './DocBreadCrumb';
import { DocNavList } from './DocNavList';
import type { Section } from './types';

type DocPageLayoutProps = {
  children?: ReactNode;
  activeSlugs?: string[];
  locale: LocalesValues;
  displayAsideNavigation?: boolean;
  displayBreadCrumb?: boolean;
};

export const DocPageLayout: FC<DocPageLayoutProps> = ({
  children,
  locale,
  activeSlugs = ['get-started'],
  displayAsideNavigation = true,
  displayBreadCrumb = true,
}) => {
  const docData: Section = getIntlayer('doc-data', locale);

  return (
    <Suspense fallback={<></>}>
      <div className="flex max-w-screen flex-1 border-b-[0.5px] bg-card max-md:flex-col">
        <aside className="z-10 flex-none">
          <DocNavList docData={docData} activeSlugs={['doc', ...activeSlugs]} />
        </aside>
        <div className="flex flex-1 flex-row">
          <article
            className="relative mb-3 h-full max-h-screen w-auto flex-1 grow overflow-auto rounded-xl bg-background px-4 pb-24 max-md:pl-16 md:max-h-[calc(100vh-4rem)] md:px-10"
            id="content"
          >
            <div className="m-auto max-w-3xl">
              {displayBreadCrumb && (
                <DocBreadCrumb
                  className="mt-12 ml-10"
                  activeSections={activeSlugs}
                  docData={docData}
                  locale={locale}
                />
              )}
              {children}
            </div>
          </article>

          <aside className="flex-none max-lg:hidden">
            {displayAsideNavigation && <AsideNavigation />}
          </aside>
        </div>
        <EmailRegistrationToast />
      </div>
    </Suspense>
  );
};
