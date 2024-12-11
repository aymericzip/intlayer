'use client';

import { NoOrganizationView } from '@components/Dashboard/OrganizationForm/NoOrganizationView';
import { OrganizationCreationForm } from '@components/Dashboard/OrganizationForm/OrganizationCreationForm';
import { OrganizationList } from '@components/Dashboard/OrganizationForm/OrganizationList';
import { OrganizationAPI } from '@intlayer/backend';
import {
  Form,
  useForm,
  Loader,
  Modal,
  H2,
  useAuth,
} from '@intlayer/design-system';
import {
  useGetOrganizations,
  useSelectOrganization,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { HTMLAttributes, Suspense, useMemo, useState, type FC } from 'react';
import { StepLayout } from '../StepLayout';
import { Steps } from '../steps';
import { useStep } from '../useStep';
import {
  useSetUpOrganizationSchema,
  SetUpOrganization,
} from './useSetUpOrganizationSchema';

const OrganizationFormContent: FC<{
  selectedOrganizationId?: OrganizationAPI['_id'] | string;
  onSelectOrganization: (organization: OrganizationAPI) => void;
}> = ({ onSelectOrganization, selectedOrganizationId }) => {
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { data: organizations, isLoading, isSuccess } = useGetOrganizations();

  if ((organizations?.data ?? []).length > 0) {
    return (
      <OrganizationList
        organizations={organizations?.data ?? []}
        onSelectOrganization={onSelectOrganization}
        selectedOrganizationId={selectedOrganizationId}
      />
    );
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

export const SetupOrganizationStepForm: FC = () => {
  const SetUpOrganizationSchema = useSetUpOrganizationSchema();
  const { session } = useAuth();
  const { selectOrganization } = useSelectOrganization();
  const { formData, goNextStep, goPreviousStep, setFormData } = useStep(
    Steps.SetupOrganization
  );

  const defaultValues = useMemo(
    () => ({
      ...formData,
      organizationId: session?.organization?._id
        ? String(session?.organization?._id)
        : formData?.organizationId,
    }),
    [formData, session]
  );

  const { form, isSubmitting } = useForm(SetUpOrganizationSchema, {
    defaultValues,
  });
  const { title } = useIntlayer('set-up-organization-step');

  const onSubmitSuccess = async (data: SetUpOrganization) => {
    setFormData(data);

    if (String(data.organizationId) === String(session?.organization?._id)) {
      goNextStep();
    }

    if (formData?.organizationId) {
      await selectOrganization(formData.organizationId).then(() =>
        goNextStep()
      );
    }
  };

  return (
    <Form
      schema={SetUpOrganizationSchema}
      onSubmitSuccess={onSubmitSuccess}
      {...form}
    >
      <StepLayout
        onGoToPreviousStep={goPreviousStep}
        isLoading={isSubmitting}
        isSkippable={Boolean(session?.organization?._id)}
        onSkipStep={goNextStep}
      >
        <H2>{title}</H2>
        <Suspense fallback={<Loader />}>
          <Form.Element
            name="organizationId"
            Element={(props: HTMLAttributes<HTMLDivElement>) => (
              <div {...props}>
                <OrganizationFormContent
                  onSelectOrganization={(organization) => {
                    if (
                      form.getValues().organizationId ===
                      String(organization._id)
                    ) {
                      form.setValue(
                        'organizationId',
                        null as unknown as string
                      );
                    } else {
                      form.setValue('organizationId', String(organization._id));
                    }
                  }}
                  selectedOrganizationId={form.getValues().organizationId}
                />
              </div>
            )}
          />
        </Suspense>
      </StepLayout>
    </Form>
  );
};
