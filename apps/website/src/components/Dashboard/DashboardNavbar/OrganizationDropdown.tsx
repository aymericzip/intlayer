'use client';

import { Button, Container, DropDown, useAuth } from '@intlayer/design-system';
import { useUnselectOrganization } from '@intlayer/design-system/hooks';
import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { type FC } from 'react';
import { PagesRoutes } from '@/Routes';

export const OrganizationDropdown: FC = () => {
  const { session, checkSession } = useAuth();
  const { unselectOrganization, isLoading } = useUnselectOrganization();

  const { organization } = session ?? {};
  const router = useRouter();

  const handleUnselectOrganization = async () => {
    await unselectOrganization();
    await checkSession();

    router.push(PagesRoutes.Dashboard_Organization);
  };

  return organization ? (
    <DropDown identifier="organization-dropdown" className="max-md:hidden">
      <Button
        label="Dashboard"
        variant="hoverable"
        color="text"
        IconRight={ChevronsUpDown}
      >
        {organization.name}
      </Button>

      <DropDown.Panel identifier="organization-dropdown" isFocusable>
        <Container padding="md">
          <Button
            variant="outline"
            color="text"
            label="Log out from organization"
            onClick={handleUnselectOrganization}
            isLoading={isLoading}
          >
            Log out from organization
          </Button>
        </Container>
      </DropDown.Panel>
    </DropDown>
  ) : (
    <></>
  );
};
