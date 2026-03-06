import { usePersistedStore, useSession } from '@intlayer/design-system/hooks';
import { useRef, useState } from 'react';
import { submitProject as submitProjectAction } from '@/server/projectActions/projectActions';
import type { SubmitStep } from '@/server/projectActions/types';
import type { SubmitProjectFormData } from './useSubmitProjectFormSchema';

export const useProjectSubmit = () => {
  const { session } = useSession();
  const [submitStep, setSubmitStep] = useState<SubmitStep | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
    const isAuthEnabled = import.meta.env.VITE_IS_AUTH_ENABLED !== 'false';

    if (isAuthEnabled && !session) {
      const redirectUrl =
        typeof window !== 'undefined'
          ? encodeURIComponent(window.location.pathname)
          : '';
      window.location.href = `https://app.intlayer.org/auth/login?redirect_url=${redirectUrl}`;
      return;
    }

    setSubmitStep('START');
    setSubmitError(null);
    abortRef.current = false;

    try {
      // Call the Server Function directly
      const stream = await submitProjectAction({ data });

      // TanStack Start automatically parses the chunks from the async generator!
      for await (const msg of stream) {
        if (abortRef.current) {
          console.log('[useProjectSubmit] Submission cancelled client-side.');
          break;
        }

        console.log('[useProjectSubmit] msg received from stream:', msg);

        if (msg.step) {
          setSubmitStep(msg.step as SubmitStep);
        }

        if (msg.step === 'ERROR') {
          console.error('[useProjectSubmit] Error received:', msg.message);
          setSubmitError(msg.message || 'Failed to submit project.');
          setSubmitStep('ERROR' as SubmitStep);
          break;
        } else if (msg.step === 'SUCCESS') {
          console.log('[useProjectSubmit] Successful submission:', msg.project);
          resetForm();
          break;
        }
      }
    } catch (error) {
      console.error('Error submitting project:', error);
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
    submitProject,
    setSubmitStep,
    setSubmitError,
    cancelSubmit,
  };
};
