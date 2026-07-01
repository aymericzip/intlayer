import { useSelectEnvironment, useSession } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { DropDown } from '@intlayer/design-system/drop-down';
import { useDevice } from '@intlayer/design-system/hooks';
import { KeyboardShortcut } from '@intlayer/design-system/keyboard-shortcut';
import { PopoverStatic } from '@intlayer/design-system/popover';
import {
  App_Admin_Discussions_Path,
  App_Admin_Organizations_Path,
  App_Admin_Projects_Path,
  App_Admin_Users_Path,
  App_Dashboard_Assets_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_IDE_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Scanner_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Translate_Path,
  App_Home_Path,
} from '@intlayer/design-system/routes';
import { TabSelector } from '@intlayer/design-system/tab-selector';
import { Tag } from '@intlayer/design-system/tag';
import { cn } from '@intlayer/design-system/utils';
import { useLocation } from '@tanstack/react-router';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { getPathWithoutLocale } from 'intlayer';
import {
  ArrowLeftToLine,
  Book,
  Building2,
  Check,
  ChevronsUpDown,
  FileText,
  FolderKanban,
  Globe,
  HandCoins,
  Image,
  Layers,
  LayoutDashboard,
  type LucideIcon,
  MessageSquare,
  PenTool,
  Pin,
  PinOff,
  ScanLine,
  Shield,
  SquareCode,
  Tags,
  User,
  X,
} from 'lucide-react';
import { type FC, forwardRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { IS_SELF_HOSTED } from '#utils/selfHosted';
import { DashboardSidebarProfile } from './DashboardSidebarProfile';
import { ReviewerMarketplaceBanner } from './ReviewerMarketplaceBanner';

// Map icon names to components - must be done in client component
export const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  PenTool,
  Book,
  FileText,
  Tags,
  FolderKanban,
  Building2,
  HandCoins,
  Image,
  User,
  Shield,
  Globe,
  ScanLine,
  SquareCode,
  MessageSquare,
};

export const shouldHaveOrganizationRoutes = [
  App_Dashboard_Projects_Path,
  App_Dashboard_Tags_Path,
] as string[];

export const shouldHaveProjectRoutes = [
  App_Home_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_Translate_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_IDE_Path,
  App_Dashboard_Scanner_Path,
  App_Dashboard_Assets_Path,
] as string[];

export const shouldHaveAdminRoutes = [
  App_Admin_Users_Path,
  App_Admin_Organizations_Path,
  App_Admin_Projects_Path,
  App_Admin_Discussions_Path,
] as string[];

export type SidebarNavigationItem = {
  key: string;
  href?: string;
  icon?: keyof typeof iconMap;
  label: string;
  title: string;
  items?: SidebarNavigationItem[];
};

export type DashboardSidebarProps = {
  className?: string;
  items: SidebarNavigationItem[];
  /** Called when the user pins a recent dictionary to the sidebar. */
  onPinDictionary?: (dictionaryKey: string) => void;
  /** Called when the user unpins a previously pinned dictionary. */
  onUnpinDictionary?: (dictionaryKey: string) => void;
  /** Called when the user removes a dictionary from the sidebar. */
  onRemoveDictionary?: (dictionaryKey: string) => void;
  /** Called when the user pins a recent tag to the sidebar. */
  onPinTag?: (tagKey: string) => void;
  /** Called when the user unpins a previously pinned tag. */
  onUnpinTag?: (tagKey: string) => void;
  /** Called when the user removes a tag from the sidebar. */
  onRemoveTag?: (tagKey: string) => void;
  /** Called when the user pins a recent editor page to the sidebar. */
  onPinEditorPage?: (path: string) => void;
  /** Called when the user unpins a previously pinned editor page. */
  onUnpinEditorPage?: (path: string) => void;
  /** Called when the user removes an editor page from the sidebar. */
  onRemoveEditorPage?: (path: string) => void;
  /**
   * Keys that are currently pinned. Used to decide whether to render
   * a Pin or PinOff button on each dictionary sidebar item.
   */
  pinnedDictionaryKeys?: string[];
  pinnedTagKeys?: string[];
  pinnedEditorPageKeys?: string[];
};

