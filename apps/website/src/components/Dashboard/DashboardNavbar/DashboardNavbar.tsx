'use client';

import { Link } from '@components/Link/Link';
import { LocaleSwitcher } from '@components/LocaleSwitcher/LocaleSwitcher';
import { ProfileDropDown } from '@components/ProfileDropdown/ProfileDropdown';
import { Container, Logo } from '@intlayer/design-system';
import { useSession } from '@intlayer/design-system/hooks';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';
import { OrganizationDropdown } from './OrganizationDropdown';
import { ProjectDropdown } from './ProjectDropdown';

export const DashboardNavbar: FC = () => {
  const { session } = useSession();
  const { organization, project } = session ?? {};

  return (
    <Container
      className="fixed top-0 z-50 flex w-full flex-col gap-3 p-4 md:sticky"
      roundedSize="none"
    >
      <div className="flex justify-between">
        <div className="flex w-auto items-center gap-4">
          <Link href={PagesRoutes.Home} label="Dashboard" color="text">
            <Logo className="size-6" />
          </Link>

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
        </div>
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <ProfileDropDown />
        </div>
      </div>
    </Container>
  );
};
