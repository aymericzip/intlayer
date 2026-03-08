import { Container, Form, useForm } from '@intlayer/design-system';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import type { FC, FocusEvent } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { Link } from '@/components/Link';
import { ModalStatus } from './ModalStatus';
import { ProjectFormFields } from './ProjectFormFields';
import { useProjectSubmit } from './useProjectSubmit';
import {
  type SubmitProjectFormData,
  useSubmitProjectFormSchema,
} from './useSubmitProjectFormSchema';

export const SubmitProjectForm: FC = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();
  const schema = useSubmitProjectFormSchema();
  const [formValue, setFormValue, , clearFormValue] =
    usePersistedStore<SubmitProjectFormData>('submit-project-form', {
      name: '',
      url: '',
      githubUrl: '',
      tagline: '',
      description: '',
      useCases: [],
    });

  const {
    submitStep,
    submitError,
    submittedProject,
    submitProject,
    setSubmitStep,
    setSubmitError,
    cancelSubmit,
  } = useProjectSubmit();

  const { form, isSubmitting } = useForm(schema, {
    defaultValues: formValue,
  });

  const content = useIntlayer('submit-project-form');

  // Save form state to persisted store on blur (click out)
  const handleBlur = (_e: FocusEvent<HTMLDivElement>) => {
    setFormValue(form.getValues() as SubmitProjectFormData);
  };

  const onSubmitSuccess = async (data: SubmitProjectFormData) => {
    await submitProject(data);
    clearFormValue();
  };

  const handleModalClose = () => {
    if (submitStep === 'SUCCESS' || submitError) {
      setSubmitStep(null);
      setSubmitError(null);
    } else {
      cancelSubmit();
      setSubmitError('Submission cancelled by user.');
    }
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: just for form saving logic
    <div className="mx-auto max-w-2xl px-4 py-12" onBlur={handleBlur}>
      {/* Back Link */}
      <Link
        to="/"
        className="group mb-6 inline-flex items-center gap-2 text-neutral text-sm transition-colors hover:text-text"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {content.backToShowcase}
      </Link>

      <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
        {content.title}
      </h1>
      <p className="mt-2 text-neutral">{content.description}</p>

      <Container
        className="mt-8"
        roundedSize="3xl"
        padding="lg"
        transparency="none"
      >
        <Form
          schema={schema}
          onSubmitSuccess={onSubmitSuccess}
          className="space-y-1"
          {...form}
        >
          <ProjectFormFields form={form} />

          <div className="flex flex-col gap-3 pt-4">
            <Form.Button
              className="w-full"
              type="submit"
              color="text"
              isLoading={
                isSubmitting ||
                (!!submitStep &&
                  submitStep !== 'SUCCESS' &&
                  submitStep !== 'ERROR')
              }
              label={content.submitButton.label.value}
              disabled={
                !!submitStep &&
                submitStep !== 'SUCCESS' &&
                submitStep !== 'ERROR'
              }
            >
              {content.submitButton.label}
            </Form.Button>
          </div>
        </Form>

        <ModalStatus
          submitStep={submitStep}
          submitError={submitError}
          onClose={handleModalClose}
          onRetry={() => {
            setSubmitStep(null);
            setSubmitError(null);
          }}
          onSuccess={() =>
            submittedProject
              ? navigate({
                  to: '/{-$locale}/project/$projectId',
                  params: { locale, projectId: submittedProject._id },
                })
              : navigate({ to: '/{-$locale}', params: { locale } })
          }
        />
      </Container>
    </div>
  );
};
