'use client';

import { Link } from '@components/Link/Link';
import {
  Button,
  Container,
  TabSelector,
  TabSelectorColor,
} from '@intlayer/design-system';
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
import { usePathname } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

type AdminTabBarProps = {
  className?: string;
};

export const AdminTabBar: FC<AdminTabBarProps> = ({ className }) => {
  const { navigation } = useIntlayer('admin-sidebar');
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

  const activeItem = navigationItems.find((item) => isActiveRoute(item.href));
  const selectedChoice = activeItem?.key ?? navigationItems[0]?.key ?? '';

  const tabs = navigationItems.map((item) => (
    <Link
      key={item.key}
      href={item.href}
      label={item.label}
      color="text"
      variant="invisible-link"
      roundedSize="2xl"
      className="relative flex items-center px-3 py-2 transition-colors"
      aria-label={item.label}
    >
      <item.icon className="size-4 min-w-4 shrink-0" />
      <span className="truncate transition-all duration-500 ease-in-out">
        {item.title}
      </span>
    </Link>
  ));

  return (
    <nav>
      <Container
        className={cn('m-auto w-auto border-text/20 border-b p-4', className)}
        roundedSize="none"
        transparency="full"
      >
        <TabSelector
          selectedChoice={selectedChoice}
          tabs={tabs}
          hoverable
          color={TabSelectorColor.TEXT}
          orientation="horizontal"
          className="gap-1"
        />
      </Container>
    </nav>
  );
};