export const getCleanPath = (path: string): string => {
  // Remove leading "/" if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;

  // Split the path into components
  const components = cleanPath.split('/');

  // If more than two components, keep only the first two
  if (components.length > 2) {
    return components.slice(0, 2).join('/');
  }

  // For single component "dashboard", you can choose to append "/"
  if (components.length === 1 && components[0] === 'dashboard') {
    return components[0];
  }

  // Return the path as is for other cases
  return cleanPath;
};

export type FlatSidebarItem = SidebarNavigationItem & {
  level: number;
  isLastChild?: boolean;
};

export const filterItems = (
  nodes: SidebarNavigationItem[],
  context: {
    hasOrganization: boolean;
    hasProject: boolean;
    isSuperAdmin: boolean;
    isGithub?: boolean;
  }
): SidebarNavigationItem[] =>
  nodes
    .filter((el) => {
      const href = el.href as string;
      // Check permissions if href is restricted
      if (href) {
        if (
          shouldHaveOrganizationRoutes.includes(href) &&
          !context.hasOrganization
        )
          return false;
        if (shouldHaveProjectRoutes.includes(href) && !context.hasProject)
          return false;
        if (shouldHaveAdminRoutes.includes(href) && !context.isSuperAdmin)
          return false;
        if (href === App_Dashboard_IDE_Path && !context.isGithub) return false;
      }

      return true;
    })
    .map((item) => ({
      ...item,
      items: item.items ? filterItems(item.items, context) : undefined,
    }))
    // Keep item if it has passed filter OR if it has children
    .filter((item) => {
      // If it has children, keep it.
      if (item.items && item.items.length > 0) return true;
      // If it has no children but had an href and passed the permission check, keep it.
      if (item.href) return true;
      return false;
    });

export const flattenItems = (
  nodes: SidebarNavigationItem[],
  level = 0
): FlatSidebarItem[] => {
  const result: FlatSidebarItem[] = [];

  for (let i = 0; i < nodes.length; i++) {
    const item = nodes[i];
    const isLastChild = i === nodes.length - 1;

    result.push({ ...item, level, isLastChild });

    if (item.items) {
      result.push(...flattenItems(item.items, level + 1));
    }
  }

  return result;
};

type SidebarTabItemProps = {
  item: FlatSidebarItem;
  activeKey: string;
  isCollapsed: boolean;
  pinnedDictionaryKeys: string[];
  pinnedTagKeys: string[];
  pinnedEditorPageKeys: string[];
  flatNavItems: FlatSidebarItem[];
  onPinDictionary?: (dictionaryKey: string) => void;
  onUnpinDictionary?: (dictionaryKey: string) => void;
  onRemoveDictionary?: (dictionaryKey: string) => void;
  onPinTag?: (tagKey: string) => void;
  onUnpinTag?: (tagKey: string) => void;
  onRemoveTag?: (tagKey: string) => void;
  onPinEditorPage?: (path: string) => void;
  onUnpinEditorPage?: (path: string) => void;
  onRemoveEditorPage?: (path: string) => void;
  pinDictionaryLabel: string;
  unpinDictionaryLabel: string;
  removeFromSidebarLabel: string;
  shouldReduceMotion?: boolean;
};

