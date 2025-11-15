'use client';

import { Button, Container, Loader, Modal } from '@intlayer/design-system';
import { useGetOrganizations, useSession } from '@intlayer/design-system/hooks';
import { Trash } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, Suspense, useState } from 'react';
import { DeleteOrganizationModal } from './DeleteOrganizationModal';
import { MembersForm } from './Members/MembersForm';
import { NoOrganizationView } from './NoOrganizationView';
import { OrganizationCreationForm } from './OrganizationCreationForm';
import { OrganizationEditionForm } from './OrganizationEditionForm';
import { OrganizationList } from './OrganizationList';
import { PlanDetails } from './Plan/PlanDetails';

const OrganizationFormContent: FC = () => {
  const { session } = useSession();
  const { organization } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const { data: organizations, isPending, isSuccess } = useGetOrganizations();
  const { deleteOrganizationButton } = useIntlayer('organization-form');

  if (organization) {
    return (
      <div className="flex size-full max-w-5xl flex-col items-center justify-center gap-4">
        <div className="grid w-full justify-evenly gap-x-5 gap-y-4 max-md:grid-cols-1 md:grid-cols-2 lg:gap-x-16">
          <div className="mb-auto flex flex-col gap-4">
            <Container
              roundedSize="xl"
              padding="md"
              className="flex size-full justify-center"
            >
              <OrganizationEditionForm />
            </Container>
            <Container
              roundedSize="xl"
              padding="md"
              className="flex size-full justify-center"
            >
              <PlanDetails />
            </Container>
            <Container
              roundedSize="xl"
              padding="md"
              className="z-10 flex size-full justify-center"
            >
              <DeleteOrganizationModal
                isOpen={isDeletionModalOpen}
                onClose={() => setIsDeletionModalOpen(false)}
                onDelete={() => setIsDeletionModalOpen(false)}
              />
              <Button
                type="submit"
                color="error"
                label={deleteOrganizationButton.ariaLabel.value}
                isFullWidth
                variant="outline"
                onClick={() => setIsDeletionModalOpen(true)}
                Icon={Trash}
              >
                {deleteOrganizationButton.text}
              </Button>
            </Container>
          </div>
          <div className="mb-auto flex flex-col gap-4">
            <Container
              padding="md"
              roundedSize="xl"
              className="flex size-full justify-center"
            >
              <MembersForm />
            </Container>
          </div>
        </div>
      </div>
    );
  }

  if ((organizations?.data ?? []).length > 0) {
    return <OrganizationList />;
  }

  if (isSuccess && !isPending) {
    return (
      <Container roundedSize="xl" padding="md" className="flex justify-center">
        <Modal
          isOpen={isCreationModalOpen}
          onClose={() => setIsCreationModalOpen(false)}
        >
          <OrganizationCreationForm
            onOrganizationCreated={() => setIsCreationModalOpen(false)}
          />
        </Modal>

        <NoOrganizationView
          onClickCreateOrganization={() => setIsCreationModalOpen(true)}
        />
      </Container>
    );
  }

  return <Loader />;
};

export const OrganizationForm: FC = () => (
  <Suspense fallback={<Loader />}>
    <OrganizationFormContent />
  </Suspense>
);
