'use client';

import type { Project } from '@intlayer/backend';
import {
  Button,
  Container,
  DropDown,
  Modal,
  useAuth,
  useToast,
} from '@intlayer/design-system';
import {
  useGetProjects,
  useSelectProject,
  useUnselectProject,
} from '@intlayer/design-system/hooks';
import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type ComponentProps, useEffect, useState, type FC } from 'react';
import { ProjectCreationForm } from '../ProjectForm/ProjectCreationForm';
import { PagesRoutes } from '@/Routes';

type ProjectDropdownProps = Partial<ComponentProps<typeof DropDown.Panel>>;

export const ProjectDropdown: FC<ProjectDropdownProps> = (props) => {
  const { session, revalidateSession } = useAuth();
  const { getProjects } = useGetProjects();
  const { selectProject, isLoading: isSelectProjectLoading } =
    useSelectProject();
  const { unselectProject, isLoading: isUnselectProjectLoading } =
    useUnselectProject();
  const { project } = session ?? {};
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const {
    projectTrigger,
    projectLogout,
    selectProjectInstruction,
    selectProjectAction,
    noOtherProjects,
    createNewProject,
  } = useIntlayer('dashboard-navbar');

  const handleUnselectProject = () => {
    unselectProject()
      .then(async () => {
        await revalidateSession();
        toast({
          title: projectLogout.toast.success.title.value,
          description: projectLogout.toast.success.description,
          variant: 'success',
        });
        router.push(PagesRoutes.Dashboard_Projects);
      })
      .catch((error) => {
        toast({
          title: projectLogout.toast.error.title.value,
          description: error.message,
          variant: 'error',
        });
      });
  };

  const handleSelectProject = (projectId: string) => {
    selectProject(projectId)
      .then(async () => {
        await revalidateSession();
        toast({
          title: selectProjectAction.toast.success.title.value,
          description: selectProjectAction.toast.success.description,
          variant: 'success',
        });
        router.push(PagesRoutes.Dashboard_Content);
      })
      .catch((error) => {
        toast({
          title: selectProjectAction.toast.error.title.value,
          description: error.message,
          variant: 'error',
        });
      });
  };

  useEffect(() => {
    getProjects({}).then((response) => {
      setProjects(response.data ?? []);
    });
  }, [getProjects]);

  const otherProjects = projects.filter(
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
                <span className="text-neutral dark:text-neutral-dark text-center text-xs">
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
