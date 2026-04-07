'use client';

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
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useRouter, useSearchParams } from '#/hooks/navigation';
import { NoOrganizationView } from '#components/Dashboard/OrganizationForm/NoOrganizationView';
import { OrganizationCreationForm } from '#components/Dashboard/OrganizationForm/OrganizationCreationForm';
import { OrganizationList } from '#components/Dashboard/OrganizationForm/OrganizationList';
import { StepLayout } from '../StepLayout';
import { Steps } from '../steps';
import { useStep } from '../useStep';
import {
  type SetUpOrganization,
  useSetUpOrganizationSchema,
} from './useSetUpOrganizationSchema';

const OrganizationFormContent: FC<{
  selectedOrganizationId?: OrganizationAPI['id'] | string;
  onSelectOrganization: (organization: OrganizationAPI) => void;
}> = ({ onSelectOrganization, selectedOrganizationId }) => {
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { data: organizations, isSuccess } = useGetOrganizations();

  if ((organizations?.data ?? []).length > 0) {
    return (
      <OrganizationList
        organizations={organizations?.data ?? []}
        onSelectOrganization={onSelectOrganization}
        selectedOrganizationId={selectedOrganizationId}
      />
    );
  }

  if (isSuccess) {
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

export const SetupOrganizationStepForm: FC = () => {
  const SetUpOrganizationSchema = useSetUpOrganizationSchema();
  const { session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mutate: selectOrganization } = useSelectOrganization();
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

    if (formData?.organizationId) {
      selectOrganization(formData.organizationId, {
        onSuccess: () => {
          goNextStep();
        },
      });
    }
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
            router.push(
              searchParams
                ? `${App_Pricing_Path}?${searchParams.toString()}`
                : App_Pricing_Path
            );
          } else {
            goPreviousStep();
          }
        }}
        isLoading={isSubmitting}
        isSkippable={Boolean(session?.organization?.id)}
        onSkipStep={goNextStep}
      >
        <H2>{title}</H2>
        <OrganizationFormContent
          onSelectOrganization={(organization) => {
            if (form.getValues().organizationId === String(organization.id)) {
              form.setValue('organizationId', null as unknown as string);
            } else {
              form.setValue('organizationId', String(organization.id));
            }
          }}
          selectedOrganizationId={form.watch('organizationId')}
        />
      </StepLayout>
    </Form>
  );
};
