import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { useDevice, useSession } from '@intlayer/design-system/hooks';
import { KeyboardShortcut } from '@intlayer/design-system/keyboard-shortcut';
import { PopoverStatic } from '@intlayer/design-system/popover';
import {
  App_Admin_Discussions_Path,
  App_Admin_Organizations_Path,
  App_Admin_Projects_Path,
  App_Admin_Users_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_IDE_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Translate_Path,
} from '@intlayer/design-system/routes';
import { TabSelector } from '@intlayer/design-system/tab-selector';
import { cn } from '@intlayer/design-system/utils';
import { useLocation } from '@tanstack/react-router';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { getPathWithoutLocale } from 'intlayer';
import {
  ArrowLeftToLine,
  Book,
  Building2,
  FileText,
  FolderKanban,
  Globe,
  type LucideIcon,
  MessageSquare,
  PenTool,
  Shield,
  SquareCode,
  Tags,
  User,
} from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { DashboardSidebarProfile } from './DashboardSidebarProfile';

// Map icon names to components - must be done in client component
export const iconMap: Record<string, LucideIcon> = {
  PenTool,
  Book,
  FileText,
  Tags,
  FolderKanban,
  Building2,
  User,
  Shield,
  Globe,
  SquareCode,
  MessageSquare,
};

export const shouldHaveOrganizationRoutes = [
  App_Dashboard_Projects_Path,
  App_Dashboard_Tags_Path,
] as string[];

export const shouldHaveProjectRoutes = [
  App_Dashboard_Editor_Path,
  App_Dashboard_Translate_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_IDE_Path,
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

export const DashboardSidebar: FC<DashboardSidebarProps> = ({
  className,
  items,
}) => {
  const { collapseButton } = useIntlayer('dashboard-sidebar');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isMobile } = useDevice();
  const { pathname } = useLocation();
  const { session } = useSession();
  const shouldReduceMotion = useReducedMotion();

  const { organization, project, roles } = session ?? {};
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
        <nav className="mt-20 flex-1 overflow-y-auto">
          <TabSelector
            selectedChoice={activeKey}
            key={flatNavItems.length}
            tabs={flatNavItems.map((item) => {
              const IconComponent = item.icon
                ? (iconMap[item.icon] ?? null)
                : null;
              const isChild = item.level > 0;

              return (
                <Link
                  key={item.key}
                  to={item.href ?? '#'}
                  label={item.label}
                  color="text"
                  variant="invisible-link"
                  preload="intent"
                  className={cn(
                    'relative flex w-full items-center justify-center rounded-lg px-2 py-2 aria-[current]:bg-current/0',
                    !isCollapsed && 'justify-start gap-3 px-4',
                    // Indentation
                    !isCollapsed && isChild && 'pl-10'
                  )}
                  isActive={activeKey === item.key}
                >
                  {/* Tree Visuals */}
                  {!isCollapsed && isChild && (
                    <div className="absolute top-0 left-4 h-full w-4 scale-110">
                      <div className="pointer-events-none relative h-full w-4">
                        <div className="absolute top-0 left-0 h-1/2 w-3 rounded-bl-lg border-neutral/80 border-b border-l" />
                        {!item.isLastChild && (
                          <div className="absolute top-1/2 left-0 h-1/2 w-px bg-neutral/80" />
                        )}
                      </div>
                    </div>
                  )}

                  {IconComponent && (
                    <IconComponent className="size-4 shrink-0" />
                  )}
                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <m.span
                        initial={
                          shouldReduceMotion ? false : { opacity: 0, width: 0 }
                        }
                        animate={
                          shouldReduceMotion
                            ? false
                            : { opacity: 1, width: 'auto' }
                        }
                        exit={
                          shouldReduceMotion
                            ? undefined
                            : { opacity: 0, width: 0 }
                        }
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
              );
            })}
            hoverable
            color="text"
            orientation="vertical"
            className="flex-col gap-1"
          />
        </nav>

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
              className="w-full"
              size={isCollapsed ? 'icon-lg' : 'md'}
              variant="hoverable"
              color="text"
              label={collapseButton.label}
              onClick={() => setIsCollapsed((prev) => !prev)}
            >
              {!isCollapsed && (
                <span className="w-full">{collapseButton.text}</span>
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
