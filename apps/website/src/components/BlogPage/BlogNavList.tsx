import { Accordion } from '@intlayer/design-system/accordion';
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
import { OptionalLink } from '~/components/DocPage/DocNavList';
import { SearchTrigger } from '~/components/DocPage/Search/SearchTrigger';
import { useScrollPositionPersistence } from '~/hooks/useScrollPositionPersistence';
import type { Section } from './types';

type BlogNavListProps = {
  blogData: Section;
  activeSlugs: string[];
};

export const BlogNavListContent: FC<BlogNavListProps> = ({
  blogData,
  activeSlugs,
}) => {
  const { docButton } = useIntlayer('blog-nav-list');
  const navRef = useScrollPositionPersistence<HTMLElement>(
    'blog-nav-scroll-position'
  );

  return (
    <nav
      ref={navRef}
      className="m-auto flex max-h-[calc(100vh-8.2rem)] min-w-40 max-w-xl flex-col gap-5 overflow-auto px-3 pt-8 pb-20"
    >
      {Object.keys(blogData).map((key1) => {
        const section1Data = blogData[key1];
        const sectionDefault = section1Data.default;
        const subSections = section1Data.subSections;
        const slugs = sectionDefault?.slugs ?? [];

        // Check if this section's own slugs match
        const isSelfActive =
          slugs.length > 0 &&
          slugs.every((segment, index) => segment === activeSlugs[index]);

        // Check if any subsection at any level matches
        const isSubSectionActive = Object.values(subSections ?? {}).some(
          (subSection2) => {
            const subSlugs2 = subSection2.default?.slugs ?? [];
            const isLevel2Active =
              subSlugs2.length > 0 &&
              subSlugs2.every(
                (segment, index) => segment === activeSlugs[index]
              );

            // Check level 3 subsections
            const isLevel3Active = Object.values(
              subSection2.subSections ?? {}
            ).some((subSection3) => {
              const subSlugs3 = subSection3.default?.slugs ?? [];
              return (
                subSlugs3.length > 0 &&
                subSlugs3.every(
                  (segment, index) => segment === activeSlugs[index]
                )
              );
            });

            return isLevel2Active || isLevel3Active;
          }
        );

        return (
          <div key={key1}>
            <OptionalLink
              to={sectionDefault?.relativeUrl ?? ''}
              label={key1}
              isActive={isSelfActive && !isSubSectionActive}
            >
              {section1Data.title}
            </OptionalLink>

            {subSections && Object.keys(subSections).length > 0 && (
              <ul className="mt-4 flex flex-col gap-4 border-neutral border-l-[0.5px] p-1 text-base">
                {Object.keys(subSections).map((key2) => {
                  const section2Data = subSections[key2];
                  const sectionDefault = section2Data.default;
                  const subSections2 = section2Data.subSections;
                  const hasSubsections =
                    subSections2 && Object.keys(subSections2).length > 0;
                  const slugs = sectionDefault?.slugs ?? [];

                  // Check if this section's own slugs match
                  const isSelfActive =
                    slugs.length > 0 &&
                    slugs.every(
                      (segment, index) => segment === activeSlugs[index]
                    );

                  // Check if any subsection's slugs match (level 3)
                  const isSubSectionActive = Object.values(
                    subSections2 ?? {}
                  ).some((subSection) => {
                    const subSlugs = subSection.default?.slugs ?? [];
                    return (
                      subSlugs.length > 0 &&
                      subSlugs.every(
                        (segment, index) => segment === activeSlugs[index]
                      )
                    );
                  });

                  const isActive = isSelfActive || isSubSectionActive;

                  return (
                    <li key={key2}>
                      {hasSubsections ? (
                        <Accordion
                          header={
                            <OptionalLink
                              label={key2}
                              to={sectionDefault?.relativeUrl ?? ''}
                              isActive={isSelfActive && !isSubSectionActive}
                              className="block w-full flex-row items-center text-nowrap p-2 text-left text-sm transition-colors hover:text-text"
                            >
                              {section2Data?.title}
                            </OptionalLink>
                          }
                          label={key2}
                          isOpen={isActive ? true : undefined}
                          className="py-0! pl-0!"
                          isActive={isSubSectionActive}
                        >
                          <div className="pl-3 text-sm">
                            {subSections2 &&
                              Object.keys(subSections2).length > 0 && (
                                <div className="flex flex-col items-start gap-2 p-1 text-neutral transition-colors hover:text-text">
                                  {Object.keys(subSections2).map((key3) => {
                                    const section3Data = subSections2[key3];
                                    const slugs =
                                      section3Data.default?.slugs ?? [];
                                    const isActive =
                                      slugs.length > 0 &&
                                      slugs.every(
                                        (segment, index) =>
                                          segment === activeSlugs[index]
                                      );

                                    return (
                                      <OptionalLink
                                        key={key3}
                                        label={key3}
                                        to={
                                          section3Data.default?.relativeUrl ??
                                          ''
                                        }
                                        isActive={isActive}
                                        className="block w-full flex-row items-center text-nowrap p-2 text-left text-xs transition-colors hover:text-text"
                                      >
                                        {section3Data.title}
                                      </OptionalLink>
                                    );
                                  })}
                                </div>
                              )}
                          </div>
                        </Accordion>
                      ) : (
                        <OptionalLink
                          to={sectionDefault?.relativeUrl ?? ''}
                          className="block w-full flex-row items-center text-nowrap p-2 text-left text-sm transition-colors hover:text-text"
                          label={key2}
                          isActive={isActive}
                        >
                          {section2Data?.title}
                        </OptionalLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
      <div>
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

  return (
    <>
      {isHidden && (
        <div className="fixed top-20 left-2 z-30 flex flex-col gap-1">
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
              <div className="relative h-full w-80 overflow-hidden">
                <Container
                  transparency="xs"
                  className="z-10 m-auto pt-4"
                  roundedSize="none"
                >
                  <div className="relative m-auto flex w-full flex-row items-center justify-center gap-2 px-2">
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
                        className="transition-transform"
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
