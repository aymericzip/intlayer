import { Website_Doc_Path } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { OptionalLink } from '~/components/DocPage/DocNavList';
import { useFrameworkFilter } from '~/components/DocPage/FrameworkFilter';
import { NavDrawer } from '~/components/DocPage/NavDrawer';
import { NavListContent } from '~/components/DocPage/NavListContent';
import type { Section } from './types';

type BlogNavListProps = {
  blogData: Section;
  activeSlugs: string[];
};

type BlogNavListContentProps = BlogNavListProps & {
  /** Selected framework ids (e.g. ['react', 'nextjs']), or null meaning "All". */
  selectedFramework: string[] | null;
};

export const BlogNavListContent: FC<BlogNavListContentProps> = ({
  blogData,
  activeSlugs,
  selectedFramework,
}) => {
  const { docButton } = useIntlayer('blog-nav-list');

  return (
    <NavListContent
      data={blogData}
      activeSlugs={activeSlugs}
      selectedFramework={selectedFramework}
      scrollPersistenceKey="blog-nav-scroll-position"
      parentPath="blog-nav"
      footer={
        <OptionalLink to={Website_Doc_Path} label={docButton.label.value}>
          {docButton?.text}
        </OptionalLink>
      }
    />
  );
};

export const BlogNavList: FC<BlogNavListProps> = ({
  blogData,
  activeSlugs,
}) => {
  const { collapseButton } = useIntlayer('blog-nav-list');
  const [selectedFramework, setSelectedFramework] = useFrameworkFilter();

  return (
    <NavDrawer
      identifier="blog-nav"
      collapseLabel={collapseButton.label.value}
      selectedFramework={selectedFramework}
      onSelectFramework={setSelectedFramework}
      defaultIsHidden={true}
      checkFocusParam={true}
    >
      <BlogNavListContent
        blogData={blogData}
        activeSlugs={activeSlugs}
        selectedFramework={selectedFramework}
      />
    </NavDrawer>
  );
};

export default BlogNavList;
