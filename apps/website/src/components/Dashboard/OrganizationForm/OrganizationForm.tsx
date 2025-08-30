'use client';

import { Button, Container, Loader, Modal } from '@intlayer/design-system';
import { useAuth, useGetOrganizations } from '@intlayer/design-system/hooks';
import { Trash } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { Suspense, useState, type FC } from 'react';
import { DeleteOrganizationModal } from './DeleteOrganizationModal';
import { MembersForm } from './Members/MembersForm';
import { NoOrganizationView } from './NoOrganizationView';
import { OrganizationCreationForm } from './OrganizationCreationForm';
import { OrganizationEditionForm } from './OrganizationEditionForm';
import { OrganizationList } from './OrganizationList';
import { PlanDetails } from './Plan/PlanDetails';

const OrganizationFormContent: FC = () => {
  const { session } = useAuth();
  const { organization } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const { data: organizations, isPending, isSuccess } = useGetOrganizations();
  const { deleteOrganizationButton } = useIntlayer('organization-form');

  if (organization) {
    return (
      <div className="flex size-full max-w-[500px] flex-col items-center justify-center gap-4">
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
          <MembersForm />
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
    );
  }

  if ((organizations?.data ?? []).length > 0) {
    return <OrganizationList organizations={organizations?.data ?? []} />;
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
