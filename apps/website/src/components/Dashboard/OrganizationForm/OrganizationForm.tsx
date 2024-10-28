'use client';

import { Container, Loader, Modal, useAuth } from '@intlayer/design-system';
import { useGetOrganizations } from '@intlayer/design-system/hooks';
import { Suspense, useState, type FC } from 'react';
import { MembersForm } from './Members/MembersKeyForm';
import { NoOrganizationView } from './NoOrganizationView';
import { OrganizationCreationForm } from './OrganizationCreationForm';
import { OrganizationEditionForm } from './OrganizationEditionForm';
import { OrganizationList } from './OrganizationList';

const OrganizationFormContent: FC = () => {
  const { session } = useAuth();
  const { organization } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { data: organizations, isLoading, isSuccess } = useGetOrganizations();

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
      </div>
    );
  }

  if ((organizations?.data ?? []).length > 0) {
    return <OrganizationList organizations={organizations?.data ?? []} />;
  }

  if (isSuccess && !isLoading) {
    return (
      <>
        <Modal
          isOpen={isCreationModalOpen}
          onClose={() => setIsCreationModalOpen(false)}
        >
          <OrganizationCreationForm />
        </Modal>

        <NoOrganizationView
          onClickCreateOrganization={() => setIsCreationModalOpen(true)}
        />
      </>
    );
  }

  return <Loader />;
};

export const OrganizationForm: FC = () => (
  <Suspense fallback={<Loader />}>
    <OrganizationFormContent />
  </Suspense>
);
