'use client';

import type { Organization } from '@intlayer/backend';
import { Loader, Modal, useAuth } from '@intlayer/design-system';
import { useGetOrganizations } from '@intlayer/design-system/hooks';
import { Suspense, useEffect, useState, type FC } from 'react';
import { NoOrganizationView } from './NoOrganizationView';
import { OrganizationCreationForm } from './OrganizationCreationForm';
import { OrganizationEditionForm } from './OrganizationEditionForm';
import { OrganizationList } from './OrganizationList';

const OrganizationFormContent: FC = () => {
  const { session } = useAuth();
  const { organization } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { getOrganizations, isLoading, isSuccess } = useGetOrganizations();
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    getOrganizations().then((res) => {
      if (!res.data) {
        return;
      }
      setOrganizations(res.data);
    });
  }, []);

  if (organization) {
    return <OrganizationEditionForm />;
  }

  if (organizations?.length > 0) {
    return <OrganizationList organizations={organizations} />;
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

export const OrganizationForm: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <OrganizationFormContent />
    </Suspense>
  );
};
