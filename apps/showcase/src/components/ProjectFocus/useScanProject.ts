import { useAuth } from '@intlayer/design-system/hooks';
import { useRef, useState } from 'react';
import type { ScanStep, ShowcaseProject } from '#/utils/projectActions/types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? '';

export const useScanProject = () => {
  const { oAuth2AccessToken } = useAuth();
  const [scanStep, setScanStep] = useState<ScanStep | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scannedProject, setScannedProject] = useState<ShowcaseProject | null>(
    null
  );
  const abortControllerRef = useRef<AbortController | null>(null);

  const scanProject = async (projectId: string) => {
    setScanStep('SCANNING_START');
    setScanError(null);
    setScannedProject(null);
    abortControllerRef.current = new AbortController();

    try {
      const headers: Record<string, string> = {
        Accept: 'text/event-stream',
      };
      const token =
        (oAuth2AccessToken as any)?.accessToken ?? oAuth2AccessToken;
      if (token && typeof token === 'string') {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${BACKEND_URL}/api/showcase-project/${projectId}/scan`,
        {
          headers,
          signal: abortControllerRef.current.signal,
          credentials: 'include',
        }
      );

      if (!response.ok || !response.body) {
        const result = await response.json().catch(() => ({}));
        setScanError(result?.error?.message ?? 'Scan request failed');
        setScanStep('ERROR');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const msg = JSON.parse(line.slice(6)) as {
              step: ScanStep;
              message?: string;
              project?: ShowcaseProject;
            };

            if (msg.step) setScanStep(msg.step);

            if (msg.step === 'ERROR') {
              setScanError(msg.message ?? 'Scan failed');
              return;
            }

            if (msg.step === 'SUCCESS' && msg.project) {
              setScannedProject(msg.project);
            }
          } catch {
            // ignore malformed SSE lines
          }
        }
      }
    } catch (error) {
      if ((error as Error).name === 'AbortError') return;
      setScanError((error as Error).message ?? 'Scan failed');
      setScanStep('ERROR');
    }
  };

  const cancelScan = () => {
    abortControllerRef.current?.abort();
    setScanStep(null);
    setScanError(null);
  };

  const resetScan = () => {
    setScanStep(null);
    setScanError(null);
  };

  return {
    scanStep,
    scanError,
    scannedProject,
    scanProject,
    cancelScan,
    resetScan,
  };
};
