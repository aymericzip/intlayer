'use client';

import { ProfileDropDown } from '@components/Auth/ProfileDropdown';
import { Link } from '@components/Link/Link';
import { LocaleSwitcher } from '@components/LocaleSwitcher/LocaleSwitcher';
import { SwitchThemeSwitcher } from '@components/ThemeSwitcherDropDown/SwitchThemeSwitcher';
import { Container, Logo, TabSelector, useAuth } from '@intlayer/design-system';
import { useDevice } from '@intlayer/design-system/hooks';
import { useLocale } from 'next-intlayer';
import { type FC, type ReactNode } from 'react';
import { OrganizationDropdown } from './OrganizationDropdown';
import { ProjectDropdown } from './ProjectDropdown';
import { type ExternalLinks, PagesRoutes } from '@/Routes';

export type NavbarProps = {
  links: {
    url: string | PagesRoutes | ExternalLinks;
    label: string;
    title: ReactNode;
  }[];
};

const getCleanTabSelector = (path: string): string => {
  // Remove leading '/'
  if (path.startsWith('/')) {
    path = path.substring(1);
  }

  // Check if the path starts with 'dashboard'
  if (path.startsWith('dashboard')) {
    return 'dashboard';
  }

  // Check if the path starts with 'content'
  if (path.startsWith('content')) {
    return 'content';
  }

  // Default case
  return '';
};

export const DashboardNavbar: FC<NavbarProps> = ({ links }) => {
  const { pathWithoutLocale } = useLocale();
  const { session } = useAuth();
  const { organization, project } = session ?? {};
  const { isMobile } = useDevice('sm');

  const filteredLinks = links
    .filter((el) => {
      const isDashboardProjects = el.url === PagesRoutes.Dashboard_Projects;
      const isOrganizationDefined = !!organization;

      return !isDashboardProjects || isOrganizationDefined;
    })
    .filter((el) => {
      const isDashboardContent = el.url === PagesRoutes.Dashboard_Content;
      const isProjectDefined = !!project;

      return !isDashboardContent || isProjectDefined;
    });

  return (
    <Container className="z-50 flex flex-col gap-3 p-4" roundedSize="none">
      <div className="flex justify-between">
        <div className="flex w-auto items-center gap-4">
          <Link href={PagesRoutes.Home} label="Dashboard" color="text">
            <Logo type="logoOnly" className="size-6" />
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
          <LocaleSwitcher />
          <SwitchThemeSwitcher />
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

      <div className="max-3 flex w-full items-center gap-8 overflow-x-auto max-sm:pb-4">
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
