import { Container } from '@intlayer/design-system/container';
import {
  App_Admin_Affiliate_Path,
  App_Admin_Discussions_Path,
  App_Admin_Organizations_Path,
  App_Admin_Projects_Path,
  App_Admin_PromoCodes_Path,
  App_Admin_Reviewers_Path,
  App_Admin_Users_Path,
} from '@intlayer/design-system/routes';
import {
  TabSelector,
  TabSelectorColor,
} from '@intlayer/design-system/tab-selector';
import { cn } from '@intlayer/design-system/utils';
import { useLocation } from '@tanstack/react-router';
import { getPathWithoutLocale } from 'intlayer';
import {
  Building2,
  FolderOpen,
  HandCoins,
  Languages,
  MessageCircle,
  Ticket,
  Users,
} from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';

type AdminTabBarProps = {
  className?: string;
};

export const AdminTabBar: FC<AdminTabBarProps> = ({ className }) => {
  const { navigation, adminSectionNavigation } = useIntlayer('admin-sidebar');
  const { pathname } = useLocation();

  const navigationItems = [
    {
      key: 'organizations',
      href: App_Admin_Organizations_Path,
      icon: Building2,
      label: navigation.management.organizations.label.value,
      title: navigation.management.organizations.title,
    },
    {
      key: 'projects',
      href: App_Admin_Projects_Path,
      icon: FolderOpen,
      label: navigation.management.projects.label.value,
      title: navigation.management.projects.title,
    },
    {
      key: 'users',
      href: App_Admin_Users_Path,
      icon: Users,
      label: navigation.management.users.label.value,
      title: navigation.management.users.title,
    },
    {
      key: 'discussions',
      href: App_Admin_Discussions_Path,
      icon: MessageCircle,
      label: navigation.management.discussions.label.value,
      title: navigation.management.discussions.title,
    },
    {
      key: 'affiliate',
      href: App_Admin_Affiliate_Path,
      icon: HandCoins,
      label: (navigation.management as any).affiliate.label.value,
      title: (navigation.management as any).affiliate.title,
    },
    {
      key: 'promo-code',
      href: App_Admin_PromoCodes_Path,
      icon: Ticket,
      label: (navigation.management as any).promoCodes.label.value,
      title: (navigation.management as any).promoCodes.title,
    },
    {
      key: 'reviewers',
      href: App_Admin_Reviewers_Path,
      icon: Languages,
      label: (navigation.management as any).reviewers.label.value,
      title: (navigation.management as any).reviewers.title,
    },
  ];

  const isActiveRoute = (href: string) => {
    return getPathWithoutLocale(pathname).startsWith(href);
  };

  const activeItem = navigationItems.find((item) => isActiveRoute(item.href));
  const selectedChoice = activeItem?.key ?? navigationItems[0]?.key ?? '';

  const tabs = navigationItems.map((item) => (
    <Link
      key={item.key}
      to={item.href}
      label={item.label}
      color="text"
      variant="invisible-link"
      roundedSize="2xl"
      className="relative flex items-center px-3 py-2 transition-colors aria-[current]:bg-current/0!"
      aria-label={item.label}
    >
      <item.icon className="size-4 min-w-4 shrink-0" />
      <span className="truncate transition-all duration-500 ease-in-out">
        {item.title.value}
      </span>
    </Link>
  ));

  return (
    <nav aria-label={adminSectionNavigation.value} className="relative ml-auto">
      <Container
        className={cn('m-auto flex w-auto self-start p-4', className)}
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
