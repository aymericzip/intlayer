'use client';

import { Button, Container, DropDown, Modal } from '@intlayer/design-system';
import {
  useAuth,
  useGetProjects,
  useSelectProject,
  useUnselectProject,
} from '@intlayer/design-system/hooks';
import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type ComponentProps, type FC, useState } from 'react';
import { PagesRoutes } from '@/Routes';
import { ProjectCreationForm } from '../ProjectForm/ProjectCreationForm';

type ProjectDropdownProps = Partial<ComponentProps<typeof DropDown.Panel>> & {
  align?: 'start' | 'end';
};

export const ProjectDropdown: FC<ProjectDropdownProps> = (props) => {
  const { session } = useAuth();
  const { data: projects } = useGetProjects();
  const { mutate: selectProject, isPending: isSelectProjectLoading } =
    useSelectProject();
  const { mutate: unselectProject, isPending: isUnselectProjectLoading } =
    useUnselectProject();
  const { project } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const router = useRouter();
  const {
    projectTrigger,
    projectLogout,
    selectProjectInstruction,
    noOtherProjects,
    createNewProject,
  } = useIntlayer('dashboard-navbar');

  const handleUnselectProject = async () => {
    unselectProject(undefined, {
      onSuccess: () => {
        router.push(PagesRoutes.Dashboard_Projects);
      },
    });
  };

  const handleSelectProject = (projectId: string) => {
    selectProject(projectId, {
      onSuccess: () => {
        router.push(PagesRoutes.Dashboard_Content);
      },
    });
  };

  const otherProjects = (projects?.data ?? []).filter(
    (projectEl) => String(projectEl.id) !== String(project?.id)
  );

  return project ? (
    <>
      <Modal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
      >
        <ProjectCreationForm />
      </Modal>
      <DropDown identifier="project-dropdown">
        <DropDown.Trigger
          identifier="project-dropdown"
          label={projectTrigger.label.value}
          variant="hoverable"
          color="text"
          IconRight={ChevronsUpDown}
        >
          {project.name}
        </DropDown.Trigger>

        <DropDown.Panel isFocusable {...props} identifier="project-dropdown">
          <Container
            padding="lg"
            transparency="none"
            roundedSize="lg"
            className="gap-2"
          >
            <div className="flex flex-col gap-3">
              <span className="font-bold">{selectProjectInstruction}</span>
              {otherProjects.length ? (
                otherProjects.map((project) => (
                  <Button
                    key={String(project.id)}
                    variant="outline"
                    color="text"
                    label={project.name}
                    onClick={() => handleSelectProject(String(project.id))}
                    isLoading={isSelectProjectLoading}
                  >
                    {project.name}
                  </Button>
                ))
              ) : (
                <span className="text-center text-neutral text-xs">
                  {noOtherProjects}
                </span>
              )}
            </div>
            <Button
              variant="outline"
              color="text"
              label={projectLogout.label.value}
              onClick={handleUnselectProject}
              isLoading={isUnselectProjectLoading}
              className="mt-6"
            >
              {projectLogout.text}
            </Button>
            <Button
              variant="outline"
              color="text"
              label={createNewProject.label.value}
              onClick={() => setIsCreationModalOpen(true)}
            >
              {createNewProject.text}
            </Button>
          </Container>
        </DropDown.Panel>
      </DropDown>
    </>
  ) : (
    <></>
  );
};
