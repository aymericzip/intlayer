import { Accordion } from '@intlayer/design-system/accordion';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { cn } from '@intlayer/design-system/utils';
import type { LucideIcon } from 'lucide-react';
import {
  type ComponentProps,
  type FC,
  type ReactNode,
  useEffect,
  useRef,
} from 'react';
import { Link } from '~/components/Link/Link';
import { FrameworkLogo } from './FrameworkFilter';

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
  const logoFrameworks = frameworks?.filter((f) => f !== 'all') ?? [];
  const hasLeftIcon = Boolean(logoFrameworks.length > 0 || Icon);

  const content = (
    <span
      className={cn(
        'flex w-full items-center',
        hasLeftIcon ? 'gap-3' : 'gap-2'
      )}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      {logoFrameworks.length > 0 && (
        <span className="flex shrink-0 items-center">
          {logoFrameworks.slice(0, 1).map((framework, index) => (
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
                isLevel1 ? 'font-medium text-text' : 'font-medium text-neutral'
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
      color={isLevel1 || isActive ? 'text' : 'neutral'}
      isActive={isActive}
      className={cn(
        'block w-full truncate text-nowrap px-2.5 py-1.5 text-left text-sm',
        isLevel1 ? 'font-medium text-text' : 'text-neutral',
        isActive && 'font-medium text-text',
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

  const isDeployed = isLevel1 || isOpen;

  return (
    <Accordion
      label={label}
      isOpen={isOpen}
      onToggle={setIsOpen}
      size="custom"
      variant="hoverable"
      color={isDeployed ? 'text' : 'neutral'}
      header={
        <OptionalLink label={label} frameworks={frameworks} inAccordion>
          {title}
        </OptionalLink>
      }
      headerClassName={cn(
        'group flex w-full items-center justify-between px-2.5 py-1.5 text-left font-medium text-sm',
        isDeployed ? 'text-text' : 'text-neutral',
        headerClassName
      )}
      iconClassName="size-3 opacity-70 transition-[transform,opacity] duration-300 group-hover:opacity-100"
      isActive={isSelfActive && !isSubSectionActive}
    >
      {children}
    </Accordion>
  );
};

export type NavItemData = {
  title: string;
  default?: {
    slugs?: string[];
    relativeUrl?: string;
    url?: string;
  };
  subSections?: Record<string, NavItemData>;
  frameworks?: string[];
  deployed?: boolean;
};

const isSectionSelfActive = (
  section: NavItemData,
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
  section: NavItemData,
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
  sectionData: NavItemData;
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
  const isDefaultDeployed = sectionData.deployed !== false;
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

  const isDefaultShowed = Boolean(sectionDefault?.relativeUrl);
  const overviewHasIcon = Boolean(
    isDefaultShowed && sectionData.frameworks?.some((f) => f !== 'all')
  );

  return (
    <NavAccordion
      label={sectionKey}
      identifier={pathKey}
      title={sectionData.title}
      isActive={isActive}
      isSelfActive={isSelfActive}
      isSubSectionActive={isSubSectionActive}
      defaultIsOpen={level === 1 ? isDefaultDeployed : false}
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
        {Object.entries(subSections!).map(([subKey, subData]) => {
          const subDataWithInheritedFrameworks: NavItemData = {
            ...subData,
            frameworks:
              subData.frameworks && subData.frameworks.length > 0
                ? subData.frameworks
                : overviewHasIcon
                  ? sectionData.frameworks
                  : subData.frameworks,
          };

          return (
            <li key={subKey} className={cn(isDefaultShowed && 'ml-2')}>
              <NavSectionItem
                sectionKey={subKey}
                sectionData={subDataWithInheritedFrameworks}
                activeSlugs={activeSlugs}
                level={level + 1}
                parentPath={pathKey}
                overviewText={overviewText}
              />
            </li>
          );
        })}
      </ul>
    </NavAccordion>
  );
};
