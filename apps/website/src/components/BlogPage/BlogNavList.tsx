import { Button } from '@intlayer/design-system/button';
import { ClickOutsideDiv } from '@intlayer/design-system/click-outside-div';
import { Container } from '@intlayer/design-system/container';
import { useDevice } from '@intlayer/design-system/hooks';
import { KeyboardShortcut } from '@intlayer/design-system/keyboard-shortcut';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { Website_Doc_Path } from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
import { ArrowLeftToLine } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { NavSectionItem, OptionalLink } from '~/components/DocPage/DocNavList';
import {
  FrameworkFilter,
  useFrameworkFilter,
} from '~/components/DocPage/FrameworkFilter';
import { filterSectionByFramework } from '~/components/DocPage/FrameworkFilter/filterSectionByFramework';
import { SearchTrigger } from '~/components/DocPage/Search/SearchTrigger';
import type { NavCategorizedDoc } from '~/components/DocPage/types';
import { useScrollPositionPersistence } from '~/hooks/useScrollPositionPersistence';
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
  const navRef = useScrollPositionPersistence<HTMLElement>(
    'blog-nav-scroll-position'
  );

  const filteredBlogData = filterSectionByFramework(
    blogData,
    selectedFramework
  );

  return (
    <nav
      ref={navRef}
      className="m-auto flex max-h-[calc(100vh-8.2rem)] min-w-40 max-w-xl flex-col gap-y-4 overflow-auto px-2 pt-6 pb-20"
    >
      {Object.entries(filteredBlogData).map(([key1, section1Data]) => (
        <div key={key1} className="w-full">
          <NavSectionItem
            sectionKey={key1}
            sectionData={section1Data as unknown as NavCategorizedDoc}
            activeSlugs={activeSlugs}
            level={1}
            parentPath="blog-nav"
          />
        </div>
      ))}
      <div className="mt-3 flex flex-col gap-y-2 border-border/60 border-t pt-2">
        <OptionalLink to={Website_Doc_Path} label={docButton.label.value}>
          {docButton?.text}
        </OptionalLink>
      </div>
    </nav>
  );
};

export const BlogNavList: FC<BlogNavListProps> = ({
  blogData,
  activeSlugs,
}) => {
  const { isMobile } = useDevice();
  const [isHidden, setIsHidden] = useState(true);
  const { collapseButton } = useIntlayer('blog-nav-list');
  const [selectedFramework, setSelectedFramework] = useFrameworkFilter();

  return (
    <>
      {isHidden && (
        <div className="fixed top-20 left-2 z-30 flex flex-col gap-1 md:left-4">
          <SearchTrigger isMini />
          <PopoverStatic identifier="blog-nav-expand">
            <Button
              Icon={ArrowLeftToLine}
              size="icon-md"
              variant="hoverable"
              color="text"
              label={collapseButton.label.value}
              aria-expanded={false}
              aria-controls="doc-nav-content"
              className="rotate-180"
              onClick={() => setIsHidden(false)}
            />
            <PopoverStatic.Detail identifier="blog-nav-expand">
              <KeyboardShortcut
                shortcut="Alt + ArrowLeft"
                onTriggered={() => setIsHidden(false)}
                size="sm"
              />
            </PopoverStatic.Detail>
          </PopoverStatic>
        </div>
      )}
      <ClickOutsideDiv
        className={cn(
          'relative top-0 left-0 z-40 flex h-full justify-end max-md:fixed',
          'max-md:transition-transform max-md:duration-300 max-md:ease-in-out',
          isHidden
            ? 'max-md:pointer-events-none max-md:-translate-x-full'
            : 'max-md:translate-x-0'
        )}
        onClickOutSide={() => {
          if (isMobile) {
            setIsHidden(true);
          }
        }}
      >
        <Container
          className={cn(
            isHidden ? 'top-25' : 'h-full',
            'sticky top-15 rounded-br-2xl'
          )}
          roundedSize="none"
          transparency="xs"
        >
          <div className="relative h-full max-w-80">
            {/* The content keeps a fixed width and only the clipping wrapper is
                animated, so nothing re-lays-out during the transition. */}
            <div
              id="doc-nav-content"
              className={cn(
                'h-full overflow-hidden transition-[width] duration-500 ease-in-out',
                isHidden ? 'w-0' : 'w-80'
              )}
              aria-hidden={Boolean(isHidden)}
              inert={isHidden ? true : undefined}
            >
              <div className="relative h-full w-80 overflow-hidden max-md:mt-17">
                <Container
                  transparency="xs"
                  className="z-10 m-auto pt-1 lg:pt-4"
                  roundedSize="none"
                >
                  <div className="relative m-auto flex w-full flex-row items-center justify-center gap-2 px-2">
                    <FrameworkFilter
                      selected={selectedFramework}
                      onSelect={setSelectedFramework}
                    />
                    <SearchTrigger isShortcutDisabled={isHidden} />
                    <PopoverStatic identifier="blog-nav-collapse">
                      <Button
                        Icon={ArrowLeftToLine}
                        size="icon-md"
                        variant="hoverable"
                        color="text"
                        label={collapseButton.label.value}
                        aria-expanded={!isHidden}
                        aria-controls="doc-nav-content"
                        onClick={() => setIsHidden(true)}
                      />
                      <PopoverStatic.Detail identifier="blog-nav-collapse">
                        <KeyboardShortcut
                          shortcut="Alt + ArrowLeft"
                          onTriggered={() => setIsHidden(true)}
                          disabled={isHidden}
                          size="sm"
                        />
                      </PopoverStatic.Detail>
                    </PopoverStatic>
                    <div className="absolute bottom-0 left-0 h-8 w-full translate-y-full bg-linear-to-b from-card/90 backdrop-blur" />
                  </div>
                </Container>

                <BlogNavListContent
                  blogData={blogData}
                  activeSlugs={activeSlugs}
                  selectedFramework={selectedFramework}
                />
              </div>
            </div>
          </div>
        </Container>
      </ClickOutsideDiv>
    </>
  );
};

export default BlogNavList;
