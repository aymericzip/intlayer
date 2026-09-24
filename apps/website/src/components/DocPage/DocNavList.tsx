import { Accordion } from '@intlayer/design-system/accordion';
import { Button } from '@intlayer/design-system/button';
import { ClickOutsideDiv } from '@intlayer/design-system/click-outside-div';
import { Container } from '@intlayer/design-system/container';
import { useDevice, usePersistedStore } from '@intlayer/design-system/hooks';
import { KeyboardShortcut } from '@intlayer/design-system/keyboard-shortcut';
import { PopoverStatic } from '@intlayer/design-system/popover';
import {
  Website_Blog_Path,
  Website_Doc_Chat_Path,
} from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
import { ArrowLeftToLine, Bot, type LucideIcon } from 'lucide-react';
import {
  type ComponentProps,
  type FC,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';
import { SearchTrigger } from '~/components/DocPage/Search/SearchTrigger';
import { Link } from '~/components/Link/Link';
import { useScrollPositionPersistence } from '~/hooks/useScrollPositionPersistence';
import {
  FrameworkFilter,
  FrameworkLogo,
  useFrameworkFilter,
} from './FrameworkFilter';
import { filterSectionByFramework } from './FrameworkFilter/filterSectionByFramework';
import type { NavCategorizedDoc, NavSection } from './types';

type OptionalLinkProps = Omit<ComponentProps<typeof Link>, 'to'> & {
  to?: string;
  frameworks?: string[];
  inAccordion?: boolean;
  Icon?: LucideIcon;
  isLevel1?: boolean;
};

export const OptionalLink: FC<OptionalLinkProps> = ({
  to,
  isActive,
  className,
  frameworks,
  children,
  inAccordion = false,
  Icon,
  isLevel1 = false,
  ...props
}) => {
  const hasLeftIcon = Boolean((frameworks && frameworks.length > 0) || Icon);

  const content = (
    <span
      className={cn(
        'flex w-full items-center',
        hasLeftIcon ? 'gap-3' : 'gap-2'
      )}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      {frameworks && frameworks.length > 0 && (
        <span className="flex shrink-0 items-center">
          {frameworks.slice(0, 1).map((framework, index) => (
            <FrameworkLogo
              key={framework}
              logoKey={framework as any}
              className="size-3.5 shrink-0"
              style={{ zIndex: index }}
            />
          ))}
        </span>
      )}
      <span className="flex flex-1 items-center gap-3 truncate whitespace-nowrap">
        {children}
      </span>
    </span>
  );

  if (!to || inAccordion) {
    return (
      <span
        className={cn(
          inAccordion
            ? 'flex flex-1 items-center truncate text-nowrap text-left font-medium text-sm'
            : cn(
                'flex w-full items-center truncate text-nowrap px-2.5 py-1.5 text-left text-sm',
                isLevel1
                  ? 'font-medium text-text'
                  : 'font-medium text-foreground'
              ),
          className
        )}
        {...props}
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      to={to}
      variant="hoverable"
      color="text"
      isActive={isActive}
      className={cn(
        'block w-full truncate text-nowrap px-2.5 py-1.5 text-left text-sm',
        isLevel1 ? 'font-medium text-text' : 'text-muted-foreground',
        isActive && 'font-medium text-foreground',
        className
      )}
      {...props}
    >
      {content}
    </Link>
  );
};

type NavAccordionProps = {
  label: string;
  identifier?: string;
  title: ReactNode;
  isActive: boolean;
  isSelfActive: boolean;
  isSubSectionActive: boolean;
  defaultIsOpen?: boolean;
  frameworks?: string[];
  children: ReactNode;
  isLevel1?: boolean;
  headerClassName?: string;
};

export const NavAccordion: FC<NavAccordionProps> = ({
  label,
  identifier,
  title,
  isActive,
  isSelfActive,
  isSubSectionActive,
  defaultIsOpen = false,
  frameworks,
  children,
  isLevel1 = false,
  headerClassName,
}) => {
  const storeKey = identifier ?? `nav-section-${label}`;
  const [isOpen, setIsOpen] = usePersistedStore<boolean>(
    storeKey,
    defaultIsOpen || isActive
  );

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isActive) {
      setIsOpen(true);
    }
  }, [isActive, setIsOpen]);

  return (
    <Accordion
      label={label}
      isOpen={isOpen}
      onToggle={setIsOpen}
      size="custom"
      variant="hoverable"
      color="text"
      header={
        <OptionalLink label={label} frameworks={frameworks} inAccordion>
          {title}
        </OptionalLink>
      }
      headerClassName={cn(
        'group flex w-full items-center justify-between px-2.5 py-1.5 text-left font-medium text-sm',
        isSubSectionActive || isLevel1 ? 'text-text' : 'text-muted-foreground',
        headerClassName
      )}
      iconClassName="size-3 text-muted-foreground/70 transition-transform duration-300 group-hover:text-foreground"
      isActive={isSelfActive && !isSubSectionActive}
    >
      {children}
    </Accordion>
  );
};

const isSectionSelfActive = (
  section: NavCategorizedDoc,
  activeSlugs: string[]
): boolean => {
  const slugs = section.default?.slugs ?? [];
  return (
    slugs.length > 0 &&
    slugs.length === activeSlugs.length &&
    slugs.every((segment, index) => segment === activeSlugs[index])
  );
};

const hasActiveChild = (
  section: NavCategorizedDoc,
  activeSlugs: string[]
): boolean => {
  if (!section.subSections) return false;
  return Object.values(section.subSections).some(
    (subSection) =>
      isSectionSelfActive(subSection, activeSlugs) ||
      hasActiveChild(subSection, activeSlugs)
  );
};

