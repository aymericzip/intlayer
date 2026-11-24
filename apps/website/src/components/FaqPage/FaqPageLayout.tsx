import { Breadcrumb } from '@intlayer/design-system/breadcrumb';
import {
  Website_Doc_Path,
  Website_FrequentQuestions_Path,
} from '@intlayer/design-system/routes';
import { getLocalizedUrl, type LocalesValues } from 'intlayer';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import { OptionalLink } from '~/components/DocPage/DocNavList';
import { DocPageLayoutShell } from '~/components/DocPage/DocPageLayoutShell';
import { useFrameworkFilter } from '~/components/DocPage/FrameworkFilter';
import { NavDrawer } from '~/components/DocPage/NavDrawer';
import { NavListContent } from '~/components/DocPage/NavListContent';
import { buildFaqNavSection, type FaqRecord } from './faqData';

type FaqPageLayoutProps = {
  children?: ReactNode;
  faqRecord: FaqRecord;
  /** Full slugs of the displayed question; empty on the index. */
  activeSlugs?: string[];
  /** Title of the displayed question, last breadcrumb item. */
  activeTitle?: string;
  locale: LocalesValues;
  displayAsideNavigation?: boolean;
};

/** Sidebar listing every question, sharing the documentation navigation. */
const FaqNavList: FC<{ faqRecord: FaqRecord; activeSlugs: string[] }> = ({
  faqRecord,
  activeSlugs,
}) => {
  const { collapseButton } = useIntlayer('doc-nav-list');
  const { docButton } = useIntlayer('blog-nav-list');
  const [selectedFramework, setSelectedFramework] = useFrameworkFilter();

  return (
    <NavDrawer
      identifier="faq-nav"
      collapseLabel={collapseButton.label.value}
      selectedFramework={selectedFramework}
      onSelectFramework={setSelectedFramework}
      defaultIsHidden={undefined}
      checkFocusParam={true}
    >
      <NavListContent
        data={buildFaqNavSection(faqRecord)}
        activeSlugs={activeSlugs}
        selectedFramework={selectedFramework}
        scrollPersistenceKey="faq-nav-scroll-position"
        parentPath="faq-nav"
        footer={
          <OptionalLink to={Website_Doc_Path} label={docButton.label.value}>
            {docButton?.text}
          </OptionalLink>
        }
      />
    </NavDrawer>
  );
};

/** Page frame of the frequent questions, matching the documentation. */
export const FaqPageLayout: FC<FaqPageLayoutProps> = ({
  children,
  faqRecord,
  activeSlugs = [],
  activeTitle,
  locale,
  displayAsideNavigation = true,
}) => {
  const { h1 } = useIntlayer('frequent-questions-page');

  return (
    <DocPageLayoutShell
      nav={<FaqNavList faqRecord={faqRecord} activeSlugs={activeSlugs} />}
      breadcrumb={
        <Breadcrumb
          links={[
            {
              text: h1.value,
              href: getLocalizedUrl(Website_FrequentQuestions_Path, locale),
            },
            ...(activeTitle ? [{ text: activeTitle }] : []),
          ]}
          className="ms-3 mt-12 text-xs"
          locale={locale}
          size="xs"
          color="neutral"
        />
      }
      displayAsideNavigation={displayAsideNavigation}
    >
      {children}
    </DocPageLayoutShell>
  );
};
