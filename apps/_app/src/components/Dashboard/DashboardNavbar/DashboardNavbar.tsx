'use client';

import { Link } from '@components/Link/Link';
import { LocaleSwitcher } from '@components/LocaleSwitcher/LocaleSwitcher';
import { ProfileDropDown } from '@components/ProfileDropdown/ProfileDropdown';
import { TranslationStatusAside } from '@components/TranslationStatusAside';
import { Container } from '@intlayer/design-system/container';
import { useSession } from '@intlayer/design-system/hooks';
import { Logo } from '@intlayer/design-system/logo';
import { App_Home_Path } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { OrganizationDropdown } from './OrganizationDropdown';
import { ProjectDropdown } from './ProjectDropdown';

export const DashboardNavbar: FC = () => {
  const { session } = useSession();
  const { organization, project } = session ?? {};

  return (
    <Container
      className="sticky top-0 z-50 flex w-full flex-col gap-3 p-4"
      roundedSize="none"
    >
      <div className="flex justify-between">
        <div className="flex w-auto items-center gap-4">
          <Link href={App_Home_Path} label="Dashboard" color="text">
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
          {project && <TranslationStatusAside />}
          <LocaleSwitcher />
          <ProfileDropDown />
        </div>
      </div>
    </Container>
  );
};
