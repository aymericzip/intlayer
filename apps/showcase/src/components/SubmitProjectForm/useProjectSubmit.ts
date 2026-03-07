import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useRef, useState } from 'react';
import { AppRoutes } from '#/Routes';
import { submitProject as submitProjectAction } from '@/server/projectActions/projectActions';
import type { Project, SubmitStep } from '@/server/projectActions/types';
import type { SubmitProjectFormData } from './useSubmitProjectFormSchema';

export const useProjectSubmit = () => {
  const [submitStep, setSubmitStep] = useState<SubmitStep | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedProject, setSubmittedProject] = useState<Project | null>(
    null
  );
  const abortRef = useRef(false);

  const [, setFormValue] = usePersistedStore('submit-project-form', {
    name: '',
    url: '',
    githubUrl: '',
    tagline: '',
    description: '',
    useCases: [],
  });

  const resetForm = () => {
    setFormValue({
      name: '',
      url: '',
      githubUrl: '',
      tagline: '',
      description: '',
      useCases: [],
    });
  };

  const submitProject = async (data: SubmitProjectFormData) => {
    setSubmitStep('START');
    setSubmitError(null);
    setSubmittedProject(null);
    abortRef.current = false;

    try {
      const stream = await submitProjectAction({ data });

      for await (const msg of stream) {
        if (abortRef.current) break;

        if (msg.step) {
          setSubmitStep(msg.step as SubmitStep);
        }

        if (msg.step === 'UNAUTHENTICATED') {
          const redirectUrl = encodeURIComponent(window.location.href);
          window.location.href = `${AppRoutes.Auth_SignIn}?redirect_url=${redirectUrl}`;
          return;
        }

        if (msg.step === 'ERROR') {
          setSubmitError((msg as any).message || 'Failed to submit project.');
          break;
        } else if (msg.step === 'SUCCESS') {
          setSubmittedProject((msg as any).project ?? null);
          resetForm();
          break;
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setSubmitError(message);
      setSubmitStep('ERROR');
    }
  };

  const cancelSubmit = () => {
    abortRef.current = true;
    setSubmitStep(null);
  };

  return {
    submitStep,
    submitError,
    submittedProject,
    submitProject,
    setSubmitStep,
    setSubmitError,
    cancelSubmit,
  };
};
