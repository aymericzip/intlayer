'use client';

import { SearchTrigger } from '@components/DocPage/Search/SearchTrigger';
import { Link } from '@components/Link/Link';
import {
  Accordion,
  Button,
  ClickOutsideDiv,
  Container,
  KeyboardShortcut,
  MaxWidthSmoother,
  PopoverStatic,
} from '@intlayer/design-system';
import { useDevice } from '@intlayer/design-system/hooks';
import {
  Website_Blog_Path,
  Website_Doc_Chat_Path,
} from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
import { ArrowLeftToLine, Bot } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type ComponentProps, type FC, useState } from 'react';
import { useScrollPositionPersistence } from '@/hooks/useScrollPositionPersistence';
import {
  FrameworkFilter,
  FrameworkLogo,
  useFrameworkFilter,
} from './FrameworkFilter';
import type { CategorizedDocMetadata, Section } from './types';

type OptionalLinkProps = ComponentProps<typeof Link> & {
  frameworks?: string[];
};

export const OptionalLink: FC<OptionalLinkProps> = ({
  href,
  isActive,
  className,
  frameworks,
  children,
  ...props
}) => {
  const content = (
    <span className="flex items-center gap-1.5 opacity-60">
      {frameworks && frameworks.length > 0 && (
        <span className="mr-1 flex items-center">
          {frameworks.slice(0, 1).map((framework, index) => (
            <FrameworkLogo
              key={framework}
              logoKey={framework as any}
              className={cn('size-3.5')}
              style={{ zIndex: index }}
            />
          ))}
        </span>
      )}
      {children}
    </span>
  );

  if (!href)
    return (
      <span
        className={cn(
          'flex w-full truncate text-nowrap p-2 text-left font-bold text-neutral transition-color',
          className
        )}
        {...props}
      >
        {content}
      </span>
    );

  return (
    <Link
      href={href}
      variant="hoverable"
      color="text"
      roundedSize="lg"
      isActive={isActive}
      className={cn(
        'flex w-full truncate text-nowrap p-2 text-left font-bold transition-color',
        className
      )}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {content}
    </Link>
  );
};

type DocNavListProps = {
  docData: Section;
  activeSlugs: string[];
};

type DocNavListContentProps = DocNavListProps & {
  /** Selected framework ids (e.g. ['react', 'nextjs']), or null meaning "All". */
  selectedFramework: string[] | null;
};

/**
 * Recursively filters a Section map, hiding sections that don't match the
 * active framework filter. Sub-sections are also filtered.
 *
 * It uses contextual inheritance:
 * - If a section has the `frameworks` key, its visibility is determined solely by that field.
 * - If a section LACKS the `frameworks` key, it inherits the visibility state of its parent.
 * - If the parent is hidden, matching child sections are "promoted" to the parent's level.
 */
const filterSection = (
  section: Section,
  filter: string[] | null,
  parentMatches = true,
  depth = 0,
  inheritedFrameworks?: string[]
): Section => {
  if (!filter) return section;

  const entries = Object.entries(section).flatMap(
    ([key, data]): [string, CategorizedDocMetadata][] => {
      const sectionHasTags = !!data.frameworks;
      const matchesExplicitly =
        filter?.every((f) => data.frameworks?.includes(f)) ?? false;
      const matches = sectionHasTags ? matchesExplicitly : parentMatches;

      // Determine the framework tags to use (original or inherited)
      const currentFrameworks = sectionHasTags
        ? data.frameworks
        : inheritedFrameworks;

      // 1. Skip non-matching section, but promote its children that might match
      if (!matches) {
        return data.subSections
          ? (Object.entries(
              filterSection(
                data.subSections,
                filter,
                false,
                depth + 1,
                currentFrameworks
              )
            ) as [string, CategorizedDocMetadata][])
          : [];
      }

      // 2. Filter subsections
      const filteredSubSections = data.subSections
        ? filterSection(
            data.subSections,
            filter,
            true,
            depth + 1,
            currentFrameworks
          )
        : undefined;

      const hasVisibleContent =
        Boolean(data.default) ||
        (filteredSubSections && Object.keys(filteredSubSections).length > 0);

      if (!hasVisibleContent) return [];

      const dataWithFrameworks: CategorizedDocMetadata = {
        ...data,
        frameworks: currentFrameworks,
        subSections: filteredSubSections,
      };

      // 3. Apply flattening and unwrapping
      // We skip these rules for root categories (depth 0) to maintain top-level structure
      if (depth > 0) {
        // Rule A: Flatten categories with no content (promote matching children)
        // We only flatten if there is exactly ONE sub-section to avoid breaking multiple-item groups (like Releases)
        if (
          !data.default &&
          filteredSubSections &&
          Object.keys(filteredSubSections).length === 1
        ) {
          return Object.entries(filteredSubSections) as [
            string,
            CategorizedDocMetadata,
          ][];
        }

        // Rule B: If this section explicitly matches the framework, unwrap its subsections as siblings
        // We do this to provide a flat list of pages for the selected framework context
        if (matchesExplicitly && filteredSubSections) {
          return [
            [key, { ...dataWithFrameworks, subSections: undefined }],
            ...(Object.entries(filteredSubSections) as [
              string,
              CategorizedDocMetadata,
            ][]),
          ];
        }
      }

      // Default: Keep the section and its (already populated) sub-sections
      return [[key, dataWithFrameworks]];
    }
  );

  return Object.fromEntries(entries);
};

