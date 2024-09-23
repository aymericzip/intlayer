'use client';

import { Button, Container, DropDown, useAuth } from '@intlayer/design-system';
import { useUnselectProject } from '@intlayer/design-system/hooks';
import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { type FC, type ReactNode } from 'react';
import { type ExternalLinks, PagesRoutes } from '@/Routes';

export type NavbarProps = {
  links: {
    url: string | PagesRoutes | ExternalLinks;
    label: string;
    title: ReactNode;
  }[];
};

export const ProjectDropdown: FC = () => {
  const { session, checkSession } = useAuth();
  const { unselectProject, isLoading } = useUnselectProject();
  const { project } = session ?? {};
  const router = useRouter();

  const handleUnselectProject = async () => {
    await unselectProject();
    await checkSession();

    router.push(PagesRoutes.Dashboard_Projects);
  };

  return project ? (
    <DropDown identifier="project-dropdown">
      <Button
        label="Dashboard"
        variant="hoverable"
        color="text"
        IconRight={ChevronsUpDown}
      >
        {project.name}
      </Button>

      <DropDown.Panel identifier="project-dropdown" isFocusable>
        <Container padding="md">
          <Button
            variant="outline"
            color="text"
            label="Log out from project"
            onClick={handleUnselectProject}
            isLoading={isLoading}
          >
            Log out from project
          </Button>
        </Container>
      </DropDown.Panel>
    </DropDown>
  ) : (
    <></>
  );
};
