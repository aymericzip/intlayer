'use client';

import { Link } from '@components/Link/Link';
import { Button, Container, TabSelector } from '@intlayer/design-system';
import { useDevice, useSession } from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftToLine,
  ArrowRightFromLine,
  Book,
  Building2,
  FileText,
  FolderKanban,
  type LucideIcon,
  PenTool,
  Shield,
  Tags,
  User,
} from 'lucide-react';
import { useLocale } from 'next-intlayer';
import { type FC, useState } from 'react';
import { type ExternalLinks, PagesRoutes } from '@/Routes';

// Map icon names to components - must be done in client component
const iconMap: Record<string, LucideIcon> = {
  PenTool,
  Book,
  FileText,
  Tags,
  FolderKanban,
  Building2,
  User,
  Shield,
};

const shouldHaveOrganizationRoutes = [
  PagesRoutes.Dashboard_Projects,
  PagesRoutes.Dashboard_Tags,
] as string[];

const shouldHaveProjectRoutes = [
  PagesRoutes.Dashboard_Editor,
  PagesRoutes.Dashboard_Content,
  PagesRoutes.Dashboard_Tags,
] as string[];

const shouldHaveAdminRoutes = [PagesRoutes.Admin_Users] as string[];

export type SidebarNavigationItem = {
  key: string;
  href?: string | PagesRoutes | ExternalLinks;
  icon?: keyof typeof iconMap;
  label: string;
  title: string;
  items?: SidebarNavigationItem[];
};

export type DashboardSidebarProps = {
  className?: string;
  items: SidebarNavigationItem[];
  collapseButtonLabel: string;
};

const getCleanPath = (path: string): string => {
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

type FlatSidebarItem = SidebarNavigationItem & {
  level: number;
  isLastChild?: boolean;
};

const filterItems = (
  nodes: SidebarNavigationItem[],
  context: {
    hasOrganization: boolean;
    hasProject: boolean;
    isSuperAdmin: boolean;
  }
): SidebarNavigationItem[] => {
  return (
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
      })
  );
};

const flattenItems = (
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
  collapseButtonLabel,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isMobile } = useDevice('sm');
  const { pathWithoutLocale } = useLocale();
  const { session } = useSession();

  const { organization, project, roles } = session ?? {};
  const isSuperAdmin =
    roles?.some((role: string) => role.toLowerCase() === 'admin') ?? false;

  // Filter navigation items based on session context
  const filteredNavItems = filterItems(items, {
    hasOrganization: !!organization,
    hasProject: !!project,
    isSuperAdmin,
  });

  const flatNavItems = flattenItems(filteredNavItems);

  const cleanPath = getCleanPath(pathWithoutLocale);
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
    return (
      <nav className="fixed inset-x-0 bottom-0 z-50 border-neutral-200 border-t bg-card/80 px-2 py-2 backdrop-blur-sm dark:border-neutral-800">
        <TabSelector
          selectedChoice={activeKey}
          tabs={flatNavItems.map((item) => {
            const IconComponent = item.icon ? iconMap[item.icon] : null;

            return (
              <Link
                key={item.key}
                href={item.href ?? '#'}
                label={item.label}
                color="text"
                variant="invisible-link"
                className="flex flex-col items-center gap-1 px-2 py-1.5"
                aria-current={activeKey === item.key ? 'page' : undefined}
              >
                {IconComponent && <IconComponent className="size-5" />}
                <span className="text-[10px]">{item.title}</span>
              </Link>
            );
          })}
          hoverable
          color="text"
          className="justify-around"
        />
      </nav>
    );
  }

  // Desktop: render sidebar
  return (
    <aside
      className={cn(
        'sticky top-0 z-40 shrink-0 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-54',
        className
      )}
    >
      <Container
        className={cn(
          'flex h-full flex-col transition-all duration-300',
          isCollapsed ? 'p-2' : 'p-4'
        )}
        roundedSize="none"
        transparency="none"
      >
        <div
          className={cn(
            'mb-6 flex w-full',
            isCollapsed ? 'justify-center' : 'justify-end'
          )}
        >
          <Button
            Icon={isCollapsed ? ArrowRightFromLine : ArrowLeftToLine}
            size="icon-md"
            variant="hoverable"
            className="p-3"
            color="text"
            label={collapseButtonLabel}
            onClick={() => setIsCollapsed((prev) => !prev)}
          />
        </div>

        <nav className="flex-1 overflow-y-auto">
          <TabSelector
            selectedChoice={activeKey}
            tabs={flatNavItems.map((item) => {
              const IconComponent = item.icon ? iconMap[item.icon] : null;
              const isChild = item.level > 0;

              return (
                <Link
                  key={item.key}
                  href={item.href ?? '#'}
                  label={item.label}
                  color="text"
                  variant="invisible-link"
                  className={cn(
                    'relative flex w-full items-center justify-center rounded-lg px-2 py-2',
                    !isCollapsed && 'justify-start gap-3 px-4',
                    // Indentation
                    !isCollapsed && isChild && 'pl-10'
                  )}
                  aria-current={activeKey === item.key ? 'page' : undefined}
                >
                  {/* Tree Visuals */}
                  {!isCollapsed && isChild && (
                    <div className="absolute top-0 left-4 h-full w-4 scale-110">
                      <div className="pointer-events-none relative h-full w-4">
                        <div className="absolute top-0 left-0 h-1/2 w-3 rounded-bl-lg border-text/60 border-b border-l" />
                        {!item.isLastChild && (
                          <div className="absolute top-1/2 left-0 h-1/2 w-px bg-text/60" />
                        )}
                      </div>
                    </div>
                  )}

                  {IconComponent && (
                    <IconComponent className="size-4 shrink-0" />
                  )}
                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden truncate whitespace-nowrap"
                      >
                        {item.title}
                      </motion.span>
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
      </Container>
    </aside>
  );
};
