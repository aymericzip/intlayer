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
  App_Dashboard_Analytics_Path,
  App_Dashboard_Assets_Path,
  App_Dashboard_Collections_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_IDE_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Scanner_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Translate_Path,
  App_Dashboard_Variants_Path,
  App_Home_Path,
} from '@intlayer/design-system/routes';
import { TabSelector } from '@intlayer/design-system/tab-selector';
import { Tag } from '@intlayer/design-system/tag';
import { cn } from '@intlayer/design-system/utils';
import { useLocation } from '@tanstack/react-router';
import { AnimatePresence, m } from 'framer-motion';
import { getPathWithoutLocale } from 'intlayer';
import {
  ArrowLeftToLine,
  BarChart3,
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
  Ellipsis,
  Pencil,
  ScanLine,
  Shield,
  Shapes,
  SquareCode,
  Tags,
  User,
  X,
} from 'lucide-react';
import {
  type DragEvent,
  type FC,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { IS_SELF_HOSTED } from '#utils/selfHosted';
import {
  type DropPlacement,
  isDraggableItem,
  resolveSidebarMove,
  type SidebarMoveResult,
} from '#utils/sidebarLayout';
import { DashboardSidebarProfile } from './DashboardSidebarProfile';
import { ReviewerMarketplaceBanner } from './ReviewerMarketplaceBanner';

// Map icon names to components - must be done in client component
export const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  PenTool,
  Book,
  FileText,
  Tags,
  Layers,
  Shapes,
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
  BarChart3,
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
  App_Dashboard_Collections_Path,
  App_Dashboard_Variants_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_IDE_Path,
  App_Dashboard_Scanner_Path,
  App_Dashboard_Assets_Path,
  App_Dashboard_Analytics_Path,
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
  description?: string;
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
  /**
   * Item keys (`dictionary-…`, `tag-…`, `editor-page-…`) of every pinned
   * entry. Pinned entries and top-level items can be dragged to reorder.
   */
  pinnedItemKeys?: ReadonlySet<string>;
  /** Called with the persisted changes implied by a drag-and-drop. */
  onMoveResult?: (result: SidebarMoveResult) => void;
  /** Called with a pinned item's new title; blank restores the original. */
  onRenameItem?: (itemKey: string, label: string) => void;
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

/** Stable default so the prop never changes identity between renders. */
const EMPTY_PINNED_ITEM_KEYS: ReadonlySet<string> = new Set();

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

/** Horizontal offset (px) of the level 2+ branch from the level 1 trunk */
const TREE_NESTED_BRANCH_OFFSET = 24;
/** Corner radius (px) of the branch elbow */
const TREE_ELBOW_RADIUS = 8;
/** Horizontal length (px) of the branch, measured from its trunk */
const TREE_BRANCH_LENGTH = 12;
/** Path length (px) long enough to reach the row edge; clipped by the svg */
const TREE_FULL_EXTENT = 999;

type SidebarTreeConnectorProps = {
  level: number;
  isLastChild: boolean;
  /** Draw the level 1 trunk through the row (level 2+ under a non-last parent) */
  hasParentContinuation: boolean;
};

/**
 * Tree lines of a sidebar child row, drawn as a single SVG.
 *
 * Stacked bordered divs left sub-pixel seams between segments, so every
 * segment is an svg stroke. Paths are drawn from the vertical center (group
 * translated by 50% of the svg height) and overflow to the row edges, where
 * the svg clips them. The svg overhangs the row by 2px on each side to bridge
 * the `gap-1` between rows. Group opacity keeps overlapping strokes uniform.
 */
const SidebarTreeConnector: FC<SidebarTreeConnectorProps> = ({
  level,
  isLastChild,
  hasParentContinuation,
}) => {
  const branchX = (level >= 2 ? TREE_NESTED_BRANCH_OFFSET : 0) + 0.5;
  const elbowPath = [
    `M${branchX} ${-TREE_FULL_EXTENT}`,
    `V${-TREE_ELBOW_RADIUS}`,
    `A${TREE_ELBOW_RADIUS} ${TREE_ELBOW_RADIUS} 0 0 0 ${branchX + TREE_ELBOW_RADIUS} 0`,
    `H${branchX + TREE_BRANCH_LENGTH}`,
  ].join(' ');

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-s-4 -top-0.5 h-[calc(100%+4px)] w-10 text-neutral opacity-70 rtl:-scale-x-100"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
    >
      <g style={{ transformBox: 'view-box', transform: 'translateY(50%)' }}>
        {hasParentContinuation && (
          <path d={`M0.5 ${-TREE_FULL_EXTENT} V${TREE_FULL_EXTENT}`} />
        )}
        <path d={elbowPath} />
        {!isLastChild && (
          <path d={`M${branchX} ${-TREE_ELBOW_RADIUS} V${TREE_FULL_EXTENT}`} />
        )}
      </g>
    </svg>
  );
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
  renameLabel: string;
  moreActionsLabel: string;
  onRenameItem?: (itemKey: string, label: string) => void;
  shouldReduceMotion?: boolean;
  isDraggable: boolean;
  /** Placement indicator shown while a valid drop hovers this row. */
  dropPlacement: DropPlacement | null;
  onItemDragStart: (itemKey: string) => void;
  onItemDragOver: (event: DragEvent<HTMLElement>, itemKey: string) => void;
  onItemDrop: (event: DragEvent<HTMLElement>, itemKey: string) => void;
  onItemDragEnd: () => void;
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
      renameLabel,
      moreActionsLabel,
      onRenameItem,
      shouldReduceMotion,
      isDraggable,
      dropPlacement,
      onItemDragStart,
      onItemDragOver,
      onItemDrop,
      onItemDragEnd,
      ...props
    },
    ref
  ) => {
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

    let FallbackIcon: LucideIcon | null = null;
    if (isDictionaryItem) FallbackIcon = Book;
    else if (isTagItem) FallbackIcon = Tags;
    else if (isEditorPageItem) FallbackIcon = FileText;

    const IconComponent = item.icon
      ? (iconMap[item.icon] ?? null)
      : FallbackIcon;
    const isChild = item.level > 0;
    const [isRenaming, setIsRenaming] = useState(false);
    const renameInputRef = useRef<HTMLInputElement>(null);
    const isRenameCancelledRef = useRef(false);

    useEffect(() => {
      if (isRenaming) renameInputRef.current?.focus();
    }, [isRenaming]);

    /** Closes the CSS-driven dropdown by dropping focus from its panel. */
    const closeMenu = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };

    const isPinnableItem = isDictionaryItem || isTagItem || isEditorPageItem;
    const isItemPinned =
      isDictItemPinned || isTagItemPinned || isEditorPageItemPinned;

    const pinItem = () => {
      if (isDictionaryItem && dictKey) onPinDictionary?.(dictKey);
      else if (isTagItem && tagKey) onPinTag?.(tagKey);
      else if (isEditorPageItem && editorPagePath) {
        onPinEditorPage?.(editorPagePath);
      }
    };

    const unpinItem = () => {
      if (isDictionaryItem && dictKey) onUnpinDictionary?.(dictKey);
      else if (isTagItem && tagKey) onUnpinTag?.(tagKey);
      else if (isEditorPageItem && editorPagePath) {
        onUnpinEditorPage?.(editorPagePath);
      }
    };

    const removeItem = () => {
      unpinItem();
      if (isDictionaryItem && dictKey) onRemoveDictionary?.(dictKey);
      else if (isTagItem && tagKey) onRemoveTag?.(tagKey);
      else if (isEditorPageItem && editorPagePath) {
        onRemoveEditorPage?.(editorPagePath);
      }
    };

    // Find index in flatNavItems to determine parent level-1 item and whether we need a straight line at inset-s-4
    const currentIndex = flatNavItems.findIndex((x) => x.key === item.key);
    let parentLevel1: FlatSidebarItem | null = null;
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (flatNavItems[i].level === 1) {
        parentLevel1 = flatNavItems[i];
        break;
      }
    }

    return (
      <div
        ref={ref}
        className="group relative w-full"
        {...props}
        draggable={isDraggable && !isCollapsed && !isRenaming}
        onDragStart={(event) => {
          event.dataTransfer.effectAllowed = 'move';
          event.dataTransfer.setData('text/plain', item.key);
          onItemDragStart(item.key);
        }}
        onDragOver={(event) => onItemDragOver(event, item.key)}
        onDrop={(event) => onItemDrop(event, item.key)}
        onDragEnd={onItemDragEnd}
      >
        {dropPlacement && (
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-x-2 z-20 h-0.5 rounded-full bg-text',
              dropPlacement === 'before' ? '-top-1' : '-bottom-1'
            )}
          />
        )}
        <Link
          to={item.href ?? '#'}
          label={item.label}
          title={
            item.description
              ? `${item.title}\n\n${item.description}`
              : item.title
          }
          color="text"
          variant="invisible-link"
          preload="viewport"
          className={cn(
            'relative flex w-full items-center justify-center rounded-lg px-2 py-2 text-text/80 aria-[current]:bg-current/0',
            !isCollapsed && 'justify-start gap-3 px-4',
            // Indentation by level
            !isCollapsed && item.level === 1 && 'ps-10',
            !isCollapsed && item.level >= 2 && 'ps-16',
            // Leave room for pin/unpin/remove buttons
            !isCollapsed && isPinnableItem && 'pe-16'
          )}
          isActive={activeKey === item.key}
          draggable={false}
        >
          {!isCollapsed && isChild && (
            <SidebarTreeConnector
              level={item.level}
              isLastChild={Boolean(item.isLastChild)}
              hasParentContinuation={
                item.level >= 2 &&
                parentLevel1 !== null &&
                !parentLevel1.isLastChild
              }
            />
          )}

          <div className="relative flex items-center justify-center">
            {IconComponent && <IconComponent className="size-4 shrink-0" />}
            {isCollapsed && isItemPinned && (
              <Pin className="absolute -top-2 -right-2 size-3 text-text/60" />
            )}
          </div>

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
                className="truncate overflow-hidden whitespace-nowrap"
              >
                {item.title}
              </m.span>
            )}
          </AnimatePresence>
        </Link>

        {isRenaming && (
          <input
            ref={renameInputRef}
            aria-label={renameLabel}
            defaultValue={item.title}
            onFocus={(event) => event.currentTarget.select()}
            onBlur={(event) => {
              if (!isRenameCancelledRef.current) {
                onRenameItem?.(item.key, event.currentTarget.value);
              }
              isRenameCancelledRef.current = false;
              setIsRenaming(false);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') event.currentTarget.blur();
              if (event.key === 'Escape') {
                isRenameCancelledRef.current = true;
                event.currentTarget.blur();
              }
            }}
            className={cn(
              'absolute inset-y-1 inset-e-2 z-20 rounded-md border border-text/30 bg-background px-2 text-text outline-none focus:border-text',
              item.level === 0 && 'inset-s-11',
              item.level === 1 && 'inset-s-16',
              item.level >= 2 && 'inset-s-20'
            )}
          />
        )}

        {/* Actions menu — shown on hover */}
        {!isCollapsed && isPinnableItem && (
          <div className="absolute inset-e-2 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
            <DropDown identifier={`item-actions-${item.key}`}>
              <DropDown.Trigger
                identifier={`item-actions-${item.key}`}
                variant="hoverable"
                color="text"
                size="icon-sm"
                label={moreActionsLabel}
                aria-label={moreActionsLabel}
                title={moreActionsLabel}
                Icon={Ellipsis}
              />
              <DropDown.Panel
                identifier={`item-actions-${item.key}`}
                isFocusable
                align="end"
              >
                <Container
                  className="min-w-40 gap-1 border border-neutral/10"
                  transparency="xs"
                  padding="sm"
                  roundedSize="2xl"
                >
                  {isItemPinned && (
                    <Button
                      type="button"
                      variant="hoverable"
                      color="text"
                      size="sm"
                      className="w-full justify-start"
                      label={renameLabel}
                      Icon={Pencil}
                      onClick={() => {
                        closeMenu();
                        setIsRenaming(true);
                      }}
                    >
                      {renameLabel}
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="hoverable"
                    color="text"
                    size="sm"
                    className="w-full justify-start"
                    label={
                      isItemPinned ? unpinDictionaryLabel : pinDictionaryLabel
                    }
                    Icon={isItemPinned ? PinOff : Pin}
                    onClick={() => {
                      closeMenu();
                      if (isItemPinned) unpinItem();
                      else pinItem();
                    }}
                  >
                    {isItemPinned ? unpinDictionaryLabel : pinDictionaryLabel}
                  </Button>
                  {!isItemPinned && (
                    <Button
                      type="button"
                      variant="hoverable"
                      color="text"
                      size="sm"
                      className="w-full justify-start"
                      label={removeFromSidebarLabel}
                      Icon={X}
                      onClick={() => {
                        closeMenu();
                        removeItem();
                      }}
                    >
                      {removeFromSidebarLabel}
                    </Button>
                  )}
                </Container>
              </DropDown.Panel>
            </DropDown>
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
  pinnedItemKeys = EMPTY_PINNED_ITEM_KEYS,
  onMoveResult,
  onRenameItem,
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
    renamePinnedItem: renameLabel,
    moreActions: moreActionsLabel,
  } = useIntlayer('dashboard-sidebar');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const draggedKeyRef = useRef<string | null>(null);
  const [dropIndicator, setDropIndicator] = useState<{
    key: string;
    placement: DropPlacement;
  } | null>(null);
  const { isMobile } = useDevice();
  const { pathname } = useLocation();
  const { session } = useSession();

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

  const getDropPlacement = (
    event: DragEvent<HTMLElement>,
    targetKey: string
  ): DropPlacement | null => {
    const draggedKey = draggedKeyRef.current;
    if (!draggedKey) return null;

    const { top, height } = event.currentTarget.getBoundingClientRect();
    const placement: DropPlacement =
      event.clientY < top + height / 2 ? 'before' : 'after';

    return resolveSidebarMove({
      arrangedItems: items,
      pinnedItemKeys,
      draggedKey,
      targetKey,
      placement,
    })
      ? placement
      : null;
  };

  const resetDrag = () => {
    draggedKeyRef.current = null;
    setDropIndicator(null);
  };

  const handleItemDragOver = (
    event: DragEvent<HTMLElement>,
    targetKey: string
  ) => {
    const placement = getDropPlacement(event, targetKey);

    if (!placement) {
      setDropIndicator(null);
      return;
    }

    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDropIndicator((previous) =>
      previous?.key === targetKey && previous.placement === placement
        ? previous
        : { key: targetKey, placement }
    );
  };

  const handleItemDrop = (event: DragEvent<HTMLElement>, targetKey: string) => {
    const draggedKey = draggedKeyRef.current;
    const placement = getDropPlacement(event, targetKey);
    resetDrag();

    if (!draggedKey || !placement) return;
    event.preventDefault();

    const result = resolveSidebarMove({
      arrangedItems: items,
      pinnedItemKeys,
      draggedKey,
      targetKey,
      placement,
    });

    if (result) onMoveResult?.(result);
  };

  if (isMobile) {
    return null;
  }

  return (
    <aside
      aria-label={dashboardNavigation.value}
      className={cn(
        'sticky top-0 z-40 shrink-0 transition-all duration-300',
        isCollapsed ? 'max-w-16' : 'max-w-72',
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
                renameLabel={String(renameLabel)}
                moreActionsLabel={String(moreActionsLabel)}
                onRenameItem={onRenameItem}
                isDraggable={isDraggableItem(item, pinnedItemKeys)}
                dropPlacement={
                  dropIndicator?.key === item.key
                    ? dropIndicator.placement
                    : null
                }
                onItemDragStart={(itemKey) => {
                  draggedKeyRef.current = itemKey;
                }}
                onItemDragOver={handleItemDragOver}
                onItemDrop={handleItemDrop}
                onItemDragEnd={resetDrag}
              />
            ))}
            hoverable
            color="text"
            orientation="vertical"
            className="flex-col gap-1"
          />
        </nav>

        {!isCollapsed && !IS_SELF_HOSTED && import.meta.env.DEV && (
          <ReviewerMarketplaceBanner />
        )}

        {/* Environment switcher — shown when project has >1 environments */}
        {environments.length > 1 &&
          (isCollapsed ? (
            <div className="my-4 flex w-full justify-center border-b border-dotted border-text/10 pb-4">
              <DropDown identifier="environment-sidebar-collapsed">
                <DropDown.Trigger
                  identifier="environment-sidebar-collapsed"
                  size="icon-sm"
                  variant="outline"
                  color="text"
                  roundedSize="full"
                  className="border-none p-0!"
                  label={environment.value}
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
                          key={env.id}
                          type="button"
                          onClick={() =>
                            !isActive &&
                            !isSelectingEnv &&
                            selectEnvironment(env.id)
                          }
                          label={switchToName({ name: env.name }).value}
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
            <div className="my-4 flex w-full flex-col border-b border-dotted border-text/10 px-2 pb-4">
              <DropDown
                identifier="environment-sidebar-expanded"
                className="w-full min-w-0"
              >
                <DropDown.Trigger
                  identifier="environment-sidebar-expanded"
                  variant="hoverable"
                  color="neutral"
                  className="w-full min-w-0 p-1"
                  label={environment.value}
                >
                  <div className="flex w-full items-center gap-3 px-2 py-1">
                    <Layers className="size-4 shrink-0 text-neutral" />
                    <span className="flex-1 truncate text-start text-sm font-medium text-text">
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
                          label={switchToName({ name: env.name }).value}
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
                            <span className="ms-auto rounded bg-text/10 px-1 text-xs">
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
              label={collapseButton.label.value}
              aria-expanded={!isCollapsed}
              aria-controls="dashboard-sidebar-nav"
              onClick={() => setIsCollapsed((prev) => !prev)}
            >
              {!isCollapsed && (
                <span className="ms-4 block w-full text-start">
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
