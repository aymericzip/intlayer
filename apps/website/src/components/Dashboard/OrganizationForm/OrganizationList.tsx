import type { OrganizationAPI } from '@intlayer/backend';
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
  useGetOrganizations,
  useSearch,
  useSelectOrganization,
} from '@intlayer/design-system/hooks';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { PagesRoutes } from '@/Routes';
import { NoOrganizationView } from './NoOrganizationView';
import { OrganizationCreationForm } from './OrganizationCreationForm';

type OrganizationListProps = {
  selectedOrganizationId?: OrganizationAPI['id'] | string;
  onSelectOrganization?: (organization: OrganizationAPI) => void;
};

export const OrganizationList: FC<OrganizationListProps> = ({
  selectedOrganizationId,
  onSelectOrganization,
}) => {
  const { search, setSearch } = useSearch({});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: organizationsResponse,
    isPending,
    refetch,
  } = useGetOrganizations({
    search,
    page: currentPage.toString(),
    pageSize: itemsPerPage.toString(),
  });

  const organizations = organizationsResponse?.data ?? [];
  const totalPages = organizationsResponse?.total_pages ?? 1;
  const totalItems = organizationsResponse?.total_items ?? 0;

  const { mutate: selectOrganization } = useSelectOrganization();
  const { selectButton, addOrganizationButton } =
    useIntlayer('organization-form');
  const { searchPlaceholder, noOrganizationFound } =
    useIntlayer('organization-list');
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const router = useRouter();

  const handleSelectOrganization = (organizationId: OrganizationAPI['id']) => {
    if (onSelectOrganization) {
      const organization = organizations.find(
        (organization) => organization.id === organizationId
      );

      if (!organization) {
        return;
      }

      onSelectOrganization(organization);
      return;
    }

    selectOrganization(organizationId, {
      onSuccess: () => {
        router.push(PagesRoutes.Dashboard_Projects);
      },
    });
  };

  return (
    <div className="flex size-full flex-1 flex-col gap-10">
      <SearchInput
        placeholder={searchPlaceholder.value}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />
      <Loader isLoading={isPending}>
        <div className="flex size-full flex-1 flex-col items-center justify-center p-10">
          {organizations.length > 0 ? (
            <ul className="flex w-full flex-wrap gap-3">
              {organizations.map((organization) => (
                <li
                  className="flex w-full max-w-sm flex-col gap-3 rounded-lg border border-neutral bg-background p-6"
                  key={String(organization.id)}
                >
                  <h2 className="font-bold">{organization.name}</h2>
                  <Button
                    onClick={() => handleSelectOrganization(organization.id)}
                    label={selectButton.ariaLabel.value}
                    color="text"
                    isSelected={selectedOrganizationId === organization.id}
                    className="mt-auto"
                  >
                    {String(selectedOrganizationId) === String(organization.id)
                      ? selectButton.selected.value
                      : selectButton.unselected.value}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <Container
              roundedSize="xl"
              className="m-auto flex justify-center p-6"
            >
              {search ? (
                <span className="m-auto text-neutral text-sm">
                  {noOrganizationFound}
                </span>
              ) : (
                <NoOrganizationView
                  onClickCreateOrganization={() => setIsCreationModalOpen(true)}
                />
              )}
            </Container>
          )}
        </div>
      </Loader>
      <Button
        label={addOrganizationButton.ariaLabel.value}
        Icon={Plus}
        color="text"
        className="mt-12 ml-auto"
        variant="outline"
        onClick={() => setIsCreationModalOpen(true)}
      >
        {addOrganizationButton.text}
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
        <OrganizationCreationForm />
      </Modal>
    </div>
  );
};
