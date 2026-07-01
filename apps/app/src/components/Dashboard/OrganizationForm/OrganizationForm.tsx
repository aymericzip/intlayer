import { useGetOrganizations, useSession } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Modal } from '@intlayer/design-system/modal';
import { Trash, TriangleAlert } from 'lucide-react';
import { type FC, Suspense, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { IS_SELF_HOSTED } from '#utils/selfHosted';
import { DeleteOrganizationModal } from './DeleteOrganizationModal';
import { MembersForm } from './Members/MembersForm';
import { NoOrganizationView } from './NoOrganizationView';
import { OrganizationCreationForm } from './OrganizationCreationForm';
import { OrganizationEditionForm } from './OrganizationEditionForm';
import { OrganizationList } from './OrganizationList';
import { OrganizationSkeleton } from './OrganizationSkeleton';
import { PlanDetails } from './Plan/PlanDetails';
import { SSOSettings } from './SSO';

const OrganizationFormContent: FC = () => {
  const { session } = useSession();
  const { organization, roles } = session ?? {};
  const isOrganizationAdmin =
    roles?.includes('org_admin') || roles?.includes('admin');
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const { data: organizations, isPending, isSuccess } = useGetOrganizations();
  const { dangerZoneTitle, dangerZoneDescription, deleteOrganizationButton } =
    useIntlayer('organization-form');

  if (organization) {
    return (
      <div className="flex max-w-6xl flex-col items-center justify-center gap-8">
        <div className="relative grid w-full min-w-0 justify-evenly gap-x-5 gap-y-4 max-md:grid-cols-1 md:grid-cols-[8fr_7fr] lg:gap-x-16">
          <div className="top-20 mb-auto flex min-w-0 flex-col gap-4 md:sticky">
            <Container
              roundedSize="3xl"
              padding="md"
              border
              borderColor="neutral"
              className="flex size-full justify-center"
            >
              <OrganizationEditionForm />
            </Container>
            {!IS_SELF_HOSTED && (
              <Container
                roundedSize="3xl"
                padding="md"
                border
                borderColor="neutral"
                className="flex size-full justify-center"
              >
                <PlanDetails />
              </Container>
            )}
            <Container
              roundedSize="3xl"
              padding="md"
              border
              borderColor="neutral"
              className="flex size-full justify-center"
            >
              <SSOSettings />
            </Container>
          </div>
          <div className="top-20 mb-auto flex min-w-0 flex-col gap-4 md:sticky">
            <Container
              padding="md"
              roundedSize="3xl"
              border
              borderColor="neutral"
              className="flex size-full justify-center"
            >
              <MembersForm />
            </Container>
          </div>
        </div>
        {isOrganizationAdmin && (
          <Container
            roundedSize="3xl"
            border
            borderColor="error"
            padding="lg"
            transparency="lg"
            className="z-10 w-full"
          >
            <DeleteOrganizationModal
              isOpen={isDeletionModalOpen}
              onClose={() => setIsDeletionModalOpen(false)}
              onDelete={() => setIsDeletionModalOpen(false)}
            />
            <div className="flex items-start gap-6 px-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-error/10">
                <TriangleAlert className="size-5 text-error" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-base text-error">
                  {dangerZoneTitle}
                </h3>
                <p className="mt-1 text-neutral text-sm">
                  {dangerZoneDescription}
                </p>
                <Button
                  color="error"
                  label={deleteOrganizationButton.ariaLabel.value}
                  variant="outline"
                  onClick={() => setIsDeletionModalOpen(true)}
                  Icon={Trash}
                  className="mt-4"
                >
                  {deleteOrganizationButton.text}
                </Button>
              </div>
            </div>
          </Container>
        )}
      </div>
    );
  }

  if ((organizations?.data ?? []).length > 0) {
    return <OrganizationList />;
  }

  if (isSuccess && !isPending) {
    return (
      <Container
        roundedSize="3xl"
        padding="2xl"
        border
        borderColor="neutral"
        className="flex justify-center"
      >
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

  return <OrganizationSkeleton />;
};

export const OrganizationForm: FC = () => (
  <Suspense fallback={<OrganizationSkeleton />}>
    <OrganizationFormContent />
  </Suspense>
);
