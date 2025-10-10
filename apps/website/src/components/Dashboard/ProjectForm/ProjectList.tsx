'use client';

import {
  Button,
  Container,
  Loader,
  Modal,
  Pagination,
  SearchInput,
  ShowingResultsNumberItems,
} from '@intlayer/design-system';
import {
  useGetProjects,
  useSearch,
  useSelectProject,
} from '@intlayer/design-system/hooks';
import { Plus } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { NoProjectView } from './NoProjectView';
import { ProjectCreationForm } from './ProjectCreationForm';

export const ProjectList: FC = () => {
  const { search, setSearch } = useSearch({});

  const [currentPage, setCurrentPage] = useState(1);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const itemsPerPage = 10;

  const {
    data: projectsResponse,
    isPending,
    refetch,
  } = useGetProjects({
    search,
    page: currentPage.toString(),
    pageSize: itemsPerPage.toString(),
  });
  const { mutate: selectProject } = useSelectProject();

  const totalPages = projectsResponse?.total_pages ?? 1;
  const totalItems = projectsResponse?.total_items ?? 0;
  const projects = projectsResponse?.data ?? [];

  const {
    selectButton,
    searchPlaceholder,
    createProjectButton,
    noProjectFound,
  } = useIntlayer('project-list');

  const handleSelectProject = (projectId: string) => {
    selectProject(projectId);
  };

  return (
    <div className="flex size-full flex-1 flex-col gap-10">
      <SearchInput
        placeholder={searchPlaceholder.value}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Loader isLoading={isPending}>
        {projects.length > 0 ? (
          <div className="flex size-full flex-1 flex-col items-center justify-center p-10">
            <ul className="flex w-full flex-wrap gap-3">
              {projects.map((project) => (
                <li
                  className="flex w-full max-w-sm flex-col gap-3 rounded-lg border border-neutral p-6"
                  key={String(project.id)}
                >
                  <h2 className="font-bold">{project.name}</h2>
                  <Button
                    onClick={() => handleSelectProject(String(project.id))}
                    label={selectButton.label.value}
                    color="text"
                    className="mt-auto"
                  >
                    {selectButton.text}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Container
            roundedSize="xl"
            className="m-auto flex justify-center p-6"
          >
            {search ? (
              <span className="m-auto text-neutral text-sm">
                {noProjectFound}
              </span>
            ) : (
              <NoProjectView
                onClickCreateProject={() => setIsCreationModalOpen(true)}
              />
            )}
          </Container>
        )}
      </Loader>
      <Button
        type="submit"
        color="text"
        label={createProjectButton.ariaLabel.value}
        className="mt-12 ml-auto"
        variant="outline"
        onClick={() => setIsCreationModalOpen(true)}
        Icon={Plus}
      >
        {createProjectButton.text}
      </Button>

      <div className="flex flex-col items-end gap-4">
        <ShowingResultsNumberItems
          currentPage={currentPage}
          pageSize={itemsPerPage}
          totalItems={totalItems}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            refetch();
          }}
          showFirstLast={true}
          showPrevNext={true}
          maxVisiblePages={5}
          color="text"
        />
      </div>

      <Modal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
      >
        <ProjectCreationForm
          onProjectCreated={() => setIsCreationModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
