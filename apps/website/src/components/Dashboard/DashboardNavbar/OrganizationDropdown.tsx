'use client';

import {
  Button,
  Container,
  DropDown,
  Modal,
  useAuth,
  useToast,
} from '@intlayer/design-system';
import {
  useGetOrganizations,
  useSelectOrganization,
  useUnselectOrganization,
} from '@intlayer/design-system/hooks';
import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { useState, type FC } from 'react';
import { OrganizationCreationForm } from '../OrganizationForm/OrganizationCreationForm';
import { PagesRoutes } from '@/Routes';

export const OrganizationDropdown: FC = () => {
  const { session } = useAuth();
  const { data: organizations } = useGetOrganizations();
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { selectOrganization, isLoading: isSelectOrganizationLoading } =
    useSelectOrganization();
  const { unselectOrganization, isLoading: isUnselectOrganizationLoading } =
    useUnselectOrganization();
  const {
    organizationTrigger,
    organizationLogout,
    selectOrganizationInstruction,
    selectOrganizationAction,
    noOtherOrganizations,
    createNewOrganization,
  } = useIntlayer('dashboard-navbar');
  const { toast } = useToast();

  const { organization } = session ?? {};
  const router = useRouter();

  const handleUnselectOrganization = async () => {
    await unselectOrganization()
      .then(() => {
        toast({
          title: organizationLogout.toast.success.title.value,
          description: organizationLogout.toast.success.description,
          variant: 'success',
        });

        router.push(PagesRoutes.Dashboard_Organization);
      })
      .catch((error) => {
        toast({
          title: organizationLogout.toast.error.title.value,
          description: error.message,
          variant: 'error',
        });
      });
  };

  const handleSelectOrganization = (organizationId: string) => {
    selectOrganization(organizationId)
      .then(async () => {
        router.push(PagesRoutes.Dashboard_Projects);

        toast({
          title: selectOrganizationAction.toast.success.title.value,
          description: selectOrganizationAction.toast.success.description,
          variant: 'success',
        });
      })
      .catch((error) => {
        toast({
          title: selectOrganizationAction.toast.error.title.value,
          description: error.message,
          variant: 'error',
        });
      });
  };

  const otherOrganizations = (organizations?.data ?? []).filter(
    (organizationEl) => String(organizationEl._id) !== String(organization?._id)
  );

  return organization ? (
    <>
      <Modal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
      >
        <OrganizationCreationForm />
      </Modal>
      <DropDown identifier="organization-dropdown">
        <Button
          label={organizationTrigger.label.value}
          variant="hoverable"
          color="text"
          IconRight={ChevronsUpDown}
        >
          {organization.name}
        </Button>

        <DropDown.Panel identifier="organization-dropdown" isFocusable>
          <Container
            padding="lg"
            transparency="none"
            roundedSize="lg"
            className="gap-2"
          >
            <div className="flex flex-col gap-3">
              <span className="font-bold">{selectOrganizationInstruction}</span>
              {otherOrganizations.length ? (
                otherOrganizations.map((organization) => (
                  <Button
                    key={String(organization._id)}
                    variant="outline"
                    color="text"
                    label={organization.name}
                    onClick={() =>
                      handleSelectOrganization(String(organization._id))
                    }
                    isLoading={isSelectOrganizationLoading}
                  >
                    {organization.name}
                  </Button>
                ))
              ) : (
                <span className="text-neutral dark:text-neutral-dark text-center text-xs">
                  {noOtherOrganizations}
                </span>
              )}
            </div>
            <Button
              variant="outline"
              color="text"
              label={organizationLogout.label.value}
              onClick={handleUnselectOrganization}
              isLoading={isUnselectOrganizationLoading}
              className="mt-6"
            >
              {organizationLogout.text}
            </Button>
            <Button
              variant="outline"
              color="text"
              label={createNewOrganization.label.value}
              onClick={() => setIsCreationModalOpen(true)}
            >
              {createNewOrganization.text}
            </Button>
          </Container>
        </DropDown.Panel>
      </DropDown>
    </>
  ) : (
    <></>
  );
};
