import { defaultLocale, type LocalesValues } from 'intlayer';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import { AsideNavigation } from './AsideNavigation/AsideNavigation';
import { DocBreadCrumb } from './DocBreadCrumb';
import { DocNavList } from './DocNavList';
import { TOCProgressBar } from './TOCProgressBar/TOCProgressBar';
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
      <div className="flex w-full bg-card max-md:flex-col md:h-[calc(100dvh-3.5rem)]">
        <aside
          aria-label={content.documentationNavigation.value}
          className="z-40 flex-none"
        >
          <DocNavList docData={docData} activeSlugs={['doc', ...activeSlugs]} />
        </aside>
        <div className="mx-1 mb-3 flex min-h-0 min-w-0 flex-1 flex-row rounded-2xl border border-neutral/40 bg-background md:mr-2">
          <article
            aria-label={content.documentationContent.value}
            className="no-scrollbar relative mb-3 h-full max-h-[calc(100vh-4.5rem)] w-auto flex-1 grow overflow-auto px-4 pb-24 max-md:pl-10 md:px-10"
            id="content"
          >
            <div className="m-auto max-w-3xl">
              {displayBreadCrumb && (
                <DocBreadCrumb
                  activeSections={activeSlugs}
                  docData={docData}
                  locale={locale}
                />
              )}
              {children}
            </div>
          </article>

          {displayAsideNavigation && (
            <aside
              aria-label={content.onThisPage.value}
              className="flex flex-none flex-row max-lg:hidden"
            >
              <TOCProgressBar />
              <AsideNavigation />
            </aside>
          )}
        </div>
      </div>
    </>
  );
};
