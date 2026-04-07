'use client';

import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { DropDown } from '@intlayer/design-system/drop-down';
import {
  useGetProjects,
  useSelectProject,
  useSession,
  useUnselectProject,
} from '@intlayer/design-system/hooks';
import { Modal } from '@intlayer/design-system/modal';
import { ChevronsUpDown } from 'lucide-react';
import { type ComponentProps, type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ProjectCreationForm } from '../ProjectForm/ProjectCreationForm';

type ProjectDropdownProps = Partial<ComponentProps<typeof DropDown.Panel>> & {
  align?: 'start' | 'end';
};

export const ProjectDropdown: FC<ProjectDropdownProps> = (props) => {
  const { session } = useSession();

  const { data: projects } = useGetProjects();
  const { mutate: selectProject, isPending: isSelectProjectLoading } =
    useSelectProject();
  const { mutate: unselectProject, isPending: isUnselectProjectLoading } =
    useUnselectProject();
  const { project } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const {
    projectTrigger,
    projectLogout,
    selectProjectInstruction,
    noOtherProjects,
    createNewProject,
  } = useIntlayer('dashboard-navbar');

  const handleUnselectProject = async () => {
    unselectProject(undefined);
  };

  const handleSelectProject = (projectId: string) => {
    selectProject(projectId);
  };

  const otherProjects = (projects?.data ?? [])
    .filter((projectEl) => String(projectEl.id) !== String(project?.id))
    .slice(0, 10);

  return project ? (
    <>
      <Modal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        padding="md"
      >
        <ProjectCreationForm
          onProjectCreated={() => setIsCreationModalOpen(false)}
        />
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
            roundedSize="xl"
            className="gap-2 border border-text/10"
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
              label={createNewProject.label.value}
              onClick={() => setIsCreationModalOpen(true)}
              className="mt-6"
            >
              {createNewProject.text}
            </Button>
            <Button
              variant="outline"
              color="text"
              label={projectLogout.label.value}
              onClick={handleUnselectProject}
              isLoading={isUnselectProjectLoading}
            >
              {projectLogout.text}
            </Button>
          </Container>
        </DropDown.Panel>
      </DropDown>
    </>
  ) : (
    <></>
  );
};
