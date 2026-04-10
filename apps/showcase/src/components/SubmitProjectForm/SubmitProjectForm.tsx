import { Container } from '@intlayer/design-system/container';
import { Form, useForm } from '@intlayer/design-system/form';
import { useSession } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { App_Auth_SignIn } from '@intlayer/design-system/routes';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { type FC, type FocusEvent, useEffect, useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { ModalStatus } from './ModalStatus';
import { ProjectFormFields } from './ProjectFormFields';
import { useProjectSubmit } from './useProjectSubmit';
import { useSubmitProjectFormSchema } from './useSubmitProjectFormSchema';

export const SubmitProjectForm: FC = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const navigate = useNavigate();
  const { locale } = useLocale();
  const { session, revalidateSession } = useSession();
  const schema = useSubmitProjectFormSchema();

  const {
    formValue,
    setFormValue,
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

  // Re-check auth when user returns to the page (e.g. after signing in in another tab/window)
  useEffect(() => {
    setIsHydrated(true);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        revalidateSession();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [revalidateSession]);

  // Save form state to persisted store on blur (click out)
  const handleBlur = (_e: FocusEvent<HTMLDivElement>) => {
    setFormValue(form.getValues());
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
        className="mt-8 min-h-100"
        roundedSize="3xl"
        padding="lg"
        transparency="none"
      >
        <Loader isLoading={!isHydrated}>
          <Form
            schema={schema}
            onSubmitSuccess={submitProject}
            className="space-y-1"
            {...form}
          >
            <ProjectFormFields />

            <div className="flex flex-col gap-3 pt-4">
              {!session?.user ? (
                <Form.Button
                  className="w-full"
                  type="button"
                  color="text"
                  label={content.signInButton.label.value}
                  onClick={() => {
                    const redirectUrl = encodeURIComponent(
                      window.location.href
                    );

                    window.location.href = `${App_Auth_SignIn}?redirect_url=${redirectUrl}`;
                  }}
                >
                  {content.signInButton.label}
                </Form.Button>
              ) : (
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
              )}
            </div>
          </Form>
        </Loader>

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
                  params: { locale, projectId: submittedProject.id },
                })
              : navigate({ to: '/{-$locale}', params: { locale } })
          }
        />
      </Container>
    </div>
  );
};
