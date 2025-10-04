'use client';

import { NoOrganizationView } from '@components/Dashboard/OrganizationForm/NoOrganizationView';
import { OrganizationCreationForm } from '@components/Dashboard/OrganizationForm/OrganizationCreationForm';
import { OrganizationList } from '@components/Dashboard/OrganizationForm/OrganizationList';
import type { OrganizationAPI } from '@intlayer/backend';
import { Form, H2, Loader, Modal, useForm } from '@intlayer/design-system';
import {
  useAuth,
  useGetOrganizations,
  useSelectOrganization,
} from '@intlayer/design-system/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { PagesRoutes } from '@/Routes';
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
  const { data: organizations, isPending, isSuccess } = useGetOrganizations();

  if ((organizations?.data ?? []).length > 0) {
    return (
      <OrganizationList
        organizations={organizations?.data ?? []}
        onSelectOrganization={onSelectOrganization}
        selectedOrganizationId={selectedOrganizationId}
      />
    );
  }

  if (isSuccess && !isPending) {
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
                ? `${PagesRoutes.Pricing}?${searchParams.toString()}`
                : PagesRoutes.Pricing
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
