'use client';

import { PagesRoutes } from '@/Routes';
import { Button, Container, DropDown, Modal } from '@intlayer/design-system';
import {
  useAuth,
  useGetOrganizations,
  useSelectOrganization,
  useUnselectOrganization,
} from '@intlayer/design-system/hooks';
import { ChevronsUpDown } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import { useState, type FC } from 'react';
import { OrganizationCreationForm } from '../OrganizationForm/OrganizationCreationForm';

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
    noOtherOrganizations,
    createNewOrganization,
  } = useIntlayer('dashboard-navbar');

  const { organization } = session ?? {};
  const router = useRouter();

  const handleUnselectOrganization = async () => {
    await unselectOrganization().then(() => {
      router.push(PagesRoutes.Dashboard_Organization);
    });
  };

  const handleSelectOrganization = (organizationId: string) => {
    selectOrganization(organizationId).then(async () => {
      router.push(PagesRoutes.Dashboard_Projects);
    });
  };

  const otherOrganizations = (organizations?.data ?? []).filter(
    (organizationEl) => String(organizationEl.id) !== String(organization?.id)
  );

  return organization ? (
    <>
      <Modal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
      >
        <OrganizationCreationForm
          onOrganizationCreated={(organization) => {
            setIsCreationModalOpen(false);
            handleSelectOrganization(String(organization.id));
          }}
        />
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
                    key={String(organization.id)}
                    variant="outline"
                    color="text"
                    label={organization.name}
                    onClick={() =>
                      handleSelectOrganization(String(organization.id))
                    }
                    isLoading={isSelectOrganizationLoading}
                  >
                    {organization.name}
                  </Button>
                ))
              ) : (
                <span className="text-neutral text-center text-xs">
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
