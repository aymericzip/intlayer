import type { OrganizationAPI } from '@intlayer/backend';
import { Button, useToast } from '@intlayer/design-system';
import { useSelectOrganization } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

type OrganizationListProps = {
  organizations: OrganizationAPI[];
  selectedOrganizationId?: OrganizationAPI['_id'] | string;
  onSelectOrganization?: (organization: OrganizationAPI) => void;
};

export const OrganizationList: FC<OrganizationListProps> = ({
  organizations,
  selectedOrganizationId,
  onSelectOrganization,
}) => {
  const { selectOrganization } = useSelectOrganization();
  const { toast } = useToast();
  const { selectOrganizationToasts, selectButton } =
    useIntlayer('organization-form');
  const router = useRouter();

  const handleSelectOrganization = (organizationId: OrganizationAPI['_id']) => {
    if (onSelectOrganization) {
      const organization = organizations.find(
        (organization) => organization._id === organizationId
      );

      if (!organization) {
        return;
      }

      onSelectOrganization(organization);
      return;
    }

    selectOrganization(organizationId)
      .then(async () => {
        toast({
          title: selectOrganizationToasts.organizationSelected.title.value,
          description:
            selectOrganizationToasts.organizationSelected.description.value,
          variant: 'success',
        });

        router.push(PagesRoutes.Dashboard_Projects);
      })
      .catch((error) => {
        toast({
          title:
            selectOrganizationToasts.organizationSelectionFailed.title.value,
          description: error.message,
          variant: 'error',
        });
      });
  };

  return (
    <div className="flex w-full max-w-[350px] gap-3">
      {organizations.map((organization) => (
        <div
          className="border-neutral dark:border-neutral-dark flex w-full flex-col gap-3 rounded-lg border p-6"
          key={String(organization._id)}
        >
          <h2 className="font-bold">{organization.name}</h2>
          <Button
            onClick={() => handleSelectOrganization(organization._id)}
            label={selectButton.ariaLabel.value}
            color="text"
          >
            {String(selectedOrganizationId) === String(organization._id)
              ? selectButton.selected.value
              : selectButton.unselected.value}
          </Button>
        </div>
      ))}
    </div>
  );
};
