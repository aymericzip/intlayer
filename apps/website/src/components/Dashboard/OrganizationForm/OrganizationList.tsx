import type { OrganizationAPI } from '@intlayer/backend';
import { Button, Modal } from '@intlayer/design-system';
import { useSelectOrganization } from '@intlayer/design-system/hooks';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { useState, type FC } from 'react';
import { OrganizationCreationForm } from './OrganizationCreationForm';
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
  const { selectButton, addOrganizationButton } =
    useIntlayer('organization-form');
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
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

    selectOrganization(organizationId).then(() =>
      router.push(PagesRoutes.Dashboard_Projects)
    );
  };

  return (
    <div className="flex w-full max-w-[350px] flex-col gap-10">
      <ul className="flex w-full flex-wrap gap-3">
        {organizations.map((organization) => (
          <li
            className="border-neutral dark:border-neutral-dark flex w-full flex-col gap-3 rounded-lg border p-6"
            key={String(organization._id)}
          >
            <h2 className="font-bold">{organization.name}</h2>
            <Button
              onClick={() => handleSelectOrganization(organization._id)}
              label={selectButton.ariaLabel.value}
              color="text"
              className="mt-auto"
            >
              {String(selectedOrganizationId) === String(organization._id)
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
