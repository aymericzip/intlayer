'use client';

import {
  Form,
  useForm,
  Loader,
  Modal,
  H2,
  useToast,
} from '@intlayer/design-system';
import {
  forwardRef,
  HTMLAttributes,
  Suspense,
  useEffect,
  useState,
  type FC,
} from 'react';
import { StepLayout } from '../StepLayout';
import {
  getSetUpOrganizationSchema,
  SetUpOrganization,
} from './SetUpOrganizationSchema';
import { useStep } from '../useStep';
import { OrganizationAPI } from '@intlayer/backend';
import {
  useGetOrganizations,
  useSelectOrganization,
} from '@intlayer/design-system/hooks';
import { NoOrganizationView } from '@components/Dashboard/OrganizationForm/NoOrganizationView';
import { OrganizationCreationForm } from '@components/Dashboard/OrganizationForm/OrganizationCreationForm';
import { OrganizationList } from '@components/Dashboard/OrganizationForm/OrganizationList';
import { useIntlayer } from 'next-intlayer';
import { Steps } from '../steps';

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
  const SetUpOrganizationSchema = getSetUpOrganizationSchema();
  const { selectOrganization } = useSelectOrganization();
  const { toast } = useToast();
  const { formData, goNextStep, goPreviousStep, setFormData } = useStep(
    Steps.SetupOrganization
  );
  const { form, isSubmitting } = useForm(SetUpOrganizationSchema, {
    defaultValues: formData,
  });
  const { title, successToast } = useIntlayer('set-up-organization-step');

  const onSubmitSuccess = async (data: SetUpOrganization) => {
    setFormData(data);

    if (formData?.organizationId) {
      await selectOrganization(formData.organizationId).then(() => {
        toast({
          title: successToast.title.value,
          description: successToast.description.value,
          variant: 'success',
        });
        goNextStep();
      });
    }
  };

  useEffect(() => {
    // Reset the form to the initial state once loaded from the session storage
    form.reset(formData);
  }, [formData, form]);

  return (
    <Form
      schema={SetUpOrganizationSchema}
      onSubmitSuccess={onSubmitSuccess}
      {...form}
    >
      <StepLayout onGoToPreviousStep={goPreviousStep} isLoading={isSubmitting}>
        <H2>{title}</H2>
        <Suspense fallback={<Loader />}>
          <Form.Element
            name="organizationId"
            Element={forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
              (props, ref) => (
                <div ref={ref} {...props}>
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
                        form.setValue(
                          'organizationId',
                          String(organization._id)
                        );
                      }
                    }}
                    selectedOrganizationId={form.getValues().organizationId}
                  />
                </div>
              )
            )}
          />
        </Suspense>
      </StepLayout>
    </Form>
  );
};
