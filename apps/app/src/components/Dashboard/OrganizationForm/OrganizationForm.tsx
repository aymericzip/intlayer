import { useGetOrganizations, useSession } from '@intlayer/design-system/api';
import { Container } from '@intlayer/design-system/container';
import { Modal } from '@intlayer/design-system/modal';
import { App_Dashboard_Projects_Path } from '@intlayer/design-system/routes';
import {
  CreditCard,
  Mail,
  Settings,
  ShieldCheck,
  TriangleAlert,
  Users,
} from 'lucide-react';
import { type FC, Suspense, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { AICredits } from '#components/AICredits/AICredits';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate';
import { IS_SELF_HOSTED } from '#utils/selfHosted';
import {
  DangerZoneCard,
  type SettingsSection,
  SettingsCard,
  SettingsSectionLayout,
} from '../SettingsSectionLayout';
import { DeleteOrganizationModal } from './DeleteOrganizationModal';
import { MailerSettings } from './Mailer';
import { MembersForm } from './Members/MembersForm';
import { NoOrganizationView } from './NoOrganizationView';
import { OrganizationCreationForm } from './OrganizationCreationForm';
import { OrganizationEditionForm } from './OrganizationEditionForm';
import { OrganizationList } from './OrganizationList';
import { OrganizationSkeleton } from './OrganizationSkeleton';
import { PlanDetails } from './Plan/PlanDetails';
import { SSOSettings } from './SSO';

type OrganizationSettingsSectionId =
  | 'general'
  | 'members'
  | 'plan'
  | 'security'
  | 'email'
  | 'danger-zone';

const OrganizationFormContent: FC = () => {
  const { session } = useSession();
  const { organization, roles } = session ?? {};
  const isOrganizationAdmin =
    roles?.includes('org_admin') || roles?.includes('admin');
  const navigate = useLocalizedNavigate();
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const { data: organizations, isPending, isSuccess } = useGetOrganizations();
  const { dangerZoneTitle, dangerZoneDescription, deleteOrganizationButton } =
    useIntlayer('organization-form');
  const { sections: sectionLabels } = useIntlayer('settings-section-layout');

  if (organization) {
    const sections: SettingsSection<OrganizationSettingsSectionId>[] = [
      {
        id: 'general',
        label: sectionLabels.general.value,
        icon: Settings,
        content: (
          <SettingsCard>
            <OrganizationEditionForm />
          </SettingsCard>
        ),
      },
      {
        id: 'members',
        label: sectionLabels.members.value,
        icon: Users,
        content: (
          <SettingsCard>
            <MembersForm />
          </SettingsCard>
        ),
      },
      {
        id: 'plan',
        label: sectionLabels.plan.value,
        icon: CreditCard,
        content: (
          <>
            {!IS_SELF_HOSTED && (
              <SettingsCard>
                <PlanDetails />
              </SettingsCard>
            )}
            <SettingsCard>
              <AICredits />
            </SettingsCard>
          </>
        ),
      },
      {
        id: 'security',
        label: sectionLabels.security.value,
        icon: ShieldCheck,
        content: (
          <SettingsCard>
            <SSOSettings />
          </SettingsCard>
        ),
      },
      {
        id: 'email',
        label: sectionLabels.email.value,
        icon: Mail,
        content: (
          <SettingsCard>
            <MailerSettings />
          </SettingsCard>
        ),
      },
    ];

    if (isOrganizationAdmin) {
      sections.push({
        id: 'danger-zone',
        label: sectionLabels.dangerZone.value,
        icon: TriangleAlert,
        tone: 'danger',
        content: (
          <DangerZoneCard
            title={dangerZoneTitle}
            description={dangerZoneDescription}
            buttonLabel={deleteOrganizationButton.ariaLabel.value}
            buttonText={deleteOrganizationButton.text}
            onDelete={() => setIsDeletionModalOpen(true)}
          >
            <DeleteOrganizationModal
              isOpen={isDeletionModalOpen}
              onClose={() => setIsDeletionModalOpen(false)}
              onDelete={() => setIsDeletionModalOpen(false)}
            />
          </DangerZoneCard>
        ),
      });
    }

    return (
      <div className="flex w-full flex-1 flex-col gap-8 self-start">
        <SettingsSectionLayout sections={sections} />
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
          border
          borderColor="neutral"
        >
          <OrganizationCreationForm
            onOrganizationCreated={() => {
              setIsCreationModalOpen(false);
              // First organization: continue straight to project creation.
              navigate({ to: App_Dashboard_Projects_Path });
            }}
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