type NavSectionItemProps = {
  sectionKey: string;
  sectionData: NavCategorizedDoc;
  activeSlugs: string[];
  level: number;
  parentPath?: string;
  overviewText?: string;
};

export const NavSectionItem: FC<NavSectionItemProps> = ({
  sectionKey,
  sectionData,
  activeSlugs,
  level,
  parentPath,
  overviewText = 'Overview',
}) => {
  const sectionDefault = sectionData.default;
  const subSections = sectionData.subSections;
  const hasSubSections = Boolean(
    subSections && Object.keys(subSections).length > 0
  );

  const isSelfActive = isSectionSelfActive(sectionData, activeSlugs);
  const isSubSectionActive = hasActiveChild(sectionData, activeSlugs);
  const isActive = isSelfActive || isSubSectionActive;
  const isDeployed = sectionData.deployed !== false;
  const pathKey = parentPath
    ? `${parentPath}-${sectionKey}`
    : `doc-nav-${sectionKey}`;

  if (!hasSubSections) {
    return (
      <OptionalLink
        to={sectionDefault?.relativeUrl ?? ''}
        label={sectionKey}
        isActive={isSelfActive && !isSubSectionActive}
        frameworks={sectionData.frameworks}
        isLevel1={level === 1}
      >
        {sectionData.title}
      </OptionalLink>
    );
  }

  return (
    <NavAccordion
      label={sectionKey}
      identifier={pathKey}
      title={sectionData.title}
      isActive={isActive}
      isSelfActive={isSelfActive}
      isSubSectionActive={isSubSectionActive}
      defaultIsOpen={level === 1 ? isDeployed : false}
      frameworks={sectionData.frameworks}
      isLevel1={level === 1}
    >
      <ul className="m-0 mt-1.5 ml-3 flex list-none flex-col gap-y-2 border-border/60 border-l p-0 pl-2 text-sm">
        {sectionDefault?.relativeUrl && (
          <li>
            <OptionalLink
              to={sectionDefault.relativeUrl}
              label={`${sectionKey}-overview`}
              isActive={isSelfActive}
              frameworks={sectionData.frameworks}
            >
              {overviewText}
            </OptionalLink>
          </li>
        )}
        {Object.entries(subSections!).map(([subKey, subData]) => (
          <li key={subKey}>
            <NavSectionItem
              sectionKey={subKey}
              sectionData={subData}
              activeSlugs={activeSlugs}
              level={level + 1}
              parentPath={pathKey}
              overviewText={overviewText}
            />
          </li>
        ))}
      </ul>
    </NavAccordion>
  );
};

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
  const navRef = useScrollPositionPersistence<HTMLElement>(
    'doc-nav-scroll-position'
  );

  const filteredDocData = filterSectionByFramework(docData, selectedFramework);

  return (
    <nav
      ref={navRef}
      aria-label={documentationSections.value}
      className="m-auto flex max-h-[calc(100vh-8.2rem)] min-w-40 max-w-xl flex-col gap-y-4 overflow-auto px-2 pt-6 pb-20"
    >
      {Object.entries(filteredDocData).map(([key1, section1Data]) => (
        <div key={key1} className="w-full">
          <NavSectionItem
            sectionKey={key1}
            sectionData={section1Data}
            activeSlugs={activeSlugs}
            level={1}
            overviewText={overview.value}
          />
        </div>
      ))}

      <div className="mt-3 flex flex-col gap-y-2 border-border/60 border-t pt-2">
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
      </div>
    </nav>
  );
};

export const DocNavList: FC<DocNavListProps> = ({ docData, activeSlugs }) => {
  const { isMobile } = useDevice();

  const [isHidden, setIsHidden] = useState<boolean | undefined>(undefined);
  const { collapseButton } = useIntlayer('doc-nav-list');
  const [selectedFramework, setSelectedFramework] = useFrameworkFilter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isFocus =
        new URLSearchParams(window.location.search).get('focus') === 'true';
      if (isFocus) {
        setIsHidden(true);
      }
    }
  }, []);

  return (
    <>
      {isHidden !== false && (
        <div
          className={cn(
            'fixed top-20 left-2 z-30 flex flex-col gap-1 md:left-4',
            // Undecided: the panel is open on desktop, so this belongs to
            // mobile only.
            isHidden === undefined && 'md:hidden'
          )}
        >
          <SearchTrigger isMini />
          <PopoverStatic identifier="doc-nav-expand">
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
            <PopoverStatic.Detail identifier="doc-nav-expand">
              <KeyboardShortcut
                shortcut="Alt + ArrowLeft"
                onTriggered={() => setIsHidden(false)}
                disabled={isHidden === undefined}
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
          isHidden === false
            ? 'max-md:translate-x-0'
            : 'max-md:pointer-events-none max-md:-translate-x-full'
        )}
        onClickOutSide={() => {
          if (isMobile) {
            setIsHidden(true);
          }
        }}
      >
        <Container
          className={cn(
            isHidden === undefined
              ? 'max-md:top-25 md:h-full'
              : isHidden
                ? 'top-25'
                : 'h-full',
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
                isHidden === undefined
                  ? 'max-md:invisible max-md:w-0 md:visible md:w-80'
                  : isHidden
                    ? 'w-0'
                    : 'w-80'
              )}
              aria-hidden={isHidden === true}
              inert={isHidden === true ? true : undefined}
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
                    <PopoverStatic identifier="doc-nav-collapse">
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
                      <PopoverStatic.Detail identifier="doc-nav-collapse">
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

                <DocNavListContent
                  docData={docData}
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