export const DocNavListContent: FC<DocNavListContentProps> = ({
  docData,
  activeSlugs,
  selectedFramework,
}) => {
  const { blogButton, chatBotButton } = useIntlayer('doc-nav-list');
  const navRef = useScrollPositionPersistence<HTMLElement>(
    'doc-nav-scroll-position'
  );

  const filteredDocData = filterSection(docData, selectedFramework);

  return (
    <nav
      ref={navRef}
      className="m-auto flex max-h-[calc(100vh-8.2rem)] min-w-40 max-w-xl flex-col gap-5 overflow-auto px-3 pt-8 pb-20"
    >
      {Object.keys(filteredDocData).map((key1) => {
        const section1Data = filteredDocData[key1];
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
              href={sectionDefault?.relativeUrl ?? ''}
              label={key1}
              isActive={isSelfActive && !isSubSectionActive}
              frameworks={section1Data.frameworks}
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
                              href={sectionDefault?.relativeUrl ?? ''}
                              isActive={isSelfActive && !isSubSectionActive}
                              className="block w-full flex-row items-center text-nowrap p-2 text-left text-sm transition-colors hover:text-text"
                              frameworks={section2Data?.frameworks}
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
                                        href={
                                          section3Data.default?.relativeUrl ??
                                          ''
                                        }
                                        isActive={isActive}
                                        className="block w-full flex-row items-center text-nowrap p-2 text-left text-xs transition-colors hover:text-text"
                                        frameworks={section3Data.frameworks}
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
                          href={sectionDefault?.relativeUrl ?? ''}
                          className="block w-full flex-row items-center text-nowrap p-2 text-left text-sm transition-colors hover:text-text"
                          label={key2}
                          isActive={isActive}
                          frameworks={section2Data?.frameworks}
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
        <OptionalLink href={Website_Blog_Path} label={blogButton.label.value}>
          {blogButton?.text}
        </OptionalLink>
      </div>
      <div>
        <OptionalLink
          href={Website_Doc_Chat_Path}
          label={chatBotButton.label.value}
          className="flex items-center"
        >
          <Bot />
          {chatBotButton?.text}
        </OptionalLink>
      </div>
    </nav>
  );
};

export const DocNavList: FC<DocNavListProps> = ({ docData, activeSlugs }) => {
  const { isMobile } = useDevice();
  const isFocus = useSearchParams().get('focus') === 'true';
  const [isHidden, setIsHidden] = useState(isMobile || isFocus);
  const { collapseButton } = useIntlayer('doc-nav-list');
  const [selectedFramework, setSelectedFramework] = useFrameworkFilter();

  return (
    <ClickOutsideDiv
      className="top-0 left-0 z-10 flex h-full justify-end max-md:fixed"
      onClickOutSide={() => {
        if (isMobile) {
          setIsHidden(true);
        }
      }}
    >
      <Container
        className={cn(
          isHidden ? 'h-[100px]' : 'h-full',
          'sticky top-[60px] rounded-br-2xl'
        )}
        roundedSize="none"
        transparency="xs"
      >
        <div className="relative h-full max-w-80">
          <Container
            transparency="xs"
            className="sticky top-[3.6rem] z-10 m-auto pt-4"
            roundedSize="none"
          >
            <div
              className={cn(
                'relative m-auto flex w-full flex-row items-center justify-center gap-2 px-2',
                isHidden && 'flex-col-reverse'
              )}
            >
              {!isHidden && (
                <FrameworkFilter
                  selected={selectedFramework}
                  onSelect={setSelectedFramework}
                />
              )}
              <SearchTrigger isMini={isHidden} />
              <PopoverStatic identifier="doc-nav-collapse">
                <Button
                  Icon={ArrowLeftToLine}
                  size="icon-md"
                  variant="hoverable"
                  color="text"
                  label={collapseButton.label.value}
                  className={cn([
                    'transition-transform',
                    isHidden && 'rotate-180',
                  ])}
                  onClick={() => setIsHidden((isHidden) => !isHidden)}
                />
                <PopoverStatic.Detail identifier="doc-nav-collapse">
                  <KeyboardShortcut
                    shortcut="Alt + ArrowLeft"
                    onTriggered={() => setIsHidden((isHidden) => !isHidden)}
                    size="sm"
                  />
                </PopoverStatic.Detail>
              </PopoverStatic>
              <div
                className={cn(
                  'absolute bottom-0 left-0 h-8 w-full translate-y-full bg-linear-to-b from-card/90 backdrop-blur',
                  isHidden && 'hidden'
                )}
              />
            </div>
          </Container>

          <div className="sticky top-28 pt-0">
            <MaxWidthSmoother isHidden={Boolean(isHidden)}>
              <div className="relative overflow-hidden">
                <DocNavListContent
                  docData={docData}
                  activeSlugs={activeSlugs}
                  selectedFramework={selectedFramework}
                />
              </div>
            </MaxWidthSmoother>
          </div>
        </div>
      </Container>
    </ClickOutsideDiv>
  );
};
