'use client';

import { Button, Container, MaxWidthSmoother } from '@intlayer/design-system';
import { useDevice } from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import {
  ArrowLeftToLine,
  ArrowRightFromLine,
  Building2,
  FolderOpen,
  MessageCircle,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { PagesRoutes } from '@/Routes';

type AdminSidebarProps = {
  className?: string;
};

export const AdminSidebar: FC<AdminSidebarProps> = ({ className }) => {
  const { collapseButton, navigation } = useIntlayer('admin-sidebar');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isMobile } = useDevice('sm');
  const pathname = usePathname();

  const navigationItems = [
    {
      key: 'organizations',
      href: PagesRoutes.Admin_Organizations,
      icon: Building2,
      label: navigation.management.organizations.label.value,
      title: navigation.management.organizations.title,
    },
    {
      key: 'projects',
      href: PagesRoutes.Admin_Projects,
      icon: FolderOpen,
      label: navigation.management.projects.label.value,
      title: navigation.management.projects.title,
    },
    {
      key: 'users',
      href: PagesRoutes.Admin_Users,
      icon: Users,
      label: navigation.management.users.label.value,
      title: navigation.management.users.title,
    },
    {
      key: 'discussions',
      href: PagesRoutes.Admin_Discussions,
      icon: MessageCircle,
      label: navigation.management.discussions.label.value,
      title: navigation.management.discussions.title,
    },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside>
      <Container
        className={cn('h-full p-4', className)}
        roundedSize="none"
        transparency="none"
      >
        <div className="sticky top-32">
          {!isMobile && (
            <div className="mb-10 flex w-full justify-end">
              <Button
                Icon={isCollapsed ? ArrowRightFromLine : ArrowLeftToLine}
                size="icon-md"
                variant="hoverable"
                className="p-3"
                color="text"
                label={collapseButton.label.value}
                onClick={() => setIsCollapsed((prev) => !prev)}
              />
            </div>
          )}

          <nav className="flex-1 overflow-y-auto">
            <ul className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center rounded-lg px-3 py-2 transition-colors hover:bg-current/10',
                      isActiveRoute(item.href) && 'bg-current/10'
                    )}
                    aria-label={item.label}
                  >
                    <item.icon className="size-4" />
                    <MaxWidthSmoother
                      isHidden={Boolean(isCollapsed || isMobile)}
                    >
                      <span className="ml-3">{item.title}</span>
                    </MaxWidthSmoother>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </aside>
  );
};
