'use client';

import {
  Breadcrumb,
  type BreadcrumbLink,
  type BreadcrumbProps,
} from '@intlayer/design-system';
import { useParams, usePathname } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, useMemo } from 'react';
import { PagesRoutes } from '@/Routes';

type AdminBreadcrumbProps = Omit<BreadcrumbProps, 'links'>;

export const AdminBreadcrumb: FC<AdminBreadcrumbProps> = (props) => {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const { home, users, organizations, projects, dashboard, userDetail } =
    useIntlayer('admin-breadcrumb');

  const breadcrumbLinks: BreadcrumbLink[] = useMemo(() => {
    const links: BreadcrumbLink[] = [
      {
        text: home.value,
        href: PagesRoutes.Admin_Dashboard,
      },
    ];

    const pathSegments = pathname.split('/').filter(Boolean);
    const adminIndex = pathSegments.indexOf('admin');

    if (adminIndex === -1) return links;

    const adminSegments = pathSegments.slice(adminIndex + 1);
    let currentPath = `/${locale}/admin`;

    adminSegments.forEach((segment, index) => {
      currentPath = `${currentPath}/${segment}`;

      switch (segment) {
        case 'dashboard':
          links.push({ text: dashboard.value, href: currentPath });
          break;
        case 'users':
          links.push({ text: users.value, href: currentPath });
          break;
        case 'organizations':
          links.push({ text: organizations.value, href: currentPath });
          break;
        case 'projects':
          links.push({ text: projects.value, href: currentPath });
          break;
        default:
          if (!isNaN(Number(segment)) || /^[0-9a-f]{24}$/i.test(segment)) {
            const previousSegment = adminSegments[index - 1];

            if (previousSegment === 'users') {
              links.push({ text: userDetail.value, href: currentPath });
            }
          }
          break;
      }
    });

    return links;
  }, [
    pathname,
    locale,
    home,
    users,
    organizations,
    projects,
    dashboard,
    userDetail,
  ]);

  return <Breadcrumb links={breadcrumbLinks} locale={locale} {...props} />;
};
