'use client';

import { Link } from '@components/Link/Link';
import { Button, Container, TabSelector } from '@intlayer/design-system';
import { useDevice, useSession } from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftToLine,
  ArrowRightFromLine,
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
  href: string | PagesRoutes | ExternalLinks;
  icon: keyof typeof iconMap;
  label: string;
  title: string;
};

export type DashboardSidebarProps = {
  className?: string;
  items: SidebarNavigationItem[];
  collapseButtonLabel: string;
};

const getCleanPath = (path: string): string => {
  // Remove leading "/" if present
  if (path.startsWith('/')) {
    path = path.substring(1);
  }

  // Split the path into components
  const components = path.split('/');

  // If more than two components, keep only the first two
  if (components.length > 2) {
    return components.slice(0, 2).join('/');
  }

  // For single component "dashboard", you can choose to append "/"
  if (components.length === 1 && components[0] === 'dashboard') {
    return components[0];
  }

  // Return the path as is for other cases
  return path;
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
  const filteredNavItems = items
    .filter(
      (el) => !shouldHaveOrganizationRoutes.includes(el.href) || !!organization
    )
    .filter((el) => !shouldHaveProjectRoutes.includes(el.href) || !!project)
    .filter((el) => !shouldHaveAdminRoutes.includes(el.href) || isSuperAdmin);

  const selectedPath = getCleanPath(pathWithoutLocale);

  // Mobile: render bottom navigation
  if (isMobile) {
    return (
      <nav className="fixed inset-x-0 bottom-0 z-50 border-neutral-200 border-t bg-card/80 px-2 py-2 backdrop-blur-sm dark:border-neutral-800">
        <TabSelector
          selectedChoice={selectedPath}
          tabs={filteredNavItems.map((item) => {
            const IconComponent = iconMap[item.icon];

            return (
              <Link
                key={getCleanPath(item.href)}
                href={item.href}
                label={item.label}
                color="text"
                variant="invisible-link"
                className="flex flex-col items-center gap-1 px-2 py-1.5"
                aria-current={
                  selectedPath === getCleanPath(item.href) ? 'page' : undefined
                }
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
            selectedChoice={selectedPath}
            tabs={filteredNavItems.map((item) => {
              const IconComponent = iconMap[item.icon];
              return (
                <Link
                  key={getCleanPath(item.href)}
                  href={item.href}
                  label={item.label}
                  color="text"
                  variant="invisible-link"
                  className={cn(
                    'flex w-full items-center justify-center rounded-lg px-2 py-2',
                    !isCollapsed && 'justify-start gap-3 px-3'
                  )}
                  aria-current={
                    selectedPath === getCleanPath(item.href)
                      ? 'page'
                      : undefined
                  }
                >
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
