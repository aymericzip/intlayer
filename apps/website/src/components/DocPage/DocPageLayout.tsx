import { getIntlayer, type LocalesValues } from 'intlayer';
import { useIntlayer } from 'next-intlayer/server';
import type { FC, ReactNode } from 'react';
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
  const docData = getIntlayer('doc-data', locale) as Section;
  const content = useIntlayer('doc-page-layout', locale);

  return (
    <>
      <div className="flex h-screen w-screen flex-1 overflow-hidden bg-card max-md:flex-col">
        <aside
          aria-label={content.documentationNavigation.value}
          className="z-40 flex-none"
        >
          <DocNavList docData={docData} activeSlugs={['doc', ...activeSlugs]} />
        </aside>
        <div className="mx-1 mb-3 flex min-h-0 min-w-0 flex-1 flex-row overflow-hidden rounded-xl bg-background md:mr-2">
          <article
            aria-label={content.documentationContent.value}
            className="relative min-h-0 flex-1 overflow-y-auto px-4 pb-24 max-md:pl-10 md:px-10"
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
