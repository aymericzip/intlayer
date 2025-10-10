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
      <div className="flex size-full flex-col items-center justify-center gap-4">
        <div className="grid w-full max-w-5xl gap-x-20 gap-y-4 max-md:grid-cols-1 md:grid-cols-2">
          <div className="mb-auto flex flex-col gap-4">
            <Container
              roundedSize="xl"
              className="flex size-full justify-center p-6"
            >
              <OrganizationEditionForm />
            </Container>
            <Container
              roundedSize="xl"
              className="flex size-full justify-center p-6"
            >
              <PlanDetails />
            </Container>
            <Container
              roundedSize="xl"
              className="z-10 flex size-full justify-center p-6"
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
              roundedSize="xl"
              className="flex size-full justify-center p-6"
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
      <Container roundedSize="xl" className="flex justify-center p-6">
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
