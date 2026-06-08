import { defaultLocale, type LocalesValues } from 'intlayer';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import { AsideNavigation } from './AsideNavigation/AsideNavigation';
import { DocBreadCrumb } from './DocBreadCrumb';
import { DocNavList } from './DocNavList';
import type { Section } from './types';

type DocPageLayoutProps = {
  children?: ReactNode;
  docData: Section;
  activeSlugs?: string[];
  locale?: LocalesValues;
  displayAsideNavigation?: boolean;
  displayBreadCrumb?: boolean;
};

export const DocPageLayout: FC<DocPageLayoutProps> = ({
  children,
  docData,
  locale = defaultLocale,
  activeSlugs = ['get-started'],
  displayAsideNavigation = true,
  displayBreadCrumb = true,
}) => {
  const content = useIntlayer('doc-page-layout', locale);

  return (
    <>
      <div className="flex max-w-screen flex-1 bg-card max-md:flex-col">
        <aside
          aria-label={content.documentationNavigation.value}
          className="z-40 flex-none"
        >
          <DocNavList docData={docData} activeSlugs={['doc', ...activeSlugs]} />
        </aside>
        <div className="flex min-w-0 flex-1 flex-row">
          <article
            aria-label={content.documentationContent.value}
            className="relative mb-3 h-full max-h-screen w-auto flex-1 grow overflow-auto rounded-xl bg-background px-4 pb-24 max-md:pl-10 md:max-h-[calc(100vh-4.5rem)] md:px-10"
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

          <aside
            aria-label={content.onThisPage.value}
            className="flex-none max-lg:hidden"
          >
            {displayAsideNavigation && <AsideNavigation />}
          </aside>
        </div>
      </div>
    </>
  );
};
