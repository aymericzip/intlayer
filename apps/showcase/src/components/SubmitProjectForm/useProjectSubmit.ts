import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useRef, useState } from 'react';
import { AppRoutes } from '#/Routes';

export type AllStep =
  | 'START'
  | 'UNAUTHENTICATED'
  | 'SUCCESS'
  | 'ERROR'
  | 'SCANNING_START'
  | 'SCANNING_SUCCESS'
  | 'VERIFY_GITHUB_START'
  | 'VERIFY_GITHUB_SUCCESS'
  | 'SCREENSHOT_START'
  | 'SCREENSHOT_SUCCESS'
  | 'GITHUB_DATA_FETCHED'
  | 'GITHUB_DATA_FETCH_ERROR'
  | 'NPM_DATA_FETCHED'
  | 'NPM_DATA_FETCH_ERROR'
  | 'URL_CONTENT_FETCHED'
  | 'URL_CONTENT_FETCH_ERROR'
  | 'AI_CONTENT_GENERATED'
  | 'AI_CONTENT_GENERATION_ERROR';

import type { ShowcaseProject } from '#/utils/projectActions/types';
import type { SubmitProjectFormData } from './useSubmitProjectFormSchema';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? '';
const SHOWCASE_API = `${BACKEND_URL}/api/showcase-project`;

export const useProjectSubmit = () => {
  const [submitStep, setSubmitStep] = useState<AllStep | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedProject, setSubmittedProject] =
    useState<ShowcaseProject | null>(null);
  const abortRef = useRef(false);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(
    null
  );

  const [formValue, setFormValue, , clearFormValue] = usePersistedStore(
    'submit-project-form',
    {
      name: '',
      url: '',
      githubUrl: '',
      tagline: '',
      description: '',
      useCases: [],
    } as SubmitProjectFormData
  );

  const submitProject = async (data: SubmitProjectFormData) => {
    setSubmitStep('START');
    setSubmitError(null);
    setSubmittedProject(null);
    abortRef.current = false;

    try {
      // ── Phase 1: create the project ───────────────────────────────────────
      const response = await fetch(`${SHOWCASE_API}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: data.name,
          url: data.url,
          githubUrl: data.githubUrl,
          tagline: data.tagline,
          description: data.description,
          useCases: data.useCases,
        }),
      });

      if (abortRef.current) return;

      if (response.status === 401) {
        setSubmitStep('UNAUTHENTICATED');
        const redirectUrl = encodeURIComponent(window.location.href);
        window.location.href = `${AppRoutes.Auth_SignIn}?redirect_url=${redirectUrl}`;
        return;
      }

      const result = await response.json();

      if (!response.ok) {
        const message =
          result?.error?.message ??
          result?.error?.title ??
          `Request failed: ${response.statusText}`;
        setSubmitError(message);
        setSubmitStep('ERROR');

        return;
      }

      const projectId: string | undefined = result.data?.id ?? result.data?._id;

      if (!projectId) {
        setSubmitError('Failed to retrieve project ID from response.');
        setSubmitStep('ERROR');
        return;
      }

      // ── Phase 2: SSE scan ─────────────────────────────────────────────────
      setSubmitStep('SCANNING_START');

      if (abortRef.current) return;

      const scanResponse = await fetch(`${SHOWCASE_API}/${projectId}/scan`, {
        method: 'GET',
        headers: { Accept: 'text/event-stream' },
        credentials: 'include',
      });

      if (!scanResponse.ok) {
        const scanError = await scanResponse.json().catch(() => ({}));
        setSubmitError(
          scanError?.error?.message ?? 'Failed to start project scan.'
        );
        setSubmitStep('ERROR');
        return;
      }

      const reader = scanResponse.body!.getReader();
      readerRef.current = reader;
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        if (abortRef.current) {
          reader.cancel().catch(() => {});
          break;
        }

        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const event = JSON.parse(line.slice(6));
            if (!event.step) continue;

            if (event.step === 'SUCCESS') {
              setSubmittedProject(event.project ?? null);
              setSubmitStep('SUCCESS');
              clearFormValue();
            } else if (event.step === 'ERROR') {
              setSubmitError(event.message ?? 'Scan failed.');
              setSubmitStep('ERROR');
            } else {
              setSubmitStep(event.step as AllStep);
            }
          } catch {
            // ignore malformed SSE lines
          }
        }
      }
    } catch (error) {
      if (!abortRef.current) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        setSubmitError(message);
        setSubmitStep('ERROR');
      }
    }
  };

  const cancelSubmit = () => {
    abortRef.current = true;
    readerRef.current?.cancel().catch(() => {});
    readerRef.current = null;
    setSubmitStep(null);
  };

  return {
    formValue,
    setFormValue,
    submitStep,
    submitError,
    submittedProject,
    submitProject,
    setSubmitStep,
    setSubmitError,
    cancelSubmit,
  };
};
