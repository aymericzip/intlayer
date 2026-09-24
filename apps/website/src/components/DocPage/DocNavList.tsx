import {
  Website_Blog_Path,
  Website_Doc_Chat_Path,
} from '@intlayer/design-system/routes';
import { Bot } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useFrameworkFilter } from './FrameworkFilter';
import { NavDrawer } from './NavDrawer';
import { NavListContent } from './NavListContent';
import {
  NavAccordion,
  type NavItemData,
  NavSectionItem,
  OptionalLink,
} from './NavSectionItem';
import type { NavSection } from './types';

export { NavAccordion, type NavItemData, NavSectionItem, OptionalLink };

type DocNavListProps = {
  docData: NavSection;
  activeSlugs: string[];
};

type DocNavListContentProps = DocNavListProps & {
  /** Selected framework ids (e.g. ['react', 'nextjs']), or null meaning "All". */
  selectedFramework: string[] | null;
};

export const DocNavListContent: FC<DocNavListContentProps> = ({
  docData,
  activeSlugs,
  selectedFramework,
}) => {
  const { blogButton, chatBotButton, documentationSections, overview } =
    useIntlayer('doc-nav-list');

  return (
    <NavListContent
      data={docData}
      activeSlugs={activeSlugs}
      selectedFramework={selectedFramework}
      scrollPersistenceKey="doc-nav-scroll-position"
      ariaLabel={documentationSections.value}
      overviewText={overview.value}
      footer={
        <>
          <OptionalLink to={Website_Blog_Path} label={blogButton.label.value}>
            {blogButton?.text}
          </OptionalLink>
          <OptionalLink
            to={Website_Doc_Chat_Path}
            label={chatBotButton.label.value}
            Icon={Bot}
          >
            {chatBotButton?.text}
          </OptionalLink>
        </>
      }
    />
  );
};

export const DocNavList: FC<DocNavListProps> = ({ docData, activeSlugs }) => {
  const { collapseButton } = useIntlayer('doc-nav-list');
  const [selectedFramework, setSelectedFramework] = useFrameworkFilter();

  return (
    <NavDrawer
      identifier="doc-nav"
      collapseLabel={collapseButton.label.value}
      selectedFramework={selectedFramework}
      onSelectFramework={setSelectedFramework}
      defaultIsHidden={undefined}
      checkFocusParam={true}
    >
      <DocNavListContent
        docData={docData}
        activeSlugs={activeSlugs}
        selectedFramework={selectedFramework}
      />
    </NavDrawer>
  );
};
