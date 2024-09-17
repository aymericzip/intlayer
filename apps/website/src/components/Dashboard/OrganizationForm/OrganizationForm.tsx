'use client';

import { Loader, Modal, useAuth } from '@intlayer/design-system';
import { useGetOrganizations } from '@intlayer/design-system/hooks';
import { Suspense, use, useState, type FC } from 'react';
import { NoOrganizationView } from './NoOrganizationView';
import { OrganizationCreationForm } from './OrganizationCreationForm';
import { OrganizationEditionForm } from './OrganizationEditionForm';
import { OrganizationList } from './OrganizationList';

const OrganizationFormContent: FC = () => {
  const { session } = useAuth();
  const { organization } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { getOrganizations } = useGetOrganizations();
  const organizations = use(getOrganizations());

  if (organization) {
    return <OrganizationEditionForm />;
  }

  if (organizations.data?.length === 0) {
    return <OrganizationList organizations={organizations.data} />;
  }

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
};

export const OrganizationForm: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <OrganizationFormContent />
    </Suspense>
  );
};
