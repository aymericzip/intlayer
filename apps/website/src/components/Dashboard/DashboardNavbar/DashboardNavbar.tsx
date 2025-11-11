'use client';

import { Link } from '@components/Link/Link';
import { LocaleSwitcher } from '@components/LocaleSwitcher/LocaleSwitcher';
import { ProfileDropDown } from '@components/ProfileDropdown/ProfileDropdown';
import { Container, Logo, TabSelector } from '@intlayer/design-system';
import {
  useDevice,
  useScrollY,
  useSession,
} from '@intlayer/design-system/hooks';
import { useLocale } from 'next-intlayer';
import type { FC, ReactNode } from 'react';
import { type ExternalLinks, PagesRoutes } from '@/Routes';
import { OrganizationDropdown } from './OrganizationDropdown';
import { ProjectDropdown } from './ProjectDropdown';

export type NavbarProps = {
  links: {
    url: string | PagesRoutes | ExternalLinks;
    label: string;
    title: ReactNode;
  }[];
};

const getCleanTabSelector = (path: string): string => {
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
    return components[0]; // or return components[0] + "/";
  }

  // Return the path as is for other cases
  return path;
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

export const DashboardNavbar: FC<NavbarProps> = ({ links }) => {
  const { pathWithoutLocale } = useLocale();
  const { session } = useSession();
  const { organization, project, roles } = session ?? {};
  const { isMobile } = useDevice();
  const { scrollY } = useScrollY();

  const isSuperAdmin =
    roles?.some((role: string) => role.toLowerCase() === 'admin') ?? false;

  const filteredLinks = links
    .filter(
      (el) => !shouldHaveOrganizationRoutes.includes(el.url) || !!organization
    )
    .filter((el) => !shouldHaveProjectRoutes.includes(el.url) || !!project)
    .filter((el) => !shouldHaveAdminRoutes.includes(el.url) || isSuperAdmin);

  return (
    <Container
      className="-top-16 sticky z-50 flex w-full flex-col gap-3 p-4"
      roundedSize="none"
    >
      <div className="flex justify-between">
        <div className="flex w-auto items-center gap-4">
          <Link
            href={PagesRoutes.Home}
            label="Dashboard"
            color="text"
            className="max-md:hidden"
          >
            <Logo
              className="size-6"
              style={{
                transform: `translateY(${Math.min(scrollY, 52)}px) scale(${1 - Math.min(scrollY, 48) / 200})`,
              }}
            />
          </Link>

          {!isMobile && (
            <div className="flex w-auto items-center gap-4">
              {organization && (
                <>
                  <span>/</span>
                  <OrganizationDropdown />
                </>
              )}
              {project && (
                <>
                  <span>/</span>
                  <ProjectDropdown />
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <LocaleSwitcher panelProps={{ className: '-left-16' }} />
          <ProfileDropDown />
        </div>
      </div>
      {isMobile && (
        <div className="flex w-full items-center gap-4">
          {organization && <OrganizationDropdown />}
          {project && (
            <>
              <span>/</span>
              <ProjectDropdown align="end" />
            </>
          )}
        </div>
      )}
      <div
        className="max-3 flex w-full items-center gap-8 overflow-x-auto max-sm:pb-4"
        style={{
          transform: `translateX(${Math.min(scrollY, 40)}px)`,
        }}
      >
        <TabSelector
          selectedChoice={getCleanTabSelector(pathWithoutLocale)}
          tabs={filteredLinks.map(({ url, label, title }) => (
            <Link
              key={getCleanTabSelector(url)}
              href={url}
              label={label}
              color="text"
              variant="invisible-link"
              className="flex px-4 py-0.5"
              aria-current={
                getCleanTabSelector(pathWithoutLocale) ===
                getCleanTabSelector(url)
                  ? 'page'
                  : undefined
              }
            >
              {title}
            </Link>
          ))}
          hoverable
          color="text"
        />
      </div>
    </Container>
  );
};
