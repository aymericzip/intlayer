import type { OrganizationAPI } from '@intlayer/backend';
import { Form, useForm } from '@intlayer/design-system/form';
import { H2 } from '@intlayer/design-system/headers';
import {
  useGetOrganizations,
  useSelectOrganization,
  useSession,
} from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { Modal } from '@intlayer/design-system/modal';
import { App_Pricing_Path } from '@intlayer/design-system/routes';
import { useSearch } from '@tanstack/react-router';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { NoOrganizationView } from '#components/Dashboard/OrganizationForm/NoOrganizationView';
import { OrganizationCreationForm } from '#components/Dashboard/OrganizationForm/OrganizationCreationForm';
import { OrganizationList } from '#components/Dashboard/OrganizationForm/OrganizationList';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { StepLayout } from '../StepLayout';
import { Steps } from '../steps';
import { useStep } from '../useStep';
import {
  type SetUpOrganization,
  useSetUpOrganizationSchema,
} from './useSetUpOrganizationSchema';

export const SetupOrganizationStepForm: FC = () => {
  const SetUpOrganizationSchema = useSetUpOrganizationSchema();
  const { session } = useSession();
  const navigate = useLocalizedNavigate();
  const search = useSearch({ strict: false });

  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { data: organizations, isSuccess: isOrganizationsSuccess } =
    useGetOrganizations();
  const { mutate: selectOrganization, isPending: isSelectOrganizationPending } =
    useSelectOrganization();

  const { formData, goNextStep, goPreviousStep, setFormData } = useStep(
    Steps.SetupOrganization
  );

  const { form, isSubmitting } = useForm(SetUpOrganizationSchema, {
    defaultValues: {
      ...formData,
      organizationId: session?.organization?.id
        ? String(session?.organization?.id)
        : formData?.organizationId,
    },
  });

  const { title } = useIntlayer('set-up-organization-step');

  const onSubmitSuccess = (data: SetUpOrganization) => {
    setFormData(data);

    if (String(data.organizationId) === String(session?.organization?.id)) {
      goNextStep();
    }

    // Fixed: Use 'data' from the submission, not the stale 'formData' state
    if (data.organizationId) {
      selectOrganization(data.organizationId, {
        onSuccess: () => {
          goNextStep();
        },
      });
    }
  };

  const handleSelectOrganization = (organization: OrganizationAPI) => {
    selectOrganization(organization.id, {
      onSuccess: () => {
        setFormData({
          organizationId: String(organization.id),
        });

        setTimeout(() => {
          goNextStep();
        }, 2000);
      },
    });
  };

  const renderContent = () => {
    if ((organizations?.data ?? []).length > 0) {
      return (
        <OrganizationList
          isPending={isSelectOrganizationPending}
          onSelectOrganization={handleSelectOrganization}
          selectedOrganizationId={session?.organization?.id}
        />
      );
    }

    if (isOrganizationsSuccess) {
      return (
        <>
          <Modal
            isOpen={isCreationModalOpen}
            onClose={() => setIsCreationModalOpen(false)}
            hasCloseButton
            padding="md"
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

  return (
    <Form
      schema={SetUpOrganizationSchema}
      onSubmitSuccess={onSubmitSuccess}
      {...form}
    >
      <StepLayout
        onGoToPreviousStep={() => {
          if (session?.user) {
            navigate({
              to: App_Pricing_Path as any,
              search: search as any,
            });
          } else {
            goPreviousStep();
          }
        }}
        isLoading={isSubmitting}
        isSkippable={Boolean(session?.organization?.id)}
        onSkipStep={goNextStep}
      >
        <H2>{title}</H2>

        {/* Hidden input to ensure React Hook Form tracks the value for re-renders */}
        <input type="hidden" {...form.register('organizationId')} />

        {renderContent()}
      </StepLayout>
    </Form>
  );
};
