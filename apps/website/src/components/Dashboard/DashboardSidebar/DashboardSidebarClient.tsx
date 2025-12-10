'use client';

import { useSession } from '@intlayer/design-system/hooks';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';
import {
  DashboardSidebar,
  type SidebarNavigationItem,
} from './DashboardSidebar';

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

type DashboardSidebarClientProps = {
  items: SidebarNavigationItem[];
  collapseButtonLabel: string;
};

export const DashboardSidebarClient: FC<DashboardSidebarClientProps> = ({
  items,
  collapseButtonLabel,
}) => {
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

  return (
    <DashboardSidebar
      items={filteredNavItems}
      collapseButtonLabel={collapseButtonLabel}
    />
  );
};