const SidebarTabItem = forwardRef<HTMLDivElement, SidebarTabItemProps>(
  (
    {
      item,
      activeKey,
      isCollapsed,
      pinnedDictionaryKeys,
      pinnedTagKeys,
      pinnedEditorPageKeys,
      flatNavItems,
      onPinDictionary,
      onUnpinDictionary,
      onRemoveDictionary,
      onPinTag,
      onUnpinTag,
      onRemoveTag,
      onPinEditorPage,
      onUnpinEditorPage,
      onRemoveEditorPage,
      pinDictionaryLabel,
      unpinDictionaryLabel,
      removeFromSidebarLabel,
      shouldReduceMotion,
      ...props
    },
    ref
  ) => {
    const IconComponent = item.icon ? (iconMap[item.icon] ?? null) : null;
    const isChild = item.level > 0;

    const isDictionaryItem = item.key.startsWith('dictionary-');
    const dictKey = isDictionaryItem
      ? item.key.slice('dictionary-'.length)
      : null;
    const isDictItemPinned =
      dictKey !== null && pinnedDictionaryKeys.includes(dictKey);

    const isTagItem = item.key.startsWith('tag-');
    const tagKey = isTagItem ? item.key.slice('tag-'.length) : null;
    const isTagItemPinned = tagKey !== null && pinnedTagKeys.includes(tagKey);

    const isEditorPageItem = item.key.startsWith('editor-page-');
    const editorPagePath = isEditorPageItem
      ? item.key.slice('editor-page-'.length)
      : null;
    const isEditorPageItemPinned =
      editorPagePath !== null && pinnedEditorPageKeys.includes(editorPagePath);

    const isPinnableItem = isDictionaryItem || isTagItem || isEditorPageItem;
    const isItemPinned =
      isDictItemPinned || isTagItemPinned || isEditorPageItemPinned;

    // Show pin/unpin button on all dictionary/tag sub-items when sidebar is expanded
    const showPinButton = !isCollapsed && isPinnableItem && !isItemPinned;
    const showUnpinButton = !isCollapsed && isPinnableItem && isItemPinned;

    // Find index in flatNavItems to determine parent level-1 item and whether we need a straight line at left-4
    const currentIndex = flatNavItems.findIndex((x) => x.key === item.key);
    let parentLevel1: FlatSidebarItem | null = null;
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (flatNavItems[i].level === 1) {
        parentLevel1 = flatNavItems[i];
        break;
      }
    }

    return (
      <div ref={ref} className="group relative w-full" {...props}>
        <Link
          to={item.href ?? '#'}
          label={item.label}
          color="text"
          variant="invisible-link"
          preload="viewport"
          className={cn(
            'relative flex w-full items-center justify-center rounded-lg px-2 py-2 text-text/80 aria-[current]:bg-current/0',
            !isCollapsed && 'justify-start gap-3 px-4',
            // Indentation by level
            !isCollapsed && item.level === 1 && 'pl-10',
            !isCollapsed && item.level >= 2 && 'pl-16',
            // Leave room for pin/unpin/remove buttons
            !isCollapsed && isPinnableItem && 'pr-16'
          )}
          isActive={activeKey === item.key}
        >
          {/* Tree Visuals */}
          {!isCollapsed && isChild && (
            <>
              {/* Straight vertical line for level 1 parent if we are at level 2+ and parent level 1 is not the last child */}
              {item.level >= 2 && parentLevel1 && !parentLevel1.isLastChild && (
                <div className="absolute top-0 bottom-0 left-4 w-4 scale-110">
                  <div className="pointer-events-none relative h-full w-4">
                    <div className="absolute top-0 bottom-0 left-0 w-px bg-neutral/70" />
                  </div>
                </div>
              )}

              <div
                className={cn(
                  'absolute top-0 h-full w-4 scale-110',
                  item.level === 1 && 'left-4',
                  item.level >= 2 && 'left-10'
                )}
              >
                <div className="pointer-events-none relative h-full w-4">
                  <div className="absolute top-0 left-0 h-1/2 w-3 rounded-bl-lg border-neutral/70 border-b border-l" />
                  {!item.isLastChild && (
                    <div className="absolute top-1/2 left-0 h-1/2 w-px bg-neutral/70" />
                  )}
                </div>
              </div>
            </>
          )}

          {IconComponent && <IconComponent className="size-4 shrink-0" />}
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <m.span
                initial={shouldReduceMotion ? false : { opacity: 0, width: 0 }}
                animate={
                  shouldReduceMotion ? false : { opacity: 1, width: 'auto' }
                }
                exit={shouldReduceMotion ? undefined : { opacity: 0, width: 0 }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 0.2, ease: 'easeInOut' }
                }
                className="overflow-hidden truncate whitespace-nowrap"
              >
                {item.title}
              </m.span>
            )}
          </AnimatePresence>
        </Link>

        {/* Action buttons wrapper — shown on hover */}
        {!isCollapsed && isPinnableItem && (
          <div className="absolute top-1/2 right-2 z-10 flex -translate-y-1/2 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
            {isItemPinned ? (
              <PopoverStatic identifier={`unpin-${item.key}`}>
                <Button
                  type="button"
                  variant="hoverable"
                  color="text"
                  size="icon-sm"
                  label={String(unpinDictionaryLabel)}
                  aria-label={String(unpinDictionaryLabel)}
                  title={String(unpinDictionaryLabel)}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (isDictionaryItem && dictKey) {
                      onUnpinDictionary?.(dictKey);
                    } else if (isTagItem && tagKey) {
                      onUnpinTag?.(tagKey);
                    } else if (isEditorPageItem && editorPagePath) {
                      onUnpinEditorPage?.(editorPagePath);
                    }
                  }}
                  Icon={PinOff}
                />
                <PopoverStatic.Detail
                  identifier={`unpin-${item.key}`}
                  xAlign="end"
                >
                  <Container padding="sm" roundedSize="xl">
                    <span className="text-nowrap">{unpinDictionaryLabel}</span>
                  </Container>
                </PopoverStatic.Detail>
              </PopoverStatic>
            ) : (
              <>
                <PopoverStatic identifier={`remove-${item.key}`}>
                  <Button
                    type="button"
                    variant="hoverable"
                    color="text"
                    size="icon-sm"
                    label={removeFromSidebarLabel}
                    aria-label={removeFromSidebarLabel}
                    title={removeFromSidebarLabel}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (isDictionaryItem && dictKey) {
                        onUnpinDictionary?.(dictKey);
                        onRemoveDictionary?.(dictKey);
                      } else if (isTagItem && tagKey) {
                        onUnpinTag?.(tagKey);
                        onRemoveTag?.(tagKey);
                      } else if (isEditorPageItem && editorPagePath) {
                        onUnpinEditorPage?.(editorPagePath);
                        onRemoveEditorPage?.(editorPagePath);
                      }
                    }}
                    Icon={X}
                  />
                  <PopoverStatic.Detail
                    identifier={`remove-${item.key}`}
                    xAlign="end"
                  >
                    <Container padding="sm" roundedSize="xl">
                      <span className="text-nowrap">
                        {removeFromSidebarLabel}
                      </span>
                    </Container>
                  </PopoverStatic.Detail>
                </PopoverStatic>
                <PopoverStatic identifier={`pin-${item.key}`}>
                  <Button
                    type="button"
                    variant="hoverable"
                    color="text"
                    size="icon-sm"
                    label={pinDictionaryLabel}
                    aria-label={pinDictionaryLabel}
                    title={pinDictionaryLabel}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (isDictionaryItem && dictKey) {
                        onPinDictionary?.(dictKey);
                      } else if (isTagItem && tagKey) {
                        onPinTag?.(tagKey);
                      } else if (isEditorPageItem && editorPagePath) {
                        onPinEditorPage?.(editorPagePath);
                      }
                    }}
                    Icon={Pin}
                  />
                  <PopoverStatic.Detail
                    identifier={`pin-${item.key}`}
                    xAlign="end"
                  >
                    <Container padding="sm" roundedSize="xl">
                      <span className="text-nowrap">{pinDictionaryLabel}</span>
                    </Container>
                  </PopoverStatic.Detail>
                </PopoverStatic>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
);

