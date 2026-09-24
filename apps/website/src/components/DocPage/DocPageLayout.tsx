import { defaultLocale, type LocalesValues } from 'intlayer';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import { DocBreadCrumb } from './DocBreadCrumb';
import { DocNavList } from './DocNavList';
import { DocPageLayoutShell } from './DocPageLayoutShell';
import type { NavSection } from './types';

type DocPageLayoutProps = {
  children?: ReactNode;
  docData: NavSection;
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
    <DocPageLayoutShell
      nav={
        <DocNavList docData={docData} activeSlugs={['doc', ...activeSlugs]} />
      }
      navAriaLabel={content.documentationNavigation.value}
      breadcrumb={
        displayBreadCrumb ? (
          <DocBreadCrumb
            activeSections={activeSlugs}
            docData={docData}
            locale={locale}
          />
        ) : null
      }
      contentAriaLabel={content.documentationContent.value}
      asideAriaLabel={content.onThisPage.value}
      displayAsideNavigation={displayAsideNavigation}
    >
      {children}
    </DocPageLayoutShell>
  );
};
