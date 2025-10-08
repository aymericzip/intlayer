import type { OrganizationAPI } from '@intlayer/backend';
import { Button, Modal } from '@intlayer/design-system';
import { useSelectOrganization } from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { PagesRoutes } from '@/Routes';
import { OrganizationCreationForm } from './OrganizationCreationForm';

type OrganizationListProps = {
  organizations: OrganizationAPI[];
  selectedOrganizationId?: OrganizationAPI['id'] | string;
  onSelectOrganization?: (organization: OrganizationAPI) => void;
};

export const OrganizationList: FC<OrganizationListProps> = ({
  organizations,
  selectedOrganizationId,
  onSelectOrganization,
}) => {
  const { mutate: selectOrganization } = useSelectOrganization();
  const { selectButton, addOrganizationButton } =
    useIntlayer('organization-form');
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
    <div className="flex w-full max-w-[350px] flex-col gap-10">
      <ul className="flex w-full flex-wrap gap-3">
        {organizations.map((organization) => (
          <li
            className="flex w-full flex-col gap-3 rounded-lg border border-neutral p-6"
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
      <Button
        label={addOrganizationButton.ariaLabel.value}
        Icon={Plus}
        color="text"
        isFullWidth
        variant="outline"
        onClick={() => setIsCreationModalOpen(true)}
      >
        {addOrganizationButton.text}
      </Button>

      <Modal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
      >
        <OrganizationCreationForm />
      </Modal>
    </div>
  );
};