export const DashboardSidebar: FC<DashboardSidebarProps> = ({
  className,
  items,
  onPinDictionary,
  onUnpinDictionary,
  onRemoveDictionary,
  onPinTag,
  onUnpinTag,
  onRemoveTag,
  onPinEditorPage,
  onUnpinEditorPage,
  onRemoveEditorPage,
  pinnedDictionaryKeys = [],
  pinnedTagKeys = [],
  pinnedEditorPageKeys = [],
}) => {
  const {
    collapseButton,
    dashboardNavigation,
    sidebarNavigation,
    environment,
    defaultEnv,
    switchToName,
    pinDictionary: pinDictionaryLabel,
    unpinDictionary: unpinDictionaryLabel,
    removeFromSidebar: removeFromSidebarLabel,
  } = useIntlayer('dashboard-sidebar');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isMobile } = useDevice();
  const { pathname } = useLocation();
  const { session } = useSession();
  const shouldReduceMotion = useReducedMotion();

  const {
    organization,
    project,
    environment: activeEnv,
    roles,
  } = session ?? {};
  const { mutate: selectEnvironment, isPending: isSelectingEnv } =
    useSelectEnvironment();
  const environments = project?.environments ?? [];
  const currentEnv =
    environments.find((env) => String(env.id) === String(activeEnv?.id)) ||
    environments.find((env) => env.isDefault) ||
    environments[0];
  const isSuperAdmin =
    roles?.some((role: string) => role.toLowerCase() === 'admin') ?? false;

  const filteredNavItems = filterItems(items, {
    hasOrganization: !!organization,
    hasProject: !!project,
    isSuperAdmin,
    isGithub: project?.repository?.provider === 'github',
  });

  const flatNavItems = flattenItems(filteredNavItems);

  const cleanPath = getCleanPath(getPathWithoutLocale(pathname));
  let activeKey = cleanPath;
  let maxLevel = -1;

  // Optimized active key lookup
  for (const item of flatNavItems) {
    if (item.href && getCleanPath(item.href) === cleanPath) {
      if (item.level > maxLevel) {
        maxLevel = item.level;
        activeKey = item.key;
      }
    }
  }

  if (isMobile) {
    return null;
  }

  return (
    <aside
      aria-label={dashboardNavigation.value}
      className={cn(
        'sticky top-0 z-40 shrink-0 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-54',
        className
      )}
    >
      <Container
        className="flex h-full flex-col p-2 transition-all duration-300"
        roundedSize="none"
        transparency="none"
      >
        <nav
          id="dashboard-sidebar-nav"
          aria-label={sidebarNavigation.value}
          className="mt-20 flex-1 overflow-y-auto"
        >
          <TabSelector
            selectedChoice={activeKey}
            key={flatNavItems.length}
            tabs={flatNavItems.map((item) => (
              <SidebarTabItem
                key={item.key}
                item={item}
                activeKey={activeKey}
                isCollapsed={isCollapsed}
                pinnedDictionaryKeys={pinnedDictionaryKeys}
                pinnedTagKeys={pinnedTagKeys}
                pinnedEditorPageKeys={pinnedEditorPageKeys}
                flatNavItems={flatNavItems}
                onPinDictionary={onPinDictionary}
                onUnpinDictionary={onUnpinDictionary}
                onRemoveDictionary={onRemoveDictionary}
                onPinTag={onPinTag}
                onUnpinTag={onUnpinTag}
                onRemoveTag={onRemoveTag}
                onPinEditorPage={onPinEditorPage}
                onUnpinEditorPage={onUnpinEditorPage}
                onRemoveEditorPage={onRemoveEditorPage}
                pinDictionaryLabel={String(pinDictionaryLabel)}
                unpinDictionaryLabel={String(unpinDictionaryLabel)}
                removeFromSidebarLabel={String(removeFromSidebarLabel)}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
            hoverable
            color="text"
            orientation="vertical"
            className="flex-col gap-1"
          />
        </nav>

        {!isCollapsed &&
          !IS_SELF_HOSTED &&
          process.env.NODE_ENV === 'development' && (
            <ReviewerMarketplaceBanner />
          )}

        {/* Environment switcher — shown when project has >1 environments */}
        {environments.length > 1 &&
          (isCollapsed ? (
            <div className="my-4 flex w-full justify-center border-text/10 border-b border-dotted pb-4">
              <DropDown identifier="environment-sidebar-collapsed">
                <DropDown.Trigger
                  identifier="environment-sidebar-collapsed"
                  size="icon-sm"
                  variant="outline"
                  color="text"
                  roundedSize="full"
                  className="border-none p-0!"
                  label={environment}
                >
                  <div className="flex items-center justify-center p-1">
                    <Layers className="size-4 text-neutral" />
                  </div>
                </DropDown.Trigger>
                <DropDown.Panel
                  identifier="environment-sidebar-collapsed"
                  isFocusable
                  isOverable
                  align="start"
                  yAlign="above"
                >
                  <Container
                    className="min-w-37.5 gap-1 border border-neutral/10"
                    transparency="xs"
                    padding="sm"
                    roundedSize="2xl"
                  >
                    {environments.map((env) => {
                      const isActive =
                        String(env.id) === String(activeEnv?.id) ||
                        (!activeEnv && env.isDefault);

                      return (
                        <Button
                          key={String(env.id)}
                          type="button"
                          onClick={() =>
                            !isActive &&
                            !isSelectingEnv &&
                            selectEnvironment(String(env.id))
                          }
                          label={switchToName({ name: env.name })}
                          disabled={isActive || isSelectingEnv}
                          isActive={isActive}
                          variant="hoverable"
                          color="text"
                          size="sm"
                          className="w-full justify-start"
                          Icon={
                            isActive
                              ? Check
                              : () => <span className="size-4"></span>
                          }
                        >
                          {env.name}
                          {env.isDefault && (
                            <Tag size="xs" color="text">
                              {defaultEnv}
                            </Tag>
                          )}
                        </Button>
                      );
                    })}
                  </Container>
                </DropDown.Panel>
              </DropDown>
            </div>
          ) : (
            <div className="my-4 flex w-full flex-col border-text/10 border-b border-dotted px-2 pb-4">
              <DropDown
                identifier="environment-sidebar-expanded"
                className="w-full min-w-0"
              >
                <DropDown.Trigger
                  identifier="environment-sidebar-expanded"
                  variant="hoverable"
                  color="neutral"
                  className="w-full min-w-0 p-1"
                  label={environment}
                >
                  <div className="flex w-full items-center gap-3 px-2 py-1">
                    <Layers className="size-4 shrink-0 text-neutral" />
                    <span className="flex-1 truncate text-left font-medium text-sm text-text">
                      {currentEnv?.name}
                    </span>
                    {currentEnv?.isDefault && (
                      <Tag size="sm" color="text">
                        {defaultEnv}
                      </Tag>
                    )}
                    <ChevronsUpDown className="size-4 shrink-0 text-neutral" />
                  </div>
                </DropDown.Trigger>
                <DropDown.Panel
                  identifier="environment-sidebar-expanded"
                  isFocusable
                  isOverable
                  align="end"
                  yAlign="above"
                >
                  <Container
                    className="min-w-40 gap-1 border border-neutral/10"
                    transparency="xs"
                    padding="sm"
                    roundedSize="2xl"
                  >
                    {environments.map((env) => {
                      const isActive =
                        String(env.id) === String(activeEnv?.id) ||
                        (!activeEnv && env.isDefault);

                      return (
                        <Button
                          key={String(env.id)}
                          type="button"
                          onClick={() =>
                            !isActive &&
                            !isSelectingEnv &&
                            selectEnvironment(String(env.id))
                          }
                          label={switchToName({ name: env.name })}
                          disabled={isActive || isSelectingEnv}
                          isActive={isActive}
                          variant="hoverable"
                          color="text"
                          size="sm"
                          className="w-full justify-start"
                          Icon={
                            isActive
                              ? Check
                              : () => <span className="size-4"></span>
                          }
                        >
                          {env.name}
                          {env.isDefault && (
                            <span className="ml-auto rounded bg-text/10 px-1 text-xs">
                              {defaultEnv}
                            </span>
                          )}
                        </Button>
                      );
                    })}
                  </Container>
                </DropDown.Panel>
              </DropDown>
            </div>
          ))}
        <div className="flex w-full justify-start">
          <PopoverStatic identifier="dashboard-nav-collapse" className="w-full">
            <Button
              Icon={() => (
                <ArrowLeftToLine
                  className={cn(
                    'size-4 transition-transform',
                    isCollapsed && 'rotate-180'
                  )}
                />
              )}
              className="w-full text-text/80"
              size={isCollapsed ? 'icon-lg' : 'md'}
              variant="hoverable"
              color="text"
              label={collapseButton.label}
              aria-expanded={!isCollapsed}
              aria-controls="dashboard-sidebar-nav"
              onClick={() => setIsCollapsed((prev) => !prev)}
            >
              {!isCollapsed && (
                <span className="ml-4 block w-full text-left">
                  {collapseButton.text}
                </span>
              )}
            </Button>

            <PopoverStatic.Detail identifier="dashboard-nav-collapse">
              <KeyboardShortcut
                shortcut="Alt + ArrowLeft"
                onTriggered={() => setIsCollapsed((prev) => !prev)}
                size="sm"
              />
            </PopoverStatic.Detail>
          </PopoverStatic>
        </div>

        <DashboardSidebarProfile isCollapsed={isCollapsed} />
      </Container>
    </aside>
  );
};
