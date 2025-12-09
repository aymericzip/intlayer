'use client';

import { Link } from '@components/Link/Link';
import { LocaleSwitcher } from '@components/LocaleSwitcher/LocaleSwitcher';
import { ProfileDropDown } from '@components/ProfileDropdown/ProfileDropdown';
import { Container, Logo } from '@intlayer/design-system';
import {
  useDevice,
  useScrollY,
  useSession,
} from '@intlayer/design-system/hooks';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';
import { OrganizationDropdown } from './OrganizationDropdown';
import { ProjectDropdown } from './ProjectDropdown';

export const DashboardNavbar: FC = () => {
  const { session } = useSession();
  const { organization, project } = session ?? {};
  const { isMobile } = useDevice();
  const { scrollY } = useScrollY();

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
          <LocaleSwitcher />
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
    </Container>
  );
};
