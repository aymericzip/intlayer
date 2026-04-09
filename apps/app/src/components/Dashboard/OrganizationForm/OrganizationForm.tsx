import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { useGetOrganizations, useSession } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { Modal } from '@intlayer/design-system/modal';
import { Trash } from 'lucide-react';
import { type FC, Suspense, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { DeleteOrganizationModal } from './DeleteOrganizationModal';
import { MembersForm } from './Members/MembersForm';
import { NoOrganizationView } from './NoOrganizationView';
import { OrganizationCreationForm } from './OrganizationCreationForm';
import { OrganizationEditionForm } from './OrganizationEditionForm';
import { OrganizationList } from './OrganizationList';
import { PlanDetails } from './Plan/PlanDetails';
import { SSOSettings } from './SSO';

const OrganizationFormContent: FC = () => {
  const { session } = useSession();
  const { organization } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const { data: organizations, isPending, isSuccess } = useGetOrganizations();
  const { deleteOrganizationButton } = useIntlayer('organization-form');

  if (organization) {
    return (
      <div className="flex max-w-5xl flex-col items-center justify-center gap-4">
        <div className="grid w-full justify-evenly gap-x-5 gap-y-4 max-md:grid-cols-1 md:grid-cols-2 lg:gap-x-16">
          <div className="mb-auto flex flex-col gap-4">
            <Container
              roundedSize="3xl"
              padding="md"
              className="flex size-full justify-center"
            >
              <OrganizationEditionForm />
            </Container>
            <Container
              roundedSize="3xl"
              padding="md"
              className="flex size-full justify-center"
            >
              <PlanDetails />
            </Container>
            <Container
              roundedSize="3xl"
              padding="md"
              className="flex size-full justify-center"
            >
              <SSOSettings />
            </Container>
            <Container
              roundedSize="3xl"
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
              roundedSize="3xl"
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
      <Container roundedSize="3xl" padding="md" className="flex justify-center">
        <Modal
          isOpen={isCreationModalOpen}
          onClose={() => setIsCreationModalOpen(false)}
          hasCloseButton
          padding="md"
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
