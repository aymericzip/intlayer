'use client';

import {
  Button,
  Container,
  DropDown,
  Modal,
  useAuth,
} from '@intlayer/design-system';
import {
  useGetProjects,
  useSelectProject,
  useUnselectProject,
} from '@intlayer/design-system/hooks';
import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type ComponentProps, useState, type FC } from 'react';
import { ProjectCreationForm } from '../ProjectForm/ProjectCreationForm';
import { PagesRoutes } from '@/Routes';

type ProjectDropdownProps = Partial<ComponentProps<typeof DropDown.Panel>>;

export const ProjectDropdown: FC<ProjectDropdownProps> = (props) => {
  const { session } = useAuth();
  const { data: projects } = useGetProjects();
  const { selectProject, isLoading: isSelectProjectLoading } =
    useSelectProject();
  const { unselectProject, isLoading: isUnselectProjectLoading } =
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
    await unselectProject().then(() =>
      router.push(PagesRoutes.Dashboard_Projects)
    );
  };

  const handleSelectProject = (projectId: string) => {
    selectProject(projectId).then(() =>
      router.push(PagesRoutes.Dashboard_Content)
    );
  };

  const otherProjects = (projects?.data ?? []).filter(
    (projectEl) => String(projectEl._id) !== String(project?._id)
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
        <Button
          label={projectTrigger.label.value}
          variant="hoverable"
          color="text"
          IconRight={ChevronsUpDown}
        >
          {project.name}
        </Button>

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
                    key={String(project._id)}
                    variant="outline"
                    color="text"
                    label={project.name}
                    onClick={() => handleSelectProject(String(project._id))}
                    isLoading={isSelectProjectLoading}
                  >
                    {project.name}
                  </Button>
                ))
              ) : (
                <span className="text-neutral text-center text-xs">
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
